import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-[#FAFAFC]">
      <div className="max-w-md w-full text-center">
        <div className="text-7xl sm:text-8xl font-extrabold font-heading text-blue-600 mb-4 tracking-tighter">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#0A192F] mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Explore our creative services or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            to="/"
            variant="primary"
            size="md"
            icon={Home}
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Back to Home
          </Button>
          <Button
            to="/services"
            variant="outline"
            size="md"
            className="w-full sm:w-auto"
          >
            Explore Services
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
