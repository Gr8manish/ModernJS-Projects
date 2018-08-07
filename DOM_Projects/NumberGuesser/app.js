/*
GAME FUNCTION :
- player must guess number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})
      
//Assign UI min and maz
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    if(isNaN(guess) || guess<min || guess>max){
        setMessage(`Please enter anumber between ${min} and ${max}`,'red');
    }

    if(guess === winningNum){
        guessInput.disabled = true;
        guessInput.style.borderColor = 'green';
        gameOver(true,`${winningNum} is correct, YOU WIN!`);
    }else{
        guessesLeft -= 1;
          if(guessesLeft === 0){
              guessInput.disabled = true;
              guessInput.style.borderColor = 'red';
              gameOver(false,`Game Over, you lost. The correct number was ${winningNum}`);
          }else{
              guessInput.style.borderColor = 'red';
              guessInput.value = '';
              setMessage(`${guess} is not correct, ${guessesLeft} guess left`, 'red');
          }
    }
});


// Game Over 
function gameOver(won,msg){
    let color = won===true? 'green':'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;

    guessBtn.value = 'Play Again';
    guessBtn.className = 'play-again';
    setMessage(msg, color);
}

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

function getRandomNumber(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
