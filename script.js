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
    var currentQuestion = 0;
    var txt = "";


    // display the 1st question
    function showQuestion(){
    var displayQuestion = allQuestions[currentQuestion].question;
    var txt = document.createTextNode(displayQuestion);
        $("h2").append(txt);

    }


    // display the first choices
    var displayChoices = allQuestions[0].choices;
    for(var i =0; i < displayChoices.length; i ++){
        var lb = document.createElement('label');
        var inp = document.createElement('input');

        inp.setAttribute('type', 'radio');
        inp.setAttribute('name', 'answer');
        inp.setAttribute('value', i);
        lb.appendChild(inp);
        lb.appendChild(document.createTextNode(displayChoices[i]));
        div.append(lb);

        }
        div.append(lb); //not sure why I have to repeat this?

    // the button event
    nButton.on('click', function(){

    if (currentQuestion <= allQuestions.length){
        currentQuestion++;
        $( "h2" ).empty();
        showQuestion(currentQuestion);
        console.log(allQuestions.length);


    }   else { document.getElementById("nButton").disabled = true; }

        console.log(currentQuestion);

        // log the selected choice
      alert($('input[name=answer]:checked', '#quizDiv').val())

     });

showQuestion(currentQuestion);









