import React from 'react'
import styles from '../../styles/main.scss'
import { Link } from 'react-router'


export default function MainNavigation() {

  return (
    <div className={styles['navigation']}>
      <nav>
        <ul className={styles['nav-bar']}>
          <li className={styles['nav-item']}>
            <Link to={"/"}>ALL</Link>
          </li>
          <li className={styles['nav-item']}>
            <Link to={"/categories/1"}>ANIMALS</Link>
          </li>
          <li className={styles['nav-item']}>
            <Link to="/categories/2">BLACK &amp; WHITE</Link>
          </li>
          <li className={styles['nav-item']}>
            <Link to="/categories/3">LANDSCAPE</Link>
          </li>
          <li className={styles['nav-item']}>
            <Link to="/categories/4">PEOPLE</Link>
          </li>
          <li className={styles['nav-item']}>
            <Link to="/categories/5">FOOD</Link>
          </li>
        </ul>
      </nav>
    </div>
)}
