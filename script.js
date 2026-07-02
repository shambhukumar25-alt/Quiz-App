let btn = document.getElementById("btn");
let body = document.querySelector("body")

let quizcontainer = document.querySelector(".quiz-container")

btn.addEventListener("mouseover", function () {
    body.classList.toggle("dark");
    btn.classList.toggle("tn")
    quizcontainer.classList.toggle("quizcontainer")
});


const quiz = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        answer: "Delhi"
    },
    {
        question: "Which language is used for web page structure?",
        options: ["CSS", "JavaScript", "HTML", "Python"],
        answer: "HTML"
    },
    {
        question: "Which property changes text color in CSS?",
        options: ["font-color", "text-color", "color", "background"],
        answer: "color"
    },
    {
        question: "2 + 8 = ?",
        options: ["9", "10", "11", "12"],
        answer: "10"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Apple"],
        answer: "Netscape"
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        options: ["h6", "head", "h1", "heading"],
        answer: "h1"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "##", "!-- --", "**"],
        answer: "//"
    },
    {
        question: "Which method displays a message in the browser console?",
        options: ["print()", "console.log()", "alert()", "document.write()"],
        answer: "console.log()"
    },
    {
        question: "CSS stands for?",
        options: [
            "Creative Style Sheets",
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    }
];

let current = 0;
let score = 0;
let answeredCurrentQuestion = false;

function updateScoreBoard() {
    document.getElementById("scoreBoard").innerHTML = "Score: " + score + " / " + quiz.length;
}

function loadQuestion() {

    document.getElementById("result").innerHTML = "";
    answeredCurrentQuestion = false;

    document.getElementById("question").innerHTML = quiz[current].question;
    updateScoreBoard();

    const nextBtn = document.getElementById("nextBtn");
    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.6";
    nextBtn.style.cursor = "not-allowed";

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    quiz[current].options.forEach(option => {

        let btn = document.createElement("button");

        btn.innerHTML = option;
        btn.className = "option";

        btn.onclick = function () {
            if (answeredCurrentQuestion) {
                return;
            }

            answeredCurrentQuestion = true;

            // Unlock next only after user selects an answer.
            nextBtn.disabled = false;
            nextBtn.style.opacity = "1";
            nextBtn.style.cursor = "pointer";

            if (option === quiz[current].answer) {
                document.getElementById("result").innerHTML = "✅ Correct!";
                document.getElementById("result").style.color = "green";
                score++;
                updateScoreBoard();
            } else {
                document.getElementById("result").innerHTML =
                    "❌ Wrong! Correct Answer: " + quiz[current].answer;
                document.getElementById("result").style.color = "red";
            }

            // Disable all options after first answer.
            document.querySelectorAll(".option").forEach(optionBtn => {
                optionBtn.disabled = true;
                optionBtn.style.opacity = "0.7";
                optionBtn.style.cursor = "not-allowed";
            });
        };

        optionsDiv.appendChild(btn);

    });
}

function nextQuestion() {
    if (!answeredCurrentQuestion) {
        document.getElementById("result").innerHTML = "Please select an answer first.";
        document.getElementById("result").style.color = "#d35400";
        return;
    }

    current++;

    if (current >= quiz.length) {
        alert("🎉 Quiz Completed!\nYour Score: " + score + " / " + quiz.length);
        current = 0;
        score = 0;
        updateScoreBoard();
    }

    loadQuestion();
}

loadQuestion();