// Initialize Firebase
/*var config = 
{
    apiKey: "AIzaSyAnaNI7XZ_HdTGF1IhWW51D2hrvSuyKIow",
    authDomain: "project-5f340.firebaseapp.com",
    databaseURL: "https://project-5f340.firebaseio.com",
    projectId: "project-5f340",
    storageBucket: "",
    messagingSenderId: "317564805030"
};

firebase.initializeApp(config);

var database = firebase.database()*/



$('#create').on('click', function(event)
{
  var name = $('#name').val().trim()
  var email = $('#email').val().trim()
  var password = $('#password').val().trim()
  var age = $('#age').val().trim()
  var height = $('#height').val().trim()
  var weight = $('#weight').val().trim()
  var gender = $('#gender').val().trim()

  database.ref('users').once('value', function(snap)
  {
    if (!snap.hasChild('0'))
    {
      database.ref('users/0').set(
      {
        name: name,
        email: email,
        password: password,
        age: age,
        height: height,
        weight: weight,
        gender: gender
      })
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
        database.ref('users/'+userID).set(
        {
          name: name,
          email: email,
          password: password,
          age: age,
          height: height,
          weight: weight,
          gender: gender
        })
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