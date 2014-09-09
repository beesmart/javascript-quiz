/**
 * Author: Steve Collins
 * Email: stephen@beesmartdesign.co.uk
 * Date: 23/05/2014
 * 
 */

/* Dynamic JS & jQuery quiz. From the course: http://javascriptissexy.com/how-to-learn-javascript-properly/
*
*  The cookie object and methods. Used for setting and unsetting usernames.
*
 */ 


var CookieUtil = {

    get: function (name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd;

        if (cookieStart > -1){
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }

        return cookieValue;
    },

    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }

        if (path) {
            cookieText += "; path=" + path;
        }

        if (domain) {
            cookieText += "; domain=" + domain;
        }

        if (secure) {
            cookieText += "; secure";
        }

        document.cookie = cookieText;
    },

    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    }
};

/*
    The following deals with setting and unsetting the usernames. And finally
    initiates the quiz.

*/

$(document).ready(function() {

    // set up our vars

    var doc = document;
    var welcomeP = $("#welcomeUser");
    var changeUserP = $("#changeUserText");
    var nameContainer =  $("#nameContainer");
    var submitName = $("#submitName");
    var changeUserButton = $("#changeUserButton")
    var userNameDisplay = $("#userNameDisplay")
    var loggedInBox = $('#loggedIn')
    var nButton = $('#nButton');
    var bButton = $('#bButton');
    var div = $('#quizDiv');
    username = localStorage.getItem("user");

// Hide these elements from new users
loggedInBox.hide()
nButton.hide()
bButton.hide()
div.hide()

    // This function fires if the user has not stored a cookie, i.e they are new to the quiz
    submitName.click(function () {
        //collect userName and password entered by users
        var usernameInput = $("#username").val();
        localStorage.setItem("user", usernameInput);

        // Set Cookie
        CookieUtil.set('name', usernameInput); 
        nameContainer.hide(); // now we have a name, hide the username request
         // start the quiz
        // Add a warm message for our user and give them an opportunity to change names
        loggedIn(usernameInput);


    });

    // allow user to change names, this reloads the page.
    changeUserButton.click(function () {
    
       CookieUtil.unset('name', null);
       location.reload()       
    });


    // This fires when the user is returning.
    if (CookieUtil.get('name') != null ) {
        $(this).find(".userName").text(CookieUtil.get('name'));   
        nameContainer.hide();
        usernameInput = CookieUtil.get('name')
        loggedIn(usernameInput);
        
    }

    // fires after quiz has got the users name, displays message and starts the quiz.
    function loggedIn(usernameInput){
        

        var welcomeText = doc.createTextNode("You are playing as ");
        var changeUser = doc.createTextNode("Not " + usernameInput + "? Click the button to change.");
        var userNameInput = doc.createTextNode(usernameInput);

        loggedInBox.show() // Let's show all those elements we had to hide from new users
        div.show()
        nButton.show()
        bButton.show()
        welcomeP.append(welcomeText);
        userNameDisplay.append(usernameInput);
        changeUserP.append(changeUser);
        quiz_init();
    }

  


});

