const inp = document.querySelector('input');
const cal = document.querySelector('button');
const ptag = document.querySelector("#ptag");

inp.max = new Date().toISOString().split("T")[0];

function calculate() {
    const birthdate = new Date(inp.value)
    let d1 = birthdate.getDate();
    let m1 = birthdate.getMonth() + 1;
    let y1 = birthdate.getFullYear();
    const today = new Date();
    let d2 = today.getDate()
    let m2 = today.getMonth()  + 1;
    let y2 = today.getFullYear();

    let d3, m3, y3;

    y3 = y2-y1;
    if(m2 >= m1){
        m3 = m2-m1;
    } else{
        y--;
        m3 = 12 + m2 - m1;
    }
    if(d3 >= d1){
        d3 = d2 - d1;
    } else{
        console.log(calDays(m2, y2));
        m3--;
        d3 = calDays(m2, y2) + d2 - d1;
    }
    if(m3 < 0){
        y3--;
        m3 = 11;
    }
    ptag.innerHTML = `You are <span id="iptval">${y3}</span> years, <span id="iptval">${m3}</span> months, <span id="iptval">${d3}</span> days old.`;

}

const calDays = (month, year) =>{
    return new Date(year, month, 0).getDate();
}



calculate()