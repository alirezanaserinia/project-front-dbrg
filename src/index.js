import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import Login from './components/Login_Register/Login';
import Register from './components/Login_Register/Register';
import Error404 from './components/Errors/Error404';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
			<Routes>
				<Route path="/" element={<App/>}/>
				<Route path="/login" element={<Login/>} />
				<Route path="/register" element={<Register />}/>
				<Route path="*" element={<Error404 />} />
			</Routes>
		</BrowserRouter>
  </React.StrictMode>
);

