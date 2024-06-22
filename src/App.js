import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import ApplicationRegistrationForm from './Pages/Application';
import EventRegistrationForm from './Pages/Event';
import Home from './Pages/Home';
import Survay from './Pages/Survay';

function App() {
  return (
    <div>
      <div className="bg-gray-100">
        <nav className="p-4 bg-white shadow-md fixed w-full">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/event-registration" className="text-blue-500 hover:underline">Event Registration</Link>
            </li>
            <li>
              <Link to="/application-registration" className="text-blue-500 hover:underline">Application Registration</Link>
            </li>
            <li>
              <Link to="/survey" className="text-blue-500 hover:underline">Survey Form</Link>
            </li>
          </ul>
        </nav>

        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event-registration" element={<EventRegistrationForm />} />
            <Route path="/application-registration" element={<ApplicationRegistrationForm />} />
            <Route path="/survey" element={<Survay />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
