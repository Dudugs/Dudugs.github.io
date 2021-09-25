const questions = [
    {
        question: "When's this map from?",
        optionA: "1936",
        optionB: "1940",
        optionC: "1937",
        optionD: "1938",
        correctOption: "optionD",
		source: "maps/1938.png"
    },

    {
        question: "When's this map from?",
        optionA: "1444",
        optionB: "1453",
        optionC: "1513",
        optionD: "1475",
        correctOption: "optionB",
		source: "maps/1453.jpg"
    },

    {
        question: "When's this map from?",
        optionA: "1914",
        optionB: "1913",
        optionC: "1901",
        optionD: "1910",
        correctOption: "optionD",
		source: "maps/1910.jpg"
    },

    {
        question: "When's this map from?",
        optionA: "1990",
        optionB: "1967",
        optionC: "1974",
        optionD: "1975",
        correctOption: "optionC",
		source: "maps/1974.png"
    },
	

    {
        question: "What month of 1919 is this from?",
        optionA: "January",
        optionB: "May",
        optionC: "September",
        optionD: "December",
        correctOption: "optionA",
		source: "maps/jan1919.png"
    }
]

var numberOfQuestions = 5;


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length < numberOfQuestions) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("next-button").style.display = "none";
    document.getElementById("question-number").innerHTML = questionNumber;
    document.getElementById("player-score").innerHTML = playerScore;
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
	document.getElementById("display-image").src = currentQuestion.source;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //gets correct radio input with correct answer
            correctOption = option.labels[0].id
        }
		//locks
		option.disabled = true;
    })


    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
	document.getElementById("next-button").style.display = "block";
}



//called when the next button is called
function handleNextQuestion() {
    unCheckRadioButtons()
    if (indexNumber < numberOfQuestions) {
        NextQuestion(indexNumber)
    }
    else {
        handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
    }
    resetOptionBackground()
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
		options[i].disabled = false;
    }
}

// endgame func
function handleEndGame() {

    const playerGrade = (playerScore / numberOfQuestions) * 100

    //data to display to score board
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}
