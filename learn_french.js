// START CODE FROM CHATGPT - LCG Random With Forwards and Backwards
// LCG parameters (BigInt)
const m = 0x80000000n;           // 2^31
const a = 1103515245n;
const c = 12345n;

// Extended gcd for BigInt
function egcd(a, b) {
  if (b === 0n) return { g: a, x: 1n, y: 0n };
  const { g, x: x1, y: y1 } = egcd(b, a % b);
  return { g, x: y1, y: x1 - (a / b) * y1 };
}

// modular inverse (BigInt)
function modInverse(a, m) {
  const { g, x } = egcd(a, m);
  if (g !== 1n) throw new Error('modular inverse does not exist');
  let inv = x % m;
  if (inv < 0n) inv += m;
  return inv;
}
const a_inv = modInverse(a, m);

// Factory that returns an object with shared-state next() and prev()
function makeLCG(seed) {
  // normalize seed -> BigInt
  let init;
  if (seed === undefined || seed === null) {
    init = BigInt(Math.floor(Math.random() * Number(m)));
  } else if (typeof seed === 'number') {
    init = BigInt(Math.floor(seed));
  } else {
    init = BigInt(seed);
  }

  let state = init % m;
  if (state < 0n) state += m;

  return {
    // advance forward, return integer 0..10000
    next() {
      state = (a * state + c) % m;
      return Number((state * 10001n) / m); // maps to 0..100 inclusive
    },
    // step backwards, return integer 0..10000
    prev() {
      state = (a_inv * (state - c)) % m;
      if (state < 0n) state += m;
      return Number((state * 10001n) / m);
    },
    // optional helpers
    getStateRaw() { return state; },
    setStateRaw(s) { state = (BigInt(s) % m + m) % m; }
  };
}

// ------------------ Example usage ------------------
const learn_seed = Math.floor(Math.random() * 10000); // integer seed
const rng = makeLCG(learn_seed);

// END CODE FROM CHATGPT

// File Data
set_0 = ["0tset","1tset","2tset","3tset","4tset","5tset"];
set_1 = ["test0","test1","test2","test3","test4","test5"];
set_size = 6;

// Answer Storing
current_index = 0;
current_question = "";
current_answer = "";

// Pick a question type to be loaded
function nextQuestion() {

  // hides result
  document.getElementById("answer_result").hidden = true;
  document.getElementById("short_answer_textarea").value = "";
  
  // Runs a function question based on random
  r = rng.next();
  if(r < 2500) {
    question0(r);
  } else if (r < 5000) {
    question1(r);
  } else if (r < 7500) {
    question2(r);
  } else if (r <= 10000) {
    question3(r);
  }
}

// Pick a question type to be loaded
function lastQuestion() {
  
  // hides result
  document.getElementById("answer_result").hidden = true;

  // Runs a function question based on random
  r = rng.prev();
  if(r < 2500) {
    question0(r);
  } else if (r < 5000) {
    question1(r);
  } else if (r < 7500) {
    question2(r);
  } else if (r <= 10000) {
    question3(r);
  }
}


// French to English
function question0(question_seed) {
  // Hidden / Not Hidden
  document.getElementById("short_answer_div").hidden = false;
  document.getElementById("multiple_choice_div").hidden = true;

  // Create new LCG
  qRNG = makeLCG(question_seed);
  
  // Based on the next LCG, generate a question within the set of questions
  current_index = qRNG.next() % set_size;
  current_question = set_0[current_index];
  current_answer = set_1[current_index];

  // Set the flashcard
  document.getElementById("flashcard_label").innerHTML = current_question;
}
// English to French
function question1(question_seed) {
  // Hidden / Not Hidden
  document.getElementById("short_answer_div").hidden = false;
  document.getElementById("multiple_choice_div").hidden = true;

  // Create new LCG
  qRNG = makeLCG(question_seed);
  
  // Based on the next LCG, generate a question within the set of questions
  current_index = qRNG.next() % set_size;
  current_question = set_1[current_index];
  current_answer = set_0[current_index];

  // Set the flashcard
  document.getElementById("flashcard_label").innerHTML = current_question;

}

// Multiple Choice English
function question2(question_seed) {
  // Hidden / Not Hidden
  document.getElementById("short_answer_div").hidden = true;
  document.getElementById("multiple_choice_div").hidden = false;

  // Create new LCG
  qRNG = makeLCG(question_seed);
  
  // Based on the next LCG, generate a question within the set of questions
  current_index = qRNG.next() % set_size;
  current_question = set_0[current_index];
  current_answer = set_1[current_index];

  // Set the flashcard
  document.getElementById("flashcard_label").innerHTML = current_question;

  // List of MC Button
  mc_button = [document.getElementById("mc_button_0"),document.getElementById("mc_button_1"),document.getElementById("mc_button_2"),document.getElementById("mc_button_3")];
  // Create Multiple Choice Elements
  for (const i of mc_button) {
    i.value = set_1[qRNG.next() % set_size];
  }

  // Picks a random button to be the right answer
  mc_button[qRNG.next() % 4].value = current_answer
}

// Multiple Choice French
function question3(question_seed) {
  // Hidden / Not Hidden
  document.getElementById("short_answer_div").hidden = true;
  document.getElementById("multiple_choice_div").hidden = false;

  // Create new LCG
  qRNG = makeLCG(question_seed);

  // Based on the next LCG, generate a question within the set of questions
  current_index = qRNG.next() % set_size;
  current_question = set_1[current_index];
  current_answer = set_0[current_index];

  // Set the flashcard
  document.getElementById("flashcard_label").innerHTML = current_question;

  // List of MC Button
  mc_button = [document.getElementById("mc_button_0"),document.getElementById("mc_button_1"),document.getElementById("mc_button_2"),document.getElementById("mc_button_3")];
  // Create Multiple Choice Elements
  for (const i of mc_button) {
    i.value = set_0[qRNG.next() % set_size];
  }

  // Picks a random button to be the right answer
  mc_button[qRNG.next() % 4].value = current_answer

}

// Check Answer Button
function checkAnswer() {
  // Get the text from the text field
  input_answer = document.getElementById("short_answer_textarea").value.trim();

  // Unhides result
  document.getElementById("answer_result").hidden = false;

  // Displays answer
  if (input_answer == current_answer) {
    document.getElementById("answer_result").innerHTML = "Correct!";
    // Goes to next question
    setTimeout(() => {
        nextQuestion();
      }, 1000); // 1000 milliseconds = 1 second
  } else {
    document.getElementById("answer_result").innerHTML = "Incorrect.";
  }
}

// Option 0 Button
function mc_answer(input_answer) {
  // Unhides result
  document.getElementById("answer_result").hidden = false;

  // Displays answer
  if (input_answer == current_answer) {
    document.getElementById("answer_result").innerHTML = "Correct!";
    // Goes to next question
    setTimeout(() => {
        nextQuestion();
      }, 1000); // 1000 milliseconds = 1 second
  } else {
    document.getElementById("answer_result").innerHTML = "Incorrect.";
  }
}

function loadFile(file_name) {

  // Get file
  fetch("/word_list/"+file_name+".txt")
  .then(response => response.text())
  .then(text => {
    // Empty the word sets
    set_0 = [];
    set_1 = [];
    
    // Split and store length
    sets = text.split("\n");
    set_size = sets.length;

    // Split words
    for (const i of sets) {
      words = i.split("|");
      console.log(words);
      console.log(words[0]);
      console.log(words[1]);
      set_0.push(""+words[0].trim());
      set_1.push(""+words[1].trim());
    }

    // Get the next question
    nextQuestion();
  })
}

// Change the set based on the selection
function changedSet(select) {
  if(select.value == "FR 151 Vocab - Chapter 1") {
    loadFile("fr_151_0");
  } else if (select.value == "FR 151 Vocab - Preliminary") {
    loadFile("fr_151_1");
  }
}


// Runs when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
        loadFile("fr_151_1");
        
        // Get a new question
        nextQuestion();
    });