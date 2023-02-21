// IN PROGRESS

// console.log("hello world");
const question = document.getElementById("question");
// const choices = document.getElementsByClassName("choice-text");
// convert to an array
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  // take 'questions' array, spread out each of the items, put them into a new array & that's the available qs are going to be; 'availableQuestions' is the available copy of the 'questions[]'
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
  // if there's no question left in the array or we used all the allowed number of questions (ex: 10 out of 100 only)
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("/end.html");
  }

  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  // grab 'choices' & use forEach to iterate through each of those choices, it's going to be a reference for each 'choice'
  choices.forEach((choice) => {
    // get the number fr the dataset property fr 'data-number'
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  // this is going to take the availableQuestions[] array & we need to splice out the question that has just been used; the 'questionIndex' is going to tell us where to splice out 1; this is going to take the availableQuestions[] array & get rid of the question that has just been used, so we get a new question the nxt time around
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

// do another forEach outside the getNewQuestion() function
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // console.log(e.target);
    // <p class="choice-text" data-number='1'>msgBox('Hello World'</p>
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // after answering a question, this is going to load a new one
    getNewQuestion();
  });
});

// will give a decimal bet. 0 & 1
// Math.random()
// 0.33063791789711683

// to output an integer bet. 0 & 3
// Math.floor(Math.random() * 3)
// 0

// call startGame() function
startGame();
