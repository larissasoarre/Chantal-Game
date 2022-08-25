const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('pop-up')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const restartButton = document.getElementById('restart')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
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
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    restartButton.addEventListener('click', startGame)
    // startButton.innerText = 'Restart'
    // startButton.classList.remove('hide')
    restartButton.classList.remove('hidden')
    restartButton.addEventListener('click', function() {
        restartButton.classList.add('hidden')
    })
  }
}

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

const questions = [
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