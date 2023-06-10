// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGX_67__mb00VlB4ufIo4tH-Gvh4K__Wk",
  authDomain: "webprogramming-47b16.firebaseapp.com",
  projectId: "webprogramming-47b16",
  storageBucket: "webprogramming-47b16.appspot.com",
  messagingSenderId: "905325745645",
  appId: "1:905325745645:web:8156354b1a2bc4d4d6c3e4",
  measurementId: "G-EL8E3NQ32C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

var signup_button = document.getElementById("signup_button");
var email = document.getElementById("email");
var passsword = document.getElementById("password");
var fullName = document.getElementById("fullName");
var username = document.getElementById("username");

//================Signup With Email and Password==========================
signup_button.onclick = function() {
  signup_button.disabled = true;
  signup_button.textContent = "Registering Your Account! Please Wait";
    firebase.auth().createUserWithEmailAndPassword(email.value, passsword.value).then(function(response) {
      sendingVerifyEmail(signup_button);

      console.log(response + "2");
      // Declare user Variable
      const user = firebase.auth().currentUser;
      // Add User to firebase database
      // Create User data
      // Add a new document in collection user.uid
      db.collection("users").doc(user.uid).set({
        email:email.value,
        username:username.value,
        full_name:fullName.value,
        last_login:new Date(Date.now())
      })
      .then(() => {
      console.log("Document successfully written!");
      })
      .catch((error) => {
      console.error("Error writing document: ", error);
      });

      console.log(user.uid);
      alert('User Created!!')
      
    })
    .catch(function(error) {
      signup_button.disabled = false;
      signup_button.textContent = "Sign Up";
      console.log(error);
    })
}

function sendingVerifyEmail(button) {
  firebase.auth().currentUser.sendEmailVerification().then(function(response) {
      signup_button.disabled = false;
      signup_button.textContent = "Sign Up S";
      console.log(response);
    })
    .catch(function(error) {
      signup_button.disabled = false;
      signup_button.textContent = "Sign Up S";
      document.getElementById("email").value = "";
      console.log(error);
    })
}


  function show() {
    // ========== Checking type of password ===========
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  
  function empty_forms(){
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("fullName").value = "";
    document.getElementById("username").value = "";
  }


}