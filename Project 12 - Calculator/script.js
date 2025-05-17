const result = document.getElementById("result");

function appendValue(value) {
  result.value += value;
}

function appendFunc(func) {
  result.value += func;
}

function clearAll() {
  result.value = "";
}

function clearEntry() {
  result.value = result.value.slice(0, -1);
}

function factorial() {
  try {
    let val = eval(result.value);
    if (val < 0 || !Number.isInteger(val)) {
      result.value = "Error";
      return;
    }
    let fact = 1;
    for (let i = 1; i <= val; i++) {
      fact *= i;
    }
    result.value = fact;
  } catch (e) {
    result.value = "Error";
  }
}

function calculate() {
  try {
    result.value = eval(result.value);
  } catch (e) {
    result.value = "Error";
  }
}
