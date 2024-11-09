import React, { useEffect } from 'react';
import './feedback.css';
import useQuestionStore from "../../store";

const Feedback = () => {
    const { results, addResults } = useQuestionStore();

    const correctAnswers = results.filter((result) => result.correct).length;
    const totalQuestions = results.length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    return (
        <div className="quiz-container">
            <h1 className="feedback-header">Feedback</h1>
            <div className="score-card">
                <p className="score-text">
                    Test Score: {correctAnswers} / {totalQuestions} ({percentage.toFixed(0)}%)
                </p>
            </div>
            <div className="results-container">
                {results.map((result, index) => (
                    <div key={index} className="question-card">
                        <h2 className="question-title">Question {index + 1}</h2>
                        <div className="question-text">
                            <p>{result.question}</p>
                        </div>
                        <div className="choices-container">
                            {result.choices.map((choice, choiceIndex) => (
                                <div
                                    key={choiceIndex}
                                    className={`choice-item ${
                                        choice === result.selected
                                            ? result.correct
                                                ? 'correct'
                                                : 'incorrect'
                                            : ''
                                    } ${choice === result.answer ? 'correct-answer' : ''}`}
                                >
                                    <span className="choice-text">{choice}</span>
                                    {choice === result.answer && (
                                        <span className="icon check">✓</span>
                                    )}
                                    {choice === result.selected && !result.correct && (
                                        <span className="icon cross">✗</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        {!result.correct && (
                            <div className="feedback-message incorrect">
                                Incorrect! The answer was '{result.answer}'
                            </div>
                        )}
                        {result.correct && (
                            <div className="feedback-message correct">
                                Correct!
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;