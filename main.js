
// Initialize Firebase (ADD YOUR OWN DATA)
const firebaseConfig = {
    apiKey: "AIzaSyCtzh_P-_Z-Exota-NRjgvZI7w7HG3x3NQ",
    authDomain: "tifin-3a152.firebaseapp.com",
    databaseURL: "https://tifin-3a152-default-rtdb.firebaseio.com",
    projectId: "tifin-3a152",
    storageBucket: "tifin-3a152.appspot.com",
    messagingSenderId: "845532019855",
    appId: "1:845532019855:web:6fea6956e858cda0b284fa",


};

firebase.initializeApp(firebaseConfig);
// Reference messages collection
var messagesRef = firebase.database().ref('messages');
var usersRef = firebase.database().ref('users');
// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
async function submitForm(e) {
    e.preventDefault();
    // Get values
    console.log(e)
    var name = document.getElementById("name").value;
    var tiffin = document.getElementById("tiffin").value;
    console.log(name,tiffin)
    if (name === null || name == "" || name === undefined || name=="Select") {
        alert("Please select name")
        return
    }
    if (tiffin === null || tiffin == "" || tiffin === undefined || tiffin == "Select") {
        alert("Please select tiffin")
        return
    }
    //take confirmation
    if (!confirm('Are you sure you want to submit?')) {
        return
    }
    

    // Save message
    await saveMessage(name, tiffin);

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    // Clear form
    document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
async function saveMessage(name, tiffin) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        tiffin: tiffin,
        date: new Date().toISOString().slice(0, 10)
    });
    alert("Tiffin added successfully")
    location.reload()
}

function readMessage() {
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        let withDalbhat = 0;
        let withoutDalbhat = 0;
        let total = 0;
        for (let i in data) {
            var table = document.getElementById("myTable");
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = data[i].date;
            cell2.innerHTML = data[i].name;
            cell3.innerHTML = data[i].tiffin;

            //Count daily's tiffin
            if (new Date().toISOString().slice(0, 10) == data[i].date && data[i].tiffin == 80) {
                withDalbhat = withDalbhat + 1
            }
            if (new Date().toISOString().slice(0, 10) == data[i].date && data[i].tiffin == 60) {
                withoutDalbhat = withoutDalbhat + 1
            }

            total = parseInt(total) + parseInt(data[i].tiffin);


        }
        document.getElementById("WithDalbhat").innerHTML = withDalbhat;
        document.getElementById("WithoutDalbhat").innerHTML = withoutDalbhat;
        document.getElementById("total").innerHTML = total;
    });
}

function loadUsers() {
    let Array = ["AKASH MISHRA","DEVDAS KINDERKHEDIYA","HARSH NIRMAL","JAYDIP UPADHAYAY","KULDEEP","PARTH VAMJA","PRSHANT RAI","SAGAR BAGIYA","SANJAY PARMAR","TEJAS CHAUHAN","YASH SAHU","UMANAG SHAH","PREM RAJAK","DARSHIT VAGASHIYA","RISHABH SIYOTE"]
    return messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        for (let i in data) {
            if (Array.indexOf(data[i].name) !== -1 && new Date().toISOString().slice(0, 10)) {
                //alert("Yes, the value exists!")
                Array = Array.filter(element => element !== data[i].name);
            }

        }
        //console.log(Array)
        for (let i = 0; i < Array.length; i++) {
            var option = document.createElement("option");
            option.text = Array[i];
            option.value = Array[i];
            var select = document.getElementById("name");
            select.appendChild(option);

        }


    });
}
function getTotal(value) {
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        let total = 0;
        let count = 0;
        for (let i in data) {
            //Count daily's tiffin
            if (data[i].name == value) {
                total = parseInt(total) + parseInt(data[i].tiffin);
                count = count + 1
            }
        }
        document.getElementById("indeTotal").innerHTML = total + "<span> (" + count + " Tiffins)</span>";

    });
}