const addForm = document.querySelector('.add');
const ul = document.querySelector('.todos');
const search = document.querySelector('.search input');

const generateAddTodo = todo => {
    const html = 
    `
    <li class="list-group-item mb-1 d-flex justify-content-between align-items-center">
                <span>${todo}</span>
                <i class="fa-solid fa-trash-can delete"></i>
            </li>
    `
    ul.innerHTML += html;
}

addForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if(todo.length){
        generateAddTodo(todo);
        addForm.reset();
    }   
});

ul.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});

const getSearch = todos =>{
    Array.from(ul.children)
    .filter((term) => !term.textContent.toLowerCase().includes(todos))
    .forEach((e) => e.classList.add('Filtered'));

    Array.from(ul.children)
    .filter((term) => term.textContent.toLowerCase().includes(todos))
    .forEach((e) => e.classList.remove('Filtered'));
    
};




search.addEventListener('keyup', e =>{
    const todos = search.value.trim().toLowerCase();
    getSearch(todos);
});