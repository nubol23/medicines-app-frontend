import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {HomeScreen} from '../components/HomeScreen'

export const DashboardRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/home' element={<HomeScreen/>}/>
        <Route path="/*" element={<Navigate to="/home"/>}/>
      </Routes>
    </>
  )
}