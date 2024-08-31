import React, { useState } from 'react';

const sharedClasses = {
  container: 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50',
  card: 'bg-card text-card-foreground p-6 rounded-lg shadow-lg max-w-sm w-full',
  header: 'flex items-center justify-between mb-4',
  button: 'text-destructive-foreground hover:text-destructive',
  textMuted: 'text-muted-foreground mb-4',
  primaryButton: 'bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-4 rounded',
};

export function ErrorModal  () {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className={sharedClasses.container}>
      <div className={sharedClasses.card}>
        <Header onClose={handleClose} />
        <Message />
        <RetryButton onRetry={handleRetry} />
      </div>
    </div>
  );
};

const Header = ({ onClose }) => (
  <div className={sharedClasses.header}>
    <h2 className="text-lg font-semibold">Error Detected</h2>
    <button onClick={onClose} className={sharedClasses.button}>
      <img aria-hidden="true" alt="close-icon" src="https://openui.fly.dev/openui/24x24.svg?text=✖️" />
    </button>
  </div>
);

const Message = () => (
  <p className={sharedClasses.textMuted}>An error has been detected. Please retry again.</p>
);

const RetryButton = ({ onRetry }) => (
  <button onClick={onRetry} className={sharedClasses.primaryButton}>
    Retry
  </button>
);
