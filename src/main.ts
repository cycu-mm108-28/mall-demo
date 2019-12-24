import { Modal } from "./Modal";

for (const tabs of document.querySelectorAll<HTMLElement>(".tabs")) {
    tabs.addEventListener("click", ({ target }) => {
        for (const [index, tab] of tabs
            .querySelectorAll("ul.bar > li")
            .entries()) {
            if (tab === target) {
                tabs.dataset.active = `${index + 1}`;
            }
        }
    });
}

for (const form of document.querySelectorAll("form")) {
    for (const editBtn of form.querySelectorAll<HTMLInputElement>(
        "input.edit"
    )) {
        editBtn.addEventListener("click", () =>
            form.classList.remove("static")
        );
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

for (const container of document.querySelectorAll<HTMLElement>(".slides")) {
    const slides = [
        ...container.querySelectorAll<HTMLElement>(".slide:not(.number)")
    ];
    const dots = [...container.querySelectorAll<HTMLElement>(".dots .dot")];

    let currentSlide = 0;
    function show(nextSlide = (currentSlide + 1) % slides.length) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        slides[nextSlide].classList.add("active");
        dots[nextSlide].classList.add("active");

        currentSlide = nextSlide;
    }
    function init() {
        if (slides.length > 0 && dots.length > 0) {
            show(0);
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", () => show(i));
        }
        setInterval(() => show(), 3000);
    }

    init();
}

for (const rating of document.querySelectorAll(".form-control.ratings")) {
    const input = rating.querySelector("input");
    const stars = [...rating.querySelectorAll<HTMLElement>(".stars .fa-star")];
    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener("mouseenter", () => {
            requestAnimationFrame(() => {
                stars.forEach(e => e.classList.remove("far"));
                stars.forEach(e => e.classList.remove("fas"));
                stars.slice(0, i + 1).forEach(e => e.classList.add("fas"));
                stars.slice(i + 1).forEach(e => e.classList.add("far"));
            });
        });
        stars[i].addEventListener("mouseleave", () => {
            requestAnimationFrame(() => {
                stars.forEach(e => e.classList.remove("far"));
                stars.forEach(e => e.classList.remove("fas"));
                stars
                    .slice(0, +input.value)
                    .forEach(e => e.classList.add("fas"));
                stars.slice(+input.value).forEach(e => e.classList.add("far"));
            });
        });
        stars[i].addEventListener("click", () => {
            input.value = `${i + 1}`;
        });
    }
}
