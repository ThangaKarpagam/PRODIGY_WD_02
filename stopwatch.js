let timer;
let isRunning = false;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
function playLapSound() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, context.currentTime); // A4 note
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.1); // Play sound for 0.1 seconds
}


const lapsContainer = document.getElementById('laps');

function updateDisplay() {
    const hours = String(Math.floor((elapsedTime / 3600000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime / 60000) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(2, '0');
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            elapsedTime += 1000;
            updateDisplay();
        }, 1000);
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
    lapTimes = [];
});

document.getElementById('lap').addEventListener('click', () => {
    if (isRunning) {
        const lapTime = updateDisplay();
    lapTimes.push(lapTime);
    playLapSound(); // Play sound notification for lap time


        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
});
