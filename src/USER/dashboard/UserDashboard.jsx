"use client";
import React, { useState } from 'react'
import Sidebar from '../../COMMON/SideBar'
import Navbar from '../../COMMON/NavBar'
import Tabs from '@/COMMON/Tabs';
import { Grid } from '@mui/material';
import Shops from '../Shops/Shops';
import Dashboard1 from './DashBoard';

export const UserDashboard = () => {
  
      const tabsData = [
        { label: 'Shops', value: '1', content: <Shops></Shops>},
        { label: 'DashBoard', value: '2', content:<Dashboard1></Dashboard1> },
      ];
  return (
    <>
     <Grid container sx={{width:"100%",height:"100%",}}>
     <Tabs tabs={tabsData} />
      </Grid>
    </>
  )
}
