
document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // INTRO SCREEN
    // ======================================

    const introScreen = document.getElementById("introScreen");
    const startButton = document.getElementById("startButton");
    const portfolio = document.getElementById("portfolio");

    if (!introScreen || !startButton || !portfolio) {
        console.error("Intro elements not found. Check your HTML IDs.");
        return;
    }

    startButton.addEventListener("click", () => {

        console.log("ENTER PORTFOLIO clicked");

        startButton.disabled = true;

        // Show the portfolio
        portfolio.classList.remove("hidden");
        portfolio.style.display = "block";

        // Start the portfolio animation
        portfolio.style.opacity = "0";

        requestAnimationFrame(() => {
            portfolio.style.opacity = "1";
        });

        // Hide the intro with a transition
        introScreen.classList.add("exit");

        setTimeout(() => {
            introScreen.style.display = "none";
        }, 900);

        // Start reveal animations
        observeElements();

    });


    // ======================================
    // MOBILE NAVIGATION
    // ======================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });

    }


    // ======================================
    // CARTOON CURSOR
    // ======================================

    const cursor = document.getElementById("cartoonCursor");

    const desktopPointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );

    if (cursor && desktopPointer.matches) {

        document.body.classList.add("custom-cursor-active");

        document.addEventListener("mousemove", (event) => {
            cursor.style.left = event.clientX + "px";
            cursor.style.top = event.clientY + "px";
            cursor.classList.add("visible");
        });

        document.addEventListener("mouseleave", () => {
            cursor.classList.remove("visible");
        });

        document.addEventListener("mouseenter", () => {
            cursor.classList.add("visible");
        });

        const clickableElements = document.querySelectorAll(
            "a, button, .project-card, .skill-item"
        );

        clickableElements.forEach(element => {

            element.addEventListener("mouseenter", () => {
                cursor.classList.add("hovering");
            });

            element.addEventListener("mouseleave", () => {
                cursor.classList.remove("hovering");
            });

        });

    }


    // ======================================
    // SCROLL REVEAL ANIMATIONS
    // ======================================

    function observeElements() {

        const elements = document.querySelectorAll(".reveal");

        if (!("IntersectionObserver" in window)) {
            elements.forEach(element => {
                element.classList.add("active");
            });
            return;
        }

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        elements.forEach(element => {
            observer.observe(element);
        });

    }


    // ======================================
    // FOOTER YEAR
    // ======================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});
