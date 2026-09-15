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
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const status = document.getElementById("form-success");
      const submitButton = form.querySelector('button[type="submit"]');
      const originalLabel = submitButton ? submitButton.textContent : "";

      if (status) {
        status.style.display = "none";
        status.classList.remove("error");
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending…";
      }

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json"
          }
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error("Submission failed");
        }

        form.reset();
        if (status) {
          status.textContent = "Thank you. Your request was received. Please call (678) 643-1188 if you need same-day assistance.";
          status.style.display = "block";
          status.focus();
        }
      } catch (error) {
        if (status) {
          status.textContent = "We could not send your request. Please try again or call (678) 643-1188.";
          status.classList.add("error");
          status.style.display = "block";
          status.focus();
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalLabel;
        }
      }
    });
  }
})();
