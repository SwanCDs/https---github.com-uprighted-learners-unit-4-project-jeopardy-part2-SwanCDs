// Initialize player scores
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1; // Player 1 starts the game

// Store the questions for categories
const questions = [
  {
    category: 'Gaming',
    questions: [
      { points: 100, question: 'What is the most popular game in the world?', answer: 'Fortnite' },
      { points: 200, question: 'What year was Minecraft released?', answer: '2011' },
      { points: 300, question: 'Which game is known for the term "Battle Royale"?', answer: 'Fortnite' },
      { points: 400, question: 'What is the developer of Valorant?', answer: 'Riot Games' },
      { points: 500, question: 'In Fortnite, what is the name of the battle bus?', answer: 'Battle Bus' }
    ]
  },
  {
    category: 'Valorant',
    questions: [
      { points: 100, question: 'What is the green agent name who has a wall ability?', answer: 'Viper' ,  },
      { points: 200, question: 'In Valorant, what is the main goal of the attackers?', answer: 'Plant the Spike', },
      { points: 300, question: 'What is the map with teleport?', answer: 'Bind' },
      { points: 400, question: 'Which agent has a teleportation ability?', answer: 'Omen' },
      { points: 500, question: 'Who is the most picked agent in Valorant? (Hint: White hair)', answer: 'Jett' }
    ]
  },
];

// DOM Elements
const gameBoard = document.getElementById('game-board');
const questionDisplay = document.getElementById('question-display');
const answerInput = document.getElementById('answer-input');
const guessButton = document.getElementById('guess-button');
const passButton = document.getElementById('pass-button');
const nextRoundButton = document.getElementById('next-round-button');
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');

// Function to update the scoreboard
function updateScores() {
  player1ScoreElement.textContent = `Player 1 Score: ${player1Score}`;
  player2ScoreElement.textContent = `Player 2 Score: ${player2Score}`;
}

// Function to generate the game board
function generateBoard() {
  const boardHtml = questions.map(category => {
    return `
      <div class="category">
        <div class="category-title">${category.category}</div>
        ${category.questions.map(q => `
          <div class="question" data-points="${q.points}" data-category="${category.category}">
            $${q.points}
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
  gameBoard.innerHTML = boardHtml;
}

// Function to handle question selection
gameBoard.addEventListener('click', function(e) {
  if (e.target.classList.contains('question')) {
    const points = e.target.getAttribute('data-points');
    const category = e.target.getAttribute('data-category');
    
    const question = questions.find(c => c.category === category)
      .questions.find(q => q.points === parseInt(points));
    
    questionDisplay.textContent = question.question;
    guessButton.disabled = false;
    passButton.disabled = false;
    e.target.textContent = 'Question Selected';
    e.target.style.backgroundColor = '#ccc';
    
    // Store the correct answer for validation
    answerInput.setAttribute('data-correct-answer', question.answer);
    answerInput.setAttribute('data-points', points);
  }
});

// Function to handle guessing an answer
guessButton.addEventListener('click', function() {
  const userAnswer = answerInput.value;
  const correctAnswer = answerInput.getAttribute('data-correct-answer');
  const points = parseInt(answerInput.getAttribute('data-points'));

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    // Correct answer, update score
    if (currentPlayer === 1) {
      player1Score += points;
    } else {
      player2Score += points;
    }
  } else {
    // Incorrect answer, subtract points
    if (currentPlayer === 1) {
      player1Score -= points;
    } else {
      player2Score -= points;
    }
  }

  updateScores();
  guessButton.disabled = true;
  passButton.disabled = true;

  // Switch player turn
  currentPlayer = currentPlayer === 1 ? 2 : 1;

  // Check if round is over and move to next
  if (player1Score >= 1000 || player2Score >= 1000) {
    nextRoundButton.disabled = false;
  }
});

// Function to pass the question
passButton.addEventListener('click', function() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  guessButton.disabled = true;
  passButton.disabled = true;
  updateScores();
});

// Function to move to Round 2
nextRoundButton.addEventListener('click', function() {
  if (player1Score >= 1000 || player2Score >= 1000) {
    window.location.href = 'finalround.html'; // Move to Final Round page
  }
});


// Initial game setup
generateBoard();
updateScores();
