"use strict";

function createClock(sizeClock) {
    const divClock = document.getElementById('divClock'),
        dialClock = document.createElement('div');

    divClock.style.width = sizeClock + 'px';
    dialClock.style.position = "relative";
    dialClock.style.width = sizeClock + "px";
    dialClock.style.height = sizeClock + "px";
    dialClock.style.borderRadius = 50 + "%";
    dialClock.style.backgroundColor = "wheat";
    divClock.append(dialClock);

    const dialClockCenterX = dialClock.offsetLeft + dialClock.offsetWidth / 2,
        dialClockCenterY = dialClock.offsetTop + dialClock.offsetHeight / 2;


    function posNumber() {

        const radius = parseFloat(sizeClock * 0.4);

        let count = 0;
        for (let i = 30; i < 361; i = i + 30) {
            let angle = parseFloat(i / 180 * Math.PI),
                numbers = document.createElement('div');

            numbers.style.position = "absolute";
            numbers.style.width = sizeClock * 0.15 + 'px';
            numbers.style.height = sizeClock * 0.15 + 'px';
            numbers.style.borderRadius = 50 + "%";
            numbers.style.backgroundColor = "rgb(31, 172, 31)";
            numbers.style.display = "flex";
            numbers.style.alignItems = "center";
            numbers.style.justifyContent = "center";
            numbers.innerHTML = ++count;
            divClock.append(numbers);

            let numbersCenterX = dialClockCenterX + radius * Math.sin(angle),
                numbersCenterY = dialClockCenterY - radius * Math.cos(angle);

            numbers.style.left = Math.round(numbersCenterX - numbers.offsetWidth / 2) + 'px';
            numbers.style.top = Math.round(numbersCenterY - numbers.offsetHeight / 2) + 'px';
        }
    }
    function createArrows(viewArrow, height, width, zIndex, color) {
        const Arrow = document.createElement('div');

        Arrow.style.height = sizeClock / 2 * height + "px";
        Arrow.style.width = sizeClock * width + "px";
        Arrow.style.position = "absolute";
        Arrow.style.borderRadius = 50 + "px";
        Arrow.style.transformOrigin = "center bottom";
        Arrow.style.transform = "rotate(0deg)";
        Arrow.style.backgroundColor = color;
        Arrow.style.zIndex = zIndex;
        divClock.append(Arrow);

        Arrow.id = viewArrow;
        Arrow.style.left = dialClockCenterX - Arrow.offsetWidth / 2 + 'px';
        Arrow.style.top = dialClockCenterY - Arrow.offsetHeight + 'px';
    }
    posNumber();

    const Arrows = [
        {
            arrow: "hour",
            length: 0.4,
            width: 0.02,
            zIndex: 3,
            color: "black"
        },
        {
            arrow: "minute",
            length: 0.6,
            width: 0.015,
            zIndex: 2,
            color: "black"
        },
        {
            arrow: "second",
            length: 0.75,
            width: 0.01,
            zIndex: 1,
            color: "red"
        }
    ]

    Arrows.forEach(item => {
        createArrows(
            item.arrow,
            item.length,
            item.width,
            item.zIndex,
            item.color
            );
    });

    setTimeout(updateTime, 0);
    function updateTime() {
        let currTime = new Date(),
            second = currTime.getSeconds(),
            minute = currTime.getMinutes(),
            hour = currTime.getHours(),
            positionHourArrow = hour * 30 + (minute * 60 + second) * (1 / 120);

        const secondArrow = document.getElementById('second'),
            minuteArrow = document.getElementById('minute'),
            hourArrow = document.getElementById('hour');

        secondArrow.style.transform = `rotate(${second * 6}deg)`;
        minuteArrow.style.transform = `rotate(${minute * 6}deg)`;
        hourArrow.style.transform = `rotate(${positionHourArrow}deg)`;
        setTimeout(updateTime, 1000);
    }
}

createClock(450);