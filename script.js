const board = document.getElementById("board");

// Função para criar o tabuleiro de xadrez
function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.row = row;
            square.dataset.col = col;

            // Adicionar peças iniciais
            if (row === 1) square.textContent = "♙"; // Peões brancos
            if (row === 6) square.textContent = "♟"; // Peões pretos
            if (row === 0) {
                if (col === 0 || col === 7) square.textContent = "♖"; // Torres brancas
                if (col === 1 || col === 6) square.textContent = "♘"; // Cavalos brancos
                if (col === 2 || col === 5) square.textContent = "♗"; // Bispos brancos
                if (col === 3) square.textContent = "♕"; // Rainha branca
                if (col === 4) square.textContent = "♔"; // Rei branco
            }
            if (row === 7) {
                if (col === 0 || col === 7) square.textContent = "♖"; // Torres pretas
                if (col === 1 || col === 6) square.textContent = "♘"; // Cavalos pretos
                if (col === 2 || col === 5) square.textContent = "♗"; // Bispos pretos
                if (col === 3) square.textContent = "♕"; // Rainha preta
                if (col === 4) square.textContent = "♔"; // Rei preto
            }

            square.addEventListener("click", () => handleSquareClick(square));
            board.appendChild(square);
        }
    }
}

// Função que lida com a seleção de quadrados
let selectedSquare = null;

function handleSquareClick(square) {
    if (selectedSquare) {
        selectedSquare.classList.remove("selected");
    }

    if (selectedSquare !== square) {
        square.classList.add("selected");
        selectedSquare = square;
    } else {
        selectedSquare = null;
    }
}

createBoard();




