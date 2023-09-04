const game = () => {
    let pScore = 0;
    let cScore = 0;
    let numberOfRounds = 10;
    
    const chooseRound = document.querySelector(".choosing_the_number_of_rounds");
    const match = document.querySelector(".match");
    const score = document.querySelector(".score");
    const finalTablo = document.querySelector(".final");
    const playerScore = document.querySelector(".player-score p");
    const computeScore = document.querySelector(".computer-score p");


    


    // Start the Game
    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");

        playBtn.addEventListener("click", () => {
            introScreen.classList.add("fadeOut");
            chooseRound.classList.add("fadeIn");
        });
    };

    const choosingTheNumberOfRounds = () => {
        const playBtn = document.querySelector(".choosing_the_number_of_rounds button");
        const valueRounds = document.querySelector(".valueRounds");
        const inputRounds = document.querySelector("#round");

        inputRounds.addEventListener("input", (event) => {
            valueRounds.textContent = event.target.value;
        });

        inputRounds.addEventListener("change", (event) => {
            numberOfRounds = event.target.value;
        });

        playBtn.addEventListener("click", () => {
            chooseRound.classList.remove("fadeIn");
            match.classList.add("fadeIn");
            score.classList.add("fadeIn");
        });
    }

    // Restart the Game
    const restartGame = () => {
        const restartBtn = document.querySelector(".final button");

        restartBtn.addEventListener("click", () => {
            pScore = 0;
            cScore = 0;
            playerScore.textContent = "0";
            computeScore.textContent = "0";
            match.classList.add("fadeIn");
            score.classList.add("fadeIn");
            finalTablo.classList.remove("fadeIn");

        });
    };


    // Play Match
    const playMatch = () => {
        const options = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands img")

        hands.forEach(hand => {
            hand.addEventListener("animationend", function() {
                this.style.animation = '';
            });
        });

        // Computer Options
        const computerOptions = ['rock', 'paper', 'scissors'];

        options.forEach(option => {
            option.addEventListener("click", function () {
                
                // Computer Choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                // Player Choice
                // const playerChoice = this.className;

                playerHand.src = `./img/rock2.png`;
                computerHand.src = `./img/rock2.png`;

                setTimeout(() => {
                    compareHands(this.textContent, computerChoice);

                     // Update Image 
                    playerHand.src = `./img/${this.textContent}2.png`;
                    computerHand.src = `./img/${computerChoice}2.png`;
                }, 2000);

                // Animation
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";


            });
        });

        const updateScore = () => {
            playerScore.textContent = pScore;
            computeScore.textContent = cScore;
        
        }

        const compareHands = (playerChoice, computerChoice) => {
            // Update Text
            const winner = document.querySelector(".winner")

            // Checking for a tie
            if (playerChoice === computerChoice) {
                winner.textContent = 'It is a tie';
                return;
            }

            // Check for Rock
            if (playerChoice === "rock") {
                if (computerChoice === "scissors") {
                    winner.textContent = 'Player Wins';
                    pScore++;
                    checkEnding();
                    updateScore();
                    return;
                } else {
                    winner.textContent = 'Computer Wins';
                    cScore++;
                    checkEnding();

                    updateScore();
                    return;
                }
            }

            if (playerChoice === "paper") {
                if (computerChoice === "scissors") {
                    winner.textContent = 'Computer Wins';
                    cScore++;
                    checkEnding();
                    updateScore();
                    return;
                } else {
                    winner.textContent = 'Player Wins';
                    pScore++;
                    checkEnding();
                    updateScore();
                    return;
                }
            }

            if (playerChoice === "scissors") {
                if (computerChoice === "rock") {
                    winner.textContent = 'Computer Wins';
                    cScore++;
                    checkEnding();
                    updateScore();
                    return;
                } else {
                    winner.textContent = 'Player Wins';
                    pScore++;
                    checkEnding();
                    updateScore();
                    return;
                }
            }
        }

        const checkEnding = () => {
            if (pScore === Number(numberOfRounds) || cScore === Number(numberOfRounds)) {
                const finalLabel = document.querySelector(".final h2");
                const smileImg = document.querySelector(".final img");

                score.classList.remove("fadeIn");
                match.classList.remove("fadeIn");
                finalTablo.classList.add("fadeIn");

                if (pScore > cScore) {
                    finalLabel.textContent = 'You are WIN!!!';
                    smileImg.src = './img/win.png';
                } else if (pScore < cScore) {
                    finalLabel.textContent = 'You are LOSE!!!';
                    smileImg.src = './img/lose.png';
                } else {
                    finalLabel.textContent = 'It is a TIE!!!';
                    smileImg.src = './img/tie.png';
                }
            }
        }
    }

    startGame();
    choosingTheNumberOfRounds();
    playMatch();
    restartGame();
};

game();