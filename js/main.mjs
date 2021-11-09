import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { doc, setDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
const login_form = document.getElementById("login-form");
const register_form = document.getElementById("register-form");
console.log(login_form);
console.log(register_form);

const auth = getAuth();
const db = getFirestore();
// const app = firebase.initializeApp(firebaseConfig);
// var firestore = firebase.firestore(app);
// const db = firebase.firestore(app);

if (login_form) {
    login_form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("sub,itted");
        const loginemail = login_form["email"].value;
        const loginpassword = login_form["password"].value;
        signInWithEmailAndPassword(auth, loginemail, loginpassword)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential.user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
            });
    });
}

if (register_form) {
    register_form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (register_form["name"].value != "" && register_form["email"].value != " " &&
            register_form["password"].value != "" && (register_form["password"].value.length) > 6) {

            console.log("submitted")
            var email = register_form["email"].value;
            var password = register_form["password"].value
            createUserWithEmailAndPassword(auth, email, password).then((cred) => {
                console.log(cred);
                setDoc(doc(db, "Users", email), {
                    name: register_form["name"].value,
                    email: email,
                    status: "clear",
                });
            })


        } else {
            alert("Form not filled coreectly.")
        }
    });
}