'use client';
import { useState } from 'react';
import ServiceSelector from '@/components/ServiceSelector';
import Dashboard from '@/components/Dashboard';

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('dashboard');

  const navLinks = [
    { name: 'Dashboard', key: 'dashboard', icon: '🏠' },
    { name: 'Treatment', key: 'treatment', icon: '💉' },
  ];

  const renderLinks = () =>
    navLinks.map((link) => (
      <button
        key={link.key}
        onClick={() => {
          setActiveLink(link.key);
          setMobileOpen(false);
        }}
        className={`block w-full text-left font-medium px-2 py-1 rounded-l-md ${
          activeLink === link.key
            ? 'text-blue-900 border-l-4 border-blue-600 bg-blue-50'
            : 'text-blue-700 hover:text-blue-900'
        }`}
      >
        {link.icon} {link.name}
      </button>
    ));

  return (
    <main className="min-h-screen flex relative">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-blue-100 p-6 shadow-md hidden md:block fixed top-0 left-0 h-screen overflow-y-auto z-10">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">Admin Panel</h2>
        <nav className="space-y-2">{renderLinks()}</nav>
      </aside>

      {/* Mobile Menu */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setMobileOpen(true)} className="text-blue-800 text-3xl">&#9776;</button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileOpen(false)}>
          <aside
            className="w-64 bg-white h-full p-6 shadow-lg absolute left-0 top-0 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setMobileOpen(false)} className="text-xl text-blue-800 mb-4">✕</button>
            <h2 className="text-2xl font-bold text-blue-900 mb-8">Admin Panel</h2>
            <nav className="space-y-2">{renderLinks()}</nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <section className="flex-1 p-4 md:p-8 bg-gray-50 w-full md:ml-64">
        {activeLink === 'dashboard' ? <Dashboard /> : <ServiceSelector />}
      </section>
    </main>
  );
}
