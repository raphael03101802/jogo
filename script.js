const boardElement = document.getElementById("chess-board");
const infoElement = document.getElementById("info");

const board = [];
let selectedSquare = null;
let turn = "white"; // Controle de turno

// Define as peças e seus emojis
const pieces = {
    white: {
        king: "♔", queen: "♕", rook: "♖", bishop: "♗", knight: "♘", pawn: "♙"
    },
    black: {
        king: "♚", queen: "♛", rook: "♜", bishop: "♝", knight: "♞", pawn: "♟"
    }
};

// Cria o tabuleiro e coloca as peças
function createBoard() {
    for (let row = 0; row < 8; row++) {
        board[row] = [];
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.row = row;
            square.dataset.col = col;

            // Adicionando as peças iniciais
            if (row === 1) {
                square.textContent = pieces.white.pawn;
            } else if (row === 6) {
                square.textContent = pieces.black.pawn;
            } else if (row === 0) {
                square.textContent = getInitialPiece(col, "white");
            } else if (row === 7) {
                square.textContent = getInitialPiece(col, "black");
            }

            square.addEventListener("click", () => handleSquareClick(square));
            board[row].push(square);
            boardElement.appendChild(square);
        }
    }
}

// Retorna a peça inicial para a linha 0 ou 7
function getInitialPiece(col, color) {
    if (col === 0 || col === 7) return color === "white" ? pieces.white.rook : pieces.black.rook;
    if (col === 1 || col === 6) return color === "white" ? pieces.white.knight : pieces.black.knight;
    if (col === 2 || col === 5) return color === "white" ? pieces.white.bishop : pieces.black.bishop;
    if (col === 3) return color === "white" ? pieces.white.queen : pieces.black.queen;
    if (col === 4) return color === "white" ? pieces.white.king : pieces.black.king;
}

// Função chamada quando um quadrado é clicado
function handleSquareClick(square) {
    const { row, col } = square.dataset;
    const piece = square.textContent.trim();

    // Se o quadrado selecionado é o mesmo que o anterior, desmarque a seleção
    if (selectedSquare === square) {
        clearHighlights();
        selectedSquare = null;
        return;
    }

    // Se não há peça, ou se for a vez do outro jogador, não faça nada
    if (!piece || (turn === "white" && piece.startsWith("♟")) || (turn === "black" && piece.startsWith("♙"))) {
        infoElement.textContent = `É a vez do jogador ${turn === "white" ? "branco" : "preto"}.`;
        return;
    }

    // Se já houver uma peça selecionada, destaque os movimentos possíveis
    if (selectedSquare) {
        clearHighlights();
        movePiece(selectedSquare, square);
        selectedSquare = null;
        turn = turn === "white" ? "black" : "white";
        infoElement.textContent = `É a vez do jogador ${turn === "white" ? "branco" : "preto"}.`;
    } else {
        selectedSquare = square;
        square.classList.add("selected");
        highlightMoves(row, col);
    }
}

// Limpar os destaques
function clearHighlights() {
    document.querySelectorAll(".square").forEach(square => square.classList.remove("highlight"));
}

// Destacar os movimentos possíveis da peça selecionada
function highlightMoves(row, col) {
    // Aqui você pode adicionar a lógica de movimento de peças
    // Este exemplo apenas destaca quadrados ao redor
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                const square = board[r][c];
                square.classList.add("highlight");
            }
        }
    }
}

// Mover a peça
function movePiece(fromSquare, toSquare) {
    const fromRow = fromSquare.dataset.row;
    const fromCol = fromSquare.dataset.col;
    const toRow = toSquare.dataset.row;
    const toCol = toSquare.dataset.col;

    // Mover a peça para o novo quadrado
    toSquare.textContent = fromSquare.textContent;
    fromSquare.textContent = "";
    clearHighlights();
}

// Inicializar o tabuleiro
createBoard();
infoElement.textContent = "É a vez do jogador branco.";





