function checkAnswer(button, correcto) {
  const question = button.parentElement;
  const buttons = question.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);

  if (correcto) {
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
  }
}
