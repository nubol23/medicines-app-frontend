import React from 'react'
import './home.scss'
import Sidenav from "../Sidenav";
import Navbar from "../Navbar";

export const HomeScreen = () => {

  return (
    <div className="home-box">
      <Navbar/>

      <div className="home-screen">
        <Sidenav/>
      </div>

    </div>
  )
}
