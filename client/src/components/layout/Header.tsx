import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/lib/types';
import { MessageCircle } from 'lucide-react';

interface HeaderProps {
  onChatToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onChatToggle }) => {
  const [location] = useLocation();
  
  const navItems: NavItem[] = [
    { name: 'Home', href: '/', active: location === '/' },
    { name: 'Resume Tools', href: '/resume-analyzer', active: location === '/resume-analyzer' },
    { name: 'Resources', href: '/resources', active: location === '/resources' },
    { name: 'About', href: '/about', active: location === '/about' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-blue-600">Resume</span>
              <span className="text-purple-500">Craft</span>
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`${
                    item.active 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-900 hover:text-blue-600'
                    } font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={onChatToggle}
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Chat Support</span>
            </Button>
            <Button 
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
