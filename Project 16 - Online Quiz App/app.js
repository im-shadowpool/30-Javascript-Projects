const correctAnswers = ['B', 'B', 'B', 'B','B', 'B', 'B', 'B','B', 'B', 'B', 'B'];
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.result');

form.addEventListener('submit', e =>{
    e.preventDefault();

    let userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value, form.q6.value, form.q7.value, form.q8.value, form.q9.value, form.q10.value, form.q11.value, form.q12value];

    // console.log(userAnswers[3]);
    let score = 0;
    userAnswers.forEach((ans, index) =>{
        if(ans === correctAnswers[index]){
            score = score + 8;
        }
    });
    scrollTo(0,0);
   
    result.classList.remove('d-none'); 


    let output = 0;
    const timer = setInterval(()=>{
        result.querySelector('span').textContent = `${output}%`;
        if(output===score){
            clearInterval(timer);
        }
        else{
            output++;
        }
    }, 25);      


});
