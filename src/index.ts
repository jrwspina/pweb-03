type NullableHTMLElement = HTMLElement | null

// Número de dados e vetor de dados.
let N: number = 5
let dados = new Array<Dado>(N)

// Arrays da tabela
let contador = [0, 0, 0, 0, 0, 0]
let percentuais = [0, 0, 0, 0, 0, 0]

// Classe Dado
class Dado {
    private _face: number = 0
    private _imagem: NullableHTMLElement = null

    constructor() {
        this._imagem = document.createElement("img")
        this.jogar()
    }

    getImagem() { return this._imagem }

    getFace() { return this._face }

    setFace(face: number) {
        if (face >= 1 && face <= 6) {
            this._face = face
            this.atualizaImagem()
        }
        else {
            throw new Error("Face inválida.")
        }
    }

    public jogar() {
        let dieValue = Math.floor(Math.random() * 6 + 1)
        this.setFace(dieValue)
    }

    private atualizaImagem() {
        if (this._imagem) {
            this._imagem.setAttribute("src", `img/die${this._face}.png`)
            this._imagem.setAttribute("alt", `die image with ${this._face} spot(s)`)
        }
    }
}

// Inicialização

function start() {
    document.getElementById("roll-button")?.addEventListener("click", jogarDados)

    // "Mostra" o valor de N na tela
    let spanDados = document.getElementById("dice-qty")
    if(spanDados) { spanDados.innerText = N.toString() }
    
    // Inicializa os dados
    for (let i=0; i<N; i++) { dados[i] = new Dado() }   

    // "Mostra" os dados na tela
    let divDiceContainer = document.getElementById("dice-container")    

    dados.forEach(dado => {
        let face = dado.getFace()
        let imagem = dado.getImagem()

        if(imagem && divDiceContainer) { divDiceContainer.appendChild(imagem) }
    })
}

// Funções para atualizar a tabela

function somaContador(): number {
    return contador.reduce((a, b) => a + b, 0)
}

function atualizaPerc() {
    let soma = somaContador() 
    percentuais.forEach(
        function (_, index) { percentuais[index] = contador[index] / soma }
    )
}

// Main

function jogarDados() {

    // Rola todos os dados e atualiza o contador de faces.
    dados.forEach(dado => {
        dado.jogar()
        contador[dado.getFace() - 1] = contador[dado.getFace() - 1] + 1
    })

    // Chamada para a função que atualiza o array de percentuais
    atualizaPerc()

    // Atualiza valores (html)
    for (let i = 1; i <= 6; i++) {
        let qt = document.getElementById(`freq-${i}`)
        if(qt) { qt.innerHTML = contador[i - 1].toString() }
        
        let pc = document.getElementById(`perc-${i}`)
        if(pc) { pc.innerHTML = (percentuais[i - 1] * 100).toFixed(2).toString() }
    }
}

window.addEventListener("load", start)