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

//--style-new-item
function displayItem(id, name, beginDate, dueDate, initialDate) {
  const itemToDo = $("<li>")
    .attr(
      "class",
      "item-to-do item-drag bg-white flex flex-col justify-between p-3 rounded-xl text-sm"
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

  itemToDo.append(itemBox);

  itemBox.append(itemId);
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
  $("#begin-date-time").val("");
  $("#due-date-time").val("");
}

//--handle get items--
function getAllItems(arr, itemList) {
  setTimeout(() => {
    location.reload();
  }, 10);
  var itemListContainer = $(itemList);
  itemListContainer.empty();
  setTimeout(() => {
    itemListContainer.load(
      arr.forEach((item) => {
        displayItem(
          item.id,
          item.name,
          item.beginDate,
          item.dueDate,
          item.initialDate
        );
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
    status: "Todo",
  });
  localStorage.setItem("to-do-list", JSON.stringify(toDoList));

  getAllItems(
    JSON.parse(localStorage.getItem("to-do-list")),
    ".items-to-do-list"
  );
}

//--handle find item-id by index--
function findItemIdByIndex(index) {
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  if (index < 0 || index >= storedData.length) return;
  else return storedData[index].id;
}

//--handle delete item--
function deleteItem(indexTrashIcon) {
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  if (indexTrashIcon < 0 || indexTrashIcon >= storedData.length) return;

  var itemId = findItemIdByIndex(indexTrashIcon);
  if (!itemId) return;

  var newStoredData = storedData.filter((item) => item.id !== itemId);
  if (newStoredData.length === 0) {
    localStorage.removeItem("to-do-list");
    getAllItems(
      JSON.parse(localStorage.getItem("to-do-list")),
      ".items-to-do-list"
    );
  } else {
    localStorage.setItem("to-do-list", JSON.stringify(newStoredData));
    getAllItems(
      JSON.parse(localStorage.getItem("to-do-list")),
      ".items-to-do-list"
    );
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

  getAllItems(
    JSON.parse(localStorage.getItem("to-do-list")),
    ".items-to-do-list"
  );
}

//--handle update modal--
function handleUpdateModal() {
  const openModalBtn = $(".penBtn"),
    modal = $("#modal-form"),
    modalContent = $(".modal-content"),
    closeModalSpan = $(".close");

  openModalBtn.each(function (index) {
    const itemId = findItemIdByIndex(index);
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
          $.alert({
            title: "",
            content: "The information has not been updated yet! 🤨",
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
    e.originalEvent.dataTransfer.setData("text/plain", itemId);
    $(this).addClass("dragging");
  });

  itemDrag.on("dragend", function () {
    $(this).removeClass("dragging");
  });

  itemDragList.on("dragover", function (e) {
    e.preventDefault();
  });

  itemDragList.on("drop", function (e) {
    e.preventDefault();

    var idData = e.originalEvent.dataTransfer.getData("text/plain");
    // alert(idData);

    var draggedItem = $(".dragging");

    $(this).append(draggedItem);

    draggedItem.removeClass("dragging");
  });

  // itemDrag.on("dragstart", function () {
  //   const item = $(this);
  //   setTimeout(function () {
  //     item.addClass("dragging");
  //   }, 0);
  // });

  // itemDrag.on("dragend", function () {
  //   $(this).removeClass("dragging");
  // });

  // function initItemDragList(e) {
  //   e.preventDefault();
  //   const itemDragging = itemDragList.find(".dragging");

  //   let siblings = itemDragList.find(".item-drag:not(.dragging)").toArray();

  //   let nextSibling = siblings.find(function (sibling) {
  //     return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  //   });

  //   // itemDragList[0].insertBefore(itemDragging[0], nextSibling);
  //   const container = itemDragging.parent();

  //   if (nextSibling) {
  //     container[0].insertBefore(itemDragging[0], nextSibling);
  //   } else {
  //     container.append(itemDragging);
  //   }
  // }

  // itemDragList.on("dragover", initItemDragList);
  // itemDragList.on("dragenter", function (e) {
  //   e.preventDefault();
  // });
}

//--DOM-content-load
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

  //display-item
  var storedData = JSON.parse(localStorage.getItem("to-do-list")) || [];
  storedData.forEach((item) => {
    displayItem(
      item.id,
      item.name,
      item.beginDate,
      item.dueDate,
      item.initialDate
    );
  });

  //delete-item
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

  //update-item
  handleUpdateModal();

  //drag-drop-item
  handleDragItem();
});
