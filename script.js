const questions = [
  {
    question: "강민이는?",
    answers: [
      { text: "냉미남이다.", type: "A" },
      { text: "온미남이다.", type: ["B", "C", "D"] }
    ]
  },
  {
    question: "나는 강민이가 ~라고 생각한다.",
    answers: [
      { text: "남자", type: ["A", "D"] },
      { text: "아기", type: ["B", "C"] }
    ]
  },
  {
    question: "강민이의 얼굴에서 ~가 가장 예쁘다",
    answers: [
      { text: "눈", type: "A" },
      { text: "코", type: "B" },
      { text: "입", type: "D" },
      { text: "귀", type: "C" }
    ]
  },
  {
    question: "내가 가장 좋아하는 강민이의 구성 요소는?",
    answers: [
      { text: "외관", type: "C" },
      { text: "착한 심성", type: "A" },
      { text: "승부욕", type: "B" },
      { text: "막내미", type: "D" }
    ]
  },
  {
    question: "만약 고를 수 있다면?",
    answers: [
      { text: "강민의 엄마 되기", type: "B" },
      { text: "강민의 누나 되기", type: "D" },
      { text: "강민의 여동생 되기", type: "A" },
      { text: "다시 태어나도 팬하기", type: "A" }
    ]
  },
  {
    question: "남자는",
    answers: [
      { text: "얼굴이다.", type: ["A", "C"] },
      { text: "성격이다.", type: ["B", "D"] }
    ]
  },
  {
    question: "이 중 가장 취향인 활동기는?",
    answers: [
      { text: "딱 잘라서 말해", type: "C" },
      { text: "Tag Tag Tag", type: "A" },
      { text: "TRIGGER", type: "D" },
      { text: "Tap Tap", type: "B" }
    ]
  }
];

const results = {
  A: "당신은 강민이를 여우라고 생각하시네요!",
  B: "당신은 강민이를 강아지라고 생각하시네요!",
  C: "당신은 강민이를 토끼라고 생각하시네요!",
  D: "당신은 강민이를 펭귄이라고 생각하시네요!"
};

let currentQuestion = 0;
let score = { A: 0, B: 0, C: 0, D: 0 };

const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");

function showQuestion() {
  const questionData = questions[currentQuestion];
  questionContainer.innerHTML = `
    <h2>${questionData.question}</h2>
    ${questionData.answers.map(
      (answer, index) =>
        `<button onclick="selectAnswer(${index})">${answer.text}</button>`
    ).join("")}
  `;
}

function selectAnswer(index) {
  const selectedAnswer = questions[currentQuestion].answers[index];
  const types = Array.isArray(selectedAnswer.type)
    ? selectedAnswer.type
    : [selectedAnswer.type];
  types.forEach(type => score[type]++);

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";

  const maxType = Object.keys(score).reduce((a, b) =>
    score[a] > score[b] ? a : b
  );

  document.getElementById("result-title").innerText = "테스트 결과";
  document.getElementById("result-description").innerText = results[maxType];
}

function restartTest() {
  currentQuestion = 0;
  score = { A: 0, B: 0, C: 0, D: 0 };
  questionContainer.style.display = "block";
  resultContainer.style.display = "none";
  showQuestion();
}

showQuestion();
