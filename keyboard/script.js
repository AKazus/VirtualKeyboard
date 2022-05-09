class Keyboard {

    constructor(head_element) {
        this.parent = head_element;
        this.elements = {
            textarea: null,
            main: null,
            keysContainer: null,
            keys: []
        };
        this.eventHandlers = {
            oninput: null,
            onclose: null
        };
        this.properties = {
            capsLock: false,
            shiftDown: false
        };

        this.init();
    }

    init() {
        // create textarea
        this.elements.textarea = document.createElement("textarea");
        this.elements.textarea.classList.add("keyboard-input");
        this.parent.appendChild(this.elements.textarea)

        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this.createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
            /*element.addEventListener("focusout", () => {
                this.close();
            });*/
        });
    };

    createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "done",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "backspace",
            "capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shiftL", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "up", "shiftR",
            "controlL", "altL", " ", "altR", "controlR", "left", "down", "right"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["done", "backspace", "enter", "shiftR", ].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            keyElement.setAttribute("value", key.toLowerCase());

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.elements.textarea.value = this.elements.textarea.value.substring(0, this.elements.textarea.value.length - 1);
                    });

                    document.addEventListener("keydown", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            if (document.activeElement !== this.elements.textarea) {
                                this.elements.textarea.value = this.elements.textarea.value.substring(0, this.elements.textarea.value.length - 1);
                            }
                            keyElement.classList.add("key_active");
                        }
                    })
                    document.addEventListener("keyup", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            keyElement.classList.remove("key_active");
                        }
                    })

                    break;

                case "capslock":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    document.addEventListener("keydown", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            this.toggleCapsLock();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                            keyElement.classList.add("key_active");
                        }
                    })

                    document.addEventListener("keyup", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            keyElement.classList.remove("key_active");
                        }
                    })

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.elements.textarea.value += "\n";
                    });

                    document.addEventListener("keydown", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            if (document.activeElement !== this.elements.textarea) {
                                this.elements.textarea.value += "\n";
                            }
                            keyElement.classList.add("key_active");
                        }
                    })
                    document.addEventListener("keyup", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            keyElement.classList.remove("key_active");
                        }
                    })

                    break;

                case " ":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.elements.textarea.value += " ";
                    });

                    document.addEventListener("keydown", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            if (document.activeElement !== this.elements.textarea) {
                                this.elements.textarea.value += " ";
                            }
                            keyElement.classList.add("key_active");
                        }
                    })

                    document.addEventListener("keyup", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            keyElement.classList.remove("key_active");
                        }
                    })
                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                    });

                    break;

                case "tab":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_tab");

                    keyElement.addEventListener("click", () => {
                        this.elements.textarea.value += "    ";
                    });

                    document.addEventListener("keydown", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            if (document.activeElement !== this.elements.textarea) {
                                this.elements.textarea.value += "    ";
                            }
                            keyElement.classList.add("key_active");
                        }
                    })
                    document.addEventListener("keyup", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            keyElement.classList.remove("key_active");
                        }
                    })

                    break;

                case "shiftL":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = "SHIFT";

                    keyElement.addEventListener("mousedown", () => {
                        this.shiftToggle(true);
                        keyElement.classList.add("key_active");
                    });

                    keyElement.addEventListener("mouseup", () => {
                        this.shiftToggle(false);
                        keyElement.classList.remove("key_active");
                    });

                    document.addEventListener("keydown", (e) => {
                        if (e.code.toLowerCase() == "shiftleft") {
                            this.shiftToggle(true);
                            keyElement.classList.add("key_active");
                        }
                    });

                    document.addEventListener("keyup", (e) => {
                        if (e.code.toLowerCase() == "shiftleft") {
                            this.shiftToggle(false);
                            keyElement.classList.remove("key_active");
                        }
                    });

                    break;

                case "shiftR":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = "SHIFT";

                    keyElement.addEventListener("mousedown", () => {
                        this.shiftToggle(true);
                        keyElement.classList.add("key_active");
                    });

                    keyElement.addEventListener("mouseup", () => {
                        this.shiftToggle(false);
                        keyElement.classList.remove("key_active");
                    });

                    document.addEventListener("keydown", (e) => {
                        if (e.code.toLowerCase() == "shiftright") {
                            this.shiftToggle(true);
                            keyElement.classList.add("key_active");
                        }
                    });

                    document.addEventListener("keyup", (e) => {
                        if (e.code.toLowerCase() == "shiftright") {
                            this.shiftToggle(false);
                            keyElement.classList.remove("key_active");
                        }
                    });

                    break;

                case "altL":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = "ALT";

                    document.addEventListener("keydown", (e) => {
                        if (e.code.toLowerCase() == "altleft") {
                            keyElement.classList.add("key_active");
                        }
                    });

                    document.addEventListener("keyup", (e) => {
                        if (e.code.toLowerCase() == "altleft") {
                            keyElement.classList.remove("key_active");
                        }
                    });

                    break;

                case "altR":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = "ALT";

                    document.addEventListener("keydown", (e) => {
                        if (e.code.toLowerCase() == "altright") {
                            keyElement.classList.add("key_active");
                        }
                    });

                    document.addEventListener("keyup", (e) => {
                        if (e.code.toLowerCase() == "altright") {
                            keyElement.classList.remove("key_active");
                        }
                    });

                    break;

                case "controlL":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = "CTRL";

                    document.addEventListener("keydown", (e) => {
                        if (e.code.toLowerCase() == "controlleft") {
                            keyElement.classList.add("key_active");
                        }
                    });

                    document.addEventListener("keyup", (e) => {
                        if (e.code.toLowerCase() == "controlleft") {
                            keyElement.classList.remove("key_active");
                        }
                    });

                    break;

                case "controlR":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = "CTRL";

                    document.addEventListener("keydown", (e) => {
                        if (e.code.toLowerCase() == "controlright") {
                            keyElement.classList.add("key_active");
                        }
                    });

                    document.addEventListener("keyup", (e) => {
                        if (e.code.toLowerCase() == "controlright") {
                            keyElement.classList.remove("key_active");
                        }
                    });

                    break;

                case "up":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_up");

                    document.addEventListener("keydown", (e) => {
                        if (e.key.toLowerCase() == "arrowup") {
                            keyElement.classList.add("key_active");
                        }
                    });

                    document.addEventListener("keyup", (e) => {
                        if (e.key.toLowerCase() == "arrowup") {
                            keyElement.classList.remove("key_active");
                        }
                    });

                    break;
                case "down":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_down");

                    document.addEventListener("keydown", (e) => {
                        if (e.key.toLowerCase() == "arrowdown") {
                            keyElement.classList.add("key_active");
                        }
                    });

                    document.addEventListener("keyup", (e) => {
                        if (e.key.toLowerCase() == "arrowdown") {
                            keyElement.classList.remove("key_active");
                        }
                    });

                    break;
                case "left":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

                    document.addEventListener("keydown", (e) => {
                        if (e.key.toLowerCase() == "arrowleft") {
                            keyElement.classList.add("key_active");
                        }
                    });

                    document.addEventListener("keyup", (e) => {
                        if (e.key.toLowerCase() == "arrowleft") {
                            keyElement.classList.remove("key_active");
                        }
                    });

                    break;
                case "right":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

                    document.addEventListener("keydown", (e) => {
                        if (e.key.toLowerCase() == "arrowright") {
                            keyElement.classList.add("key_active");
                        }
                    });

                    document.addEventListener("keyup", (e) => {
                        if (e.key.toLowerCase() == "arrowright") {
                            keyElement.classList.remove("key_active");
                        }
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.elements.textarea.value += this.isUpperCase() ? key.toUpperCase() : key.toLowerCase()
                    });

                    document.addEventListener("keydown", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            if (document.activeElement !== this.elements.textarea) {
                                this.elements.textarea.value += this.isUpperCase() ? key.toUpperCase() : key.toLowerCase()
                            }
                            keyElement.classList.add("key_active");
                        }
                    })
                    document.addEventListener("keyup", (e) => {
                        if (e.key.toLowerCase() == key.toLowerCase()) {
                            keyElement.classList.remove("key_active");
                        }
                    })

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    };

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && ["shiftl", "shiftr", "controll", "controlr", "altr", "altl"].indexOf(key.value) == -1) {
                key.textContent = this.isUpperCase() ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    };

    shiftToggle(toggle) {
        this.properties.shiftDown = toggle;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && ["shiftl", "shiftr", "controll", "controlr", "altr", "altl"].indexOf(key.value) == -1) {
                key.textContent = this.isUpperCase() ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    };

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    };

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    };

    isUpperCase() {
        if (this.isMackintosh()) {
            if (this.properties.shiftDown || this.properties.capsLock) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.properties.shiftDown && this.properties.capsLock) {
                return false;
            } else if (this.properties.shiftDown || this.properties.capsLock) {
                return true;
            } else {
                return false;
            }
        }
    }

    isMackintosh() {
        return navigator.userAgent.toLowerCase().includes("macintosh")
    }
}

window.addEventListener("DOMContentLoaded", function () {
    new Keyboard(document.body);
});