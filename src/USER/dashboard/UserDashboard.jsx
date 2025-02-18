"use client";
import React, { useState } from 'react'
import Sidebar from './SideBar'
import Navbar from './NavBar'
import Tabs from '@/COMMON/Tabs';

export const UserDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

      const tabsData = [
        { label: 'Item One', value: '1', content: <Navbar></Navbar>},
        { label: 'Item Two', value: '2', content: 'This is the content of Item Two' },
        { label: 'Item Three', value: '3', content: 'This is the content of Item Three' },
      ];
  return (
    <>
     <Navbar onClose={toggleSidebar}/>
     <Sidebar  open={sidebarOpen} onClose={toggleSidebar} />
     <Tabs tabs={tabsData} />
    </>
  )
}
