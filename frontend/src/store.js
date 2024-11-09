import { create } from 'zustand';

const questionStore = (set) => ({
    // TODO : Delete Example Data
    questions: [
        { question: "What is 1 + 1?", answer: "2", choices: ["1", "2", "3", "4", "5"] },
        { question: "What is 2 * 3?", answer: "6", choices: ["5", "6", "7", "8", "9"] },
        { question: "What is 10 - 4?", answer: "6", choices: ["4", "5", "6", "7", "8"] },
        { question: "What is 15 / 3?", answer: "5", choices: ["3", "4", "5", "6", "7"] },
        { question: "What is the square root of 16?", answer: "4", choices: ["2", "3", "4", "5", "6"] },
        { question: "What is 7 + 8?", answer: "15", choices: ["13", "14", "15", "16", "17"] },
        { question: "What is 9 - 3?", answer: "6", choices: ["5", "6", "7", "8", "9"] },
        { question: "What is 5 * 5?", answer: "25", choices: ["20", "21", "22", "25", "30"] },
        { question: "What is the value of π (Pi) approximately?", answer: "3.14", choices: ["3.12", "3.14", "3.16", "3.18", ".31"] },
        { question: "(10 + 2) / 2 = ?", answer: "6", choices: ["5", "6", "7", "8", "9"] }
    ],
    results: [],
    addQuestion: (question) => set((state) => ({
        questions: [...state.questions, question]
    })),
    addResult: (result) => set((state) => ({
        results: [...state.results, result]
    })),
});

const useQuestionStore = create(questionStore);
export default useQuestionStore;