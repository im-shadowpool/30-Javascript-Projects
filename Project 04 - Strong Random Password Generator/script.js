const passwordBox = document.querySelector('#password');
const copyContent = document.querySelector('#copy');
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = '0123456789';
const sym = '!@#$%^&*()';
const allCombine = upperCase + lowerCase + numbers + sym;
const length = 12;
let password = "";
function GenPass(){
    password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += sym[Math.floor(Math.random() * sym.length)];
    while(length >= password.length){
        password += allCombine[Math.floor(Math.random() * allCombine.length)];
    }
    passwordBox.value = password;
}

function copyfun(){
   passwordBox.select();
   document.execCommand('copy')
}

// IMPLEMENTING

const passinput = document.querySelector('#passtag');
const taginput = document.querySelector('#tag');
const addbtn = document.querySelector('#addbtn');
const ulContainer = document.querySelector('.ulcontainer');


function adddock(){
    passinput.value = password;
} 

function addtolist(){
    if(taginput.value && passinput.value){
        ulContainer.innerHTML += `<li> <span>${taginput.value}</span>${passinput.value}</li>`;
        taginput.value = ""
        passinput.value = ""
    } else{
        alert('Please enter the tag name')
    }
   
}   

