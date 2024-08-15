function saveScore() {
    const name = document.getElementById("name").value.trim();
    const score = document.getElementById("score").value.trim();

    if (name === "" || score === "") {
        alert("Please enter both a name and a score.");
        return;
    }

    // Get existing scores from localStorage, or initialize as an empty array
    let scores = JSON.parse(localStorage.getItem("scores")) || [];

    // Add the new score
    scores.push({ name: name, score: parseInt(score) });

    // Sort the scores in descending order based on score
    scores.sort((a, b) => b.score - a.score);

    // Save the updated scores array back to localStorage
    localStorage.setItem("scores", JSON.stringify(scores));

    // Clear the input fields
    document.getElementById("name").value = "";
    document.getElementById("score").value = "";

    // Update the displayed scores
    showScores();
}
function showScores() {
    const scoresDiv = document.getElementById("scores");
    scoresDiv.innerHTML = "";

    // Get scores from localStorage
    const scores = JSON.parse(localStorage.getItem("scores")) || [];

    if (scores.length === 0) {
        scoresDiv.innerHTML = "<p>No scores yet</p>";
        return;
    }

    // Create a table element and assign it an id
    const table = document.createElement("table");
    table.id = "scoresTable"; // Set the id of the table to "scoresTable"

    // Create and append the header row
    const headerRow = document.createElement("tr");
    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    const scoreHeader = document.createElement("th");
    scoreHeader.textContent = "Score";
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(scoreHeader);
    table.appendChild(headerRow);

    // Create and append a row for each score, in the order they are stored
    scores.forEach(scoreEntry => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = scoreEntry.name;
        const scoreCell = document.createElement("td");
        scoreCell.textContent = scoreEntry.score;
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        table.appendChild(row);
    });

    // Append the table to the scoresDiv
    scoresDiv.appendChild(table);
}
