import helpers
import random
import string
import datetime
from flask import Flask, request, jsonify
from flask import make_response
from database import db_session
from database_models import Category, User, Photo
from flask_cors import CORS
import json
import jwt


app = Flask(__name__)
CORS(app)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


# DELETE USER
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify(Message="Not Found"), 404
    db_session.delete(user)
    db_session.commit()
    return jsonify(success=True)


# NEW USER
@app.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()
    if 'username' not in data:
        raise ValueError("username is required")
    username = data['username']
    if 'password' not in data:
        raise ValueError("password is required")
    password = data['password']
    if 'email' not in data:
        raise ValueError("email is required")
    email = data['email']

    # check for valid data
    message = dict(username=username, email=email)
    success = True

    if not helpers.valid_username(str(username)):
        message['error_username'] = "Username is not valid"
        success = False
    if helpers.user_by_name(username) is not None:
        message['error_username'] = "Username is taken"
        success = False
    if not helpers.valid_password(password):
        message['error_password'] = "Password is not valid"
        success = False
    if not helpers.valid_email(email):
        message['error_email'] = "Email is not valid"
        success = False
    if helpers.user_by_email(str(email)) is not None:
        message['error_email'] = "Email already in use"
    if success is False:
        message['success'] = False
        return jsonify(message)

    # hash the password for db storage
    pw_hash = helpers.make_pw_hash(username, password)
    # create new user object with hashed password
    new_user = User(username, email, pw_hash)
    db_session.add(new_user)
    db_session.commit()
    db_session.refresh(new_user)
    # return user JSON and status code
    return jsonify(user=new_user.serialize), 200


# LOGIN ENDPOINT
@app.route('/login', methods=['POST'])
def login():
    # get login data from request
    data = request.get_json()
    username = data['username']
    password = data['password']
    # use login data to verify if the info is valid
    user = helpers.valid_login(username, password)
    message = {}
    # if not valid, send failure response with redirect
    if user is None:
        message['error'] = "Username or Password are incorrect"
        message['success'] = False
        return jsonify(message), 200
    # if valid:
    if user:
        # create JWT token
        token_data = {
            'iat': datetime.datetime.utcnow(),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30),
            'username': username,
            'isLoggedIn': True,
        }
        auth_token = jwt.encode(token_data, app.secret_key,
                                algorithm='HS256')
        # create a JSON message with JWT and send it to client
        message['auth_token'] = auth_token
        message['success'] = True
        return jsonify(message), 200


# LOGOUT ENDPOINT
@app.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    token = data['auth_token']
    message = {}
    try:
        jwt.decode(token, app.secret_key)
    except jwt.exceptions.ExpiredSignatureError:
        pass
    except jwt.exceptions.InvalidTokenError:
        message['error'] = 'token is invalid'
        return jsonify(message), 400

    message['message'] = 'Successfully logged out'
    message['success'] = True
    return jsonify(message), 200


@app.route('/fblogin', methods=['POST'])
def fblogin():
    # create a state token to prevent forgery
    state = ''.join(random.choice(string.ascii_uppercase +
                                  string.digits) for x in xrange(32))
    # store token in the session
    login_session['state'] = state
    # get login data from request
    data = request.get_json()
    print "data from request is"
    print data
    message = {}
    message['message'] = "facebook login in received"

    email = data['data']['email']

    return jsonify(message), 200

    user = helpers.user_by_email(email)

    if user:
        print "this user "
# -- PHOTO -- #


# ALL PHOTOS ENDPOINT
@app.route('/photos', methods=['GET'])
def get_photos():
    photos = Photo.query.all()
    return jsonify(photos=[photo.serialize for photo in photos])


# PHOTO BY ID ENDPOINT
@app.route('/photos/<int:photo_id>', methods=['GET'])
def get_photo(photo_id):
    photo = Photo.query.get(photo_id)
    return jsonify(photo=photo.serialize)


# NEW PHOTO
@app.route('/photos', methods=['POST'])
def new_photo():
    # get post data from client
    data = request.get_json()
    # make sure all required data is present
    if ['name'] not in data:
        raise ValueError("you must provide a name")
    if ['description'] not in data:
        raise ValueError("you must provide a description")
    if ['category_id'] not in data:
        raise ValueError("please choose a cateogry")
    if ['picture'] not in data:
        raise ValueError("provide a url for your picture")

    # adds photo instance to db from POST request data
    newPhoto = Photo(data['name'], data['description'], data['category_id'],
                     data['picture'], data['user_id'])
    db_session.add(newPhoto)
    db_session.commit()
    db_session.refresh(newPhoto)
    return jsonify(photo=newPhoto.serialize)


# EDIT PHOTO
@app.route('/photos/<int:photo_id>', methods=['PUT'])
def edit_photo(photo_id):
    photo = Photo.query.get(photo_id)
    data = request.get_json()
    photo.description = data['description']
    photo.picture = data['picture']
    photo.category_id = data['category_id']
    db_session.add(photo)
    db_session.commit()
    return jsonify(photo=photo.serialize)


# DELETE PHOTO
@app.route('/photos/<int:photo_id>', methods=['DELETE'])
def delete_photo(photo_id):
    photo = Photo.query.get(photo_id)
    if photo is None:
        return jsonify(Message="Not Found"), 404
    db_session.delete(photo)
    db_session.commit()
    return jsonify(success=True)

# -- CATEGORY -- #


# ALL CATEGORIES
@app.route('/categories')
def get_categories():
    categories = Category.query.all()
    return jsonify(categories=[category.serialize for category in categories])


# CATEGORY BY ID
@app.route('/categories/<int:category_id>')
def get_category(category_id):
    category = Category.query.get(category_id)
    return jsonify(category.serialize)


# PHOTOS BY CATEGORY
@app.route('/categories/<int:category_id>/photos')
def get_category_photos(category_id):
    category = Category.query.get(category_id)
    return jsonify(photos=[photo.serialize for photo in category.photos])


# -- USER -- #

# ALL USERS
@app.route('/users')
def get_users():
    users = User.query.all()
    return jsonify(users=[user.serialize for user in users])


# HOME
@app.route('/')
def home():
    return "this is the home page"


if __name__ == '__main__':
    # secret key for flash to create a session
    app.secret_key = 'super_secret_key'
    # setting debug to true tell the server to restart anytime code changes
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
