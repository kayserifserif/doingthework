const journal = document.getElementById("journal");

// array of prompts to randomly choose from
const prompts = [
  "Black lives matter",
  "Abolish the police"
];

const initialQA = () => {
  let new_why = document.createElement("p");
  new_why.innerText = "Why?";
  new_why.classList.add("why", "animated");
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
  const INPUT_COLS = "80";
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
      new_input.wrap = "off";
      new_input.addEventListener("input", handleInput);
    new_form.appendChild(new_input);
    let new_why = document.createElement("p");
    new_why.innerText = "Why?";
    new_why.classList.add("why", "animated");
  new_qa.appendChild(new_form);
  new_qa.appendChild(new_why);
  journal.appendChild(new_qa);

  // transition
  setTimeout(() => {
    new_input.classList.add("visible");
    new_input.focus();
  }, 350);
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