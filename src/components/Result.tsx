import React from 'react';
import { Award } from 'lucide-react';

interface ResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="text-center">
      <Award className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-xl mb-6">
        Your score: {score} out of {totalQuestions}
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        onClick={onRestart}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Result;