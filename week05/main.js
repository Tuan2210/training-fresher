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

//--custom flatpickr--
function customFlatpickr(id) {
  const currentDateTime = new Date();
  var h = currentDateTime.getHours(),
    m = currentDateTime.getMinutes();
  // var s = currentDateTime.getSeconds();
  flatpickr(id, {
    enableTime: true,
    dateFormat: "Y-m-d H:i:S",
    minDate: "today",
    enableSeconds: true,
    defaultHour: h,
    defaultMinute: m,
  });
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

//--style-new-item
function displayItem(name, beginDate, dueDate, initialDate) {
  const itemToDo = document.createElement("li");
  // item.className("item bg-white flex flex-col justify-between p-3 rounded-xl");
  itemToDo.classList.add(
    "item-to-do",
    "bg-white",
    "flex",
    "flex-col",
    "justify-between",
    "p-3",
    "rounded-xl",
    "text-sm"
  );

  const itemBox = document.createElement("div");
  itemBox.classList.add("item-box", "w-full", "flex", "justify-between");

  const itemDetails = document.createElement("div");
  itemDetails.classList.add(
    "item-details",
    "flex",
    "flex-col",
    "justify-between",
    "gap-5"
  );

  const itemName = document.createElement("div");
  itemName.classList.add("item-name", "h-20", "overflow-y-auto");
  itemName.textContent = name;

  const itemDate = document.createElement("div");
  itemDate.classList.add("item-date", "flex", "flex-col", "gap-2");

  const itemBeginDate = document.createElement("div");
  itemBeginDate.classList.add("item-begin-date-time");
  itemBeginDate.textContent = "Begin date:\u00A0" + beginDate;

  const itemSpanBegin = document.createElement("span");
  itemSpanBegin.textContent = "Begin date:";

  const itemDueDate = document.createElement("div");
  itemDueDate.classList.add("item-due-date-time");
  itemDueDate.textContent = "Due date:\u00A0\u00A0\u00A0\u00A0" + dueDate;

  const itemSpanDue = document.createElement("span");
  itemSpanDue.textContent = "Due date:";

  const itemOptions = document.createElement("div");
  itemOptions.classList.add(
    "item-options",
    "flex",
    "flex-col",
    "gap-8",
    "items-center"
  );

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
  faTrash.classList.add("fa-solid", "fa-trash", "fa-xl");
  faTrash.onclick = delItem;

  var faPen = document.createElement("i");
  faPen.classList.add("fa-solid", "fa-pen", "fa-xl");

  const formatInitialDate = document.createElement("div");
  formatInitialDate.classList.add("initial-date", "text-right", "text-xs");
  formatInitialDate.innerHTML = `<i>${initialDate}</i>`;

  itemToDo.appendChild(itemBox);

  itemBox.appendChild(itemDetails);
  itemBox.appendChild(itemOptions);

  itemDetails.appendChild(itemName);
  itemDetails.appendChild(itemDate);

  // itemDate.appendChild(itemSpanBegin);
  itemDate.appendChild(itemBeginDate);
  // itemDate.appendChild(itemSpanDue);
  itemDate.appendChild(itemDueDate);

  itemOptions.appendChild(inputPreview);

  inputPreview.appendChild(cssCheckbox);
  inputPreview.appendChild(labelChkb);

  itemOptions.appendChild(faTrash);
  itemOptions.appendChild(faPen);

  itemToDo.appendChild(formatInitialDate);

  document.querySelector(".items-to-do-list").appendChild(itemToDo);

  document.querySelector("#myInput").value = "";
  document.querySelector("#begin-day-time").value = "";
  document.querySelector("#due-day-time").value = "";
}

//--handle add task--
function createItem() {
  const input = document.querySelector("#myInput").value,
    inputBeginDate = document.querySelector("#begin-day-time").value,
    inputDueDate = document.querySelector("#due-day-time").value;

  //check input and date-time
  if (input === "") {
    alert("The input is empty!\nPlease enter your task 😊");
    return;
  }
  if (inputBeginDate === "" || inputDueDate === "") {
    alert("Please set date and time 😊");
    return;
  }
  if (new Date() >= Date.parse(inputBeginDate)) {
    alert("The begin date must be after the current date 😊");
    return;
  }
  if (Date.parse(inputBeginDate) >= Date.parse(inputDueDate)) {
    alert("The due date must be after the begin date 😊");
    return;
  }

  //add-item-localStorage
  var toDoList = localStorage.getItem("to-do-list")
    ? JSON.parse(localStorage.getItem("to-do-list"))
    : [];
  var previousLength = toDoList.length;

  toDoList.push({
    name: input,
    beginDate: formatDateTime(new Date(inputBeginDate)),
    dueDate: formatDateTime(new Date(inputDueDate)),
    initialDate: formatDateTime(new Date()),
    status: "Todo",
  });
  localStorage.setItem("to-do-list", JSON.stringify(toDoList));

  //get-item-localStorage
  // toDoList.forEach((item) => {
  //   displayItem(item.name, item.beginDate, item.dueDate, item.initialDate);
  // });
  for (var i = previousLength; i < toDoList.length; i++) {
    var item = toDoList[i];
    displayItem(item.name, item.beginDate, item.dueDate, item.initialDate);
  }
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

//--DOM-content-load
document.addEventListener("DOMContentLoaded", function () {
  refreshRealTime();

  customFlatpickr("#begin-day-time");
  customFlatpickr("#due-day-time");

  var storedDate = JSON.parse(localStorage.getItem("to-do-list")) || [];
  storedDate.forEach((item) => {
    displayItem(item.name, item.beginDate, item.dueDate, item.initialDate);
  });
});
