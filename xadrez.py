class Tabuleiro:
    def __init__(self):
        self.tabuleiro = [
            ['t', 'c', 'b', 'q', 'k', 'b', 'c', 't'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['T', 'C', 'B', 'Q', 'K', 'B', 'C', 'T']
        ]
    
    def desenhar(self):
        print("\n".join([" ".join(linha) for linha in self.tabuleiro]))
        print()

class JogoDeXadrez:
    def __init__(self):
        self.tabuleiro = Tabuleiro()
        self.jogador_atual = "Brancas"
    
    def mudar_jogador(self):
        if self.jogador_atual == "Brancas":
            self.jogador_atual = "Negras"
        else:
            self.jogador_atual = "Brancas"

    def validar_movimento(self, origem, destino):
        o_x, o_y = origem
        d_x, d_y = destino
        
        if not (0 <= o_x < 8 and 0 <= o_y < 8 and 0 <= d_x < 8 and 0 <= d_y < 8):
            return False  # Movimento fora do tabuleiro
        
        peca_origem = self.tabuleiro.tabuleiro[o_x][o_y]
        if peca_origem == '.':
            return False  # Não há peça na origem
        
        if peca_origem.isupper() and self.jogador_atual == "Negras":
            return False  # Peças brancas não podem mover se for a vez das negras
        if peca_origem.islower() and self.jogador_atual == "Brancas":
            return False  # Peças negras não podem mover se for a vez das brancas

        return True
    
    def mover_peca(self, origem, destino):
        o_x, o_y = origem
        d_x, d_y = destino
        
        peca_origem = self.tabuleiro.tabuleiro[o_x][o_y]
        self.tabuleiro.tabuleiro[o_x][o_y] = '.'
        self.tabuleiro.tabuleiro[d_x][d_y] = peca_origem
    
    def jogar(self):
        while True:
            self.tabuleiro.desenhar()
            print(f"Vez das {self.jogador_atual}")
            
            try:
                origem_input = input("Digite a posição de origem (ex: 'a2'): ").lower()
                destino_input = input("Digite a posição de destino (ex: 'a3'): ").lower()
                
                o_x, o_y = 8 - int(origem_input[1]), ord(origem_input[0]) - ord('a')
                d_x, d_y = 8 - int(destino_input[1]), ord(destino_input[0]) - ord('a')
                
                if self.validar_movimento((o_x, o_y), (d_x, d_y)):
                    self.mover_peca((o_x, o_y), (d_x, d_y))
                    self.mudar_jogador()
                else:
                    print("Movimento inválido!")
            
            except Exception as e:
                print(f"Erro: {e}. Tente novamente.")

if __name__ == "__main__":
    jogo = JogoDeXadrez()
    jogo.jogar()
