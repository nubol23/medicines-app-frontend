import React from 'react'
import './home.scss'
import Sidenav from "../Sidenav";
import Navbar from "../Navbar";

export const HomeScreen = () => {

  return (
    <div className="home-box">

      <Sidenav/>

      <div className="home-content">
        <Navbar/>
      </div>

    </div>
  )
}
