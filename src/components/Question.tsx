import React from 'react';
import { Question as QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answerIndex: number) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="w-full text-left py-2 px-4 rounded bg-gray-100 hover:bg-blue-100 transition duration-300"
            onClick={() => onAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;