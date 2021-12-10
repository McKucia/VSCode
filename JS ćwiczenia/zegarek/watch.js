setInterval(setClock, 1000)

var hourHand = document.querySelector('[data-hour-hand]')
var minuteHand = document.querySelector('[data-minute-hand]')
var secondHand = document.querySelector('[data-second-hand]')

function setClock() {
    var date = new Date()
    var secondsRatio = date.getSeconds() / 60
    var minutesRatio = (secondsRatio + date.getMinutes()) / 60
    var hoursRatio = (minutesRatio + date.getHours()) / 60
    setRatio(hourHand, hoursRatio)
    setRatio(minuteHand, minutesRatio)
    setRatio(secondHand, secondsRatio)
}

function setRatio(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
}

setClock()