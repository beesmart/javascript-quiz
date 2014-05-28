/*global $:false */

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
           correctAnswer:1  }
    ];


    // setting up some vars
    var userChoice = [];
    var div = $('#quizDiv');
    var nButton = $('#nButton');
    var questionHeading = $("h2");
    var currentQuestion = 0;
    var score = 0;



    // display the questions
    function showQuestion(){
    var displayQuestion = allQuestions[currentQuestion].question;
    var txt = document.createTextNode(displayQuestion);
    var questionNo = document.createTextNode("Question " + (currentQuestion+1) );
    var br = document.createElement('br');
        questionHeading.append(questionNo);
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
            div.append(br);


        }
    }

    // the button event
    nButton.on('click', function() {
        if ($('input[name=answer]:checked', '#quizDiv').length === 0){alert("please select an answer");} //if the user has forgotten to choose..
        else {
        currentAnswer = ($('input[name=answer]:checked', '#quizDiv').val()); // grab the users choice
        userChoice.push(currentAnswer); // push it to the array
        if (userChoice[currentQuestion] == allQuestions[currentQuestion].correctAnswer){score++;} //compare choice and correct answer

        currentQuestion++;}

        // clicking onwards
        if (currentQuestion < allQuestions.length) {
            questionHeading.empty();
            div.empty();
            showQuestion();
            showChoices();

     } // finish and disable button
         else {
                questionHeading.remove(); // clear the page
                div.remove();
                nButton.remove();// disable the button
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











