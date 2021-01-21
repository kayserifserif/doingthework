// https://www.pewresearch.org/politics/2020/12/17/voters-say-those-on-the-other-side-dont-get-them-heres-what-they-want-them-to-know/

const prompt_span = document.getElementById("prompt_span");
const listener_form = document.getElementById("listener_form");
const log = document.getElementById("log");

// array of prompts to randomly choose from
const prompts = [
  "Black lives matter",
  "Abolish the police",
  "Voting is a civic duty",
  "Trans lives matter",
  "Healthcare is a human right",
  "Climate change is real and urgent",
  "White supremacy is institutionalised",
  "Each person has privilege",
  "Gender is a social construct",
  "Gender norms are harmful",
  "Language and labels are important",

];

const questions = [
  "How does that make you feel?",
  "Why do you say that?",
  "Can you say more?",
  "Can you be more specific about that?",
  "Can you think of any examples?",
  "What do you think about that?",
  "What do you have questions about?"
];

const clearLog = (event) => {
  newQA(questions[0]);
}

const newPrompt = () => {
  let prompt_span = document.getElementById("prompt_span");
  prompt_span.textContent = prompts[Math.floor(Math.random() * prompts.length)];
  newQA(questions[0]);
}

const customPrompt = () => {
  let prompt_span = document.getElementById("prompt_span");
  prompt_span.contentEditable = true;
  let range = document.createRange();
  range.selectNodeContents(prompt_span);
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  prompt_span.addEventListener("input", (event) => {
    if (event.inputType === "insertParagraph") {
      prompt_span.contentEditable = false;
      prompt_span.blur();
      newQA(questions[0]);
      return false;
    }
  });
}

const newQA = (question) => {
  if (question) {
    log.innerHTML = "";
  } else {
    question = questions[Math.floor(Math.random() * questions.length)];
  }

  const INPUT_COLS = window.innerWidth / 25 + 10;
  const INPUT_ROWS = "1";

  let new_qa = document.createElement("div");
  new_qa.classList.add("qa");
    let new_question = document.createElement("p");
      new_question.classList.add("why", "animated");
        let why_span = document.createElement("span");
        why_span.innerText = question;
        new_question.appendChild(why_span);
        let why_refresh = document.createElement("button");
        why_refresh.type = "button";
        why_refresh.classList.add("why_refresh", "button_icon", "button");
        why_refresh.innerText = "⟳";
        why_refresh.addEventListener("click", refreshWhy);
        new_question.appendChild(why_refresh);
    let new_form = document.createElement("form");
    new_form.classList.add("answer");
    new_form.addEventListener("submit", handleSubmit);
      let new_input = document.createElement("textarea");
      new_input.classList.add("answer_input", "animated");
      new_input.cols = INPUT_COLS;
      new_input.rows = INPUT_ROWS;
      // new_input.wrap = "off";
      new_input.addEventListener("input", handleInput);
    new_form.appendChild(new_input);
  new_qa.appendChild(new_question);
  new_qa.appendChild(new_form);
  log.appendChild(new_qa);

  // transition
  setTimeout(() => {
    new_question.classList.add("visible");
    setTimeout(() => {
      new_input.classList.add("visible");
      new_input.focus();
    }, 350);
  }, 10);
}

const refreshWhy = (event) => {
  let why_span = event.target.parentNode.childNodes[0];
  why_span.innerText = questions[Math.floor(Math.random() * questions.length)];
}

const handleInput = (event) => {
  event.target.style.height = event.target.scrollHeight + "px";
  if (event.inputType === "insertLineBreak") {
    if (event.target.value.trim() === "") {
      event.target.value = "";
    } else {
      event.target.parentNode.requestSubmit();
    }
  }
}

// finish answer and go to the next
const handleSubmit = (event) => {
  event.preventDefault();

  // finish answer
  let input = event.target.firstChild;
  let input_p = document.createElement("p");
  input_p.innerText = input.value;
  input.parentNode.insertBefore(input_p, input);
  input.parentNode.removeChild(input);

  // create new
  newQA();
}

document.addEventListener("DOMContentLoaded", () => {
  newPrompt();
  document.getElementById("prompt_refresh").addEventListener("click", newPrompt);
  document.getElementById("prompt_custom").addEventListener("click", customPrompt);
  document.getElementById("clear").addEventListener("click", clearLog);
});

window.addEventListener("resize", () => {
  for (let input of document.getElementsByClassName("answer_input")) {
    input.cols = window.innerWidth / 25 + 10;
  }
});