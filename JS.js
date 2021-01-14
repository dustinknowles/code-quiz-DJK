var questions = [
    {
        title: "What do you need to write to change font style in CSS?",
        choices: ["All the below", "font-family", "font-weight", "font color"],
        answer: "font-family"
    },
    {
        title: "Where in an HTML document is the correct place to refer to an internal style sheet?",
        choices: [
            "in the <body> section",
            "in the <head> section",
            "at the end of the document",
            "None of the above"
        ],
        answer: "in the <head> section"
    },
    {
        title: "What is the correct HTML for referring to an external CSS stylesheet? ",
        choices: ["<link rel='stylesheet' type='text/css' href='mystyle.css'>", "<stylesheet>mystyle.css</stylesheet>", "<stylesheet>mystyle</stylesheet>"],
        answer: "<link rel='stylesheet' type='text/css' href='mystyle.css'>"
    },
    {
        title: "What does a <div> tag do?",
        choices: [
            "The <div> tag defines a division or a section in an HTML document.",
            "The <div> tag is used to group block-elements to format them with CSS.",
            "The <div> tag divides the nation into absolute peril.",
            "A and B"
        ],
        answer: "A and B"
    },
    {
        title:
            "What does HTML stand for?",
        choices: [
            "Hot Tamales Make Love",
            "Hypertext Markup Language",
            "Hyper Tense Marker Literals",
            "Hypertext Mobile Language"
        ],
        answer: "Hypertext Markup Language"
    },
    {
        title: "What is the correct format for a 'comment' in HTML?",
        choices: [
            "/*  comment  */",
            "<$-- comment -->",
            "<!-- comment -->",
            " #comment"
        ],
        answer: "<!-- comment -->"
    },
    {
        title: "What index number is Kansas City Chiefs? var nflTeams = ['Los Angeles Rams', 'Chicago Bears', 'Philadelphia Eagles', 'Kansas City Chiefs']",
        choices: ["0", "1", "2", "3"],
        answer: "3"
    },
    {
        title: "What function gets you a random math number?",
        choices: [
            "Math.floor();",
            " Math.round();",
            "Math.split();",
            "Math.random();"
        ],
        answer: "Math.random();"
    },
    {
        title:
            "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title:
            "Which of the following are examples of JavaScript variable data types?",
        choices: ["number", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    },
];


var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
// quiz state variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
function startQuiz() {
    // hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    // un-hide questions section
    questionsEl.removeAttribute("class");
    // start timer
    timerId = setInterval(clockTick, 1000);
    // show starting time
    timerEl.textContent = time;
    getQuestion();
}
function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];
    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    // clear out any old question choices
    choicesEl.innerHTML = "";
    // loop over choices
    currentQuestion.choices.forEach(function (choice, i) {
        // create new button for each choice
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;
        // attach click event listener to each choice
        choiceNode.onclick = questionClick;
        // display on the page
        choicesEl.appendChild(choiceNode);
    });
}
function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        // penalize time
        time -= 15;
        if (time < 0) {
            time = 0;
        }
        // display new time on page
        timerEl.textContent = time;
        feedbackEl.textContent = "Wrong!";
        feedbackEl.style.color = "red";
        feedbackEl.style.fontSize = "400%";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        feedbackEl.style.fontSize = "400%";
    }
    // flash right/wrong feedback
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
    // next question
    currentQuestionIndex++;
    // time checker
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}
function quizEnd() {
    // stop timer
    clearInterval(timerId);
    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    // hide questions section
    questionsEl.setAttribute("class", "hide");
}
function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
    // check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}
function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
    if (initials !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];
        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };
        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        // redirect to next page
        window.location.href = "scores.html";
    }
}
function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
        saveHighscore();
    }
}
// submit initials
submitBtn.onclick = saveHighscore;
// start quiz
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;