// References to input fields and scores div
const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const scores = document.getElementById("scores");

// Function to save score to Local Storage
function saveScore() {
  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value.trim());

  if (name === "" || isNaN(score)) {
    alert("Please enter both a valid name and score.");
    return;
  }

  // Check if Local Storage already has scores
  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  // Add new score to the array
  highScores.push({ name, score });

  // Sort scores in descending order
  highScores.sort((a, b) => b.score - a.score);

  // Save the updated high scores to Local Storage
  localStorage.setItem('highScores', JSON.stringify(highScores));

  // Clear the input fields
  nameInput.value = "";
  scoreInput.value = "";

  showScores();
}

// Function to show scores in div
function showScores() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  if (highScores.length === 0) {
    scores.innerHTML = "No scores yet";
    return;
  }

  let tableHTML = `<table id="scoresTable"><tr><th>Name</th><th>Score</th></tr>`;
  highScores.forEach(score => {
    tableHTML += `<tr><td>${score.name}</td><td>${score.score}</td></tr>`;
  });
  tableHTML += "</table>";
  scores.innerHTML = tableHTML;
}

// Load scores when the page loads
window.onload = showScores;
