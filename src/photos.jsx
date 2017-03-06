import React from 'react'
import '../styles/photo_index.scss'
import axios from 'axios'
import { Link } from 'react-router'

function Photo(props) {
  return (
    <div className="photo">
      <Link to={"/photos/" + props.photo.id}>
        <img className="photo" src={props.photo.picture} />
      </Link>
      <h3>{props.photo.description}</h3>
      <p>{props.photo.date_created} {props.photo.user.name}</p>
    </div>
    )
}

export default class Photos extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: [],
    }
  }

  componentDidMount() {
    const url = 'http://localhost:5000/photos'
    this.serverRequest =
      axios.get(url).then((result) => {
        console.log(result)
        this.setState(Object.assign({}, this.state, {photos: result.data.photos}))
      })
  }

  render() {
    return (
      <div className="photos">
        {this.state.photos.map(photo => <Photo key={photo.id} photo={photo} />)}
      </div>
    )
  }

}
