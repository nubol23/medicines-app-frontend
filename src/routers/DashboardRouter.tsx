import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomeScreen } from "../components/HomeScreen";
import Navbar from "../components/Common/Navbar";
import "./dashboard.scss";
import FamiliesScreen from "../components/Families/FamiliesScreen";
import MedicinesScreen from "../components/Medicines/MedicinesScreen";
import PurchasesScreen from "../components/Purchases/PurchasesScreen";
import FamilyDetails from "../components/Families/FamilyDetails";
import MedicineCreateScreen from "../components/Medicines/MedicineCreateScreen";
import MedicineUpdateScreen from "../components/Medicines/MedicineUpdateScreen";
import PurchaseCreateScreen from "../components/Purchases/PurchaseCreateScreen";
import PurchaseUpdateScreen from "../components/Purchases/PurchaseUpdateScreen";
import InviteMemberScreen from "../components/Families/InviteMemberScreen";
import ProfileScreen from "../components/ProfileScreen";

export const DashboardRouter = () => {
  return (
    <>
      <div className="dashboard-box">
        <Navbar />

        <div className="dashboard-screen">
          <Routes>
            <Route path="/profile/:userId" element={<ProfileScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/families" element={<FamiliesScreen />} />
            <Route path="/families/:familyId" element={<FamilyDetails />} />
            <Route
              path="/families/:familyId/invite"
              element={<InviteMemberScreen />}
            />
            <Route path="/medicines" element={<MedicinesScreen />} />
            <Route
              path="/medicines/create"
              element={<MedicineCreateScreen />}
            />
            <Route
              path="/medicines/update/:medicineId"
              element={<MedicineUpdateScreen />}
            />
            <Route path="/purchases" element={<PurchasesScreen />} />
            <Route
              path="/purchases/:medicineId/create"
              element={<PurchaseCreateScreen />}
            />
            <Route
              path="/purchases/:medicineId/update/:purchaseId"
              element={<PurchaseUpdateScreen />}
            />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
