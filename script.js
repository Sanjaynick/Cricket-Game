var about = document.querySelector('.about');
var playerScore = document.querySelector('.player-score');
var computeScore = document.querySelector('.computer-score');
var targetScore = document.querySelector('.target-score');
var target = document.querySelector('.target')
var statusVal = document.querySelector('.status');
var restartBtn = document.querySelector('.reset');
var numberBtn = document.querySelectorAll(' .btn');

var battingSide = 'player';
var computerScoreVal = 0;
var playerScoreVal = 0;
var targetScoreVal = 0;
var playerOut = false;
var computerOut = false;

function randomNumberGenerate(){
    return Math.floor(Math.random()*6)+1;
}

function gameOver(winner){
    if(winner == 'player'){
        about.textContent = "Player Wins"
        statusVal.textContent = `Result - Player : ${playerScoreVal} || Computer : ${computerScoreVal}`
        statusVal.style.display = 'block';
    }
    else if(winner == 'computer'){
        about.textContent = "Computer Wins"
        statusVal.textContent = `Result - Player : ${playerScoreVal} || Computer : ${computerScoreVal}`
        statusVal.style.display = 'block';
    }
    else{
        about.textContent = "Match Tie"
        statusVal.textContent = `Result - Player : ${playerScoreVal} || Computer : ${computerScoreVal}`
        statusVal.style.display = 'block';
    }
}

function playerChoose(playerChoice){
    if(playerOut) return
    const computerChoice = randomNumberGenerate()
    if(playerChoice === computerChoice){
         playerOut = true;
         battingSide = 'computer'
         targetScoreVal = playerScoreVal +1
         targetScore.textContent = targetScoreVal;
         about.textContent = `Player Out !!!!!!! `;
         statusVal.textContent = `Player Score ${playerScoreVal} || Computer need's ${targetScoreVal} Runs`
        target.style.display = 'flex'
        statusVal.style.display = 'block';
         
    }else{
         playerScoreVal += playerChoice
       playerScore.textContent = playerScoreVal
       statusVal.textContent = `Player Hit : ${playerChoice}  || Computer Bowled : ${computerChoice}`
       statusVal.style.display = 'block';
    }
}

function computerChoose(playerChoice){
    if(computerOut) return
    const computerChoice = randomNumberGenerate()
    about.textContent = "Computer Batting !!!!"
    if(computerChoice === playerChoice){
        computerOut = true;
        if(computerScoreVal >= targetScoreVal){
            gameOver('computer')
            restartBtn.style.display = 'block'
        }else{
            gameOver('player')
            restartBtn.style.display = 'block'
        }
    }else{
         computerScoreVal += computerChoice
       computeScore.textContent = computerScoreVal
        statusVal.textContent = `Computer Hit : ${computerChoice}  || Player Bowled : ${playerChoice}`
        statusVal.style.display = 'block';
       if(computerScoreVal >= targetScoreVal){
        gameOver('computer')
        restartBtn.style.display = 'block'
       }
      console.log(computerChoice)
    }
}



function playerChoiceHandle(event){
    var playerChoice = Number(event.target.dataset.value)
    if(battingSide === 'player'){
        playerChoose(playerChoice)
        }
        else{
            computerChoose(playerChoice)
        }
    
}

numberBtn.forEach(button => {
button.addEventListener('click', playerChoiceHandle);
})


restartBtn.addEventListener('click', () => {
    playerScoreVal = 0;
    computerScoreVal = 0;
    targetScoreVal = 0;
    target.style.display = 'none'
    restartBtn.style.display = 'none'
    about.textContent = "You Are Batting";
    playerScore.textContent = 0;
    computeScore.textContent = 0;
    targetScore.textContent = 0;
    statusVal.style.display = 'none';
    playerOut = false;
    computerOut = false;
    battingSide = 'player';
})

