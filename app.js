const questionDiv = document.querySelector('.question');
const answersDiv = document.querySelector('.answers');
const questionIndex = document.querySelector('#questionindex');
const scoreAccumulated = document.querySelector('#score');
const progressBarDynamic = document.getElementById('progressDynamic');

var currentIndex = 0;
var questions = [];
var maxQuestion = 10;
var choices = [];
var options = [];
var letters = ['A','B','C','D']
for (let i = 0; i < 4; i++) {
    choices[i] = document.createElement('div');
    choices[i].classList.add('choiceDiv'); 
    let letter = document.createElement('div');
    letter.classList.add('letter');
    letter.innerHTML = `<p>${letters[i]}</p>`;
    choices[i].appendChild(letter);
    options[i] = document.createElement('div');
    options[i].classList.add('optionDiv');
}
var acceptingClick = false;

function Question(ques,answ,rightAnsw) {
    this.ques = ques;
    this.answ = answ;
    this.rightAnsw = rightAnsw;
}

// var answers = [];
// var rightAnswers = [];
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
    .then(res => res.json())
    .then(res => {
        console.log(res.results);
        res.results.map(function(item){
            let theQues = item.question;
            let theRightAnsw = item.correct_answer;
            let unformattedAnsw = [...item.incorrect_answers, theRightAnsw];
            // let randomIndex = Math.floor(Math.random()*4);
            let formattedAnsw = unformattedAnsw.sort(() => 0.5 - Math.random());
            questions.push(new Question(theQues, formattedAnsw, theRightAnsw));
        });
        function initialize() {
            if (currentIndex === 0) {        
                questionDiv.innerHTML = `<p>${questions[0].ques}</p>`;
                for (let i = 0; i < 4; i++) {
                    options[i].innerHTML = `<p>${questions[0].answ[i]}</p>`;
                    choices[i].appendChild(options[i]);
                    answersDiv.appendChild(choices[i]);
                    acceptingClick = true;
                    questionIndex.innerText = `${currentIndex + 1} / ${maxQuestion}`;
                    scoreAccumulated.innerText = point;
                    progressBarDynamic.style.width = `${(currentIndex + 1) *100 / maxQuestion}%`;
                }
            }
        }
        initialize();
    });

// console.log(questions);




answersDiv.addEventListener('click', checkAnswer);
var point = 0;
const bonus = 10;

function checkAnswer(e) {
    if(!acceptingClick) return;
    let choice = e.target;
    // console.log('h')
    // if(choice.classList.contains('choiceDiv') && choice.lastElementChild.innerHTML === `<p>${questions[currentIndex].rightAnsw}</p>`) {
    //     // alert('You right');
    //     point++;
    //     currentIndex++;
    //     choice.classList.add('correct')
    //     setTimeout(function{
    //         choice.classList.remove('correct');
    //         nextQuestion();
    //     }, 1000)
    // } else if(choice.classList.contains('choiceDiv') && choice.lastElementChild.innerHTML != `<p>${questions[currentIndex].rightAnsw}</p>`) {
    //     alert('You wrong');
    //     // point++;
    //     currentIndex++;
    //     nextQuestion();        
    // }
    if(choice.classList.contains('choiceDiv')) {
        acceptingClick = false;
        let option = choice.lastElementChild;
        if(option.innerHTML === `<p>${questions[currentIndex].rightAnsw}</p>`) {
            // alert('You right');
            // point++;
            scoreAccumulated.innerText = getScore(bonus);
            currentIndex++;
            choice.classList.add('correct')
            setTimeout(function(){
                choice.classList.remove('correct');
                nextQuestion();
            }, 1000);
        } else {
            // alert('You wrong');
            currentIndex++;
            choice.classList.add('incorrect')
            setTimeout(function(){
                choice.classList.remove('incorrect');
                nextQuestion();
            }, 1000);    
        }
    }
}

function nextQuestion() {
    if( currentIndex+1 > maxQuestion) {
        localStorage.setItem('recentScore', point);
        return window.location.assign('end.html');
    }
    questionDiv.innerHTML = `<p>${questions[currentIndex].ques}</p>`;
    for (let i = 0; i < 4; i++) {
        options[i].innerHTML = `<p>${questions[currentIndex].answ[i]}</p>`;
    }
    acceptingClick = true;
    questionIndex.innerText = `${currentIndex + 1} / ${maxQuestion}`;
    progressBarDynamic.style.width = `${(currentIndex + 1) * 100 / maxQuestion}%`;
    console.log((currentIndex + 1) / maxQuestion)
}

var getScore = num => {
    point += num;
    return point;
}

console.log(currentIndex);
