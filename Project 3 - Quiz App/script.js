// Here are ten multiple-choice questions on front-end web development:


//     A. Hyper Text Markup Language
//     B. Hyperlinks and Text Markup Language
//     C. Home Tool Markup Language
//     D. None of the above

// 2. What is the correct HTML element for the largest heading?
//     A. &lt;h6&gt;
//     B. &lt;head&gt;
//     C. &lt;heading&gt;
//     D. &lt;h1&gt;

// 3. What is the correct HTML for adding a background color?
//     A. &lt;background&gt;yellow&lt;/background&gt;
//     B. &lt;body style="background-color:yellow"&gt;
//     C. &lt;body bg="yellow"&gt;
//     D. None of the above

// 4. What is the correct CSS syntax for making all the &lt;p&gt; elements bold?
//     A. p {font-weight:bold;}
//     B. p {text-size:bold;}
//     C. p {font:bold;}
//     D. None of the above

// 5. What is the correct JavaScript syntax to change the content of the HTML element below?
//     &lt;p id="demo"&gt;This is a demonstration.&lt;/p&gt;
//     A. document.getElementByName("p").innerHTML = "Hello World!";
//     B. document.getElement("p").innerHTML = "Hello World!";
//     C. document.getElementById("demo").innerHTML = "Hello World!";
//     D. None of the above

// 6. What is the correct CSS syntax for changing the font of a paragraph?
//     A. p {font-family: Arial;}
//     B. p {font-style: Arial;}
//     C. p {font-type: Arial;}
//     D. None of the above

// 7. What is the correct HTML for creating a hyperlink?
//     A. &lt;a url="http://www.example.com"&gt;Example&lt;/a&gt;
//     B. &lt;a href="http://www.example.com"&gt;Example&lt;/a&gt;
//     C. &lt;link url="http://www.example.com"&gt;Example&lt;/link&gt;
//     D. None of the above

// 8. What is the correct JavaScript syntax for opening a new window called "w2" when a button is clicked?
//     A. w2 = window.new("http://www.example.com");
//     B. w2 = window.open("http://www.example.com");
//     C. w2 = new.window("http://www.example.com");
//     D. None of the above

// 9. What is the correct HTML for inserting an image?
//     A. &lt;img href="image.gif" alt="MyImage"&gt;
//     B. &lt;img src="image.gif" alt="MyImage"&gt;
//     C. &lt;image src="image.gif" alt="MyImage"&gt;
//     D. None of the above

// 10. What is the correct CSS syntax for centering text?
//     A. text-align:center;
//     B. align:center;
//     C. text:center;
//     D. None of the above


const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            {text:'Hyper Text Markup Language', correct:'true'},
            {text:'Hyperlinks and Text Markup Language', correct:'false'},
            {text:'Home Tool Markup Language', correct:'false'},
            {text:'None of the above', correct:'false'}
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            {text:'Hyper Text Markup Language', correct:'true'},
            {text:'Hyperlinks and Text Markup Language', correct:'false'},
            {text:'Home Tool Markup Language', correct:'false'},
            {text:'None of the above', correct:'false'}
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            {text:'Hyper Text Markup Language', correct:'true'},
            {text:'Hyperlinks and Text Markup Language', correct:'false'},
            {text:'Home Tool Markup Language', correct:'false'},
            {text:'None of the above', correct:'false'}
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            {text:'Hyper Text Markup Language', correct:'true'},
            {text:'Hyperlinks and Text Markup Language', correct:'false'},
            {text:'Home Tool Markup Language', correct:'false'},
            {text:'None of the above', correct:'false'}
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            {text:'Hyper Text Markup Language', correct:'true'},
            {text:'Hyperlinks and Text Markup Language', correct:'false'},
            {text:'Home Tool Markup Language', correct:'false'},
            {text:'None of the above', correct:'false'}
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            {text:'Hyper Text Markup Language', correct:'true'},
            {text:'Hyperlinks and Text Markup Language', correct:'false'},
            {text:'Home Tool Markup Language', correct:'false'},
            {text:'None of the above', correct:'false'}
        ]
    }
]

const question = document.getElementById('question');
const buttoncard = document.querySelector('.btncard');
const nextbtn = document.querySelector('#nextbtn');

let score = 0;
let questionIndex = 0;

function startQuiz(){
    score = 0;
    questionIndex = 0;
    nextbtn.innerHTML = 'Next';
    showQues();
}


function showQues(){
    resetPrevBtns();
   let listquestionIndex = questions[questionIndex];
   let questionNum = questionIndex + 1;
    question.innerHTML =  questionNum + '. ' + listquestionIndex.question;

    listquestionIndex.answers.forEach(answer => {
        console.log(answer);
        const buttonList = document.createElement('button');
        buttonList.classList.add('ans');
        buttonList.innerHTML = answer.text;
        buttoncard.appendChild(buttonList);

    });

}   

function resetPrevBtns(){
    nextbtn.style.display = 'none';
    while(buttoncard.firstChild){
        buttoncard.removeChild(buttoncard.firstChild);
    }
}

startQuiz();