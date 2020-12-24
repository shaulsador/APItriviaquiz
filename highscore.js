const highScores = JSON.parse(localStorage.getItem('highestScores')) || [];
const scoreList = document.getElementById('highscores');

scoreList.innerHTML = highScores.map(
    score => `<li class='eachHighScore'>${score.name} --- ${score.score}</li>`
    ).join('');