import React from 'react';
import { Routes, Route } from "react-router-dom"
import { useState } from "react";
import Test from "./components/Test";
import Homepage from "./components/Homepage";
import MessagesTable from "./components/MessagesTable";
import ResponsiveAppBar from "./components/Navigation";
import Phonebook from "./components/Phonebook";
import Footer from "./components/Footer";
import './components/style/App.css';

function App() {

    return (
        <>
            <div className="page-container">
            <div className="content-wrap">
            <ResponsiveAppBar />
            <Routes>
                <Route path="/" element={ <Homepage/> } />
                {/* <Route path="/test" element={ <Test/> } /> */}
                <Route path="/messages" element={ <MessagesTable/> } />
                <Route path="/phonebook" element={ <Phonebook/> } />
            </Routes>
            </div>
            <Footer />
            </div>
        </>
    );
}

export default App;
