// Final Round Game Logic
let playerScore = parseInt(localStorage.getItem("playerScore")) || 0; 

// Display the current score on the page
document.getElementById("player-score").innerText = playerScore;

// Function to handle the final round logic
document.getElementById("submit-answer").addEventListener("click", function() {
    let playerAnswer = document.getElementById("final-answer").value;
    let resultMessage = document.getElementById("result-message");

    // Check if the answer is correct
    if (playerAnswer == "27") {
        playerScore += 1000; // Add 1000 points for the correct answer
        resultMessage.innerText = "Correct! You've earned 1000 points!";
    } else {
        resultMessage.innerText = "Incorrect. The correct answer was 27.";
    }

    // Update the player's score on the page
    document.getElementById("player-score").innerText = playerScore;

    // Save the updated score to localStorage
    localStorage.setItem("playerScore", playerScore);
});
