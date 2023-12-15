function refreshDayTime() { //real-time
    var d = new Date();
    var day = d.getDay();
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturdday");
    var months = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12")

    document.querySelector('#day-time').innerHTML = days[day] + " | " + date + "/" + months[month] + "/" + year;
    setTimeout("refreshDayTime()", 1000);
}

function refreshClockTime() { //real-time
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    var am_pm;

    if (s < 10) {
        s = "0" + s;
    }
    if (m < 10) {
        m = "0" + m;
    }
    // if (h > 12) {
    //     h -= 12;
    //     am_pm = "PM";
    // } else {
    //     am_pm = "AM";
    // }
    if (h < 10) { h = "0" + h }

    document.querySelector('#clock-time').innerHTML = h + ":" + m + ":" + s;
    setTimeout("refreshClockTime()", 1000);
}