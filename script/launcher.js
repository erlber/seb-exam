"use strict";

const dialog = document.getElementById("configDialog");
const studentButton = document.getElementById("studentBtn");
const launchStatus = document.getElementById("launchStatus");

studentButton.addEventListener("click", () => {
  launchStatus.textContent = "";
  dialog.showModal();
});
document.getElementById("closeConfig").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => studentButton.focus());
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

// HTTPS previews use the configuration files hosted beside this page.
// Local HTTP previews use seb://; production HTTPS uses sebs://.
document.querySelectorAll("[data-config]").forEach((link) => {
  const fileUrl = new URL(link.dataset.config, window.location.href);
  if (fileUrl.protocol === "https:" || fileUrl.protocol === "http:") {
    link.href = fileUrl.href.replace(/^https:/, "sebs:").replace(/^http:/, "seb:");
  }
  link.addEventListener("click", () => {
    launchStatus.textContent = "Forespørsel sendt til Safe Exam Browser. Bekreft åpning i nettleseren. Hvis ingenting skjer, se «Starter ikke SEB?» nedenfor.";
  });
});
