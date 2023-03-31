let result = document.getElementById("inputtext");

let calculate = (number) => {
    result.value += number;

}

let Result = () => {
    try {

        result.value = eval(result.value)
    } catch(err) {
        alert("Invalid input");
    }
}

function clr(){
    result.value = " ";
}

function del(){
    result.value = result.value.slice(0, -1);
}

//experimental code trying to make percent sign work
let percent = () => {
    result.value += number;
    result.value = result.value/100 * number;
    // also need to add % at the end of each number
} //work in progress to make percent sign functional