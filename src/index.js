import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from './App';
import Login from './components/Login_Register/Login';
import Register from './components/Login_Register/Register';
import Result from './components/Result/Result';
import Error404 from './components/Errors/Error404';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
			<Routes>
				<Route path="/home" element={<App/>}/>
				<Route path="/" element={<Navigate replace to="/home" />} />
				<Route path="/result" element={<Result/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/register" element={<Register />}/>
				<Route path="*" element={<Error404 />} />
			</Routes>
		</BrowserRouter>
  </React.StrictMode>
);

