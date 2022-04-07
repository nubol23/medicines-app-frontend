import React, {useContext} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {HomeScreen} from '../components/HomeScreen'
import Navbar from "../components/Navbar";
import "./dashboard.scss"
import FamiliesScreen from "../components/FamiliesScreen";
import useRequest from "../hooks/useRequest";
import api from "../apis/api";
import {FamilyContext} from "../contexts/familyContext";
import familyTypes from "../types/familyTypes";
import MedicinesScreen from "../components/MedicinesScreen";
import PurchasesScreen from "../components/PurchasesScreen";
import FamilyDetails from "../components/FamilyDetails";
import MedicineCreateScreen from "../components/MedicineCreateScreen";

export const DashboardRouter = () => {

  const {familiesDispatch} = useContext(FamilyContext);

  useRequest(
    api.get("/families/"),
    (response) => {
      familiesDispatch({type: familyTypes.clear});
      familiesDispatch({
        type: familyTypes.addMultiple,
        payload: response.data.results,
      });
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
              <Route path='/families' element={<FamiliesScreen/>}/>
              <Route path='/families/:familyId' element={<FamilyDetails/>}/>
              <Route path='/medicines' element={<MedicinesScreen/>}/>
              <Route path='/medicines/create' element={<MedicineCreateScreen/>}/>
              <Route path='/purchases' element={<PurchasesScreen/>}/>
              <Route path="/*" element={<Navigate to="/home"/>}/>
            </Routes>
          </div>

        </div>

      </div>
    </>
  )
}