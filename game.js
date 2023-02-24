// IN PROGRESS

// Using e. target, you can get currently clicked HTML elements when an event that has attached to it is triggered for further manipulation such as getting or setting one of the attributes of an HTML element.

// fetch() The global fetch() method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available. The promise resolves to the Response object representing the response to your request.

// The Array.from() static method creates a new, shallow-copied Array instance from an iterable or array-like object.

const question = document.getElementById("question");
// const choices = document.getElementsByClassName("choice-text");
// convert to an array
const choices = Array.from(document.getElementsByClassName("choice-text"));
// const questionCounterText = document.getElementById("questionCounter");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
// 13.8 get references to DOM objects
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// 11. Fetch API to Load Questions fr Local JSON File
// 11.2. start w/ an empty array of questions
let questions = [];

//  11.3. use the fetch functions to get the questions fr a local file; this returns a promise, call a .then & we're going to get a response; inside of a promise, you can return a promise

// fetch("questions.json")
//   .then((res) => {
//     // console.log(res);
//     // res.json is going to get the body of the HTTP response & convert it to JSON; we can return this inside of this promise & bec of that, we can do a .then
//     return res.json();
//   })
//   .then((loadedQuestions) => {
//     // console.log(loadedQuestions);
//     questions = loadedQuestions;
//     startGame();
//   })
//   //11.4. handle a catch for error scenarios whenever you are handling a promise; if the wrong path has been typed in, this is going to be triggered
//   .catch((err) => {
//     console.error(err);
//   });

// 12. Fetch API to Load Questions fr Open Trivia DB API
// 12.1. use api url generated fr https://opentdb.com/; query of fetch the qs
fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    // console.log(loadedQuestions);
    // CONSOLE ==> {response_code: 0, results: Array(10)}
    // console.log(loadedQuestions.results);
    // CONSOLE ==> (10)  [
    // {
    // category: "General Knowledge"
    // correct_answer: "Richard Branson"
    // difficulty: "easy"
    // incorrect_answers: (3) ['Alan Sugar', 'Donald Trump', 'Bill Gates']
    // question: "Virgin Trains, Virgin Atlantic and Virgin Racing, are all companies owned by which famous entrepreneur?   "
    // type: "multiple"},
    // {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // questions = loadedQuestions;
    // startGame();

    // 12.2. we want to convert the questions that we get into a new form; we can use a map -- we iterate through the array & then transforming each item in the array into something else
    questions = loadedQuestions.results.map((loadedQuestion) => {
      // 12.3. obj 'formattedQuestion' w/ a 'question' property; this is what we are going to return out of this map; everytime we map through, we're going to get the orig. question, then format that question to what we need, then we get the array of questions in the rt format that we need
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      // *  We basically iterate through the 'answerChoices' that we have here, put them as answer 1 through answer 4, on a 'formattedQuestion';
      // *  To do that, we're going to dynamically get the 'choice' property & whatever the related index is + 1 & then assign it to 'choice', then return 'formattedQuestion' & run startGame() function

      // 12.4. this is going to give us an array of the incorrect answers for a question & what we eventually need are 4 answer choices & then the correct answer in the random position;
      const answerChoices = [...loadedQuestion.incorrect_answers];
      // 12.5. this is going to give a random index bet. 0 & 3 & then decide w/c choice is my answer...
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      // 12.6. ... then put that answer in my 'answerChoices' array in the rt. spot; -1 bec. our 'answerChoices' are not '0'-based indexes; '0' bec. we are not going to remove any element, then put in 'loadedQuestion.correct_answer' ....
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );
      // 12.7. ... at this pt., 'answerChoices' shd have all of the answer choices w/ the correct answer in the random position then we are going to iterate through the 'answerChoices' ...
      // ... then do a 'forEach' & get a reference to each 'choice' & the index that it's at
      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      return formattedQuestion;
    });
    // 13.7 when the questions are loaded w/c happens at 'return formattedQuestion;',rt. before the startGame(), we are ready to show the game & hide the loader...
    // 13.9 this will load the game & hide the loader but the optimal way to do this is to put these inside the startGame() function
    // game.classList.remove("hidden");
    // loader.classList.add("hidden");
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });
// 11.1.  transfer hard-coded questions & choices to questions.json

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
  // 13.10 place rt. at the very end of startGame() function so that we don't show our game until we absolutely know that we've got our 1st question & it's been added & displayed on the screen
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`;
  // Update the progress bar

  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  // grab 'choices' & use forEach to iterate through each of those choices, it's going to be a reference for each 'choice'
  choices.forEach((choice) => {
    // get the number fr the dataset property fr 'data-number'
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  // this is going to take the availableQuestions[] array & splice out the question that has just been used;
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// do another forEach outside the getNewQuestion() function for the selected answers
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // console.log(e.target);
    // <p class="choice-text" data-number='1'>msgBox('Hello World'</p>
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
