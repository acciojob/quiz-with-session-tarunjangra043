// Questions data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || {};

function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = '';
  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>${question.question}</p>`;
    question.choices.forEach(choice => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[`question-${index}`] === choice) {
        choiceElement.checked = true;
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
      questionElement.appendChild(document.createElement("br"));
    });
    questionsElement.appendChild(questionElement);
  });
}

function handleSubmit() {
  let score = 0;
  questions.forEach((question, index) => {
    const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
    if (selectedOption) {
      const answer = selectedOption.value;
      userAnswers[`question-${index}`] = answer;
      if (answer === question.answer) {
        score++;
      }
    }
  });
  
  sessionStorage.setItem('progress', JSON.stringify(userAnswers));
  
  localStorage.setItem('score', score);
  
  document.getElementById("score").textContent = `Your score is ${score} out of ${questions.length}.`;
}

document.getElementById("submit").addEventListener("click", handleSubmit);

renderQuestions();
