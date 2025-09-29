// Definindo o tabuleiro e as peças
const tabuleiro = document.getElementById("tabuleiro");
const pecasIniciais = [
    ['t', 'c', 'b', 'q', 'k', 'b', 'c', 't'], // Linha 1 (Torre, Cavalo, Bispo, Rainha, Rei, Bispo, Cavalo, Torre)
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // Linha 2 (Peões)
    ['.', '.', '.', '.', '.', '.', '.', '.'], // Linha 3
    ['.', '.', '.', '.', '.', '.', '.', '.'], // Linha 4
    ['.', '.', '.', '.', '.', '.', '.', '.'], // Linha 5
    ['.', '.', '.', '.', '.', '.', '.', '.'], // Linha 6
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // Linha 7 (Peões Brancos)
    ['T', 'C', 'B', 'Q', 'K', 'B', 'C', 'T'], // Linha 8 (Torre, Cavalo, Bispo, Rainha, Rei, Bispo, Cavalo, Torre)
];

const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let casaSelecionada = null;
let jogadorAtual = 'brancas'; // A vez das brancas

// Função para desenhar o tabuleiro
function desenharTabuleiro() {
    tabuleiro.innerHTML = ''; // Limpa o tabuleiro
    
    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {
            const casa = document.createElement('div');
            casa.classList.add('casa');
            casa.classList.add((linha + coluna) % 2 === 0 ? 'clara' : 'escura');
            
            // Adicionar as peças nas casas
            const peca = pecasIniciais[linha][coluna];
            if (peca !== '.') {
                const peçaDiv = document.createElement('div');
                peçaDiv.classList.add('peça');
                peçaDiv.textContent = peca.toUpperCase();
                peçaDiv.classList.add(peca === peca.toUpperCase() ? 'peça-branca' : 'peça-preta');
                casa.appendChild(peçaDiv);
            }

            // Marcar a casa com o evento de clique
            casa.addEventListener('click', () => selecionarCasa(linha, coluna, casa));
            tabuleiro.appendChild(casa);
        }
    }
}

// Função para selecionar uma casa e fazer o movimento
function selecionarCasa(linha, coluna, casa) {
    if (casaSelecionada) {
        // Tentando mover a peça para a nova casa
        if (validarMovimento(casaSelecionada.linha, casaSelecionada.coluna, linha, coluna)) {
            // Mover a peça
            pecasIniciais[linha][coluna] = pecasIniciais[casaSelecionada.linha][casaSelecionada.coluna];
            pecasIniciais[casaSelecionada.linha][casaSelecionada.coluna] = '.';

            // Alternar a vez do jogador
            jogadorAtual = jogadorAtual === 'brancas' ? 'negras' : 'brancas';
            desenharTabuleiro();
        }
        casaSelecionada = null; // Desmarcar a casa selecionada
    } else {
        // Selecionar a casa
        if (pecasIniciais[linha][coluna] !== '.' && (jogadorAtual === 'brancas' && pecasIniciais[linha][coluna] === pecasIniciais[linha][coluna].toUpperCase()) ||
            (jogadorAtual === 'negras' && pecasIniciais[linha][coluna] === pecasIniciais[linha][coluna].toLowerCase())) {
            casaSelecionada = { linha, coluna };
        }
    }
}

// Função de validação de movimento simples (ainda não valida a movimentação específica de cada peça)
function validarMovimento(l1, c1, l2, c2) {
    // Não permite mover para a própria casa
    if (l1 === l2 && c1 === c2) return false;
    return true; // Por enquanto, qualquer movimento é válido
}

// Inicializar o tabuleiro
desenharTabuleiro();
