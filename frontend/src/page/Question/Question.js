import React, { useState, useEffect } from 'react';
import './question.css';
import './notification.css'
import {useNavigate} from "react-router-dom";
import useStore from '../../store';

const Question = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const {
        questions,
        results,
        addResult,
        getQuestionCount,
    } = useStore();

    useEffect(() => {
        if (getQuestionCount() === 0) {
            console.log('No valid questions found. Redirecting to home page.');
            navigate('/');
        }

        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification, getQuestionCount]);

    const handleCheckboxChange = (choice) => {
        setSelectedAnswer(prevAnswer => prevAnswer === choice ? null : choice);
    };

    const handleSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.answer;
        const newResult = {
            question: currentQuestion.question,
            answer: currentQuestion.answer,
            choices: currentQuestion.choices,
            selected: selectedAnswer,
            correct: isCorrect
        };

        if (isCorrect) {
            setNotification({ message: "Correct!", type: "success" });
        } else {
            setNotification({ message: `Incorrect! The answer is '${currentQuestion.answer}'`, type: "error" });
        }

        // Save the result
        addResult(newResult);

        if (currentQuestionIndex < questions.length - 1) {
            // Move to the next question
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
        } else {
            // Quiz completed, navigate to feedback page
            navigate('/feedback');
        }
    }

    if (questions.length === 0) {
        return <div>no questions available...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

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