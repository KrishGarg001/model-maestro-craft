
import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-6">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary"
            >
              <path d="M12 3c.53 0 1.039.211 1.414.586l7 7 .586.586v8c0 .53-.211 1.039-.586 1.414-.375.375-.884.586-1.414.586h-14c-.53 0-1.039-.211-1.414-.586-.375-.375-.586-.884-.586-1.414v-8c0-.53.211-1.039.586-1.414l7-7c.375-.375.884-.586 1.414-.586z"></path>
              <path d="M8 14h8"></path>
              <path d="M8 17h8"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold">
            <span className="gradient-text">Model</span> Maestro
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/your-repo" 
            target="_blank" 
            rel="noreferrer" 
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
