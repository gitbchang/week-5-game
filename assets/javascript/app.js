$(document).ready(function(){

	// variable that will hold 30 secs
	var timeLeft = 10;
	// variable which holds our setInterval, clear this to stop timer
	var timer;
	var answerValue;
	// Load first question, when start button clicked
	$(document).on("click", "#start", function(e){
		triviaGame.loadQuestion();
	});
	// check if answer is correct when answer button clicked
	$(document).on("click", ".answer-button", function(e){
		triviaGame.clicked(e);
		
	});

	//Restart the game
	$(document).on("click", "#startOver", function(e){
		triviaGame.loadQuestion();
	});

	// QUESTONS
	var triviaQuestions = [
		{
			question: "Which number is the largest?",
			answers: [1, 2, 3, 4],
			correctAnswer: 4,
			image: "null.jpg"
		},
		{
			question: "Which color is red?",
			answers: ["red", "black", "blue", "green"],
			correctAnswer: "red",
			image: "null.jpg"
		}]; // end of triviaQuestions

	var triviaGame = {
		questions: triviaQuestions,
		currentQuestion:0,
		counter: timeLeft,
		correct:0,
		incorrect:0,
		countDown: function(){
			triviaGame.counter--;
			$(".timerArea").html("<h3>Time Remaining: " + triviaGame.counter + "</h3>");
			if(triviaGame.counter === 0){
				console.log("Times Up");
				triviaGame.timeUp();
				triviaGame.wrongAnswer();
				//TO DO call time up function
			}
		},
		loadQuestion: function(){
			//this will hold our setInterval, clearInterval this variable to stop the timer
			$(".timerArea").html("<h3>Time Remaining: " + 10 + "</h3>");
			timer = setInterval(triviaGame.countDown, 1000);
			$(".questionAnswerArea").html("<h3>" + triviaQuestions[this.currentQuestion].question + "</h3>");
			for (var i = 0; i < triviaQuestions[this.currentQuestion].answers.length; i++){
				var newAnswerButton = $("<button>");
				newAnswerButton.text(triviaQuestions[triviaGame.currentQuestion].answers[i]);
				newAnswerButton.addClass("answer-button");
				newAnswerButton.addClass("btn btn-primary");
				newAnswerButton.attr("data-name", triviaQuestions[triviaGame.currentQuestion].answers[i]);
				//How to have a new line for each button?
				// newAnswerButton.addClass("col-md-12");
				$(".questionAnswerArea").append(newAnswerButton);

				// $(".questionAnswerArea").append("<p><button class = 'answer-button'" + "'data-name=" + triviaQuestions[this.currentQuestion].answers[i] + ">" + 
				// 	triviaQuestions[this.currentQuestion].answers[i] + "</button></p>" );
			}
		},

		nextQuestion: function(){
			triviaGame.counter = timeLeft;
			$(".timerArea").html("<h3>Time Remaining: " + triviaGame.counter + "</h3>");
			triviaGame.currentQuestion++;
			timeLeft = 10;
			triviaGame.loadQuestion();
		},

		timeUp: function(){
			clearInterval(timer);


		},
		clicked: function(e){
			clearInterval(timer);
			// console.log("correct value from triviaQuestions: " + triviaQuestions[this.currentQuestion].correctAnswer);
			// console.log("button value " + $(e.target).data("name"));
			
			if($(e.target).data("name") === triviaQuestions[this.currentQuestion].correctAnswer){
				console.log("CORRECT ANSWER!");
				triviaGame.correctAnswer();

			}
			else {
				console.log("WRONG ANSWER");
				triviaGame.wrongAnswer();
			}
		},

		correctAnswer: function(){
			triviaGame.correct++;
			$(".questionAnswerArea").html("<h3>That is correct!</h3>");

			if(triviaGame.currentQuestion === triviaQuestions.length-1){
				setTimeout(triviaGame.scoreScreen, 3000);
			}
			else {
				setTimeout(triviaGame.nextQuestion, 3000);
			}

		},

		wrongAnswer: function(){
			triviaGame.incorrect++;
			$(".questionAnswerArea").html("<h3>Nope!</h3>" + "<p>The Correct Answer was " + triviaQuestions[this.currentQuestion].correctAnswer + "</p>");
			

			if(triviaGame.currentQuestion === triviaQuestions.length-1){
				setTimeout(triviaGame.scoreScreen, 3000);
			}
			else {
				setTimeout(triviaGame.nextQuestion, 3000);
			}
		},

		scoreScreen: function(){
			$(".questionAnswerArea").html("<h3>Thanks for playing. Here's your final score!</h3>");
			$(".questionAnswerArea").append("<p>Correct Questions: " + triviaGame.correct + "</p>");
			$(".questionAnswerArea").append("<p>Incorrect Questions: " + triviaGame.incorrect + "</p>");
			$(".questionAnswerArea").append("<br><button id='startOver' class='btn btn-primary'>Start Over?</button>")
		},

		newGame: function(){
			triviaGame.correct = 0;
			triviaGame.incorrect = 0;
			triviaGame.counter = timeLeft;
			timeLeft = 10;
			triviaGame.currentQuestion = 0;
			triviaGame.loadQuestion();
		}



	}; // end of triviaGame

}); // end of document ready