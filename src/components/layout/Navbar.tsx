
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Bell, User, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  return (
    <nav className="bg-card border-b border-border py-3 px-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 bg-stream-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="ml-2 text-lg font-bold bg-gradient-to-r from-stream-primary to-stream-accent bg-clip-text text-transparent">
              Streamivo
            </span>
          </Link>
          
          {!isMobile && (
            <div className="ml-8 space-x-4">
              <Link to="/" className="text-foreground hover:text-primary transition">Home</Link>
              <Link to="/categories" className="text-foreground hover:text-primary transition">Categories</Link>
              <Link to="/following" className="text-foreground hover:text-primary transition">Following</Link>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {!isMobile && (
            <div className="relative max-w-md w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search streams..." 
                className="pl-8 pr-4 py-2 w-full bg-muted rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      {isMobile && mobileMenuOpen && (
        <div className="mt-3 py-2 bg-card rounded-md shadow-lg animate-fade-in">
          <Link to="/" className="block px-4 py-2 hover:bg-muted">Home</Link>
          <Link to="/categories" className="block px-4 py-2 hover:bg-muted">Categories</Link>
          <Link to="/following" className="block px-4 py-2 hover:bg-muted">Following</Link>
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search streams..." 
                className="pl-8 pr-4 py-2 w-full bg-muted rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
