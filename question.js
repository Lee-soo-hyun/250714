
// 예시 문제.txt 기반 퀴즈 데이터
const quizData = [
    {
        question: "1. 다음 단어의 뜻을 구별해 주는 요소로 알맞지 않은 것은?",
        choices: [
            "곰, 솜 - 자음",
            "종, 공 - 자음",
            "돌, 돈 - 모음",
            "산, 선 - 모음",
            "밥, 법 - 모음"
        ],
        answer: 4
    },
    {
        question: "2. 국어의 음운에 대한 설명으로 적절하지 않은 것은?",
        choices: [
            "음운의 종류에는 자음과 모음이 있다.",
            "말의 뜻을 구별해 주는 소리의 단위이다.",
            "모음은 공기가 그대로 흘러나오는 소리이다.",
            "자음은 모음 없이 홀로 소리 낼 수 있는 음운이다.",
            "음운에 따라 소리 낼 때의 느낌이 달라질 수 있다."
        ],
        answer: 3
    },
    {
        question: "3. 말의 뜻을 구별해 주는 소리의 가장 작은 단위는?",
        choices: [
            "음운",
            "음절",
            "단어",
            "문장",
            "형태소"
        ],
        answer: 0
    },
    {
        question: "4. ‘돌’의 음운 중 하나를 골라 다른 음운으로 바꾼 단어가 아닌 것은?",
        choices: [
            "솔",
            "달",
            "덕",
            "돈",
            "독"
        ],
        answer: 2
    },
    {
        question: "5. 음운에 대한 설명으로 알맞지 않은 것은?",
        choices: [
            "단어의 음운을 바꾸어 쓰면 의미가 달라진다.",
            "우리말의 음운은 자음과 모음으로 이루어진다.",
            "자음은 공기가 방해를 받으며 나오는 소리이다.",
            "말의 뜻을 구별해 주는 소리의 가장 작은 단위이다.",
            "모음은 홀로 소리 낼 수 없어 자음을 만나야만 소리를 낼 수 있다."
        ],
        answer: 4
    }
];

let currentQuiz = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');

function loadQuiz() {
    answered = false;
    const current = quizData[currentQuiz];
    questionEl.textContent = current.question;
    choicesEl.innerHTML = '';
    current.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.textContent = choice;
        btn.onclick = () => selectAnswer(idx, btn);
        const li = document.createElement('li');
        li.appendChild(btn);
        choicesEl.appendChild(li);
    });
    nextBtn.disabled = true;
}

function selectAnswer(idx, btn) {
    if (answered) return;
    answered = true;
    const correctIdx = quizData[currentQuiz].answer;
    const buttons = choicesEl.querySelectorAll('button');
    buttons.forEach((b, i) => {
        if (i === correctIdx) b.classList.add('correct');
        else if (i === idx) b.classList.add('incorrect');
        b.disabled = true;
    });
    if (idx === correctIdx) score++;
    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    resultEl.classList.remove('hidden');
    resultEl.innerHTML = `퀴즈 완료!<br>점수: <b>${score} / ${quizData.length}</b>`;
}

// 첫 문제 로드
loadQuiz();
