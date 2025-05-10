import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-6 border-t border-border">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
