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


// STEP 8: Initial Animation State

sections.forEach(function (section) {

    section.style.opacity = "0";
    section.style.transform = "translateY(60px)";
    section.style.transition = "all 0.8s ease";

});


// STEP 8: IntersectionObserver

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            console.log("Section is visible");

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

});


// STEP 8: Observe Every Section

sections.forEach(function (section) {

    observer.observe(section);

    sections.forEach(function (section) {

    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition =
        "opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)";

        // STEP 8 — IntersectionObserver

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

});


// Observe Every Section

sections.forEach(function (section) {

    observer.observe(section);

});


        // STEP 9 — Deep & Slow Reveal

sections.forEach(function (section) {

    section.style.opacity = "0";

    // Start much lower
    section.style.transform = "translateY(100px)";

    // Slow and smooth animation
    section.style.transition =
        "opacity 1.6s ease-out, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)";

         });
    });

});

