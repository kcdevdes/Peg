import React from 'react';
import './question.css';
import useQuestionStore from '../../store'; // Import the Zustand store

const TempQuestionResult = () => {
    const { results } = useQuestionStore();

    return (
        <div className="quiz-container">
            <div>
                {
                    console.log(results)
                }
            </div>
        </div>
    );
};

export default TempQuestionResult;