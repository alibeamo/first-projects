function generateRandomColor(){
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.floor(Math.random() * maxVal); //returns random interger
    randomNumber = randomNumber.toString(16); //converts the random number back into a hex
    let randomColor = randomNumber.padStart(6,0); //pads the beginning of the string until it reaches the length
    return `#${randomColor.toUpperCase()}`;

}

let index = 0;

function changeColors(){
    let colors = [generateRandomColor()];

    document.getElementsByTagName("body")[0].style.background = colors[index++]; //index set at 0, funct ++ each time

    if(index > colors.length - 1) { index = 0}; //if we reach the last place in the array it returns to 0
};