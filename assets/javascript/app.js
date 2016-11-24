$(document).ready(function(){

	// variable that will hold 30 secs
	var timeLeft = 30;
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
		triviaGame.newGame();
		
	});

	// QUESTONS
	var triviaQuestions = [
		{
			question: "In the second season, Michael treats the office staff to a 'booze cruise' in freezing January weather so he can perform motivational speaking. When Michael becomes frustrated that nobody is listening to him, what false allegation does he exclaim to get everyone's attention?",
			answers: ["The sky is falling", "Dwight fell overboard", "The booze is gone", "The ship is sinking"],
			correctAnswer: "The ship is sinking",
			image: "assets/images/michael-scott-resized.jpg"
		},
		{
			question: "What ringtone song played repeatedly on Andy's cell phone when Jim hid it in the ceiling at the office?",
			answers: ["Another Brick in the Wall", "867-5309/Jenny", "Can't Touch This", "Rockin' Robin"],
			correctAnswer: "Rockin' Robin",
			image: "assets/images/andy-punches.gif"
		},
		{
			question: "What was the name of Angela's sick cat that Dwight killed?",
			answers: ["Angel Tail", "Sprinkles", "Mr. Longwhiskers", "Princess Puss"],
			correctAnswer: "Sprinkles",
			image: "assets/images/angela-cat.gif"
		},
		{
			question: "Pam once participated in an art exhibit, which went badly. As she was leaving, Michael showed up and bought her drawing of their office building. What medium did Pam use to create this masterpiece?",
			answers:["oil paint", "Pen-and-ink", "Charcoal", "Crayons"],
			correctAnswer: "Crayons",
			image: "assets/images/pam-nice.gif"
		},
		{
			question: "When Andy was inviting everyone at the office to see him perform in the live show 'Sweeney Todd', Dwight declined by saying:",
			answers: ["I'll be busy washing my hair.", "The beets are ripe at Schrute Farms, and beets wait for no man.", "Last time I went to the theater a man dressed as a cat sat on my lap.", "It is illogical to observe humans attempt to dance and sing with merriment."],
			correctAnswer: "Last time I went to the theater a man dressed as a cat sat on my lap.",
			image: "assets/images/dwight.gif"
		},
		{
			question: "When Dwight was brutally pummelling Jim with snowballs indoors, he warned Jim that he had a _____ for everybody in the office.",
			answers: ["Snow cone", "Bottle of beet juice", "Pen", "Wig"],
			correctAnswer: "Wig",
			image: "assets/images/dwight-wig.gif"
		},
		{
			question: "When a new manager was installed to oversee the Dunder Mifflin Scranton office, Michael quit and opened his own paper company. What was the name of this enterprise?",
			answers: ["Scranton Paper Plus", "Scraples", "Michael Scott Paper Company", "Paper R Us"],
			correctAnswer: "Michael Scott Paper Company",
			image: "assets/images/ms-paper.gif"
		},
		{
			question: 'The fictional Scranton street address of "The Office" is 1725 Slough Road. What is the significance of "Slough?"',
			answers: ["It's the name of the street where Steve Carell grew up", "The word describes a state of moral degradation", 'Slough is the location of the original British show, "The Office"', "It was Phyllis' maiden name"],
			correctAnswer: 'Slough is the location of the original British show, "The Office"',
			image: "assets/images/michael-scott-resized.jpg"
		}]; // end of triviaQuestions

	var triviaGame = {
		questions: triviaQuestions,
		currentQuestion:0,
		counter: timeLeft,
		correct:0,
		incorrect:0,
		countDown: function(){
			if(triviaGame.counter > 0){
				triviaGame.counter--;
			$(".timerArea").html("<h3>Time Remaining: " + triviaGame.counter + "</h3>");
			if(triviaGame.counter === 0){
				console.log("Times Up");
				triviaGame.timeUp();
				triviaGame.wrongAnswer();
				//TO DO call time up function
			}
			}

		},
		loadQuestion: function(){
			//this will hold our setInterval, clearInterval this variable to stop the timer
			$(".timerArea").html("<h3>Time Remaining: " + 30 + "</h3>");
			timer = setInterval(triviaGame.countDown, 1000);
			$(".questionAnswerArea").html("<h3>" + triviaQuestions[this.currentQuestion].question + "</h3>");
			for (var i = 0; i < triviaQuestions[this.currentQuestion].answers.length; i++){
				var newAnswerButton = $("<button>");
				newAnswerButton.text(triviaQuestions[triviaGame.currentQuestion].answers[i]);
				newAnswerButton.addClass("answer-button");
				newAnswerButton.addClass("btn btn-primary");
				newAnswerButton.attr("data-name", triviaQuestions[triviaGame.currentQuestion].answers[i]);
				//How to have a new line for each button?
				newAnswerButton.addClass("col-md-12");
				$(".questionAnswerArea").append(newAnswerButton);

				// $(".questionAnswerArea").append("<p><button class = 'answer-button'" + "'data-name=" + triviaQuestions[this.currentQuestion].answers[i] + ">" + 
				// 	triviaQuestions[this.currentQuestion].answers[i] + "</button></p>" );
			}
		},

		nextQuestion: function(){
			triviaGame.counter = timeLeft;
			$(".timerArea").html("<h3>Time Remaining: " + triviaGame.counter + "</h3>");
			triviaGame.currentQuestion++;
			timeLeft = 30;
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
			$(".questionAnswerArea").append('<img src="' + triviaQuestions[this.currentQuestion].image + '">')

			if(triviaGame.currentQuestion === triviaQuestions.length-1){
				setTimeout(triviaGame.scoreScreen, 4000);
			}
			else {
				setTimeout(triviaGame.nextQuestion, 4000);
			}

		},

		wrongAnswer: function(){
			triviaGame.incorrect++;
			$(".questionAnswerArea").html("<h3>Nope!</h3>" + "<p>The Correct Answer was " + triviaQuestions[this.currentQuestion].correctAnswer + "</p>");
			$(".questionAnswerArea").append('<img src="' + triviaQuestions[this.currentQuestion].image + '">')

			if(triviaGame.currentQuestion === triviaQuestions.length-1){
				setTimeout(triviaGame.scoreScreen, 4000);
			}
			else {
				setTimeout(triviaGame.nextQuestion, 4000);
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
			// timeLeft = 10;
			triviaGame.currentQuestion = 0;
			triviaGame.loadQuestion();
		}



	}; // end of triviaGame

}); // end of document ready