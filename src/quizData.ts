export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const quizData: QuizQuestion[] = [
  {
    question: "Who developed Python Programming Language?",
    options: ["Wick van Rossum", "Rasmus Lerdorf", "Guido van Rossum", "Niene Stom","None of above"],
    correctAnswer: "Guido van Rossum"
  },
  {
    question: "Which type of Programming does Python support?",
    options: ["object-oriented programming", "structured programming", "functional programming", "all of the mentioned","None of above"],
    correctAnswer: "all of the mentioned"
  },
  {
    question: "Is Python case sensitive when dealing with identifiers?",
    options: ["no", "yes", "machine dependent", "none of the mentioned","None of above"],
    correctAnswer: "yes"
  },
  {
    question: "Which of the following is the correct extension of the Python file?",
    options: [".python", ".pl", ".py", ".p",".ph"],
    correctAnswer: ".py"
  },
  {
    question: "Is Python code compiled or interpreted?",
    options: [
      "Python code is both compiled and interpreted",
      "Python code is neither compiled nor interpreted",
      "Python code is only compiled",
      "Python code is only interpreted",
      "None of above"
    ],
    correctAnswer: "Python code is both compiled and interpreted"
  }
];