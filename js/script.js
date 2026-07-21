// =========================
// SAM ACADEMY CBT ENGINE
// =========================

// Timer
const timer = document.getElementById("timer");

if (timer) {
    let totalSeconds = 60 * 60;

    const countdown = setInterval(() => {

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        timer.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

        if (totalSeconds <= 0) {
            clearInterval(countdown);
            finishExam();
        }

        totalSeconds--;

    }, 1000);
}

// Questions
const questions = [
{
    question: "Which Article of the Indian Constitution deals with Equality before Law?",
    options: [
        "Article 14",
        "Article 19",
        "Article 21",
        "Article 32"
    ],
    answer: 0
},
{
    question: "Who wrote Thirukkural?",
    options: [
        "Kamban",
        "Avvaiyar",
        "Thiruvalluvar",
        "Bharathiyar"
    ],
    answer: 2
},
{
    question: "Capital of Tamil Nadu?",
    options: [
        "Madurai",
        "Salem",
        "Chennai",
        "Coimbatore"
    ],
    answer: 2
}
];

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);

// Elements
const questionText = document.querySelector(".question");
const optionLabels = document.querySelectorAll(".option label");
const optionInputs = document.querySelectorAll(".option input");
const paletteButtons = document.querySelectorAll(".paletteGrid button");

function loadQuestion() {

    if (!questionText) return;

    const q = questions[currentQuestion];

    questionText.textContent = q.question;

    optionLabels.forEach((label, index) => {
        label.textContent = q.options[index];
    });

    optionInputs.forEach(input => {
        input.checked = false;
    });

    if (answers[currentQuestion] !== null) {
        optionInputs[answers[currentQuestion]].checked = true;
    }

    updatePalette();
}

function saveAnswer() {

    optionInputs.forEach((input, index) => {
        if (input.checked) {
            answers[currentQuestion] = index;
        }
    });

}

function updatePalette() {

    paletteButtons.forEach((btn, index) => {

        btn.classList.remove("answered");

        if (answers[index] !== null) {
            btn.classList.add("answered");
        }

    });

}

const nextButton = document.querySelector(".primaryBtn");

if (nextButton) {

    nextButton.addEventListener("click", () => {

        saveAnswer();

        if (currentQuestion < questions.length - 1) {

            currentQuestion++;
            loadQuestion();

        } else {

            finishExam();

        }

    });

}

const buttons = document.querySelectorAll(".secondaryBtn");

if (buttons.length > 0) {

    buttons[0].addEventListener("click", () => {

        saveAnswer();

        if (currentQuestion > 0) {

            currentQuestion--;
            loadQuestion();

        }

    });

}

paletteButtons.forEach((btn, index) => {

    btn.addEventListener("click", () => {

        saveAnswer();

        currentQuestion = index;

        loadQuestion();

    });

});

function finishExam() {

    saveAnswer();

    let score = 0;

    questions.forEach((q, index) => {

        if (answers[index] === q.answer) {
            score++;
        }

    });

    const percentage = Math.round((score / questions.length) * 100);

    alert(
        "Exam Completed!\n\n" +
        "Score: " + score + " / " + questions.length +
        "\nPercentage: " + percentage + "%"
    );

}

loadQuestion();
