/* script.js — Lógica compartida para quizzes y resultado
   - Guarda la puntuación en localStorage (quiz_score)
   - Guarda las respuestas por pregunta en localStorage (quiz_answers, objeto)
   - Deshabilita botones después de responder una pregunta
   - Muestra reacciones con aria-live
*/

(function(){
  // Utilidades
  const STORAGE_SCORE_KEY = 'quiz_score';
  const STORAGE_ANS_KEY = 'quiz_answers';

  function getScore(){
    return Number(localStorage.getItem(STORAGE_SCORE_KEY) || 0);
  }
  function setScore(n){
    localStorage.setItem(STORAGE_SCORE_KEY, String(n));
  }
  function getAnswers(){
    return JSON.parse(localStorage.getItem(STORAGE_ANS_KEY) || '{}');
  }
  function setAnswers(obj){
    localStorage.setItem(STORAGE_ANS_KEY, JSON.stringify(obj));
  }

  // Si no hay preguntas en la página, no hacemos nada
  document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    if (!questions || questions.length === 0) return;

    // Restaurar estado: deshabilitar botones si ya respondió
    const answers = getAnswers();

    questions.forEach(qEl => {
      const qid = qEl.dataset.qid;
      const buttons = qEl.querySelectorAll('.ans');
      const reactionEl = qEl.querySelector('.reaction');

      // Si ya respondida en storage, desactivar opciones y mostrar estado
      if (answers && answers.hasOwnProperty(qid)) {
        disableButtons(buttons);
        // Mostrar breve mensaje (no revelar la respuesta correcta)
        reactionEl.textContent = answers[qid] ? 'Respuesta ya registrada ✔' : 'Respuesta ya registrada ✖';
      }

      buttons.forEach(btn => {
        // init aria-disabled
        btn.setAttribute('aria-disabled','false');

        btn.addEventListener('click', (e) => {
          // Previene doble conteo: si ya respondida, ignorar
          const saved = getAnswers();
          if (saved && saved.hasOwnProperty(qid)) return;

          const correct = btn.dataset.correct === 'true';
          // Mostrar reacción
          showReaction(reactionEl, correct);

          // Actualizar score y respuestas almacenadas
          const prevScore = getScore();
          const newScore = correct ? prevScore + 1 : prevScore;
          setScore(newScore);

          saved[qid] = correct;
          setAnswers(saved);

          // Deshabilitar botones para esta pregunta
          disableButtons(buttons);
        });
      });
    });

    // Optional: smooth fade-in for reaction area using aria-live
  });

  // Helper: show reaction text and animation
  function showReaction(el, correct){
    if (!el) return;
    if (correct){
      el.classList.remove('show-wrong');
      el.classList.add('show-correct');
      el.textContent = '¡Correcto!';
    } else {
      el.classList.remove('show-correct');
      el.classList.add('show-wrong');
      el.textContent = '¡No puede ser!';
    }
    // quitar clase después de un tiempo para permitir reanimar si necesario
    setTimeout(() => {
      el.classList.remove('show-correct','show-wrong');
    }, 1400);
  }

  // Helper: deshabilita un conjunto de botones (atributo y estilo)
  function disableButtons(btns){
    btns.forEach(b => {
      b.setAttribute('aria-disabled','true');
      b.style.pointerEvents = 'none';
      // opcional: añadir aria-pressed o similar
    });
  }
})();
