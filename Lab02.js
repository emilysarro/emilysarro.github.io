!// date and time functions from website resource provided in pdf//

function Newdate(){

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
let month = months[d.getMonth()];
document.getElementById("mnth").innerHTML = month;

const d = new Date();
d.getDate();
document.getElementById("dy").innerHTML = d.getDate();

const d = new Date();
d.getFullYear();
document.getElementById("yr").innerHTML = d.getFullYear();

}

function Newtime(){

const d = new Date();
d.getHours();
document.getElementById("hr24").innerHTML = d.getHours();

const hours = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11","12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

const d = new Date();
let hour = hours[d.getHours()];
document.getElementById("hr12").innerHTML = hour;

const d = new Date();
d.getMinutes();
document.getElementById("min").innerHTML = d.getMinutes();

}