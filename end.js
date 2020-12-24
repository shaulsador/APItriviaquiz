const usernameInput = document.querySelector('form input');
const submitBtn = document.querySelector('button');
const finalScore = document.getElementById('finalScore');
const recentScore = localStorage.getItem('recentScore');
const highScore = JSON.parse(localStorage.getItem('highestScores')) || [];
const MAXSCORES = 5;
finalScore.innerText = recentScore;

usernameInput.addEventListener('keyup', () => {
    submitBtn.disabled = !usernameInput.value;
});

function submitScore(e) {
    // console.log('clicked');
    e.preventDefault();
    const scoreSubmitted = {
        score: recentScore,
        name: usernameInput.value
    };
    highScore.push(scoreSubmitted);
    if(highScore[MAXSCORES-1]) {
        if(scoreSubmitted.score == highScore[MAXSCORES-1].score) {
            highScore[MAXSCORES-1] = scoreSubmitted;
        } 
    }
    highScore.sort((a,b) => b.score - a.score);
    highScore.splice(MAXSCORES);
    localStorage.setItem('highestScores', JSON.stringify(highScore));
    window.location.assign('highscore.html');
    console.log(highScore);
}