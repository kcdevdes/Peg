import React, { useState, useEffect } from 'react';
import './question.css';
import './notification.css'
import {useNavigate} from "react-router-dom";

const questionsData = [
    { question: "What is 1 + 1?", answer: "2", choices: ["1", "2", "3", "4", "5"] },
    { question: "What is 2 * 3?", answer: "6", choices: ["5", "6", "7", "8", "9"] },
    // { question: "What is 10 - 4?", answer: "6", choices: ["4", "5", "6", "7", "8"] },
    // { question: "What is 15 / 3?", answer: "5", choices: ["3", "4", "5", "6", "7"] },
    // { question: "What is the square root of 16?", answer: "4", choices: ["2", "3", "4", "5", "6"] },
    // { question: "What is 7 + 8?", answer: "15", choices: ["13", "14", "15", "16", "17"] },
    // { question: "What is 9 - 3?", answer: "6", choices: ["5", "6", "7", "8", "9"] },
    // { question: "What is 5 * 5?", answer: "25", choices: ["20", "21", "22", "25", "30"] },
    // { question: "What is the value of π (Pi) approximately?", answer: "3.14", choices: ["3.12", "3.14", "3.16", "3.18", ".31"] },
    // { question: "(10 + 2) / 2 = ?", answer: "6", choices: ["5", "6", "7", "8", "9"] }
];

const Question = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [notification, setNotification] = useState(null);
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleCheckboxChange = (choice) => {
        setSelectedAnswer(prevAnswer => prevAnswer === choice ? null : choice);
    };

    const handleSubmit = () => {
        const currentQuestion = questionsData[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.answer;
        const newResult = { question: currentQuestion.question, userAnswer: selectedAnswer, correct: isCorrect };
        setResults([...results, newResult]);

        if (isCorrect) {
            setNotification({ message: "Correct!", type: "success" });
        } else {
            setNotification({ message: `Incorrect! The answer is '${currentQuestion.answer}'`, type: "error" });
        }

        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
        } else {
            // Quiz completed, navigate to feedback page
            // router.push('/feedback');
            navigate('/feedback');
        }
    };

    const currentQuestion = questionsData[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <h1 className="question-header">Question {currentQuestionIndex + 1}</h1>
            <div className="question-card">
                <h2 className="question-title">{currentQuestion.question}</h2>
                <div className="choices-container">
                    {currentQuestion.choices.map((choice, index) => (
                        <div key={index} className="choice-item">
                            <input
                                type="checkbox"
                                id={`choice-${index}`}
                                checked={selectedAnswer === choice}
                                onChange={() => handleCheckboxChange(choice)}
                            />
                            <label htmlFor={`choice-${index}`}>{choice}</label>
                        </div>
                    ))}
                </div>
                <div className="submit-container">
                    <button
                        className="submit-button"
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                    >
                        Check Answer
                    </button>
                </div>
            </div>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default Question;