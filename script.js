<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🏁 Resultados del Quiz</title>
  <link rel="stylesheet" href="style.css">
  <style>
    .result-container {
      text-align: center;
      padding: 2rem;
      animation: fadeIn 1s ease-in-out;
    }

    .result-container img {
      width: 200px;
      margin: 20px auto;
      border-radius: 1rem;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .result-container h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .result-container p {
      font-size: 1.2rem;
    }

    .back-btn {
      margin-top: 2rem;
      padding: 1rem 2rem;
      background-color: #0078ff;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      transition: 0.3s;
    }

    .back-btn:hover {
      background-color: #005ecc;
      transform: scale(1.05);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body onload="showResult()">

  <div class="result-container">
    <h1 id="result-title">Resultados</h1>
    <img id="result-image" src="" alt="Resultado">
    <p id="result-text"></p>

    <button class="back-btn" onclick="window.location.href='index.html'">🔁 Volver al inicio</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
