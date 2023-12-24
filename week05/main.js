var $ = jQuery;

var $$ = function (selector) {
  return $(selector)[0]; //querySelectorAll
};

var $$$ = function (selector) {
  return $(selector); //querySelector
};

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

  const dayTime = $$("#day-time"),
    clockTime = $$("#clock-time");

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
  const itemToDo = $("<li>").attr(
    "class",
    "item-to-do bg-white flex flex-col justify-between p-3 rounded-xl text-sm"
  );

  const itemBox = $("<div>").attr(
    "class",
    "item-box w-full flex justify-between"
  );

  const itemDetails = $("<div>").attr(
    "class",
    "item-details flex flex-col justify-between gap-5"
  );

  const itemName = $("<div>").attr("class", "item-name h-20 overflow-y-auto");
  itemName.text(name);

  const itemDate = $("<div>").attr("class", "item-date flex flex-col gap-2");

  const itemBeginDate = $("<div>").addClass("item-begin-date-time");
  itemBeginDate.text("Begin date:\u00A0" + beginDate);

  const itemDueDate = $("<div>").addClass("item-due-date-time");
  itemDueDate.text("Due date:\u00A0\u00A0\u00A0\u00A0" + dueDate);

  const itemOptions = $("<div>").attr(
    "class",
    "item-options flex flex-col gap-8 items-center"
  );

  const inputPreview = $("<div>").attr(
    "class",
    "inputPreview flex justify-center"
  );

  const cssCheckbox = $("<input>")
    .attr("name", "cssCheckbox")
    .attr("id", "demo_opt_1")
    .attr("type", "checkbox")
    .addClass("css-checkbox");

  const labelChkb = $("<label>").attr("for", "demo_opt_1");

  const faTrash = $("<i>").attr("class", "fa-solid fa-trash fa-xl");

  const penBtn = $("<button>")
    .addClass("penBtn")
    .attr("data-toggle", "modal")
    .attr("data-target", "#modal-form")
    .attr("type", "button");

  const faPen = $("<i>").attr("class", "fa-solid fa-pen fa-xl");

  const formatInitialDate = $("<div>").attr(
    "class",
    "initial-date text-right text-xs"
  );
  formatInitialDate.html(`<i>${initialDate}</i>`);

  itemToDo.append(itemBox);

  itemBox.append(itemDetails);
  itemBox.append(itemOptions);

  itemDetails.append(itemName);
  itemDetails.append(itemDate);

  itemDate.append(itemBeginDate);
  itemDate.append(itemDueDate);

  itemOptions.append(inputPreview);

  inputPreview.append(cssCheckbox);
  inputPreview.append(labelChkb);

  itemOptions.append(faTrash);
  itemOptions.append(penBtn);

  penBtn.append(faPen);

  itemToDo.append(formatInitialDate);

  $(".items-to-do-list").append(itemToDo);

  $("#myInput").val("");
  $("#begin-day-time").val("");
  $("#due-day-time").val("");
}

//--handle get items--
function getAllItems(arr) {
  setTimeout(() => {
    location.reload();
  }, 10);
  var itemListContainer = $(".items-to-do-list");
  itemListContainer.empty();
  setTimeout(() => {
    itemListContainer.load(
      arr.forEach((item) => {
        displayItem(item.name, item.beginDate, item.dueDate, item.initialDate);
      })
    );
  }, 50);
}

//--handle check all inputs--
function checkInputs(input, inputBeginDate, inputDueDate) {
  var isChecked = true;
  if (input === "") {
    alert("The input is empty!\nPlease enter your task 😊");
    isChecked = false;
  } else if (inputBeginDate === "" || inputDueDate === "") {
    alert("Please set date and time 😊");
    isChecked = false;
  } else if (new Date() >= Date.parse(inputBeginDate)) {
    alert("The begin date must be after the current date 😊");
    isChecked = false;
  } else if (Date.parse(inputBeginDate) >= Date.parse(inputDueDate)) {
    alert("The due date must be after the begin date 😊");
    isChecked = false;
  } else isChecked = true;
  return isChecked;
}

//--handle add item--
function createItem() {
  const input = $("#myInput").val(),
    inputBeginDate = $("#begin-day-time").val(),
    inputDueDate = $("#due-day-time").val();

  var isChecked = checkInputs(input, inputBeginDate, inputDueDate);
  if (!isChecked) return;
  var toDoList = localStorage.getItem("to-do-list")
    ? JSON.parse(localStorage.getItem("to-do-list"))
    : [];

  toDoList.push({
    id: Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0"),
    name: input,
    beginDate: formatDateTime(new Date(inputBeginDate)),
    dueDate: formatDateTime(new Date(inputDueDate)),
    initialDate: formatDateTime(new Date()),
    status: "Todo",
  });
  localStorage.setItem("to-do-list", JSON.stringify(toDoList));

  getAllItems(JSON.parse(localStorage.getItem("to-do-list")));
}

//--handle find by id--
function findItemById(index) {
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  if (index < 0 || index >= storedData.length) return;
  else return storedData[index].id;
}

//--handle delete item--
function deleteItem(indexTrashIcon) {
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  if (indexTrashIcon < 0 || indexTrashIcon >= storedData.length) return;

  var itemId = findItemById(indexTrashIcon);
  if (!itemId) return;

  var newStoredData = storedData.filter((item) => item.id !== itemId);
  if (newStoredData.length === 0) {
    localStorage.removeItem("to-do-list");
    getAllItems(JSON.parse(localStorage.getItem("to-do-list")));
  } else {
    localStorage.setItem("to-do-list", JSON.stringify(newStoredData));
    getAllItems(JSON.parse(localStorage.getItem("to-do-list")));
  }
}

//--handle update item--
function updateItem(index) {
  const input = $("#myInputModal").val(),
    inputBeginDate = $("#begin-day-time-modal").val(),
    inputDueDate = $("#due-day-time-modal").val();

  var isChecked = checkInputs(input, inputBeginDate, inputDueDate);
  if (!isChecked) return;

  var itemId = findItemById(index);
  if (!itemId) return;

  var toDoList = JSON.parse(localStorage.getItem("to-do-list"));
  var item = toDoList.find((item) => item.id === itemId);
  
}

//--DOM-content-load
$(function () {
  refreshRealTime();

  customFlatpickr("#begin-day-time");
  customFlatpickr("#due-day-time");

  customFlatpickr("#begin-day-time-modal");
  customFlatpickr("#due-day-time-modal");

  $(".addBtn").on("click", function () {
    createItem();
  });

  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  storedData.forEach((item) => {
    displayItem(item.name, item.beginDate, item.dueDate, item.initialDate);
  });

  $(".fa-trash").each(function (index) {
    $(this).on("click", function () {
      $.confirm({
        title: "",
        content: "Would you like to delete this task? 🤔",
        theme: "dark",
        animation: "RotateY",
        animationSpeed: 500,
        boxWidth: "30%",
        useBootstrap: false,
        buttons: {
          delete: function () {
            deleteItem(index);
          },
          cancel: function () {
            $.alert({
              title: "",
              content: "Canceled!",
              autoClose: "ok|2000",
              theme: "dark",
              animation: "RotateY",
              animationSpeed: 500,
              boxWidth: "30%",
              useBootstrap: false,
              buttons: {
                ok: function () {},
              },
            });
          },
        },
      });
    });
  });

  const myInputModal = $("#myInputModal"),
    beginDayTimeModal = $("#begin-day-time-modal"),
    dueDayTimeModal = $("#due-day-time-modal");
  handleModal(myInputModal, beginDayTimeModal, dueDayTimeModal);

  $(".penBtn").each(function (index) {
    $(".updateBtn").on("click", function () {
      $.confirm({
        title: "",
        content: "Would you like to update information? 🤔",
        theme: "dark",
        animation: "RotateY",
        animationSpeed: 500,
        boxWidth: "30%",
        useBootstrap: false,
        buttons: {
          update: function () {
            updateItem(index);
          },
          cancel: function () {
            $.alert({
              title: "",
              content: "Canceled!",
              autoClose: "ok|2000",
              theme: "dark",
              animation: "RotateY",
              animationSpeed: 500,
              boxWidth: "30%",
              useBootstrap: false,
              buttons: {
                ok: function () {},
              },
            });
          },
        },
      });
    });
  });
});

//--handle modal--
function handleModal(myInputModal, beginDayTimeModal, dueDayTimeModal) {
  var openModalBtn = $(".penBtn");
  var modal = $("#modal-form");
  var modalContent = $(".modal-content");
  var closeModalSpan = $(".close");

  function animateCloseModal() {
    if (
      myInputModal.val() !== "" ||
      beginDayTimeModal.val() !== "" ||
      dueDayTimeModal.val() !== ""
    ) {
      if (confirm("Would you like to exit? 🤔")) {
        modalContent.removeClass("fadeInModal");
        modalContent.addClass("fadeOutModal");

        setTimeout(() => {
          modal.css("display", "none");
        }, 250);

        myInputModal.val("");
        beginDayTimeModal.val("");
        dueDayTimeModal.val("");
      }
    } else {
      modalContent.removeClass("fadeInModal");
      modalContent.addClass("fadeOutModal");
      setTimeout(() => {
        modal.css("display", "none");
      }, 250);
    }
  }

  openModalBtn.each(function () {
    $(this).on("click", function () {
      modal.css("display", "flex");
      modalContent.removeClass("fadeOutModal");
      modalContent.addClass("fadeInModal");
    });
  });

  closeModalSpan.on("click", animateCloseModal);

  $(window).on("click", function (e) {
    if (e.target === modal[0]) animateCloseModal();
  });
}
