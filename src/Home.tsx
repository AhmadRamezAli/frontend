import React, { useState } from 'react';
import backgroundImage from './assets/RAG.png';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import {Login} from './Login';
// Shared constants for repeated Tailwind class strings
const containerClass = ' container p-1 md:p-2 lg:p-6';
import './index.css'
const fadeInClass = 'animate__animated animate__fadeInUp';
const fontBoldClass = 'font-bold';
const textPrimaryForegroundClass = 'text-primary-foreground';
const textSecondaryForegroundClass = 'text-secondary-foreground';
const textAccentForegroundClass = 'text-accent-foreground';
const textMutedForegroundClass = 'text-muted-foreground';
const bgPrimaryClass = 'bg-primary';
const bgSecondaryClass = 'bg-card';
const bgAccentClass = 'bg-accent';
const customFontClass = 'sans-serif'; // Assuming you add this to your Tailwind config or CSS


const HeroSection = () => {
   
       
  return (
    
    <section
    style={{
      height: '100vh',
      width: '100vw',
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center', // Adjust as needed (e.g., 'top center' or 'bottom center')
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',  // Ensures full width is covered
    }}
    className="flex items-center justify-center"
  >
      <div className={containerClass}>
        <h1
        
          className={` axolotl-text ${textPrimaryForegroundClass} text-4xl md:text-5xl lg:text-6xl ${fadeInClass}`}
        >
          AXOLOTL
        </h1>
        
    <p className="animated-text text-wrapper">
      The best RAG Web application
    </p>
    <Link to="/login">
        <button
          className={`${bgPrimaryClass} ${textPrimaryForegroundClass} hover:bg-primary/80 py-2 px-4 rounded-lg ${fadeInClass}`}
          
        >
          Get Started
        </button>
        </Link>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 md:p-6 lg:p-8">
      <img aria-hidden="true" alt={icon.alt} src={icon.src} />
      <h3 className={`${fontBoldClass} ${textSecondaryForegroundClass} text-lg md:text-xl lg:text-2xl`}>
        {title}
      </h3>
      <p className={`${textMutedForegroundClass} text-sm md:text-base lg:text-lg`}>
        {description}
      </p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-secondaryClass">
      <div className={containerClass}>
        <h2
          className={`${fontBoldClass} ${textSecondaryForegroundClass} text-3xl md:text-4xl lg:text-5xl ${fadeInClass}`}
        >
          Features
        </h2>
        <div className="flex flex-wrap justify-center">
          <FeatureCard
            icon={{ alt: 'resource-icon', src: 'https://openui.fly.dev/openui/48x48.svg?text=📊' }}
            title="Resource Management"
            description="Easily track and manage your resources across multiple projects."
          />
          <FeatureCard
            icon={{ alt: 'asset-icon', src: 'https://openui.fly.dev/openui/48x48.svg?text=💻' }}
            title="Asset Optimization"
            description="Optimize your assets for better performance and efficiency."
          />
          <FeatureCard
            icon={{ alt: 'goal-icon', src: 'https://openui.fly.dev/openui/48x48.svg?text=🏆' }}
            title="Goal Setting"
            description="Set and track your goals with our intuitive goal-setting feature."
          />
        </div>
      </div>
    </section>
  );
};

const CallToActionSection = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-accentClass">
      <div className={containerClass}>
        <h2
          className={`${fontBoldClass} ${textAccentForegroundClass} text-3xl md:text-4xl lg:text-5xl ${fadeInClass}`}
        >
          Ready to Get Started?
        </h2>
        <p
          className={`${textMutedForegroundClass} text-lg md:text-xl lg:text-2xl ${fadeInClass}`}
        >
          Sign up for a free trial and experience the power of RAG Web App.
        </p>
        <button
        >
          Sign Up
        </button>
      </div>
    </section>
  );
};

const FooterSection = () => {
  return (
    <footer className="py-6 md:py-8 lg:py-10 bg-secondaryClass">
      <div className={containerClass}>
        <p className={`${textMutedForegroundClass} text-sm md:text-base lg:text-lg`}>
          Copyright 2023 RAG Web App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export function Home  () {
    const [showLogin, setShowLogin] = useState(false); // State to control login form visibility

    const handleGetStartedClick = () => {
      setShowLogin(true); // Show the login form
    };
    return (
        <div>
          {showLogin ? (
            <Login /> // Render LoginForm if showLogin is true
          ) : (
            <>
              <HeroSection onGetStartedClick={handleGetStartedClick} />
              <FeaturesSection />
              <CallToActionSection />
              <FooterSection />
            </>
          )}
        </div>
      );
};

