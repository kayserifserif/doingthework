const journal = document.getElementById("journal");

// array of prompts to randomly choose from
const prompts = [
  "Black lives matter",
  "Abolish the police"
];

const initialQA = () => {
  let new_why = document.createElement("p");
  new_why.innerText = "Why?";
  new_why.classList.add("why");
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
  let new_qa = document.createElement("div");
  new_qa.classList.add("qa");
    let new_form = document.createElement("form");
    new_form.classList.add("answer");
    new_form.addEventListener("submit", handleSubmit);
      let new_input = document.createElement("input");
      new_input.type = "text";
      new_input.classList.add("answer_input");
    new_form.appendChild(new_input);
    let new_why = document.createElement("p");
    new_why.innerText = "Why?";
    new_why.classList.add("why");
  new_qa.appendChild(new_form);
  new_qa.appendChild(new_why);

  // transition
  setTimeout(() => {
    journal.appendChild(new_qa);
    new_input.focus();
  }, 1000);
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