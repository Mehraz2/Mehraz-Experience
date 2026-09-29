// STEP 1: Purple Mouse Dot

const mouseDot = document.querySelector(".mouse-dot");

document.addEventListener("mousemove", function (event) {

    mouseDot.style.left = event.clientX + "px";

    mouseDot.style.top = event.clientY + "px";

});


// STEP 2: Active Navbar

const sections = document.querySelectorAll("section");

const NavLinks = document.querySelectorAll(".navLinks");

window.addEventListener("scroll", function () {

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {

            console.log(section.id);

        }

    });

});


// STEP 9: Deep & Slow Reveal

sections.forEach(function (section) {

    section.style.opacity = "0";

    section.style.transform = "translateY(100px)";

    section.style.transition =
        "opacity 1.6s ease-out, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)";

});


// STEP 8: IntersectionObserver

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            console.log("Section is visible");

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";


            // STEP 10 — Staggered Reveal

            const elements = entry.target.querySelectorAll(
                "h1, h2, h3, p, img, a, button"
            );

            elements.forEach(function (element, index) {

                element.style.transitionDelay = (index * 0.15) + "s";

                element.style.opacity = "1";

                element.style.transform = "translateY(0)";

            });

        }

    });

});


// STEP 8: Observe Every Section

sections.forEach(function (section) {

    observer.observe(section);

});