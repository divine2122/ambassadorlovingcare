(function () {
  const toggle = document.querySelector(".menu-toggle");
  const drawer = document.querySelector(".nav-drawer");
  const form = document.getElementById("referral-form");

  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      const open = drawer.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("menu-open", open);
    });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const success = document.getElementById("form-success");
      form.reset();
      if (success) {
        success.style.display = "block";
        success.focus();
      }
    });
  }
})();
