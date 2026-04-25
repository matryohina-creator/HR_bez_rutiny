const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const modal = document.getElementById("lead-modal");
const openFormButtons = document.querySelectorAll(".open-form");
const closeTargets = document.querySelectorAll("[data-close='true']");
const leadForm = document.getElementById("lead-form");
const formMessage = document.getElementById("form-message");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => nav?.classList.remove("open"));
});

const openModal = () => {
  modal?.classList.add("active");
  modal?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal?.classList.remove("active");
  modal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

openFormButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

closeTargets.forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!leadForm.checkValidity()) {
      formMessage.textContent = "Пожалуйста, заполните все поля и подтвердите согласие.";
      return;
    }

    const formData = new FormData(leadForm);
    const name = encodeURIComponent(formData.get("name"));
    const phone = encodeURIComponent(formData.get("phone"));
    const telegram = encodeURIComponent(formData.get("telegram"));
    const subject = encodeURIComponent("Заявка с лендинга HR без рутины");
    const body = encodeURIComponent(
      `Имя: ${formData.get("name")}\nТелефон: ${formData.get("phone")}\nTelegram: ${formData.get("telegram")}`
    );

    window.location.href = `mailto:matrehina@krspb.ru?subject=${subject}&body=${body}`;

    formMessage.textContent = "Спасибо! Ваша заявка отправлена.";
    leadForm.reset();

    setTimeout(() => {
      closeModal();
      formMessage.textContent = "";
    }, 1600);
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}
