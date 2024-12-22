
document.addEventListener('DOMContentLoaded', () => {
    
    const choices = document.querySelectorAll('.choice');
    const humanScoreElement = document.getElementById('human-score');
    const computerScoreElement = document.getElementById('computer-score');
    const roundResultElement = document.getElementById('round-result');
    const gameWinnerElement = document.getElementById('game-winner');
    const resetButton = document.getElementById('reset-game');

    let humanScore = 0;
    let computerScore = 0;
    let roundsPlayed = 0;

    // Random choice generator
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissor'];
        return choices[getRandomInt(3)];
    }

    // Play a single round
    function playRound(humanChoice, computerChoice) {
        // Reset round result
        roundResultElement.textContent = `You chose ${humanChoice}, computer chose ${computerChoice}`;
        gameWinnerElement.textContent = '';

        // Determine winner
        if (humanChoice === computerChoice) {
            roundResultElement.textContent += " - It's a tie!";
            return;
        }

        const winConditions = {
            'rock': 'scissor',
            'paper': 'rock',
            'scissor': 'paper'
        };

        if (winConditions[humanChoice] === computerChoice) {
            // Human wins
            humanScore++;
            humanScoreElement.textContent = humanScore;
            roundResultElement.textContent += ` - You win! ${humanChoice} beats ${computerChoice}`;
        } else {
            // Computer wins
            computerScore++;
            computerScoreElement.textContent = computerScore;
            roundResultElement.textContent += ` - Computer wins! ${computerChoice} beats ${humanChoice}`;
        }

