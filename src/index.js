import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Configuration from './pages/Configuration';
import Editor from './pages/Editor';
import Summary from './pages/Summary';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormEvent from './pages/Configuration/FormEvent';
import FormUjian from './pages/Configuration/FormUjian';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Navigate to="/configuration" replace />} />
        <Route path="configuration" element={<Configuration />}>
          <Route path="/configuration" element={<Navigate to="/configuration/event" replace />} />
          <Route path="event" element={<FormEvent />} />
          <Route path="ujian" element={<FormUjian />} />
        </Route>
        <Route path="editor" element={<Editor />} />
        <Route path="summary" element={<Summary />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
