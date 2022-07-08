const history = document.querySelector(".display1");
let display2 = document.querySelector(".display2");
const temp_result = document.querySelector(".temp_result");
const numbers = document.querySelectorAll(".number");
const equal = document.querySelector(".equal");
console.log(numbers);
const operations = document.querySelectorAll(".operation");
let clear = document.querySelector(".clear");
const back_btn = document.querySelector(".back-btn");
let display_history = "";
let display2num = "";
let result = null;
let lastopn = "";
let dot = false;
//numbers
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    //first decimal ..cannot have more than 1 decimal
    if (e.target.innerText === "." && dot == false) {
      dot = true;
    }
    //if another . return
    else if (e.target.innerText === "." && dot == true) {
      return;
    }

    display2num += e.target.innerText;
    display2.innerHTML = display2num;
  });
});

//operations
operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    //if no number is clicked say somebody clicks operation first instead of a number
    if (!display2num) {
      return;
    }
    //say first num 20.3+6.5 to let add 6.5 after opn '+' we need to set fot false
    dot = false;
    //getting the operation
    const opn_type = e.target.innerText;
    //only if first a number is pressed and then an operation or solving the last opn
    if (display_history && display2num && lastopn ) {
      solve_exp();
    } else {
      //storing the display screen in result
      result = parseFloat(display2num);
    }
    clear_screen(opn_type); //move display to history and show eval exp in temp display
    lastopn = opn_type;
  });
});
function clear_screen(name = "") {
 //updating screen1
  display_history += display2num + " " + name + " ";
  history.innerText = display_history;
  //screen2 becomes empty
  display2.innerHTML = ""; //update screen
  display2num = "";
  //updating screen3
  temp_result.innerHTML = result;
}
//solving expression
function solve_exp() {
  if (lastopn === "x") {
    result = parseFloat(result) * parseFloat(display2num);
  } else if (lastopn === "+") {
    result = parseFloat(result) + parseFloat(display2num);
  } else if (lastopn === "-") {
    result = parseFloat(result) - parseFloat(display2num);
  } else if (lastopn === "/") {
    result = parseFloat(result) / parseFloat(display2num);
  } else if (lastopn === "%") {
    result = parseFloat(result) % parseFloat(display2num);
  }
}
//if anyone click = button
equal.addEventListener("click", (e) => {
  if (!display2num || !display_history) {

    return;
  }
  dot = false;
  solve_exp();
  clear_screen();
  //displaying result
  display2.innerHTML = result;
  temp_result.innerText = "";
  //storing result
  display2num = result;
  //history becomes empty now
  display_history = "";
});

//clear screen
clear.addEventListener("click", (e) => {
 display2num = "";
  display_history = "";
  result = null;
  display2.innerHTML = "";
  history.innerHTML = "";
  temp_result.innerHTML='';
  temp_result = "";
  
});
//CE button
back_btn.addEventListener("click", (e) => {
  display2.innerHTML = "";
  display2num = "";
});


