const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const scoreElement = document.getElementById("score");
const feedback = document.querySelector('#output')
let timerText = document.querySelector("#timer");

/*variables */
let timeLeft = 60;
let score = 0;

/* timer settings */
function tick(){
  console.log(timeLeft)
      timeLeft -= 1
      timerText.innerHTML = timeLeft
      if(timeLeft < 30){
        timerText.style.color = "orange"
        if(timeLeft < 10){
          timerText.style.color = "red"
        }
      }
      if(timeLeft === 0){
        clearInterval(timer)
        gameIsOver = true;
        alert("Game Over! Your score is " + score);
        window.location.href = "../pages/win.html";


      }
}
let timer = setInterval(tick, 1000)

/* gameIsOver code
if(timeLeft === 0){
}*/


/* generate random numbers */
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operator = getRandomOperator();
  const question = createQuestion(num1, num2, operator);
  questionElement.textContent = question;
}

/* create a question using random numbers */
function createQuestion(num1, num2, operator) {
  let question;
  switch (operator) {
    case "+":
      question = `${num1} + ${num2} = `;
      break;
    case "-":
      question = `${num1} - ${num2} = `;
      break;
    case "*":
      question = `${num1} * ${num2} = `;
      break;
  }
  return question;
}

/* create a random operator */
function getRandomOperator() {
  const operators = [
      '+', '-','*'  ];
  const randomIndex = Math.floor(Math.random() * operators.length);
  return operators[randomIndex];
}

/* code for updating score */
function updateScore() {
  scoreElement.textContent = `Score: ${ score }`;
}

/* this code checks if the answer is correct or not */
function checkAnswer(event) {
  event.preventDefault();
  const answer = parseInt(answerElement.value, 10);
  if (isNaN(answer)) {
      alert('Please enter a valid number');
      return;
  }
  const [num1, operator, num2] = questionElement.textContent.split(' ');
  const correctAnswer = calculateAnswer(parseInt(num1, 10), parseInt(num2, 10), operator);
  if (answer === correctAnswer) {
      score++;
      updateScore();
      generateQuestion();
      answerElement.value = '';
      feedback.innerHTML = 'Well done!';
  } else {
      feedback.innerHTML = 'Wrong!';
  }
}

/* this calculates the two numbers and checks if the answer is correct */
function calculateAnswer(num1, num2, operator) {
  let answer;
  switch (operator) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = num1 - num2;
      break;
    case "*":
      answer = num1 * num2;
      break;
  }
  return answer;
}


generateQuestion();
updateScore();
answerElement.focus();
document.querySelector("form").addEventListener("submit", checkAnswer);
