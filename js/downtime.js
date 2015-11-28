'use strict';

var deploymentEstimateTime = 20; //minutes
var deadLineTime;

init();

function init() {
    initDeadLineTime();
    initializeTimer('timer', deadLineTime);
}

function initDeadLineTime() {
    if (!localStorage.getItem('deadLine') || !deadLineTime || (getRemainingTime(deadLineTime).time <= 0)) {
        getDeploymentDownTime(deploymentEstimateTime);
        localStorage.setItem('deadLine', deadLineTime);
    } else {
        deadLineTime = localStorage.getItem('deadLine');
    }
}

function initializeTimer(id, deadline) {
    var timer = document.getElementById(id);
    var timeInterval = setInterval(function () {
        var remainingTime = getRemainingTime(deadline);
        timer.innerHTML = 'hours: ' + remainingTime.hours + ' minutes: ' + remainingTime.minutes + ' seconds: ' + remainingTime.seconds;

        if (remainingTime.time <= 0) {
            clearInterval(timeInterval);
            timer.innerHTML = 'It takes more time, please visit us after some time';
        }
    }, 1000);
}

function getDeploymentDownTime(interval) {
    deadLineTime = new Date();
    deadLineTime.setMinutes(deadLineTime.getMinutes() + interval);
}

function getRemainingTime(deadline) {
    var time, seconds, minutes, hours, result;

    time = Date.parse(deadline) - Date.parse(new Date());
    seconds = Math.floor((time / 1000) % 60);
    minutes = Math.floor((time / 1000 / 60) % 60);
    hours = Math.floor((time / 1000 / 60 / 60) % 60);

    result = {
        time: time,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };

    return result;
}