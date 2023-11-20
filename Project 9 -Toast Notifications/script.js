const toasts = document.querySelector('.toastcard');

let successMsg =  '<i class="fa-solid fa-circle-check"></i> Successfully Submitted';
let errorMsg =  '<i class="fa-solid fa-circle-exclamation"></i> Error, Please Fix this';
let invalidMsg =  '<i class="fa-solid fa-circle-xmark"></i> Invalid Input, Try again';


function showToast(msg){
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;
    toasts.appendChild(toast);

    if(msg.includes('Error')){
        toast.classList.add('error')
    }
    if(msg.includes('Invalid')){
        toast.classList.add('invalid')
    }

    setInterval(() =>{
        toast.remove();
    }, 5300)

}

