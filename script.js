

function quiz_init(){


    var allQuestions = [

        {
           question: "Who is Prime Minister of the United Kingdom?",
           choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
           correctAnswer:0  },
        {
           question: "What is Britain's 2nd largest city?",
           choices: ["Manchester", "London", "Birmingham", "Tony Blair"],
           correctAnswer:2  },
        {
           question:"Which sport is the most popular in the UK",
           choices: ["Basketball", "Football", "Watching TV", "Tony Blair"],
           correctAnswer:1  },
        {
           question:"The UK is made up of how many countries",
           choices: ["2", "3", "4", "Tony Blair"],
           correctAnswer:2  }
    ];


    // setting up some vars
    var userChoice = [];
    var div = $('#quizDiv');
    var nButton = $('#nButton');
    var bButton = $('#bButton');
    var questionHeading = $("h2");
    var currentQuestion = 0;
    var score = 0;
    var prefix = "steveQuizStorage"
    // var valueToSave = [];
    // var retrievedInt = [];
   
   


    // display the questions
    function showQuestion(){
    var displayQuestion = allQuestions[currentQuestion].question;
    var txt = document.createTextNode(displayQuestion);
    var questionNo = document.createTextNode("Question " + (currentQuestion+1) );
    var br = document.createElement('br');
        

        questionHeading.append(questionNo).hide().fadeIn(500);
        questionHeading.append(br);
        questionHeading.append(txt);
        

        

    }

    // display the choices
    function showChoices() {
        var displayChoices = allQuestions[currentQuestion].choices;
        for (var i = 0; i < displayChoices.length; i++) {
            var lb = document.createElement('label');
            var inp = document.createElement('input');
            var br = document.createElement('br');

            inp.setAttribute('type', 'radio');
            inp.setAttribute('name', 'answer');
            inp.setAttribute('value', i);
            lb.appendChild(inp);
            lb.appendChild(document.createTextNode(displayChoices[i]));

            div.append(lb);
            div.append(lb).children(':last').hide().fadeIn(500);
            div.append(br);
        

        }
    }


    // empty and reload the page
    function loadPages() {
      questionHeading.empty(); 
      div.empty();
      showQuestion();
      showChoices();
      showButtons();
    }

    // show back button
    function showButtons() {
		if (currentQuestion > 0) {
    		bButton.show();
      }
    		else if (currentQuestion == 0){
          bButton.hide();
        }
    }

  


    // A user clicks the back button
    bButton.on('click', function() {
      userChoice.pop();
      currentQuestion--;
      loadPages();

      // showAnswer();
      // valueToSave.pop();
      // retrievedInt.pop();
      // retrievedObject.pop();
      }
    )

    // a user clicks the next button (+ client validation)
    nButton.on('click', function() {
        if ($('input[name=answer]:checked', '#quizDiv').length === 0){alert("please select an answer");} //if the user has forgotten to choose..
        else {
        // rememberAnswer();
        currentAnswer = ($('input[name=answer]:checked', '#quizDiv').val()); // grab the users choice
        userChoice.push(currentAnswer); // push it to the array
        currentQuestion++;}
        


        // If there are no more questions
        if (currentQuestion < allQuestions.length) {

        		loadPages();
    	 } // finish and disable button
         else {
         		
                questionHeading.remove(); // clear the page
                div.remove();
                nButton.remove();// disable the button
                bButton.remove();
                for (var i = 0; i < allQuestions.length; i++) {
                	if (userChoice[i] == allQuestions[i].correctAnswer){score++;}   //Iterate through the arrays, compare choice and correct answer, total score
                  };

                percentScore = Math.floor(((score) / (allQuestions.length))* 100); // get a % score
                // create the score page and give the user a chance to reload
                 $("<p>", {
                      id: 'finalScore', text: 'Your final score is '
                         })
                        .appendTo("body")
                        .append(score)
                        .append(" out of ")
                        .append(allQuestions.length);

                 $("<h3>", {
                      id: 'finalPercent', text: "That's "
                         })
                        .appendTo("body")
                        .append(percentScore + "%");

                 $("<button>", {
                      id: 'reloading', name: 'reloading', value: 'reloading', text: "Play again"
                         })
                         .appendTo("body")
                         .on('click', function() {
                               location.reload();
                          });

       }

     });



showQuestion();
showChoices();
showButtons();


}
quiz_init();




  // function rememberAnswer() {
  // 		console.log(valueToSave);
  // 		valueToSave.push($("input[name=answer]:checked").val());
  // 		console.log(valueToSave);
  //   	// var valueToSave = [$("input[name=answer]:checked").val()];
  //       localStorage.setItem('vall', JSON.stringify(valueToSave));
  //       var savedValue = localStorage.getItem('vall');
  //       console.log(valueToSave);
  //      }

  //   function showAnswer(savedValue) {
    	
  //   	retrievedObject = $.parseJSON(localStorage.getItem('vall')); // very important - decodes JSON data into string/int for use
  //   	// console.log (typeof retrievedObject[0]);
  //   	for (var i = 0; i < retrievedObject.length; i++) {
  //   		console.log(retrievedObject[i]);
  //   		retrievedInt.push(parseInt(retrievedObject[i]));
    		
  //   	};
  //   	console.log(retrievedObject);
  //   	console.log(retrievedInt);
  //   	splicedObject = retrievedInt.slice(retrievedInt.length -1)
  //   	console.log(splicedObject);
  //   	$('input[name=answer][value=' + splicedObject + ']').attr('checked', 'checked');
  //   	retrievedInt.pop();
  //   	retrievedObject.pop();
    	
    
  //   }