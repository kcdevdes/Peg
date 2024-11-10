import { create } from 'zustand';

const questionStore = (set) => ({
    // TODO : Delete Example Data
    questions: [],
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