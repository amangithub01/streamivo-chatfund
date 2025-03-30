
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 container mx-auto px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-stream-primary mb-4">404</h1>
          <p className="text-xl mb-6">Oops! This stream couldn't be found</p>
          <p className="text-muted-foreground mb-8">
            The stream you're looking for may have ended or doesn't exist.
          </p>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
