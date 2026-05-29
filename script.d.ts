interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}
declare const questions: QuizQuestion[];
declare let currentQuestionIndex: number;
declare let userAnswers: (string | null)[];
declare const questionText: HTMLHeadingElement;
declare const optionsContainer: HTMLDivElement;
declare const submitButton: HTMLButtonElement;
declare const nextButton: HTMLButtonElement;
declare const previousButton: HTMLButtonElement;
declare const questionCounter: HTMLDivElement;
declare const quizBody: HTMLElement;
declare const resultContainer: HTMLElement;
declare const scorePercentage: HTMLSpanElement;
declare const scoreMessage: HTMLHeadingElement;
declare const scoreDetails: HTMLParagraphElement;
declare const restartButton: HTMLButtonElement;
declare function loadQuestion(): void;
declare function selectOption(option: string, selectedButton: HTMLButtonElement): void;
declare function updateNavigationControls(): void;
//# sourceMappingURL=script.d.ts.map