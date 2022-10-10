
// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;


var timeleft = 50;
var downloadTimer = setInterval(function(){
timeleft--;
document.getElementById("countdowntimer").textContent = timeleft;
if(timeleft == 0)
    clearInterval(downloadTimer);
    
},1000);

// perguntas
const questions = [
  {
    question: "Segundo a SBPT a frase que melhor define a relação da Asma com atividade física, em crianças e adultos, é:",
    answers: [
      {
        answer: 'A atividade física pode desencadear a asma, portanto é preciso evitá-la, independente da gravidade.',
        correct: false,
      },
      {
        answer: 'O exercício físico pode desencadear os sintomas da asma, porém é bom para manter uma vida saudável e não deve ser limitado se a asma estiver bem controlada.  ',
        correct: true,
      },
      {
        answer: 'Algumas pessoas podem ter sintomas de asma somente durante a atividade física, esta forma de asma é chamada de asma grave.',
        correct: false,
      },
      {
        answer: 'Se os sintomas da asma iniciarem durante a atividade física, o mais indicado é intensificar o exercício.',
        correct: false,
      },
    ],
  },
  {
    question: 'Sobre a Linha SYMBICORT® é correto afirmar, EXCETO:',
    answers: [
      {
        answer: 'Pó inalante disponível nas apresentações de 6/100 mcg ,6/200 mcg e 12/400 mcg de fumarato de formoterol di-hidratado/ budesonida',
        correct: false,
      },
      {
        answer: 'Todas as alternativas',
        correct: true,
      },
      {
        answer: 'É apresentado no inalador com 60 doses ',
        correct: false,
      },
      {
        answer: 'Uso adulto e pediátrico acima de 4 anos',
        correct: false,
      },
    ],
  },
  {
    question: 'São características do SYMBICORT® Turbuhaler, EXCETO: ',
    answers: [
      {
        answer: 'Há a necessidade de colocação e remoção do formoterol / budesonida a cada inalação ',
        correct: true,
      },
      {
        answer: 'Não requer coordenação mão-pulmão para a inalação ',
        correct: false,
      },
      {
        answer: 'Fornece a dose exata a ser inalada pelo fluxo inspiratório',
        correct: false,
      },
      {
        answer: 'Possui design especial do bocal com canais em espiral para desagregar a dose em partículas respiráveis',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual o número máximo de inalações diárias com o SYMBICORT® TURBUHALER  6/200 mcg em adultos e adolescentes >12 anos',
    answers: [
      {
        answer: '12',
        correct: true,
      },
      {
        answer: '8',
        correct: false,
      },
      {
        answer: '4',
        correct: false,
      },
      {
        answer: '2',
        correct: false,
      },
    ],
  },
];

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    
    const answerText = answerTemplate.querySelector('.question-answer');

    
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados tela de sucesso
  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// mostra ou esonde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  window.location.href = "./index.html";
});

// inicialização do quizz
init();
