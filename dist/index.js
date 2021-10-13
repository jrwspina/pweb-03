"use strict";
// Número de dados e vetor de dados.
var N = 5;
var dados = new Array(N);
// Arrays da tabela
var contador = [0, 0, 0, 0, 0, 0];
var percentuais = [0, 0, 0, 0, 0, 0];
// Classe Dado
var Dado = /** @class */ (function () {
    function Dado() {
        this._face = 0;
        this._imagem = null;
        this._imagem = document.createElement("img");
        this.jogar();
    }
    Dado.prototype.getImagem = function () { return this._imagem; };
    Dado.prototype.getFace = function () { return this._face; };
    Dado.prototype.setFace = function (face) {
        if (face >= 1 && face <= 6) {
            this._face = face;
            this.atualizaImagem();
        }
        else {
            throw new Error("Face inválida.");
        }
    };
    Dado.prototype.jogar = function () {
        var dieValue = Math.floor(Math.random() * 6 + 1);
        this.setFace(dieValue);
    };
    Dado.prototype.atualizaImagem = function () {
        if (this._imagem) {
            this._imagem.setAttribute("src", "img/die" + this._face + ".png");
            this._imagem.setAttribute("alt", "die image with " + this._face + " spot(s)");
        }
    };
    return Dado;
}());
// Inicialização
function start() {
    var _a;
    (_a = document.getElementById("roll-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", jogarDados);
    // "Mostra" o valor de N na tela
    var spanDados = document.getElementById("dice-qty");
    if (spanDados) {
        spanDados.innerText = N.toString();
    }
    // Inicializa os dados
    for (var i = 0; i < N; i++) {
        dados[i] = new Dado();
    }
    // "Mostra" os dados na tela
    var divDiceContainer = document.getElementById("dice-container");
    dados.forEach(function (dado) {
        var face = dado.getFace();
        var imagem = dado.getImagem();
        if (imagem && divDiceContainer) {
            divDiceContainer.appendChild(imagem);
        }
    });
}
// Funções para atualizar a tabela
function somaContador() {
    return contador.reduce(function (a, b) { return a + b; }, 0);
}
function atualizaPerc() {
    var soma = somaContador();
    percentuais.forEach(function (_, index) { percentuais[index] = contador[index] / soma; });
}
// Main
function jogarDados() {
    // Rola todos os dados e atualiza o contador de faces.
    dados.forEach(function (dado) {
        dado.jogar();
        contador[dado.getFace() - 1] = contador[dado.getFace() - 1] + 1;
    });
    // Chamada para a função que atualiza o array de percentuais
    atualizaPerc();
    // Atualiza valores (html)
    for (var i = 1; i <= 6; i++) {
        var qt = document.getElementById("freq-" + i);
        if (qt) {
            qt.innerHTML = contador[i - 1].toString();
        }
        var pc = document.getElementById("perc-" + i);
        if (pc) {
            pc.innerHTML = (percentuais[i - 1] * 100).toFixed(2).toString();
        }
    }
}
window.addEventListener("load", start);
