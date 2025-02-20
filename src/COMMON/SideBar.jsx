import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';

const Sidebar = ({ open, onClose }) => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div style={{ width: 250 }}>
        <List>
          {navLinks.map((link) => (
            <ListItem button key={link.name} onClick={onClose}>
              <ListItemText>
                <Link href={link.href}>{link.name}</Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default Sidebar;
