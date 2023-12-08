const api = 'https://api.quotable.io/random';
const mainQuote = document.querySelector('blockquote');
const author = document.querySelector('span');

async function fetchquote(url){
    const response = await fetch(url);
    const data = await response.json();
    mainQuote.innerHTML = data.content;
    author.innerHTML = data.author;
  
}


function twittershare(){
    window.open("https://twitter.com/intent/tweet?text=" +  mainQuote.innerHTML + " -- " + author.innerHTML , "Tweet Window", 'width=700px, height=700px');
}



fetchquote(api);