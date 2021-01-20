// https://www.pewresearch.org/politics/2020/12/17/voters-say-those-on-the-other-side-dont-get-them-heres-what-they-want-them-to-know/

const journal = document.getElementById("journal");

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
  "Language and labels are important"
];

const whys = [
  "Why?",
  "Why do you say that?",
  "Can you tell me more?",
  "Can you be more specific about that?",
  "Can you think of any examples?",
  "How does that make you feel?",

];

const initialQA = () => {
  let new_why = document.createElement("p");
  new_why.classList.add("why", "animated");
    let why_span = document.createElement("span");
    why_span.innerText = whys[0];
    new_why.appendChild(why_span);
    let why_refresh = document.createElement("button");
    why_refresh.classList.add("why_refresh");
    why_refresh.innerText = "⟳";
    why_refresh.addEventListener("click", refreshWhy);
    new_why.appendChild(why_refresh);
  journal.appendChild(new_why);
  
  setTimeout(() => {
    new_why.classList.add("visible");
    newQA();
  }, 10);
  
  for (let input of document.getElementsByClassName("stance_input")) {
    input.removeEventListener("change", initialQA);
  }
}

const newQA = () => {
  // const INPUT_COLS = "80";
  const INPUT_COLS = window.innerWidth / 25 + 10;
  const INPUT_ROWS = "1";

  let new_qa = document.createElement("div");
  new_qa.classList.add("qa");
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
    let new_why = document.createElement("p");
    new_why.classList.add("why", "animated");
      let why_span = document.createElement("span");
      why_span.innerText = whys[0];
      new_why.appendChild(why_span);
      let why_refresh = document.createElement("button");
      why_refresh.classList.add("why_refresh");
      why_refresh.innerText = "⟳";
      why_refresh.addEventListener("click", refreshWhy);
      new_why.appendChild(why_refresh);
  new_qa.appendChild(new_form);
  new_qa.appendChild(new_why);
  journal.appendChild(new_qa);

  // transition
  setTimeout(() => {
    new_input.classList.add("visible");
    new_input.focus();
  }, 350);
}

const refreshWhy = (event) => {
  let why_span = event.target.parentNode.childNodes[0];
  why_span.innerText = whys[Math.floor(Math.random() * whys.length)];
}

const handleInput = (event) => {
  event.target.style.height = event.target.scrollHeight + "px";
  if (event.inputType === "insertLineBreak") {
    event.target.parentNode.requestSubmit();
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
  let why = event.target.nextElementSibling;
  why.classList.add("visible");

  // create new
  newQA();
}

document.addEventListener("DOMContentLoaded", () => {
  // random prompt
  document.getElementById("prompt").innerText = prompts[Math.floor(Math.random() * prompts.length)];

  // initial q&a
  document.getElementById("stance_form").reset();
  for (let input of document.getElementsByClassName("stance_input")) {
    input.addEventListener("change", initialQA);
  }
});

window.addEventListener("resize", () => {
  for (let input of document.getElementsByClassName("answer_input")) {
    input.cols = window.innerWidth / 25 + 10;
  }
});