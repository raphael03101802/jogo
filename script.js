// Definindo o tabuleiro e as peças
const tabuleiro = document.getElementById("tabuleiro");
const turnoTexto = document.getElementById("turno-texto");
const reiniciarButton = document.getElementById("reiniciar");

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

// Representação do tabuleiro no DOM
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

// Lógica de controle de turno
let jogadorAtual = 'brancas';
let casaSelecionada = null;

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
    } else if (pecaSelecionada) {
        // Seleciona a peça
        casaSelecionada = { linha, coluna };
    }
}

// Função para mover a peça
function moverPeca(l1, c1, l2, c2) {
    const peca = pecasIniciais[l1][c1];
    pecasIniciais[l1][c1] = '.';
    pecasIniciais[l2][c2] = peca;
    desenharTabuleiro();
}

// Função para validar o movimento (básico para teste)
function validarMovimento(l1, c1, l2, c2) {
    // Apenas exemplo de validação: não permite mover para a casa já ocupada pela mesma cor
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

// Troca o turno do jogador
function trocarTurno() {
    jogadorAtual = jogadorAtual === 'brancas' ? 'negras' : 'brancas';
    turnoTexto.textContent = jogadorAtual.charAt(0).toUpperCase() + jogadorAtual.slice(1);
}

// Função de reiniciar o jogo
reiniciarButton.addEventListener('click', () => {
    pecasIniciais.length = 0;
    pecasIniciais.push(...JSON.parse(JSON.stringify(pecasIniciais)));
    jogadorAtual = 'brancas';
    turnoTexto.textContent = 'Brancas';
    desenharTabuleiro();
});

// Inicializar o tabuleiro
desenharTabuleiro();


