const inputBox = document.querySelector('#input-box');
const listContainer = document.querySelector('#list-container');

function addList() {
    if (inputBox.value == '') {
        alert('Tast is empty');
    } else {
        //listContainer.innerHTML = `<li>${inputBox.value}</li>`
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData()
}

listContainer.addEventListener('click', (e) => {
    console.log(e);
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData()
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData()
    }

}, false)

inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.keycode === 13) {
        addList();
    }
})

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}
function showData() {
    listContainer.innerHTML = localStorage.getItem('data');
}

showData();