const botaoInicial = document.getElementById('start-btn')
const popUp = document.getElementById('pop-up')
const perguntaContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const respostaBotao = document.getElementById('answer-buttons')
const reiniciarBotao = document.getElementById('restart')

let perguntasEmbaralhadas, perguntaAtual

//Botão que abrirá a tela do jogo e as perguntas aleatórias
botaoInicial.addEventListener('click', comecarJogo)
popUp.addEventListener('click', () => {
  perguntaAtual++
  definirPergunta()
})

window.onload = function() {
  popUp.classList.add('hide');
}

//Função que iniciará o jogo
function comecarJogo() {
  botaoInicial.classList.add('hide')
  perguntasEmbaralhadas = perguntas.sort(() => Math.random() - .5)
  perguntaAtual = 0
  perguntaContainer.classList.remove('hide')
  definirPergunta()
}

function definirPergunta() {
  redefinirStatus()
  mostrarPergunta(perguntasEmbaralhadas[perguntaAtual])
}

//Função responsável por criar a pergunta do nível
function mostrarPergunta(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selecionarResposta)
    respostaBotao.appendChild(button)
  })
}

function redefinirStatus() {
  clearStatusClass(document.body)
  popUp.classList.add('hide')
  while (respostaBotao.firstChild) {
    respostaBotao.removeChild(respostaBotao.firstChild)
  }
}

//Seleção da reposta correta
function selecionarResposta(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(respostaBotao.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (perguntasEmbaralhadas.length > perguntaAtual + 1) {
    popUp.classList.remove('hide')
  } else {
    reiniciarBotao.addEventListener('click', comecarJogo)
    reiniciarBotao.classList.remove('hidden')
    reiniciarBotao.addEventListener('click', function() {
      reiniciarBotao.classList.add('hidden')
    })
  }
}

//Adição de estilo para os botões
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

//Níveis do minijogo
const perguntas = [
  {
    question: '2 + 2',
    answers: [
      { text: '4', correct: true },
      { text: '6', correct: false },
      { text: '3', correct: false }
    ]
  },
  {
    question: '5 + 1',
    answers: [
      { text: '4', correct: false },
      { text: '6', correct: true },
      { text: '7', correct: false },
    ]
  },
  {
    question: '9 - 3',
    answers: [
      { text: '4', correct: false },
      { text: '6', correct: true },
      { text: '7', correct: false },
    ]
  },
  {
    question: '7 - 2',
    answers: [
      { text: '4', correct: false },
      { text: '2', correct: false },
      { text: '5', correct: true }
    ]
  },
  {
    question: '10 - 5',
    answers: [
      { text: '5', correct: true },
      { text: '4', correct: false },
      { text: '7', correct: false },
    ]
  },
  {
    question: '1 + 1',
    answers: [
      { text: '3', correct: false },
      { text: '1', correct: false },
      { text: '2', correct: true },
    ]
  },
  {
    question: '5 + 5',
    answers: [
      { text: '0', correct: false },
      { text: '10', correct: true },
      { text: '7', correct: false },
    ]
  },
  {
    question: '5 - 5',
    answers: [
      { text: '0', correct: true },
      { text: '10', correct: false },
      { text: '8', correct: false },
    ]
  }
]