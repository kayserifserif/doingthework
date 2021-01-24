// https://www.pewresearch.org/politics/2020/12/17/voters-say-those-on-the-other-side-dont-get-them-heres-what-they-want-them-to-know/

const prompt_span = document.getElementById("prompt_span");
const listener = document.getElementById("listener");
const log = document.getElementById("log");

const questions = [
  "How does this make you feel?",
  "Why do you say that?",
  "Can you say more?",
  "Can you be more specific about that?",
  "Can you think of any examples?",
  "What do you think about that?",
  "What do you have questions about?"
];

// load prompts from text file
let prompts;
fetch("/prompts.txt")
  .then(response => response.text())
  .then(text => {
    prompts = text.split("\n");
    load();
  });

const load = () => {
  document.getElementById("prompt_refresh").addEventListener("click", newPrompt);
  document.getElementById("prompt_custom").addEventListener("click", customPrompt);
  document.getElementById("clear").addEventListener("click", clearLog);
  document.getElementById("save").addEventListener("click", save);
  newPrompt();
};

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

const save = (event) => {
  const date = new Date();
  // formats date as Thu Dec 31 2020
  let date_str = date.toDateString();

  let log_text = `\
Journal entry on ${date_str} from https://doingthework.glitch.me\n\n\
----------\n\
Generated prompt:\n\
${prompt_span.textContent}`;

  // notes optional listener value
  if (listener.value) {
    let listener_val = listener.value.substring(0, 1).toUpperCase() + listener.value.substring(1);
    log_text += "\n\nImagined listener:\n" + listener_val;
  }
  log_text += "\n----------\n\n";

  // adds q&as if q is a'd
  let log_strings = [];
  for (let qa of log.querySelectorAll(".qa")) {
    let q = qa.querySelector(".why span");
    let a = qa.querySelector(".answer p");
    if (a) {
      log_strings.push(q.textContent + "\n" + a.textContent);
    }
  }
  log_text += log_strings.join("\n\n");
  let blob = new Blob([log_text], {type: "text/plain;charset=utf-8"});
  let blob_url = URL.createObjectURL(blob);

  // formats date like 2020-12-31
  let date_num = date.getFullYear() + "-" +
    ((date.getMonth() + 1).toString().padStart(2, '0')) + "-" +
    date.getDate().toString().padStart(2, '0');
  // formats time like 14-22-01
  let time_num = date.getHours().toString().padStart(2, '0') + "-" +
    date.getMinutes().toString().padStart(2, '0') + "-" +
    date.getSeconds().toString().padStart(2, '0');
  let a = document.createElement("a");
  a.href = blob_url;
  a.download = `doingthework on ${date_num} at ${time_num}.txt`;
  // clear from memory
  a.onclick = () => { setTimeout(() => URL.revokeObjectURL(blob_url), 150); }
  a.click();
}

window.addEventListener("resize", () => {
  for (let input of document.getElementsByClassName("answer_input")) {
    input.cols = window.innerWidth / 25 + 10;
  }
});