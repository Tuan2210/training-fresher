const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function handleAnimation() {
  const mobileMenuBtn = $(".header .mobile-menu-icon");
  const mainBodyLeft = $(".main-body-left");
  const overlay = $(".overlay");
  const mainBodyLeftCloseBtn = $(".main-body-left__close-btn");
  const mainBodyLeftMobileMenuBtn = $(".main-body-left .mobile-menu-icon");

  mobileMenuBtn.onclick = function () {
    mainBodyLeft.classList.add("active");
    overlay.classList.add("show");
  };

  [mainBodyLeftCloseBtn, overlay, mainBodyLeftMobileMenuBtn].forEach((item) => {
    item.onclick = function () {
      mainBodyLeft.classList.remove("active");

      overlay.onanimationend = (e) => {
        if (overlay.classList.contains("hide")) {
          overlay.classList.remove("hide");
        }
      };

      overlay.classList.remove("show");
      overlay.classList.add("hide");
    };
  });
}

window.document.addEventListener("DOMContentLoaded", handleAnimation());
