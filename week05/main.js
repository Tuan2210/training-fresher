//--real-time--
function refreshRealTime() {
  var d = new Date();

  var day = d.getDay();
  var date = d.getDate();
  var month = d.getMonth();
  var year = d.getFullYear();
  var days = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturdday"
  );
  var months = new Array(
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12"
  );

  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  // var am_pm;

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
  if (h < 10) {
    h = "0" + h;
  }

  const dayTime = document.querySelector("#day-time"),
    clockTime = document.querySelector("#clock-time");

  if (dayTime)
    dayTime.innerHTML =
      days[day] + " | " + date + "/" + months[month] + "/" + year;
  if (clockTime) clockTime.innerHTML = h + ":" + m + ":" + s;

  setTimeout("refreshRealTime()", 1000);
}

//--format date-time--
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

//--num < 10--
function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

//--handle add task--
function newElement() {
  var input = document.querySelector("#myInput").value;
  if (input === "") {
    alert("The input is empty!\nPlease enter your task 😊");
    return;
  }

  var item = document.createElement("li");
  // item.className("item bg-white flex flex-col justify-between p-3 rounded-xl");
  item.classList.add(
    "item-to-do",
    "bg-white",
    "flex",
    "flex-col",
    "justify-between",
    "p-3",
    "rounded-xl"
  );

  var itemDetails = document.createElement("div");
  // itemDetails.className("item-details");
  itemDetails.classList.add("item-details");
  itemDetails.textContent = input;

  var dueDate = document.createElement("div");
  // dueDate.className = "due-date text-right";
  dueDate.classList.add("due-date", "text-right");

  var currentDate = new Date(),
    formattedDateTime = formatDateTime(currentDate);
  dueDate.innerHTML = `<i>${formattedDateTime}</i>`;

  item.appendChild(itemDetails);
  item.appendChild(dueDate);
  document.querySelector(".items-to-do-list").appendChild(item);

  document.querySelector("#myInput").value = "";
}
