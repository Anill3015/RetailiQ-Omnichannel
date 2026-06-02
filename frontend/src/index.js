import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// ✅ Auto add JWT token to every axios request
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});

// Redirect to login on 401/403
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response &&
            (error.response.status === 401 ||
             error.response.status === 403)) {
            localStorage.clear();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

<<<<<<< HEAD
=======

>>>>>>> a96fc58e1c6a8dbc7a82a878f27473a8aa95c9ed
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals();