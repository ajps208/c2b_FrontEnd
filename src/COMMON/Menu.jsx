"use client";
import React, { useState } from 'react'
import { Grid } from '@mui/material';
import NavBar from './NavBar';
import Sidebar from './SideBar';

export const Menu = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

  return (
    <>
     <NavBar onClose={toggleSidebar}/>
     <Sidebar  open={sidebarOpen} onClose={toggleSidebar} />

    </>
  )
}
