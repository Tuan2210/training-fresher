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
    dateFormat: "Y/m/d H:i:S",
    minDate: "today",
    enableSeconds: true,
    time_24hr: true,
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

//--display item-to-do--
function displayItemToDo(id, name, beginDate, dueDate, initialDate, status) {
  const item = $("<li>")
    .attr(
      "class",
      "item-to-do item-drag bg-white flex flex-col justify-between p-5 rounded-xl text-sm"
    )
    .attr("draggable", "true");

  const itemBox = $("<div>").attr(
    "class",
    "item-box w-full flex justify-between"
  );

  const itemId = $("<div>").attr("class", "item-id text-white fixed");
  itemId.text(id);
  // itemId.hide();

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

  item.append(itemBox);

  itemBox.append(itemId);
  itemBox.append(itemDetails);
  itemBox.append(itemOptions);

  itemDetails.append(itemName);
  itemDetails.append(itemDate);

  itemDate.append(itemBeginDate);
  itemDate.append(itemDueDate);

  // itemOptions.append(inputPreview);

  // inputPreview.append(cssCheckbox);
  // inputPreview.append(labelChkb);

  itemOptions.append(faTrash);
  itemOptions.append(penBtn);

  penBtn.append(faPen);

  item.append(formatInitialDate);

  $(".items-to-do-list").append(item);

  $("#myInput").val("");
  $("#begin-date-time").val("");
  $("#due-date-time").val("");
}

//--display item-done--
function displayItemDone(id, name, beginDate, dueDate, initialDate, status) {
  const item = $("<li>")
    .attr(
      "class",
      "item-done item-drag bg-white flex flex-col justify-between p-5 rounded-xl text-sm"
    )
    .attr("draggable", "true");

  const itemBox = $("<div>").attr(
    "class",
    "item-box w-full flex justify-between"
  );

  const itemId = $("<div>").attr("class", "item-id text-white fixed");
  itemId.text(id);

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

  const faTrash = $("<i>").attr("class", "fa-solid fa-trash fa-xl");

  const formatInitialDate = $("<div>").attr(
    "class",
    "initial-date text-right text-xs"
  );
  formatInitialDate.html(`<i>${initialDate}</i>`);

  item.append(itemBox);

  itemBox.append(itemId);
  itemBox.append(itemDetails);
  itemBox.append(itemOptions);

  itemDetails.append(itemName);
  itemDetails.append(itemDate);

  itemDate.append(itemBeginDate);
  itemDate.append(itemDueDate);

  itemOptions.append(faTrash);

  item.append(formatInitialDate);

  $(".items-done-list").append(item);
}

//--display item-doing--
function displayItemDoing(id, name, beginDate, dueDate, initialDate, status) {
  const item = $("<li>")
    .attr(
      "class",
      "item-doing item-drag bg-white flex flex-col justify-between p-5 rounded-xl text-sm"
    )
    .attr("draggable", "true");

  const itemBox = $("<div>").attr(
    "class",
    "item-box w-full flex justify-between"
  );

  const itemId = $("<div>").attr("class", "item-id text-white fixed");
  itemId.text(id);

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

  item.append(itemBox);

  itemBox.append(itemId);
  itemBox.append(itemDetails);
  itemBox.append(itemOptions);

  itemDetails.append(itemName);
  itemDetails.append(itemDate);

  itemDate.append(itemBeginDate);
  itemDate.append(itemDueDate);

  itemOptions.append(faTrash);
  itemOptions.append(penBtn);

  penBtn.append(faPen);

  item.append(formatInitialDate);

  $(".items-doing-list").append(item);
}

//--handle get all items to-do--
function getAllItemsToDo() {
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  var list = storedData.filter((item) => item.status === "to-do");
  $(".items-to-do-list").empty();
  list.forEach((item) => {
    displayItemToDo(
      item.id,
      item.name,
      item.beginDate,
      item.dueDate,
      item.initialDate,
      item.status
    );
  });
}

//--handle get all items done--
function getAllItemsDone() {
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  var list = storedData.filter((item) => item.status === "done");
  $(".items-done-list").empty();
  list.forEach((item) => {
    displayItemDone(
      item.id,
      item.name,
      item.beginDate,
      item.dueDate,
      item.initialDate,
      item.status
    );
  });
}

//--handle get all items doing--
function getAllItemsDoing() {
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  var list = storedData.filter((item) => item.status === "doing");
  $(".items-doing-list").empty();
  list.forEach((item) => {
    displayItemDoing(
      item.id,
      item.name,
      item.beginDate,
      item.dueDate,
      item.initialDate,
      item.status
    );
  });
}

//--handle check all inputs--
function checkInputs(input, inputBeginDate, inputDueDate) {
  var isChecked = true;
  if (input === "") {
    $.alert(customAlert("The input is empty!\nPlease enter your task 😊", {}));
    isChecked = false;
  } else if (inputBeginDate === "" || inputDueDate === "") {
    $.alert(customAlert("Please set date and time 😊", {}));
    isChecked = false;
  } else if (new Date() >= Date.parse(inputBeginDate)) {
    $.alert(
      customAlert("The begin date must be after the current date 😊", {})
    );
    isChecked = false;
  } else if (Date.parse(inputBeginDate) >= Date.parse(inputDueDate)) {
    $.alert(customAlert("The due date must be after the begin date 😊", {}));
    isChecked = false;
  } else isChecked = true;
  return isChecked;
}

//--handle add item--
function createItem() {
  const input = $("#myInput").val(),
    inputBeginDate = $("#begin-date-time").val(),
    inputDueDate = $("#due-date-time").val();

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
    beginDate: inputBeginDate,
    dueDate: inputDueDate,
    initialDate: formatDateTime(new Date()),
    status: "to-do",
  });
  localStorage.setItem("to-do-list", JSON.stringify(toDoList));
  location.reload();
  setTimeout(() => {
    getAllItemsDone();
    getAllItemsToDo();
    getAllItemsDoing();
  }, 50);
}

//--handle find item-id by index--
function findItemIdByIndex(index) {
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  if (index < 0 || index >= storedData.length) return;
  else return storedData[index].id;
}

//--handle delete item--
function deleteItem(itemId) {
  location.reload();
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];

  var newStoredData = storedData.filter((item) => item.id !== itemId);
  if (newStoredData.length === 0) {
    localStorage.removeItem("to-do-list");
    $(".items-to-do-list").empty();
  } else {
    localStorage.setItem("to-do-list", JSON.stringify(newStoredData));
    getAllItemsDone();
    getAllItemsToDo();
    getAllItemsDoing();
  }
}

//--handle update item--
function updateItem(itemId) {
  const input = $("#myInputModal").val(),
    inputBeginDate = $("#begin-date-time-modal").val(),
    inputDueDate = $("#due-date-time-modal").val();

  if (input === "") {
    alert("The input is empty!\nPlease enter your task 😊");
    return;
  }
  if (inputBeginDate === "" || inputDueDate === "") {
    alert("Please set date and time 😊");
    return;
  }
  if (Date.parse(inputBeginDate) >= Date.parse(inputDueDate)) {
    alert("The due date must be after the begin date 😊");
    return;
  }

  var toDoList = JSON.parse(localStorage.getItem("to-do-list"));
  var item = toDoList.find((item) => item.id === itemId);
  if (!item) return;

  item.name = input;
  item.beginDate = inputBeginDate;
  item.dueDate = inputDueDate;
  localStorage.setItem("to-do-list", JSON.stringify(toDoList));
  location.reload();
  getAllItemsDone();
  getAllItemsToDo();
  getAllItemsDoing();
}

//--handle update modal--
function handleUpdateModal() {
  const openModalBtn = $(".penBtn"),
    modal = $("#modal-form"),
    modalContent = $(".modal-content"),
    closeModalSpan = $(".close");

  openModalBtn.each(function () {
    var itemId = $(this).parent().parent().find(".item-id").text();
    if (!itemId) return;

    var storedData = JSON.parse(localStorage.getItem("to-do-list"));
    var item = storedData.find((item) => item.id === itemId);
    if (!item) return;

    $(this).on("click", function () {
      $("#myInputModal").val(item.name);
      $("#begin-date-time-modal").val(item.beginDate);
      $("#due-date-time-modal").val(item.dueDate);

      modal.css("display", "flex");
      modalContent.removeClass("fadeOutModal");
      modalContent.addClass("fadeInModal");

      $(".updateBtn").on("click", function () {
        const currentInput = $("#myInputModal").val(),
          currentInputBegin = $("#begin-date-time-modal").val(),
          currentInputDue = $("#due-date-time-modal").val();
        if (
          item.name === currentInput &&
          item.beginDate === currentInputBegin &&
          item.dueDate === currentInputDue
        ) {
          $.alert(
            customAlert("The information has not been updated yet! 🤨", {
              ok: function () {},
            })
          );
        }
        if (
          item.name !== currentInput ||
          item.beginDate !== currentInputBegin ||
          item.dueDate !== currentInputDue
        ) {
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
                updateItem(item.id);
              },
              cancel: function () {
                $.alert(
                  customAlert("Canceled!", {
                    ok: function () {},
                  })
                );
              },
            },
          });
        }
      });

      function animateCloseModal() {
        modalContent.removeClass("fadeInModal");
        modalContent.addClass("fadeOutModal");
        setTimeout(() => {
          modal.css("display", "none");
        }, 250);
      }

      closeModalSpan.on("click", animateCloseModal);

      $(window).on("click", function (e) {
        if (e.target === modal[0]) animateCloseModal();
      });
    });
  });
}

//--handle drag item--
function handleDragItem() {
  const itemDragList = $(".item-drag-list"),
    itemDrag = $(".item-drag");

  itemDrag.on("dragstart", function (e) {
    var itemBox = $(this).find(".item-box");
    var itemId = itemBox.find(".item-id").text();
    e.originalEvent.dataTransfer.setData("number", itemId);

    // console.log($(this).parent().attr("class").split(" ")[0]);
    $(this).addClass("dragging");
  });

  itemDrag.on("dragend", function () {
    $(this).removeClass("dragging");
  });

  itemDragList.on("dragover", function (e) {
    e.preventDefault();
    // itemDrag.addClass("over");
  });

  itemDragList.on("drop", function (e) {
    e.preventDefault();

    var draggedItem = $(".dragging");
    $(this).append(draggedItem);
    draggedItem.removeClass("dragging");

    var itemId = e.originalEvent.dataTransfer.getData("number");
    var storedData = JSON.parse(localStorage.getItem("to-do-list"));
    var item = storedData.find((item) => item.id === itemId);
    if (!item) return;

    // console.log($(this).parent().attr("class").split(" ")[0]); //class wrapper-name
    //get parent-class after drop
    var ulClass = e.target.classList[0];
    switch (ulClass) {
      case "items-done-list":
        item.status = "done";
        localStorage.setItem("to-do-list", JSON.stringify(storedData));
        break;
      case "items-to-do-list":
        item.status = "to-do";
        localStorage.setItem("to-do-list", JSON.stringify(storedData));
        break;
      case "items-doing-list":
        item.status = "doing";
        localStorage.setItem("to-do-list", JSON.stringify(storedData));
        break;
      default:
        break;
    }
    location.reload();
    getAllItemsDone();
    getAllItemsToDo();
    getAllItemsDoing();
  });
}

//--custom jquery-confirm-alert---
function customAlert(content, btns) {
  var customAlert = {
    title: "",
    content: content,
    autoClose: "ok|2000",
    theme: "dark",
    animation: "RotateY",
    animationSpeed: 500,
    boxWidth: "30%",
    useBootstrap: false,
    buttons: btns,
  };
  return customAlert;
}

//--handle check due-date--
var showToastFlag = {};
function checkDueDate() {
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  var listNotDone = storedData.filter((item) => item.status !== "done");

  listNotDone.forEach(function (item) {
    var dueDate = new Date(item.dueDate).getTime();

    if (dueDate < new Date().getTime() && !showToastFlag[item.id]) {
      showToast(item.name, item.dueDate);
      showToastFlag[item.id] = true; //check displayed this toast-item
    }
  });
}

//--handle toast--
function showToast(taskName, dueDate) {
  const toastContainer = $("#toast-container");

  const toast = $("<div>").attr(
    "class",
    "toast flex flex-col justify-between gap-4 p-3 rounded-xl"
  ).html(`
      <div class="toast__header flex justify-between items-center">
        <div class="toast__left flex flex-row items-center gap-2">
          <i class="fa-solid fa-bell" style="color: #09CBD0;"></i>
          <h3 class="toast__title">Notification!</h3>
        </div>
        <div class="toast__close cursor-pointer">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="toast__content">
        <p class="toast__msg">
          "<b>${taskName}</b>" <span class="text-red-500">has reached its due date!</span>
        </p>
      </div>
      <div class="toast__due-date">
        <i>Due date: ${dueDate}</i>
      </div>
    `);

  toastContainer.append(toast);

  toast.width();

  toast.addClass("showToast");

  //close
  $(".toast__close").each(function () {
    $(this).on("click", function () {
      var singleToast = $(this).closest(".toast");
      singleToast.removeClass("showToast");
      singleToast.addClass("hideToast");
      setTimeout(function () {
        singleToast.remove();
      }, 1001);
    });
  });

  //auto close
  setTimeout(() => {
    toast.removeClass("showToast");
    toast.addClass("hideToast");
    setTimeout(function () {
      toast.remove();
    }, 1500);
  }, 5000);
}

//--DOM-content-load--
$(function () {
  refreshRealTime();

  customFlatpickr("#begin-date-time");
  customFlatpickr("#due-date-time");

  customFlatpickr("#begin-date-time-modal");
  customFlatpickr("#due-date-time-modal");

  //create-item
  $(".addBtn").on("click", function () {
    createItem();
  });

  //display-items
  getAllItemsDone();
  getAllItemsToDo();
  getAllItemsDoing();

  //delete-item
  $(".fa-trash").each(function () {
    $(this).on("click", function () {
      var itemId = $(this).parent().parent().find(".item-id").text();
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
            deleteItem(itemId);
          },
          cancel: function () {
            $.alert(
              customAlert("Canceled!", {
                ok: function () {},
              })
            );
          },
        },
      });
    });
  });

  //update-item
  handleUpdateModal();

  //drag-drop-item
  handleDragItem();

  //check due-date
  setInterval(function () {
    checkDueDate(); //first show
  }, 1000);

  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  var listNotDone = storedData.filter((item) => item.status !== "done");

  listNotDone.forEach(function (item) {
    var dueDate = new Date(item.dueDate).getTime();

    setTimeout(function () {
      setInterval(function () {
        if (dueDate < new Date().getTime()) {
          showToast(item.name, item.dueDate);
        }
      }, 5000 + 3600 * 5 * 1000); //re-show toast every 5mins after 5s showed
      // }, 5000 + 10 * 1000); //test re-show toast every 10s after 5s showed
    }, 0);
  });
});
