// Initialize Firebase
var config = 
{
    apiKey: "AIzaSyAnaNI7XZ_HdTGF1IhWW51D2hrvSuyKIow",
    authDomain: "project-5f340.firebaseapp.com",
    databaseURL: "https://project-5f340.firebaseio.com",
    projectId: "project-5f340",
    storageBucket: "",
    messagingSenderId: "317564805030"
};

firebase.initializeApp(config);

var database = firebase.database()

var loginFailed = $('#login-failed')
var failedMessage = $('#failed-message')


$('#login').on('click', function(event)
{
    console.log("hi!")
    var email = $('#email').val().trim()
    var password = $('#password').val().trim()
    var correctEmail = false
    var correctPassword = false
    var loggedIn = false


    database.ref('users').once('value', function(snap)
    {
        console.log(snap.val())
        console.log(snap.val().length)

        for (var i=0; i<snap.val().length; i++)
        {
            if (snap.val()[i].email === email && snap.val()[i].password === password)
            {
                sessionStorage.setItem("userID", i);
                correctEmail = true
                correctPassword = true
                loggedIn = true
                window.location.href = 'dashboard.html';
                break;
            }

            if (snap.val()[i].email === email && snap.val()[i].password !== password)
            {
                loginFailed.show()
                failedMessage.html("This email has a different password!")
                correctEmail = true
                break;
            }
        }

        if (!correctEmail)
        {
            var splitEmail = email.split('')
            var validEmail = false
            for (var i=0; i<splitEmail.length; i++)
            {
                if (splitEmail[i] === '@')
                {
                    validEmail = true
                }
            }

            if (validEmail)
            {
                loginFailed.show()
                failedMessage.html("We don't have this email in our system, would you like to register?")     
            }

            else
            {
                loginFailed.show()
                failedMessage.html("We don't recognize this as an email.")        
            }
        }
    })
})

$('#create').on('click', function(event)
{
  var name = $('#new-name').val().trim()
  var email = $('#new-email').val().trim()
  var password = $('#new-password').val().trim()
  var age = $('#new-age').val().trim()
  var height = $('#new-height').val().trim()
  var weight = $('#new-weight').val().trim()
  var gender = $('#new-gender').val().trim()

  database.ref('users').once('value', function(snap)
  {
    if (!snap.hasChild('0'))
    {
      sessionStorage.setItem("userID", 0);
      database.ref('users/0').set(
      {
        name: name,
        email: email,
        password: password,
        age: age,
        height: height,
        weight: weight,
        gender: gender,
        calories: 0
      })
      window.location.href = 'dashboard.html';
    }

    else
    {
      var newEmail = true;
      for (var i=0; i<snap.val().length; i++)
      {
        if (email === snap.val()[i].email)
        {
          newEmail = false;
          console.log("This email is already taken!")
        }
      }

      if (newEmail)
      {
        var splitEmail = email.split('')
        var validEmail = false

        for (var i=0; i<splitEmail.length; i++)
        {

          if (splitEmail[i] === '@')
          {
              validEmail = true
          }
        }

        if (validEmail)
        {
            var userID = snap.val().length
            sessionStorage.setItem("userID", userID);
            database.ref('users/'+userID).set(
            {
              name: name,
              email: email,
              password: password,
              age: age,
              height: height,
              weight: weight,
              gender: gender,
              calories: 0
            })

            window.location.href = 'dashboard.html';
        }

        else
        {
          $('.form-contorl #new-email').css("border", "1px, solid red")
            console.log("This is not a valid Email!")
        }
      }
    }  
  })
})




/*var email = 'hihihi@gmail.com'
var password = 'poopadoop'*/

//HOW TO CREATE A NEW USER!
/*firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode)
  console.log(errorMessage)
  // ...
});*/

// ANYTHING YOU WANT TO DO TO A USER PUT IN HERE!
/*firebase.auth().onAuthStateChanged(function(user) {
  if (user) 
  {
    var user = firebase.auth().currentUser;
    console.log(user)
    user.updateProfile({
    displayName: "Jane Q. User",
    photoURL: "https://example.com/jane-q-user/profile.jpg",
    height: "5'8''",
    weight: "140 lbs"
    }).then(function() {
    // Update successful.
    }).catch(function(error) {
    // An error happened.
    });
  } 

  else 
  {
    console.log("There is NOT a user logged in")
  }
});
*/