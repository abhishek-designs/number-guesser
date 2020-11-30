// first initalizing the data required for our game
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max), // This should be a random number
  guessLeft = 4;

// Color themes according to the winning or loosing state
const primaryColor = "var(--primary-color)",
  winColor = "var(--win-color)",
  loseColor = "var(--lose-color)";

// Accessing elements from the UI
const guessBtn = document.querySelector(".guess-btn"),
  guessField = document.querySelector("#enter-guess"),
  msgTab = document.querySelector(".msg-tab"),
  minTab = document.querySelector(".min-num"),
  maxTab = document.querySelector(".max-num");
game = document.querySelector(".container");

// Adding functionality to the guess btn
guessBtn.addEventListener("click", guessNum);

// Initializing the default color for our game
document.body.style.backgroundColor = primaryColor;

// Initializing the min and max num into the DOM
minTab.textContent = min;
maxTab.textContent = max;

function guessNum(e) {
  // First we have to convert the inputted value into a number
  let guess = parseInt(guessField.value);

  // Now changing the state of the game according to different conditions
  if (isNaN(guess) || guess < min || guess > max) {
    // If number is not inputted or the num is not between the minimum and the maximum
    // Show the message
    showMsg(`Please enter a number between ${min} and ${max}`, loseColor);
  } else if (guess === winningNum) {
    // If the inputted number is equals to the winning number : WE WIN
    // Show the message
    showMsg("Congrats!! You win. Do you wanna play again ?", winColor);
    // Restart the game
    restartGame();
  } else if (guess !== winningNum) {
    // The answer is wrong the value doesn't match the winning value : WE LOSE
    // Decrease the amount of guesses by one when we lose
    guessLeft--;
    console.log(guessLeft);
    if (guessLeft === 0) {
      // We have zero guesses left we lose the game now play again
      // Show the message
      showMsg("You lose the game! Better luck next time", loseColor);
      // Restart the game
      restartGame();
    } else {
      // We have some guesses left : WE CAN WIN THIS
      // Show the message
      showMsg(
        `Incorrect number! You have ${guessLeft} guess(s) left`,
        primaryColor
      );
    }
  }
}

// This function is used to show the message to the user when any action occured
function showMsg(msg, color) {
  // Empty the input field for user's ease
  guessField.value = "";
  // Appending the message into the tab
  msgTab.innerHTML = `<p class="lead">${msg}</p>`;
  // Change the background color according to the condition
  document.body.style.backgroundColor = color;
  // Pop up the message
  msgTab.style.display = "block";
}

// Function to refresh the game when user play again
function refreshGame(e) {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
}

// Function to restart the game
function restartGame() {
  // Adding the class to the btn to play again (for EVENT DELEGATION)
  guessBtn.classList.add("play-again");
  // // Change the state of the guess button to play again
  guessBtn.value = "Play again";
  // // Also disable the input field
  guessField.disabled = true;
  // Now adding the event listener to the button to refresh the page when starting a new game
  game.addEventListener("mousedown", refreshGame);
}

// // Now the function which generates the random number for the game
function getRandomNum(min, max) {
  // Suppose the number we are finding is between 10 and 15 so min = 10 and max = 15
  // For these we have to multiply the returned rand no. with max no. in which we are finding the rand no.
  // Math.random()*15;
  // As the behaviour of the random method is that pops the value as zero based
  // for eg. if we want to find the rand no. b/w 1 to 10 it gives 0 to 9, So for the above eg it gives 0 to 14
  // So we have to add 1 to it Math.random()*15 + 1 , This will give between 1 to 15
  // If you have to use both max and min value to generate rand number so we have to first substract the min value from the max value
  // 15 - 10 = 5
  // But the issue is if we add 1 also on to it this will give result in between 0 to 4 only
  // To overcome above issue we have to add the min num to rand num also
  // Math.random() * 6 + 10 , as 10 + 6 = 16 this will give rand no. b/w 1 to 15 :)

  let rand = Math.floor(Math.random() * (max - min + 1 + min));
  return rand;
}
