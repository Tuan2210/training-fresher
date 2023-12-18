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
document.addEventListener("DOMContentLoaded", refreshRealTime);

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

//--array-local-storage--
var toDoList = [];

//--handle add task--
function createItem() {
  var input = document.querySelector("#myInput").value;
  if (input === "") {
    alert("The input is empty!\nPlease enter your task 😊");
    return;
  }

  const itemToDo = document.createElement("li");
  // item.className("item bg-white flex flex-col justify-between p-3 rounded-xl");
  itemToDo.classList.add(
    "item-to-do",
    "bg-white",
    "flex",
    "flex-col",
    "justify-between",
    "p-3",
    "rounded-xl"
  );

  const itemBox = document.createElement("div");
  itemBox.classList.add("item-box", "w-full", "flex", "justify-between");

  const itemDetails = document.createElement("div");
  itemDetails.classList.add("item-details");
  itemDetails.textContent = input;

  const itemOptions = document.createElement("div");
  itemOptions.classList.add("item-options", "flex", "flex-col", "gap-4");

  const inputPreview = document.createElement("div");
  inputPreview.classList.add("inputPreview", "flex", "justify-center");

  const cssCheckbox = document.createElement("input");
  cssCheckbox.setAttribute("name", "cssCheckbox");
  cssCheckbox.setAttribute("id", "demo_opt_1");
  cssCheckbox.setAttribute("type", "checkbox");
  cssCheckbox.classList.add("css-checkbox");

  const labelChkb = document.createElement("label");
  labelChkb.setAttribute("for", "demo_opt_1");

  const faTrash = document.createElement("i");
  faTrash.classList.add("fa-solid", "fa-trash");
  faTrash.onclick = delItem;

  var faPen = document.createElement("i");
  faPen.classList.add("fa-solid", "fa-pen");

  const dueDate = document.createElement("div");
  dueDate.classList.add("due-date", "text-right");

  const currentDate = new Date(),
    formattedDateTime = formatDateTime(currentDate);
  dueDate.innerHTML = `<i>${formattedDateTime}</i>`;

  itemToDo.appendChild(itemBox);

  itemBox.appendChild(itemDetails);
  itemBox.appendChild(itemOptions);

  itemOptions.appendChild(inputPreview);

  inputPreview.appendChild(cssCheckbox);
  inputPreview.appendChild(labelChkb);

  itemOptions.appendChild(faTrash);
  itemOptions.appendChild(faPen);

  itemToDo.appendChild(dueDate);

  document.querySelector(".items-to-do-list").appendChild(itemToDo);

  document.querySelector("#myInput").value = "";
}

//--handle del task--
function delItem() {
  const trash = document.querySelector(".fa-trash");
  // for (var i = 0; i < i++; i++) {
  //   trash[i].onclick = () => {
  //     alert(trash[i]);
  //     // const div = this.parentElement;
  //     // div.style.display = "none";
  //   };
  // }
  trash.onclick = function () {
    const itemToDo = document.querySelector(".item-to-do");
    itemToDo.style.display = "none";
  };
}
