interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

const questions: QuizQuestion[] = [
    {
        question: "How many states are in Nigeria",
        options: ["36", '25', '30', "35"],
        correctAnswer: "36"
    },
    {
        question: "What is the name of Nigeria President as of 2026",
        options: ["Bola Mohammadu Tinuke", 'Bola Hammed Tinubu Martins', 'Bola Ige', "Asiwaju Bola Hammed Tinubu"],
        correctAnswer: "Asiwaju Bola Hammed Tinubu"
    },
    {
        question: "What is the capital of Nigeria",
        options: ["Lagos", 'Abuja', 'Port-Harcourt', "Cross-River"],
        correctAnswer: "Abuja"
    },
    {
        question: "When did Nigeria got independent from the foreign country",
        options: ["1st October, 1970", '1st October, 1960', '1st October, 1950', "1st October, 1935"],
        correctAnswer: "1st October, 1960"
    },
    {
        question: "Who is the first president of Nigeria",
        options: ["Bola Hammed Tinubu", 'Dr. Nnamdi Azikiwe', 'Dr. Aguiyi Ironzi', "Muhammadu Buhari"],
        correctAnswer: "Dr. Aguiyi Ironzi"
    },
]

let currentQuestionIndex = 0;
let userAnswers: (string | null)[] = new Array(questions.length).fill(null);

const questionText = document.getElementById("questionText") as HTMLHeadingElement
const optionsContainer = document.getElementById("optionsContainer") as HTMLDivElement
const submitButton = document.getElementById("submitButton") as HTMLButtonElement
const nextButton = document.getElementById("nextButton") as HTMLButtonElement
const previousButton = document.getElementById("previousButton") as HTMLButtonElement
const questionCounter = document.getElementById("questionCounter") as HTMLDivElement
const quizBody = document.querySelector(".quiz-body") as HTMLElement
const resultContainer = document.getElementById("resultContainer") as HTMLElement
const scorePercentage = document.getElementById("scorePercentage") as HTMLSpanElement
const scoreMessage = document.getElementById("scoreMessage") as HTMLHeadingElement
const scoreDetails = document.getElementById("scoreDetails") as HTMLParagraphElement
const restartButton = document.getElementById("restartButton") as HTMLButtonElement

function loadQuestion(): void {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;
    
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    const savedAnswer = userAnswers[currentQuestionIndex]

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button")
        button.textContent = option
        button.classList.add("option-btn")

        if (savedAnswer === option) {
            button.classList.add("selected")
        }

        button.addEventListener('click', () => selectOption(option, button))
        optionsContainer.appendChild(button);
    })
    updateNavigationControls()
}

function selectOption(option: string, selectedButton: HTMLButtonElement): void {
    userAnswers[currentQuestionIndex] = option

    // Visual updates
    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.classList.remove("selected"));
    selectedButton.classList.add("selected");

    // Re-check button states now that an answer is selected
    updateNavigationControls()
}

function updateNavigationControls(): void {
    previousButton.disabled = currentQuestionIndex === 0

    const hasAnsweredCurrent = userAnswers[currentQuestionIndex] !== null
    const isLastQuestion = currentQuestionIndex === questions.length - 1

    if (isLastQuestion) {
        nextButton.style.display = "none"
        submitButton.style.display = "inline-block"
        submitButton.disabled = !hasAnsweredCurrent
    } else {
        nextButton.style.display = "inline-block"
        submitButton.style.display = "none"
        nextButton.disabled = !hasAnsweredCurrent
    }
}

previousButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--
        loadQuestion()
    }
})

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++
        loadQuestion()
    }
})

submitButton.addEventListener('click', () => {
    let finalScore = 0

    userAnswers.forEach((answer, index) => {
        if (answer === questions[index]?.correctAnswer) {
            finalScore++
        }
    })

    const percentage = Math.round((finalScore / questions.length) * 100);

    quizBody.style.display = "none"
    resultContainer.style.display = "flex"

    previousButton.style.display = "none"
    submitButton.style.display = "none"
    restartButton.style.display = "inline-block"
    
    questionCounter.textContent = "Done"

    scorePercentage.textContent = `${percentage}%`
    scoreDetails.textContent = `You scored ${finalScore} out of ${questions.length} correct.`

    if (percentage >= 80) {
        scoreMessage.textContent = "Outstanding!"
    } else if (percentage >= 50) {
        scoreMessage.textContent = "Good Effort!"
    } else {
        scoreMessage.textContent = "Keep Practicing!"
    }
})

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0
    userAnswers.fill(null)
    
    quizBody.style.display = "block"
    resultContainer.style.display = "none"
    
    restartButton.style.display = "none"
    previousButton.style.display = "inline-block"
    
    loadQuestion()
})

loadQuestion()