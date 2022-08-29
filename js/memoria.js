const cartas = document.querySelectorAll('.memoria-carta');
const qtdElementos = document.querySelectorAll('.memoria-carta').length; // variavel com quantidade de elementos da section de cartas

var contadorCartas = 0; //vai contar quantas cartas foram viradas 


let clicouCarta = false;
let bloquearClique = false; // Impedir que o usuario clique em uma terceira carta enquanto as duas primeiras estiverem girando
let primeiraCarta, segundaCarta;

//Função que faz as cartas girarem
function girarCarta() {
    if (bloquearClique) return;
    if (this === primeiraCarta) return;


    this.classList.add('flip');

    if (!clicouCarta) {
        // Usuario clicou na primeira carta
        clicouCarta = true;
        primeiraCarta = this;

        return;
    }

    // Usuario clicou na segunda carta
    segundaCarta = this;

    checarPar();
}

//Checar se as cartas viradas são as mesmas
function checarPar() {
    let cartasCombinam = primeiraCarta.dataset.framework === segundaCarta.dataset.framework;

    // Checagem se as cartas são iguais
    if (cartasCombinam) {
        desabilitarCarta();
        contadorCartas = somarCartas(contadorCartas);
    } else {
        virarCartas();
    }

    // Caso todas as cartas tenham viradas, gerar pop-up
    setTimeout(() => {
        if (contadorCartas == qtdElementos) {
            document.getElementById("pop-up").classList.add("add");
        }
    }, 600);
}

//Impossibilitar o uso das cartas do jogo após terem seus pares encontrados
function desabilitarCarta() {
    // Quando as cartas combinarem
    primeiraCarta.removeEventListener('click', girarCarta);
    segundaCarta.removeEventListener('click', girarCarta);

    reiniciarTela();
}

//Virar as cartas para posicção inicial caso não combinem
function virarCartas() {
    bloquearClique = true;

    // Quando as cartas não combinarem
    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        reiniciarTela();
    }, 1200);
}

function reiniciarTela() {
    [clicouCarta, bloquearClique] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

//Função que faz um embaralhe aleatório das cartas do jogo
(function embaralharCartas() {
    cartas.forEach(carta => {
        let randomPos = Math.floor(Math.random() * 5);
        carta.style.order = randomPos;
    });
})();

// Responsavel por adicionar o valor total de cartas viradas
function somarCartas(contadorCartas) {
    return contadorCartas += 2;
}

cartas.forEach(carta => carta.addEventListener('click', girarCarta));