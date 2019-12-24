function createRandomId() {
    const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return [0, 1, 2, 3, 4, 5, 6, 7]
        .map(function() {
            return charSet.charAt(Math.floor(Math.random() * charSet.length));
        })
        .join("");
}

let container = undefined;
let instances = [];

function getContainer() {
    if (container === undefined) {
        document.body.insertAdjacentHTML(
            "beforeend",
            `<div class="modal-container"></div>`
        );

        container = document.body.querySelector(".modal-container");
        container.addEventListener("click", function(event) {
            if (event.target === container) {
                const top = instances[instances.length - 1];
                if (top) {
                    top.destroy();
                }
            }
        });
    }
    return container;
}

export class Modal {
    id: string;
    template: string;
    ref: HTMLElement;

    constructor(template) {
        this.id = createRandomId();
        this.template = template;
    }

    attach() {
        getContainer().insertAdjacentHTML(
            "beforeend",
            `<div class="modal" id="${this.id}">${this.template}</div>`
        );
        this.ref = getContainer().querySelector(`#${this.id}`);
        instances.push(this);
    }

    destroy() {
        instances.splice(instances.indexOf(this), 1);
        this.ref.remove();
        this.ref = undefined;
    }
}
