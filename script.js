// STEP 1: Purple Mouse Dot

const mouseDot = document.querySelector(".mouse-dot");

document.addEventListener("mousemove", function(event) {

    mouseDot.style.left = event.clientX + "px";
    mouseDot.style.top = event.clientY + "px";

});





// STEP 2: Active Navbar

const sections = document.querySelectorAll("section");
const NavLinks = document.querySelectorAll(".navLinks");

window,addEventListener("scroll", function() {
    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {

            console.log(section.id);
            
        }
    });
});




// STEP 3 — Select About Section

const aboutSection = document.querySelector(".about-section");


// STEP 4 — Detect Scroll Position

window.addEventListener("scroll", function () {

    console.log(window.scrollY);


    // STEP 5 — Check Scroll Position

    if (window.scrollY > 300) {

        console.log("About section reached");


        // STEP 6 — Show About Section

        aboutSection.style.opacity = "1";


        // STEP 7 — Reveal Animation

        aboutSection.style.transform = "translateY(0)";

    }

});


// Initial Animation State

aboutSection.style.opacity = "0";
aboutSection.style.transform = "translateY(60px)";
aboutSection.style.transition = "all 0.8s ease";aboutSection.style.transform = "translateY(60px)";