import { create } from 'zustand';

const questionStore = (set, get) => ({
    questions: [],
    results: [],
    addQuestion: (question) => set((state) => {
        if (isValidQuestion(question)) {
            return { questions: [...state.questions, question] };
        }
        return state;
    }),
    addResult: (result) => set((state) => ({
        results: [...state.results, result]
    })),
    clearQuestions: () => set({ questions: [] }),
    getQuestionCount: () => get().questions.length,
})

function isValidQuestion(question) {
    return (
        question.hasOwnProperty('question') &&
        question.hasOwnProperty('answer') &&
        question.hasOwnProperty('choices') &&
        Array.isArray(question.choices) &&
        question.choices.length >= 3 &&
        question.choices.includes(question.answer)
    );
}

const useQuestionStore = create(questionStore);
export default useQuestionStore;