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
        console.log("submitted");
        const loginemail = login_form["email"].value;
        const loginpassword = login_form["password"].value;
        signInWithEmailAndPassword(auth, loginemail, loginpassword)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential.user);
                alert("Signed In Successfully")
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
        if (register_form["name2"].value != "" && register_form["email2"].value != " " &&
            register_form["password2"].value != "" && (register_form["password2"].value.length) > 6) {

            console.log("submitted")
            var email2 = register_form["email2"].value;
            var password2 = register_form["password2"].value
            createUserWithEmailAndPassword(auth, email2, password2).then((cred) => {

                setDoc(doc(db, "Users", email2), {
                    name: register_form["name2"].value,
                    email: email2,
                    status: "clear",
                }).then(() => {
                    console.log(cred);
                    alert("Account Created Successfully")
                    window.location.replace("http://127.0.0.1:5500/peddlars/login2.html")
                })





            })

            // alert("Account Created Successfully")
            // window.location.replace("http://127.0.0.1:5500/peddlars/login.html")


        } else {
            alert("Form not filled coreectly.")
        }
    });
}