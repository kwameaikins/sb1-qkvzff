import React, { useState, useEffect } from 'react';
import { questions, categories } from './data/questions';
import Question from './components/Question';
import Result from './components/Result';
import CategorySelector from './components/CategorySelector';
import Leaderboard from './components/Leaderboard';
import Auth from './components/Auth';
import { QuizState, AppState } from './types';
import { Brain } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    showResult: false,
    category: '',
  });

  const [appState, setAppState] = useState<AppState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAppState({ user, isLoading: false });
    });

    return () => unsubscribe();
  }, []);

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = questions.filter(q => q.category === quizState.category)[quizState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    setQuizState((prevState) => ({
      ...prevState,
      score: isCorrect ? prevState.score + 1 : prevState.score,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      showResult: prevState.currentQuestionIndex === questions.filter(q => q.category === quizState.category).length - 1,
    }));
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      showResult: false,
      category: '',
    });
  };

  const handleCategorySelect = (category: string) => {
    setQuizState({
      ...quizState,
      category,
      currentQuestionIndex: 0,
      score: 0,
      showResult: false,
    });
  };

  const saveScore = async () => {
    if (appState.user) {
      const leaderboardEntry = {
        userId: appState.user.uid,
        username: appState.user.displayName || 'Anonymous',
        score: quizState.score,
        category: quizState.category,
      };

      await setDoc(doc(db, 'leaderboard', appState.user.uid), leaderboardEntry);
    }
  };

  if (appState.isLoading) {
    return <div>Loading...</div>;
  }

  if (!appState.user) {
    return <Auth onLogin={() => setAppState({ ...appState, user: auth.currentUser })} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Brain className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Quiz App</h1>
        </div>
        <AnimatePresence mode="wait">
          {quizState.category === '' ? (
            <motion.div
              key="category-selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CategorySelector categories={categories} onSelectCategory={handleCategorySelect} />
            </motion.div>
          ) : quizState.showResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Result
                score={quizState.score}
                totalQuestions={questions.filter(q => q.category === quizState.category).length}
                onRestart={restartQuiz}
                onSaveScore={saveScore}
              />
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <div className="mb-4 text-sm text-gray-600">
                Question {quizState.currentQuestionIndex + 1} of {questions.filter(q => q.category === quizState.category).length}
              </div>
              <Question
                question={questions.filter(q => q.category === quizState.category)[quizState.currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Leaderboard />
      </div>
    </div>
  );
};

export default App;