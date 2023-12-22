var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

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

  const dayTime = $("#day-time"),
    clockTime = $("#clock-time");

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
  // faTrash.onclick = delItem;

  const penBtn = document.createElement("button");
  penBtn.classList.add("penBtn");
  penBtn.setAttribute("data-toggle", "modal");
  penBtn.setAttribute("data-target", "#modal-form");
  penBtn.setAttribute("type", "button");

  const faPen = document.createElement("i");
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
  itemOptions.appendChild(penBtn);

  penBtn.appendChild(faPen);

  itemToDo.appendChild(formatInitialDate);

  $(".items-to-do-list").appendChild(itemToDo);

  $("#myInput").value = "";
  $("#begin-day-time").value = "";
  $("#due-day-time").value = "";
}

//--handle get items--
function getAllItems(arr) {
  location.reload();
  var itemListContainer = $(".items-to-do-list");
  itemListContainer.innerHTML = "";

  // setTimeout(() => {
  arr.forEach((item) => {
    displayItem(item.name, item.beginDate, item.dueDate, item.initialDate);
  });
  // }, 500);
}

//--handle add item--
function createItem() {
  const input = $("#myInput").value,
    inputBeginDate = $("#begin-day-time").value,
    inputDueDate = $("#due-day-time").value;

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

  toDoList.push({
    id: toDoList.length + 1,
    name: input,
    beginDate: formatDateTime(new Date(inputBeginDate)),
    dueDate: formatDateTime(new Date(inputDueDate)),
    initialDate: formatDateTime(new Date()),
    status: "Todo",
  });
  localStorage.setItem("to-do-list", JSON.stringify(toDoList));

  //get-item-localStorage
  getAllItems(JSON.parse(localStorage.getItem("to-do-list")));
}

//--find parent-element--
// function findParent(element, className) {
//   while (
//     (element = element.parentElement) &&
//     !element.classList.contains(className)
//   );
//   return element;
// }

//--handle delete item--
function delItem(indexTrashIcon) {
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  if (indexTrashIcon < 0 || indexTrashIcon >= storedData.length) return;

  var itemId = storedData[indexTrashIcon].id;

  // storedData.splice(indexTrashIcon, 1);
  var newStoredData = storedData.filter((item) => item.id !== itemId);
  if (newStoredData.length === 0) {
    localStorage.removeItem("to-do-list");
  } else localStorage.setItem("to-do-list", JSON.stringify(newStoredData));

  getAllItems(JSON.parse(localStorage.getItem("to-do-list")));
}

//--handle update item--
function updateItem() {
  const input = $("#myInputModal").value,
    inputBeginDate = $("#begin-day-time-modal").value,
    inputDueDate = $("#due-day-time-modal").value;

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
}

//--DOM-content-load
document.addEventListener("DOMContentLoaded", function () {
  refreshRealTime();

  customFlatpickr("#begin-day-time");
  customFlatpickr("#due-day-time");

  customFlatpickr("#begin-day-time-modal");
  customFlatpickr("#due-day-time-modal");

  $(".addBtn").addEventListener("click", function () {
    createItem();
  });
  // $(".updateBtn").addEventListener("click", function () {
  //   updateItem();
  // });

  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  storedData.forEach((item) => {
    displayItem(item.name, item.beginDate, item.dueDate, item.initialDate);
  });

  var trashIcons = $$(".fa-trash");
  trashIcons.forEach(function (trashIcon, index) {
    trashIcon.addEventListener("click", function () {
      delItem(index);
    });
  });

  const myInputModal = $("#myInputModal"),
    beginDayTimeModal = $("#begin-day-time-modal"),
    dueDayTimeModal = $("#due-day-time-modal");
  handleModal(myInputModal, beginDayTimeModal, dueDayTimeModal);
});

//--handle modal--
function handleModal(myInputModal, beginDayTimeModal, dueDayTimeModal) {
  var openModalBtn = $$(".penBtn");
  var modal = $("#modal-form");
  var modalContent = $(".modal-content");
  var closeModalSpan = $(".close");

  openModalBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      modal.style.display = "flex";
      modalContent.classList.add("fadeInModal");
    });
  });

  closeModalSpan.addEventListener("click", function () {
    modal.style.display = "none";
    modalContent.classList.remove("fadeInModal");
    modalContent.classList.add("fadeOutModal");
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      if (
        myInputModal.value !== "" ||
        beginDayTimeModal.value !== "" ||
        dueDayTimeModal.value !== ""
      ) {
        if (confirm("Would you like to exit? 🤔")) {
          modal.style.display = "none";

          modalContent.classList.remove("fadeInModal");
          modalContent.classList.add("fadeOutModal");

          myInputModal.value = "";
          beginDayTimeModal.value = "";
          dueDayTimeModal.value = "";
        }
      } else {
        modal.style.display = "none";
        modalContent.classList.remove("fadeInModal");
        modalContent.classList.add("fadeOutModal");
      }
    }
  });
}
