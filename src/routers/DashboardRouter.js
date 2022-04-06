import React, {useContext} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {HomeScreen} from '../components/HomeScreen'
import Navbar from "../components/Navbar";
import "./dashboard.scss"
import FamilyScreen from "../components/FamilyScreen";
import useRequest from "../hooks/useRequest";
import api from "../apis/api";
import {FamilyContext} from "../contexts/familyContext";
import familyTypes from "../types/familyTypes";

export const DashboardRouter = () => {

  const {familiesDispatch} = useContext(FamilyContext);

  useRequest(
    api.get("/families/"),
    (response) => {
      familiesDispatch({
        type: familyTypes.addMultiple,
        payload: response.data.results,
      })
    },
    (error) => {
    },
  )

  return (
    <>
      <div className="dashboard-box">
        <Navbar/>

        <div className="dashboard-screen">

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