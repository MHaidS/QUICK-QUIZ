// <!-- IN PROGRESS -->

// In basic terms, local storage enables developers to store and retrieve data in the browser.

// By giving values to a key, this technique is used to store objects in localStorage. This value can be of any datatype, including text, integer, object, array, and so on. It is vital to remember that in order to store data in localStorage, you must first stringify it with the JSON.stringify() function.

// JSON. parse() is used for parsing data that was received as JSON; it deserializes a JSON string into a JavaScript object. JSON. stringify() on the other hand is used to create a JSON string out of an object or array; it serializes a JavaScript object into a JSON string.

// The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.

// 10. Load & Display High Scores fr Local Storage
// 10.1. get a reference to 'highScoresList'
const highScoresList = document.getElementById("highScoresList");
// 10.2. get the high scores out of local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// console.log(highScores);
// (5) [{…}, {…}, {…}, {…}, {…}]
// 0: {score: '30', name: 'bree'}
// 1: {score: '30', name: 'claire'}
// 2: {score: '20', name: 'david'}
// 3: {score: '20', name: 'elise'}
// 4: {score: '20', name: 'fiona'}
// length: 5

// 10.3. iterate through each score in highScores[] array
// highScores.map((score) => {
// console.log(score);
// {score: '30', name: 'bree'}
// {score: '30', name: 'claire'}
// {score: '20', name: 'david'}
// {score: '20', name: 'elise'}
// {score: '20', name: 'fiona'}
// console.log(`${score.name}-${score.score}`);
// bree-30
// claire-30
// david-20
// elise-20
// fiona-20

// console.log(`<li class="high-score">${score.name}-${score.score}</li>`);
// <li class="high-score">bree-30</li>
// <li class="high-score">claire-30</li>
// <li class="high-score">david-20</li>
// <li class="high-score">elise-20</li>
// <li class="high-score">fiona-20</li>
// });

// 10.4. return the string for each one of the objects,then console.log the actual output
// ************
// console.log(
//   highScores
//     .map((score) => {
//       return `<li class="high-score">${score.name}-${score.score}</li>`;
//     })
//     .join("")
// );
// ************
// the output is an array of strings & what map does is it takes an incoming array (highScores[]) & allows you to convert each of those items to something new in a new array; so we're taking in a score obj & we're returning a string version of an li w/ all the details we need; .......
// (5) ['<li class="high-score">bree-30</li>',
// '<li class="high-score">claire-30</li>',
// '<li class="high-score">david-20</li>',
// '<li class="high-score">elise-20</li>',
// '<li class="high-score">fiona-20</li>']

// .....you can also take a .join & join all the elements in the array to an empty string ("") & now we are getting a string w/ all of the 'li' content

// <li class="high-score">bree-30</li><li class="high-score">claire-30</li><li class="high-score">david-20</li><li class="high-score">elise-20</li><li class="high-score">fiona-20</li>

// 10.5. reflects the content inside the 'ul' on the browser
highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
