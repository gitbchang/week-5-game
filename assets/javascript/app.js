$(document).ready(function(){

	// variable that will hold 30 secs
	var timeLeft = 10;
	// variable that will hold time until next question
	var timeBetween = 5;
	// Load first question, when start button clicked
	$(document).on("click", "#start", function(e){
		triviaGame.loadQuestion();
	});
	// check if answer is correct when answer button clicked
	$(document).on("click", ".answer-button", function(e){
		triviaGame.clicked(e);
	});

	// QUESTONS
	var triviaQuestions = [
		{
			question: "Which number is the largest?",
			answers: ["1", "2", "3", "4"],
			correctAnswer: "4",
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
				//TO DO call time up function
			}
		},
		loadQuestion: function(){
			//this will hold our setInterval, clearInterval this variable to stop the timer
			timer = setInterval(triviaGame.countDown, 1000);
			$(".questionArea").html("<h3>" + triviaQuestions[this.currentQuestion].question + "</h3>");
			for (var i = 0; i < triviaQuestions[this.currentQuestion].answers.length; i++){
				$(".questionArea").append("<p><button class = 'answer-button'" + "'data-name=" + triviaQuestions[this.currentQuestion].answers[i] + ">" + 
					triviaQuestions[this.currentQuestion].answers[i] + "</button></p>" );
			}
		},

		timeUp: function(){
			clearInterval(timer);


		},
		clicked: function(e){
			clearInterval(timer);
			console.log(triviaQuestions[this.currentQuestion].correctAnswer);

			console.log($(e.target).data("name"));
			if($(e.target).data("name") === triviaQuestions[this.currentQuestion].correctAnswer){
				console.log("CORRECT ANSWER!");
			}
			else {
				console.log("WRONG ANSWER");
			}
		}




	}; // end of triviaGame

}); // end of document ready