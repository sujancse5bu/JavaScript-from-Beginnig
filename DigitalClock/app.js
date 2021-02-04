

const hourEl = document.getElementById('hour');
const minuteEl = document.getElementById('minute');
const secondEl = document.getElementById('second');

setInterval(function() {
    const fullDate = new Date();
    const hours = fullDate.getHours();
    const minutes = fullDate.getMinutes();
    const seconds = fullDate.getSeconds();
    if (hours < 10) hourEl.innerText = "0" + hours;
    else hourEl.innerText = hours;
    if (minutes < 10) minuteEl.innerText = "0" + minutes;
    else minuteEl.innerText = minutes;
    if (seconds < 10) secondEl.innerText = "0" + seconds;
    else secondEl.innerText = seconds;
}, 1000);