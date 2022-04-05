import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {HomeScreen} from '../components/HomeScreen'
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import "./dashboard.scss"
import FamilyScreen from "../components/FamilyScreen";

export const DashboardRouter = () => {
  return (
    <>
      <div className="dashboard-box">
        <Navbar/>

        <div className="dashboard-screen">
          <Sidenav/>

          <div className="container">
            <Routes>
              <Route path='/home' element={<HomeScreen/>}/>
              <Route path='/family' element={<FamilyScreen/>}/>
              <Route path="/*" element={<Navigate to="/home"/>}/>
            </Routes>
          </div>

        </div>

      </div>
    </>
  )
}