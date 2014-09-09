/**
 * Author: Steve Collins
 * Email: stephen@beesmartdesign.co.uk
 * Date: 23/05/2014
 * 
 */

/* Dynamic JS & jQuery quiz. From the course: http://javascriptissexy.com/how-to-learn-javascript-properly/
*
*  This page contains the primary quiz functionality that's initiated from cookie.js 
*
 */

function quiz_init() {

     
      // setting up/caching some vars
        
        var userChoice = [];
        var div = $('#quizDiv');
        var nButton = $('#nButton');
        var bButton = $('#bButton');
        var questionHeading = $("h2");
        var currentQuestion = 0;
        var score = 0;

        // empty and reload the page for new questions
       function loadPages() {
            questionHeading.empty();
            div.empty();
            showQuestion();
            showChoices();        
            showButtons();
        }

        // display the iterative questions
        function showQuestion() {
            var displayQuestion = allQuestions[currentQuestion].question;
            var txt = document.createTextNode(displayQuestion);
            var questionNo = document.createTextNode("Question " + (currentQuestion + 1));
            var br = document.createElement('br');


            questionHeading.append(questionNo).hide().fadeIn(500);
            questionHeading.append(br);
            questionHeading.append(txt);

        }

        // display the iterative choices
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

        // grab the users choice of radio button - (in case they wish to go back a page)
        function RadionButtonSelectedValue(name, SelectedValue) {
        $('input[name="' + name+ '"]').val([SelectedValue]);
        }


        // show back button (except for the last page)
        function showButtons() {
            if (currentQuestion > 0) {
                bButton.show();
            }
            else if (currentQuestion == 0) {
                bButton.hide();
            }
        }


        /* A user clicks the back button, de-increment question count and reload.
           (say we're on Q3, we click back, Q2 is shown, we grab the users previous 
            answer to Q2 as an integer. Use the function show this answer value as
            a radio button choice, then delete the outdated answer from the array.*/

        bButton.on('click', function () {
                
                currentQuestion--;
                loadPages();    
                var lastUserChoice = userChoice[userChoice.length - 1];
                RadionButtonSelectedValue("answer", lastUserChoice)
                userChoice.pop();
            }
        )

        /* a user clicks the next button (+ client validation)
           Log their answer. Roll on if their are more Q's. 
        */
        nButton.on('click', function () {
            if ($('input[name=answer]:checked', '#quizDiv').length === 0) {
                alert("please select an answer");
            } 
            else {
                logAnswer();
            }

            // If there are more questions
            if (currentQuestion < allQuestions.length) {

                loadPages();
            } // finish and disable button
            else {
                totalScorePage()
            }

        });


        function logAnswer(){
            currentAnswer = ($('input[name=answer]:checked', '#quizDiv').val()); // grab the users choice
            userChoice.push(currentAnswer); // push it to the array
            currentQuestion++;
        }

        function totalScorePage (){
            questionHeading.remove(); // clear the page
                div.remove();
                nButton.remove();// disable the buttons
                bButton.remove();
                for (var i = 0; i < allQuestions.length; i++) {
                    if (userChoice[i] == allQuestions[i].correctAnswer) {
                        score++;
                    }   //Iterate through the arrays, compare choice and correct answer, total score
                };

                percentScore = Math.floor(((score) / (allQuestions.length)) * 100); // get a % score
                // create the score page and give the user a chance to reload
                $("<p>", {
                    id: 'thankYou', text: 'Thanks for taking the quiz '
                })
                    .appendTo("body")

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
                    .on('click', function () {
                        location.reload();
                    });
        }


        showQuestion();
        showChoices();
        showButtons();


    }

getQuestions(); // grab the questions stored in the JSON file


