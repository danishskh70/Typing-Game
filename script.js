const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const accuracyEl = document.getElementById('accuracy');
const totalTimingEl = document.getElementById('totaltiming');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

let words = [
    'array', 'function', 'object', 'variable', 'loop', 'class', 'promise', 'array', 'function', 'object', 'variable', 'loop', 'class', 'promise',
    'closure', 'scope', 'prototype', 'callback', 'event', 'async', 'await', 'map', 'filter', 'reduce', 'json', 'fetch', 'import', 'export'
];

let randomWord;
let score = 0;
let time = 10;
let totalWords = 0;
let correctWords = 0;
let totalTiming = 0;
let isPlaying;
let initialAccuracy = 65;
let accuracyIncrement = 10;

text.focus();

function showWord(words) {
    randomWord = words[Math.floor(Math.random() * words.length)];
    word.innerHTML = randomWord;
}

function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = 11;
        showWord(words);
        text.value = '';
        score++;
        correctWords++;
        scoreEl.innerHTML = score;
    } else {
        totalWords++;
    }
    totalTiming++;
    totalTimingEl.innerHTML = totalTiming + 's';
    updateAccuracy();
}

function matchWords() {
    return text.value === randomWord;
}

function countdown() {
    if (time > 0) {
        time--;
    } else if (time === 0) {
        isPlaying = false;
        gameOver();
    }
    timeEl.innerHTML = time + 's';
}

function updateAccuracy() {
    accuracyEl.innerHTML = averageW() + '%';
}

function averageW() {
    let accuracy = ((score * 100) / totalTiming) + 40;
    accuracy = Math.min(accuracy, 100); // Ensure the accuracy does not exceed 100%
    accuracy = accuracy.toFixed(2);
    return accuracy;
}

function gameOver() {
    localStorage.setItem('score', score);
    localStorage.setItem('accuracy', averageW() + '%');
    localStorage.setItem('totalTiming', totalTiming);
    window.location.href = 'exit.html'; // Redirect to exit.html
}

text.addEventListener('input', startMatch);
setInterval(countdown, 1000);
showWord(words);

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', (e) => {
    difficulty = difficultySelect.value;
});
