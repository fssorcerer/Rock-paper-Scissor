
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

        // Increment rounds
        roundsPlayed++;

        // Check for game end
        if (roundsPlayed === 5) {
            endGame();
        }
    }

    // End game logic
    function endGame() {
        if (humanScore > computerScore) {
            gameWinnerElement.textContent = 'Congratulations! You won the game!';
            gameWinnerElement.style.color = 'green';
        } else if (computerScore > humanScore) {
            gameWinnerElement.textContent = 'Computer won the game. Better luck next time!';
            gameWinnerElement.style.color = 'red';
        } else {
            gameWinnerElement.textContent = "It's a draw!";
            gameWinnerElement.style.color = 'blue';
        }

        // Disable choices after game ends
        choices.forEach(choice => choice.style.pointerEvents = 'none');
    }

    // Reset game
    function resetGame() {
        humanScore = 0;
        computerScore = 0;
        roundsPlayed = 0;
        
        humanScoreElement.textContent = '0';
        computerScoreElement.textContent = '0';
        roundResultElement.textContent = 'Make your choice!';
        gameWinnerElement.textContent = '';
        gameWinnerElement.style.color = 'black';

        // Re-enable choices
        choices.forEach(choice => choice.style.pointerEvents = 'auto');
    }

    // Event listeners for player choices
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const humanChoice = choice.dataset.choice;
            const computerChoice = getComputerChoice();
            playRound(humanChoice, computerChoice);
        });
    });

    // Reset button event listener
    if (resetButton) {
        resetButton.addEventListener('click', resetGame);
    } else {
        console.error('Reset button not found');
    }
});