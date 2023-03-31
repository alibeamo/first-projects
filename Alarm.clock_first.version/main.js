//variables declared below are grabbing info from html doc
let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = []; //will be used to store alarms
let alarmSound = new Audio("./alarm.wav"); //check if this is linked right

let initialHour = 0,
initialMinute = 0,
alarmIndex = 0;

//adds (appends) zero in front of single digit numbers
const appendZero = (value) => (value < 10 ? "0" + value : value);

//search for value in object
const searchObject = (parameter, value) => {
    let alarmObject,
    objIndex,
    exists = false;
    alarmsArray.forEach((alarm, index) => {
        if (alarm[parameter] === value) {
            exists = true;
            alarmObject = alarm;
            objIndex = index;
            return false;
        }
    });
    return [exists, alarmObject, objIndex];
};

//function to display live time
function displayTimer() {
    let date = new Date();
    let [hours, minutes, seconds] = [
        appendZero(date.getHours()),
        appendZero(date.getMinutes()),
        appendZero(date.getSeconds()),
    ]; //uses append zero fucntion from above

    //displays time
    timerRef.innerHTML =`${hours}:${minutes}:${seconds}`;

    //Alarm - will go off in a loop when all conditions are me
    alarmsArray.forEach((alarm, index) => {
        if (alarm.isActive) {
            if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
                alarmSound.play();
                alarmSound.loop = true;
            }
        }
    });
}

//appends zero to single digit numbers inputs
const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue);
    if (inputValue < 10) {
        inputValue = appendZero(inputValue);
    }
    return inputValue;
};

hourInput.addEventListener("input", () => {
    hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
    minuteInput.value = inputCheck(minuteInput.value);
});


//Create alarm div

const createAlarm = (alarmObj) => {
    //access keys from object
    const { id, alarmHour, alarmMinute } = alarmObj; 
    //alarm div
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute("data-id", id);
    alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}</span>`;

    //checkbox - calls startAlarm() or stopAlarm()
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", (e) => {
        if (e.target.checked) {
            startAlarm(e);
        } else {
            stopAlarm(e);
        }
    });
    alarmDiv.appendChild(checkbox);

    //delete button - doesn't work
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => deleteAlarm(e));
    alarmDiv.appendChild(deleteButton);
    activeAlarms.appendChild(alarmDiv);
};

//set alarm
setAlarm.addEventListener("click", () => {
    alarmIndex += 1;

    //alarmObject
    let alarmObj = {};
    alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
    alarmObj.alarmHour = hourInput.value;
    alarmObj.alarmMinute = minuteInput.value;
    alarmObj.isActive = false;
    console.log(alarmObj);
    alarmsArray.push(alarmObj);
    createAlarm(alarmObj);
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
});

//start alarm
const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId); //obj not declare? should this be alarm instead?
    if (exists) {
        alarmsArray[index].isActive = true;
    }
};

//stop alarm
const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId); //obj not declare? should this be alarm instead?
    if (exists) {
        alarmsArray[index].isActive = false;
        alarmSound.pause();
    }
};

//delete alarm - doesn't work
const deleteAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId); //obj not declare? should this be alarm instead?
    if (exists) {
        e.target.parentElement.parentElement.remove();
        alarmsArray.splice(index, 1);
    }
};

window.onload = () => {
    setInterval(displayTimer);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
};

/*Next: add snooze & stop button, convert live time to 12hr, make time input go around (from 12 back to 1 & from 59 back to 0)
add flashing or something to the screen when alarm goes off
*/