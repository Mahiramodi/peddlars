import { collection, addDoc, doc, getDoc, setDoc, getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
const db = getFirestore();
const auth = getAuth();
var email1;
let flag = false;
class User {
    email = ""
}
let user1 = new User();
onAuthStateChanged(auth, async(user) => {
    if (user) {
        const getUser = doc(db, "Users", user.email);
        const read = await getDoc(getUser);
        // email1 = read.data().email;
        if (read.data().status != "clear") {
            alert("Please clear your previous dues");
            document.getElementById("qr-reader").style.display = "none";
        } else {
            const docRef = doc(db, "Users", user.email);
            const snap = await getDoc(docRef);
            console.log(snap.data());
            let child = document.querySelector("#qr-reader__dashboard_section_csr").children
            child[0].children[0].addEventListener("click", async() => {
                console.log('Clicked');
                setTimeout(() => {
                    console.log(document.querySelector("#qr-reader__dashboard_section_csr").children[0]);

                    document.querySelector("#qr-reader__dashboard_section_csr").children[0].style.display = 'none';
                }, 2000);

                const addRide = await addDoc(collection(db, "Rides"), {
                    useremail: user.email,
                    starttime: "",
                    endtime: "",
                    price: 0,
                    scan: 0,
                });
                console.log(addRide.id);
                setTimeout(() => {

                    try {
                        document.querySelector("#qr-reader__dashboard_section_csr").children[1].addEventListener("click", async() => {
                            console.log(`${text} flag : ${flag}`);
                            const rideInfo = await getDoc(doc(db, "Rides", addRide.id));
                            console.log(document.querySelector("#qr-reader__dashboard_section_csr").children[1].innerText == "STOP SCANNING");
                            if (document.querySelector("#qr-reader__dashboard_section_csr").children[1].innerText == "START SCANNING") {
                                console.log(rideInfo.data().scan);
                                if ((flag == false) && (text == "")) {
                                    flag = true;
                                    var hr = currentdate.getHours();
                                    var min = currentdate.getMinutes();
                                    if (min < 10) {
                                        min = `${0}${min}`;
                                    }
                                    if (hr < 10) {
                                        hr = `${0}${hr}`;
                                    }
                                    await updateDoc(doc(db, "Rides", addRide.id), {
                                        scan: rideInfo.data().scan + 1,
                                        starttime: `${hr}:${min}`,
                                    });

                                    console.log("Start Ride")
                                    console.log(rideInfo.data())

                                } else if ((flag == true) && (text != "")) {
                                    flag = false;
                                    var hr = currentdate.getHours();
                                    var min = currentdate.getMinutes();
                                    if (min < 10) {
                                        min = `${0}${min}`;
                                    }
                                    if (hr < 10) {
                                        hr = `${0}${hr}`;
                                    }
                                    await updateDoc(doc(db, "Rides", addRide.id), {

                                        scan: rideInfo.data().scan + 1,
                                        starttime: `${hr}:${min}`,
                                    })
                                    console.log("Mid Ride")
                                    console.log(rideInfo.data())
                                } else if (rideInfo.data().scan > 1) {
                                    var date = new Date()
                                    var hr = date.getHours();
                                    var min = date.getMinutes();
                                    console.log(min)
                                    if (min < 10) {
                                        min = `${0}${min}`;
                                    }
                                    if (hr < 10) {
                                        hr = `${0}${hr}`;
                                    }
                                    var cost = 0;
                                    var rideDuration = diff(rideInfo.data().starttime, `${hr}:${min}`)


                                    if (rideDuration >= 0.30 && rideDuration <= 1.30) {
                                        cost = 60;
                                    } else if (rideDuration > 1.30 && rideDuration <= 3.0) {
                                        cost = 100;
                                    } else if (rideDuration > 3.0 && rideDuration <= 5.30) {
                                        cost = 200;
                                    } else if (rideDuration > 5.30 && rideDuration <= 8.0) {
                                        cost = 300;
                                    }
                                    console.log(`${rideDuration} , ${cost}`);
                                    await updateDoc(doc(db, "Rides", addRide.id), {

                                        scan: rideInfo.data().scan + 1,
                                        endtime: `${hr}:${min}`,
                                        price: cost,
                                    })
                                    console.log("End Ride")
                                    console.log(rideInfo.data())
                                }
                                if (rideInfo.data().scan > 2) {
                                    document.getElementById("qr-reader").innerHTML = `<h3>Your total price of the ride is &#x20b9; ${rideInfo.data().price}</h3>`
                                }
                            }
                        })
                    } catch (err) {
                        alert("Something went wrong. Please reload the site");
                        window.location.replace("http://127.0.0.1:5500/peddlars/index.html")

                    }

                }, 2000)









                // while (document.querySelector("#qr-reader__dashboard_section_csr").children[1] == undefined) {
                //     console.log(document.querySelector("#qr-reader__dashboard_section_csr").children[1])
                // }
            })




        }
    }
});
let text = "";

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code scanned = ${decodedText}`, decodedResult);
    text = decodedText
    console.log(`Text is ${text}`);
}
var html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);
document.querySelector("#qr-reader__dashboard_section_swaplink").style.display = 'none';
var currentdate = new Date();

function diff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    console.log(diff)
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    if (minutes < 10 && hours == 0) {
        minutes = 0;
    }
    return hours + "." + minutes;
}