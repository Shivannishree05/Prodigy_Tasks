// script.js
const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let gameState = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Initialize the board
function createBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.dataset.index = index;
        cellDiv.addEventListener('click', handleCellClick);
        board.appendChild(cellDiv);
    });
    updateStatus();
}

// Handle cell clicks
function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (!gameActive || gameState[index]) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell)) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

// Check for a winner
function checkWinner() {
    return winningCombos.some(combo => {
        return combo.every(index => gameState[index] === currentPlayer);
    });
}

// Update status text
function updateStatus() {
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Restart the game
restartBtn.addEventListener('click', () => {
    gameState = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    createBoard();
});

// Start the game
createBoard();
