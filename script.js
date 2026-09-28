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




// STEP 3 — Select & Hide About Section


const aboutSection = document.querySelector(".about-section");

aboutSection.style.opacity = "1";


window.addEventListener("scroll", function () {
    console.log("Page is scrolling");
});

