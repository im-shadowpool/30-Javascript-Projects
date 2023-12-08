let inp = document.querySelector('#inpfield');
let imgcard = document.querySelector('.imgBox');
let imgQR = document.querySelector('img');
let download = document.querySelector('#download');
const resize = document.querySelector('.resize');

resize.style.display = 'none';

function resizer(size){

    if(size === '450x450'){
        generateQr(size);
        document.querySelector('.card').style.maxWidth = "560px";
        document.querySelector('#btn3').classList.add('selectedb3');
        document.querySelector('#btn1').classList.remove('selectedb1');
        document.querySelector('#btn2').classList.remove('selectedb2');

    } else if(size === '250x250'){
        document.querySelector('.card').style.maxWidth = "460px";
        document.querySelector('#btn2').classList.add('selectedb2');
        document.querySelector('#btn1').classList.remove('selectedb1');
        document.querySelector('#btn3').classList.remove('selectedb3');
        generateQr(size)
    } else{

        document.querySelector('.card').style.maxWidth = "460px";
        document.querySelector('#btn1').classList.add('selectedb1');
        document.querySelector('#btn2').classList.remove('selectedb2');
        document.querySelector('#btn3').classList.remove('selectedb3');
        generateQr(size)
    }
    
}


function generateQr(size) {
    if(inp.value !== ""){
        resize.style.display = 'flex';
        imgQR.src = 'https://api.qrserver.com/v1/create-qr-code/?size='+ size +'&data=' + inp.value;
        imgQR.style.display = 'block';
        imgcard.style.display = 'flex';
        download.style.display = 'block';
    } else{
        alert('Empty field, Write something')
    }
}

async function downloadQr(){
    const response = await fetch(imgQR.src);
    const data = await response.blob();

    const downloadlink = document.createElement('a');
    downloadlink.href = URL.createObjectURL(data);
    downloadlink.download = 'qr-code.png';
    downloadlink.click();
}
