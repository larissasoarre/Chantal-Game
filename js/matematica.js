const startButton = document.getElementById('start-botao')
let shuffledQuestions, currentQuestionIndex
const questionElement = document.getElementById('pergunta')
const answerButtonsElement = document.getElementById('respostas')

startButton.addEventListener('click', startGame)

function startGame() {
    console.log('started');
    shuffledQuestions = questions.sort(() => Math.random() - .5) // para que as perguntas sempre venham aleatorias
    currentQuestionIndex = 0
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
questionElement.innerText = question.question
question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('bto')

    if (answer.corret) {
        button.dataset.correct = answer.correct
    }

    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
})
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer() {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correto')
    } else {
        element.classList.add('incorreto')
    }
}

function clearStatusClass(element) {
    element.classList.add('incorreto')
    element.classList.remove('incorreto')
}

const questions = [{
    question: ' 3 + 3',
    answers: [{
            text: '6',
            correct: true
        },
        {
            text: '4',
            correct: false
        }
    ]
}]