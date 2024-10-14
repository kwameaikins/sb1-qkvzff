import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'framer-motion';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onLogin();
    } catch (error) {
      setError('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Quiz App</h2>
      <p className="mb-4">Please sign in to start the quiz and save your scores.</p>
      <motion.button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        onClick={handleGoogleSignIn}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign in with Google
      </motion.button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Auth;