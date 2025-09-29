// Definindo o tabuleiro e as peças
const tabuleiro = document.getElementById("tabuleiro");
const turnoTexto = document.getElementById("turno-texto");
const reiniciarButton = document.getElementById("reiniciar");

let pecasIniciais = [
    ['t', 'c', 'b', 'q', 'k', 'b', 'c', 't'], // Linha 1 (Torre, Cavalo, Bispo, Rainha, Rei, Bispo, Cavalo, Torre)
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // Linha 2 (Peões)
    ['.', '.', '.', '.', '.', '.', '.', '.'], // Linha 3
    ['.', '.', '.', '.', '.', '.', '.', '.'], // Linha 4
    ['.', '.', '.', '.', '.', '.', '.', '.'], // Linha 5
    ['.', '.', '.', '.', '.', '.', '.', '.'], // Linha 6
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // Linha 7 (Peões Brancos)
    ['T', 'C', 'B', 'Q', 'K', 'B', 'C', 'T'], // Linha 8 (Torre, Cavalo, Bispo, Rainha, Rei, Bispo, Cavalo, Torre)
];

// Variáveis de controle
let jogadorAtual = 'brancas';
let casaSelecionada = null;
let movimentosValidos = [];

// Função para desenhar o tabuleiro e peças
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
                peçaDiv.setAttribute('data-linha', linha);
                peçaDiv.setAttribute('data-coluna', coluna);
                casa.appendChild(peçaDiv);
            }

            // Marcar a casa com o evento de clique
            casa.addEventListener('click', () => selecionarCasa(linha, coluna, casa));
            tabuleiro.appendChild(casa);
        }
    }
}

// Função de seleção de casa
function selecionarCasa(linha, coluna, casa) {
    const pecaSelecionada = casa.querySelector('.peça');

    // Se já houver uma casa selecionada, tente mover
    if (casaSelecionada) {
        if (validarMovimento(casaSelecionada.linha, casaSelecionada.coluna, linha, coluna)) {
            moverPeca(casaSelecionada.linha, casaSelecionada.coluna, linha, coluna);
            trocarTurno();
        }
        casaSelecionada = null;
        movimentosValidos = [];
    } else if (pecaSelecionada && pecaSelecionada.classList.contains(jogadorAtual === 'brancas' ? 'peça-branca' : 'peça-preta')) {
        // Seleciona a peça
        casaSelecionada.linha = linha;
        casaSelecionada.coluna = coluna;
        movimentosValidos = calcularMovimentosValidos(linha, coluna, pecaSelecionada.textContent);
        marcarMovimentosValidos();
    }
}

// Função para validar o movimento (apenas um exemplo básico)
function validarMovimento(l1, c1, l2, c2) {
    const peca = pecasIniciais[l1][c1];
    const destino = pecasIniciais[l2][c2];

    if (destino !== '.') {
        const corDestino = destino === destino.toUpperCase() ? 'branca' : 'preta';
        const corPeca = peca === peca.toUpperCase() ? 'branca' : 'preta';
        if (corDestino === corPeca) {
            return false; // Não pode capturar a própria peça
        }
    }
    return true;
}

// Função para mover a peça
function moverPeca(l1, c1, l2, c2) {
    const peca = pecasIniciais[l1][c1];
    pecasIniciais[l1][c1] = '.';
    pecasIniciais[l2][c2] = peca;
    desenharTabuleiro();
}

// Função de troca de turno
function trocarTurno() {
    jogadorAtual = jogadorAtual === 'brancas' ? 'negras' : 'brancas';
    turnoTexto.textContent = jogadorAtual.charAt(0).toUpperCase() + jogadorAtual.slice(1);
}

// Função para calcular os movimentos válidos para uma peça (básico)
function calcularMovimentosValidos(linha, coluna, peca) {
    let movimentos = [];
    if (peca.toLowerCase() === 'p') {
        // Movimento do peão
        if (peca === 'p' && linha < 7 && pecasIniciais[linha + 1][coluna] === '.') {
            movimentos.push([linha + 1, coluna]);
        } else if (peca === 'P' && linha > 0 && pecasIniciais[linha - 1][coluna] === '.') {
            movimentos.push([linha - 1, coluna]);
        }
    }
    // Outras peças podem ser implementadas de maneira similar
    return movimentos;
}

// Função para marcar os movimentos válidos no tabuleiro
function marcarMovimentosValidos() {
    // Limpar marcações anteriores
    const casas = document.querySelectorAll('.casa');
    casas.for


