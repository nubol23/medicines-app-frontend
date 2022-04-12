import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {HomeScreen} from '../components/HomeScreen'
import Navbar from "../components/Navbar";
import "./dashboard.scss"
import FamiliesScreen from "../components/FamiliesScreen";
import MedicinesScreen from "../components/MedicinesScreen";
import PurchasesScreen from "../components/PurchasesScreen";
import FamilyDetails from "../components/FamilyDetails";
import MedicineCreateScreen from "../components/MedicineCreateScreen";
import MedicineUpdateScreen from "../components/MedicineUpdateScreen";
import PurchaseCreateScreen from "../components/PurchaseCreateScreen";
import PurchaseUpdateScreen from "../components/PurchaseUpdateScreen";
import InviteMemberScreen from "../components/InviteMemberScreen";

export const DashboardRouter = () => {
  return (
    <>
      <div className="dashboard-box">
        <Navbar/>

        <div className="dashboard-screen">

          <Routes>
            <Route path='/home' element={<HomeScreen/>}/>
            <Route path='/families' element={<FamiliesScreen/>}/>
            <Route path='/families/:familyId' element={<FamilyDetails/>}/>
            <Route path="/families/:familyId/invite" element={<InviteMemberScreen/>}/>
            <Route path='/medicines' element={<MedicinesScreen/>}/>
            <Route path='/medicines/create' element={<MedicineCreateScreen/>}/>
            <Route path='/medicines/update/:medicineId' element={<MedicineUpdateScreen/>}/>
            <Route path='/purchases' element={<PurchasesScreen/>}/>
            <Route path='/purchases/:medicineId/create' element={<PurchaseCreateScreen/>}/>
            <Route path='/purchases/:medicineId/update/:purchaseId' element={<PurchaseUpdateScreen/>}/>
            <Route path="/*" element={<Navigate to="/home"/>}/>
          </Routes>

        </div>

      </div>
    </>
  )
}