// chess.js

// Representação do Tabuleiro
const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

// Inicializando o Tabuleiro Visual
function initBoard() {
    const boardElement = document.getElementById('chess-board');
    boardElement.innerHTML = '';  // Limpa o tabuleiro antes de desenhar novamente

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            const isBlack = (row + col) % 2 !== 0;
            square.classList.add('square');
            square.classList.add(isBlack ? 'black' : 'white');

            // Coloca a peça se houver
            const piece = initialBoard[row][col];
            if (piece !== '.') {
                const pieceElement = document.createElement('span');
                pieceElement.classList.add('piece');
                pieceElement.textContent = piece;
                square.appendChild(pieceElement);
            }

            boardElement.appendChild(square);
        }
    }
}

// Chama a função para desenhar o tabuleiro
initBoard();




