import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Hospitals', path: '/admin/hospitals' },
    { name: 'Services', path: '/admin/services' },
    { name: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-[#2D3748] min-h-screen text-white flex flex-col">
      <div className="p-6 text-2xl font-bold font-literata tracking-wide border-b border-gray-700">
        HEKA Admin
      </div>
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-6 py-3 transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-[#4B9B6E] text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 border-t border-gray-700">
        <Link to="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
          <span>&larr;</span> Back to Site
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
