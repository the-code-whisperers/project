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

var createToken = function()
{
    var chars = ["1","2","3","4","5","6","7","8","9","0","q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
    var token = ""

    for (var i=0; i<10; i++)
    {
        var r = Math.floor(Math.random() * chars.length);
        token = token+chars[r]
    }

    return token;
}

$('#login').on('click', function(event)
{
    var email = $('#email').val().trim()
    var password = $('#password').val().trim()
    var correctEmail = false
    var correctPassword = false
    var loggedIn = false

    database.ref('users').once('value', function(snap)
    {
        for (var i=0; i<snap.val().length; i++)
        {
            if (snap.val()[i].email === email)
            {
                var userSalt = snap.val()[i].salt;
                var userHash = snap.val()[i].hash;
                var createdHash = createHash(password, userSalt)

                if (createdHash === userHash)
                {
                  correctEmail = true
                  correctPassword = true
                  loggedIn = true
                  var token = createToken()
                  sessionStorage.setItem("userID", token);

                  database.ref("users/"+i).update(
                  {
                      token: token
                  })

                  window.location.href = 'dashboard.html';
                  break;
                }
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

  var salt = createSalt()
  var hash = createHash(password, salt)

  $.ajax({
      url: "https://apilayer.net/api/check?access_key=ecd139f85be6b1d868b48ce6f827bed9&email="+email+"",
      method: "GET"
  }).done(function(response)
  { 
      var validEmail = response.format_valid
      console.log("This is a valid email: "+validEmail)

      if (validEmail)
      {
        var calsOverTime = [0]

          database.ref('users').once('value', function(snap)
          {
            if (!snap.hasChild('0'))
            {
              var token = createToken()
              sessionStorage.setItem("userID", token);
              database.ref('users/0').set(
              {
                name: name,
                email: email,
                salt: salt,
                hash: hash,
                age: age,
                height: height,
                weight: weight,
                gender: gender,
                calories: 0,
                calsOverTime: calsOverTime,
                token: token
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
                  var userID = snap.val().length
                  var token = createToken()
                  sessionStorage.setItem("userID", token);
                  database.ref('users/'+userID).set(
                  {
                    name: name,
                    email: email,
                    salt: salt,
                    hash: hash,
                    age: age,
                    height: height,
                    weight: weight,
                    gender: gender,
                    calories: 0,
                    calsOverTime: calsOverTime,
                    token: token
                  })

                  window.location.href = 'dashboard.html';
              }
            } 
        })
      }

      else
      {
        $('#failed-to-register').show()
      }
  });
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