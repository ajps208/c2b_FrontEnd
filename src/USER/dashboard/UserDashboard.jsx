"use client";
import React, { useState } from 'react'
import Sidebar from './SideBar'
import Navbar from './NavBar'
import Tabs from '@/COMMON/Tabs';
import { Grid } from '@mui/material';
import Shops from '../../app/Shops/Shops';

export const UserDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

      const tabsData = [
        { label: 'Shops', value: '1', content: <Shops></Shops>},
        { label: 'DashBoard', value: '2', content: 'This is the content of Item Two' },
      ];
  return (
    <>
     <Navbar onClose={toggleSidebar}/>
     <Sidebar  open={sidebarOpen} onClose={toggleSidebar} />
     <Grid container sx={{width:"100%",height:"90.8vh",backgroundColor:"#FAF9F6"}}>
     <Tabs tabs={tabsData} />

      
      </Grid>
    </>
  )
}
