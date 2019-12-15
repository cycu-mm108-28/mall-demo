for (const tabs of document.querySelectorAll<HTMLElement>(".tabs")) {
  tabs.addEventListener("click", ({ target }) => {
    for (const [index, tab] of tabs.querySelectorAll("ul.bar > li").entries()) {
      if (tab === target) {
        tabs.dataset.active = `${index + 1}`;
      }
    }
  });
}

for (const form of document.querySelectorAll("form")) {
  for (const editBtn of form.querySelectorAll<HTMLInputElement>("input.edit")) {
    editBtn.addEventListener("click", () => form.classList.remove("static"));
  }
  for (const cancelBtn of form.querySelectorAll<HTMLInputElement>(
    "input.cancel"
  )) {
    cancelBtn.addEventListener("click", () => form.classList.add("static"));
  }
}

for (const panel of document.querySelectorAll<HTMLElement>(".tucked")) {
  for (const tab of panel.querySelectorAll<HTMLElement>("#tab")) {
    tab.addEventListener("click", () => panel.classList.remove("tucked"));
  }
  for (const backdrop of panel.querySelectorAll<HTMLElement>(".backdrop")) {
    backdrop.addEventListener("click", () => panel.classList.add("tucked"));
  }
}
