import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
	const isAuthorized = localStorage.getItem("token");
	console.log("token", isAuthorized);
	return isAuthorized == undefined ? <Navigate to="/" /> : <Outlet />;
}
