// <!-- IN PROGRESS -->

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

// 9. Save High Scores in Local Storage
// things are stored in the localStorage as a 'string', we can still work w/ arrays but they need to be converted to JSON string first
// localStorage.setItem("highScores", JSON.stringify([]));
// [] ===> we get an empty array in the console w/c is a string, to convert this to an actual array, use JSON.parse

// 9.1) let's get a reference to highScores
// we're going to get what's in localStorage or if that returns null, we're going to get an empty array 'cause we're doing this for the 1st time & we're going to initialize our empty highScores[] array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// 9.4. create a variable & set it equal to 5
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  // console.log(username.value);
  // disabled if no username is entered
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();

  // 9.2. Create a 'score' object that has a score referencing 'mostRecentScore' & it will have a 'name' property w/c we will get fr the username.value
  const score = {
    score: mostRecentScore,
    name: username.value,
  };
  // console.log(score);
  // {score: '30', yourName: 'colt '} ===> this is what we want to add to the array

  // by default, we're going to push on the new score
  highScores.push(score);

  // 9.3. call highScores.sort function; to sort this fr highest to lowest, subtract a.score fr b.score; basically, if b.score is higher than a.score, then put b before a; this will give us a sorted array w/c might have more than 5 scores
  highScores.sort((a, b) => b.score - a.score);

  // 9.5. let's take on our highScores[] array & splice off at index 5; so at index 5, start cutting off everything after that
  highScores.splice(5);

  // update "highScores" in localStorage but we have to stringify them into JSON
  localStorage.setItem("highScores", JSON.stringify(highScores));
  // go back home
  // window.location.assign("/");
  window.location.assign("index.html");
};
