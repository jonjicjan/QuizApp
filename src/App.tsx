import React, { useState, useEffect } from 'react';
import { Timer, CheckCircle, XCircle } from 'lucide-react';
import { QuizQuestion, quizData } from './quizData';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(quizData.length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (timeLeft > 0 && isTimerActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerActive) {
      handleSubmit();
    }
  }, [timeLeft, isTimerActive]);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeLeft(30);
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        newScore++;
      }
    });
    return newScore;
  };

  const handleSubmit = () => {
    setIsTimerActive(false);
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
  };

  const currentQuestion = quizData[currentQuestionIndex];

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-center mb-8">Quiz Results</h2>
          <div className="text-center mb-6">
            <p className="text-2xl mb-4">
              You scored <span className="font-bold text-green-600">{score}</span> out of{" "}
              {quizData.length}
            </p>
            <p className="text-lg text-gray-600">
              {(score / quizData.length) * 100}% Correct
            </p>
          </div>
          
          <div className="space-y-6">
            {quizData.map((question, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-semibold mb-2">{question.question}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm">
                    Your answer: 
                    <span className={selectedAnswers[index] === question.correctAnswer ? 
                      "text-green-600 ml-2" : "text-red-600 ml-2"}>
                      {selectedAnswers[index]}
                    </span>
                  </p>
                  {selectedAnswers[index] === question.correctAnswer ? 
                    <CheckCircle className="w-5 h-5 text-green-600" /> : 
                    <XCircle className="w-5 h-5 text-red-600" />}
                </div>
                {selectedAnswers[index] !== question.correctAnswer && (
                  <p className="text-sm text-green-600 mt-1">
                    Correct answer: {question.correctAnswer}
                  </p>
                )}
              </div>
            ))}
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Knowledge Quiz</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Timer className="w-5 h-5" />
            <span className={`font-mono ${timeLeft <= 10 ? 'text-red-600' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentQuestionIndex + 1} of {quizData.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / quizData.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border rounded-lg cursor-pointer transition-all
                  ${selectedAnswers[currentQuestionIndex] === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswers[currentQuestionIndex] === option}
                    onChange={() => handleAnswerSelect(option)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>{option}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-lg transition-colors
              ${currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Previous
          </button>
          
          {currentQuestionIndex === quizData.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswers[currentQuestionIndex]}
              className={`px-6 py-2 rounded-lg transition-colors
                ${!selectedAnswers[currentQuestionIndex]
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswers[currentQuestionIndex]}
              className={`px-6 py-2 rounded-lg transition-colors
                ${!selectedAnswers[currentQuestionIndex]
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;