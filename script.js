// ======================================================
// STEP 1: PURPLE MOUSE DOT
// ======================================================

// Mouse move করলে purple dot mouse-এর সাথে move করবে

const mouseDot = document.querySelector(".mouse-dot");

document.addEventListener("mousemove", function (event) {

    mouseDot.style.left = event.clientX + "px";

    mouseDot.style.top = event.clientY + "px";

});



// ======================================================
// STEP 2: ACTIVE NAVBAR
// ======================================================

// কোন section বর্তমানে scroll-এর জায়গায় এসেছে
// সেটা detect করার practice

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



// ======================================================
// STEP 3: SELECT ABOUT SECTION
// ======================================================

// About section-কে JavaScript দিয়ে select করা

const aboutSection = document.querySelector(".about-section");



// ======================================================
// STEP 4: DETECT SCROLL POSITION
// ======================================================

// User কতটুকু scroll করেছে সেটা detect করা

window.addEventListener("scroll", function () {

    console.log(window.scrollY);

});



// ======================================================
// STEP 5: DETECT ABOUT SECTION
// ======================================================

// Scroll 300px-এর বেশি হলে
// About section-এর কাছে পৌঁছানোর practice

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        console.log("About section reached");

    }

});



// ======================================================
// STEP 6: CHANGE OPACITY
// ======================================================

// About section hide/show করার practice
//
// আগের practice:
//
// aboutSection.style.opacity = "0";
// aboutSection.style.opacity = "1";
//
// এখন STEP 8 + STEP 9-এর মাধ্যমে
// একই কাজ আরও advancedভাবে করা হচ্ছে.



// ======================================================
// STEP 7: TRANSFORM + TRANSITION
// ======================================================

// Section নিচ থেকে উপরে আসার practice
//
// আগের practice:
//
// aboutSection.style.transform = "translateY(60px)";
// aboutSection.style.transform = "translateY(0)";
//
// এখন STEP 9-এ আরও smooth animation ব্যবহার করছি.



// ======================================================
// STEP 8: INTERSECTION OBSERVER
// ======================================================

// Section screen-এর মধ্যে ঢুকেছে কিনা
// সেটা automatically detect করবে

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            console.log("Section is visible");

            // Section visible হলে show করবে

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";


            // ==================================================
            // STEP 10: STAGGERED REVEAL
            // ==================================================

            // Section-এর ভিতরের content
            // একটার পর একটা reveal হবে

            const elements = entry.target.querySelectorAll(
                "h1, h2, h3, p, img, a, button"
            );

            elements.forEach(function (element, index) {

                // প্রতিটি element-এর delay আলাদা হবে

                element.style.transitionDelay =
                    (index * 0.15) + "s";

                // Element visible হবে

                element.style.opacity = "1";

                // নিচ থেকে original position-এ আসবে

                element.style.transform = "translateY(0)";

            });

        }

    });

});



// ======================================================
// STEP 9: DEEP & SLOW REVEAL
// ======================================================

// সব section প্রথমে invisible থাকবে
// এবং 100px নিচে থাকবে

sections.forEach(function (section) {

    section.style.opacity = "0";

    section.style.transform = "translateY(100px)";

    // Slow + smooth animation

    section.style.transition =
        "opacity 1.6s ease-out, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)";

});



// ======================================================
// STEP 10: STAGGERED INITIAL STATE
// ======================================================

// Section-এর ভিতরের elements প্রথমে
// invisible + 40px নিচে থাকবে

sections.forEach(function (section) {

    const elements = section.querySelectorAll(
        "h1, h2, h3, p, img, a, button"
    );

    elements.forEach(function (element) {

        element.style.opacity = "0";

        element.style.transform = "translateY(40px)";

        element.style.transition =
            "opacity 1s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)";

    });

});



// ======================================================
// STEP 8: OBSERVE EVERY SECTION
// ======================================================

// Portfolio-এর প্রতিটি section observe করা

sections.forEach(function (section) {

    observer.observe(section);

});