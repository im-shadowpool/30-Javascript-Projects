const notesCard = document.querySelector('.notesCard');

function newNote() {
    let tag = document.createElement('p');
    tag.className = 'ptag';
    let img = document.createElement('img');
    img.src = 'del.svg';
    tag.setAttribute('contenteditable', 'true')
    notesCard.appendChild(tag).appendChild(img);
    saveData();
}

notesCard.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.tagName === 'P') {
        const notes = document.querySelectorAll('.ptag');
        notes.forEach(nt => {
            nt.onkeyup = function () {
                saveData();
            }
        })
    }


})

const saveData = () => {
    localStorage.setItem('data', notesCard.innerHTML);
}

const showData = () => {
    notesCard.innerHTML = localStorage.getItem('data');
}

showData();

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        document.execCommand('insertLineBreak')
        e.preventDefault();
    }
})