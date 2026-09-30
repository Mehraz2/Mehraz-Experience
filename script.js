/* =========================================================
   MEHRAZ EXPERIENCE PORTFOLIO
   ADVANCED INTERACTION SYSTEM
   ========================================================= */


/* =========================================================
   1. GLOBAL SETTINGS
   ========================================================= */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

const isMobile = window.matchMedia(
    "(max-width: 768px)"
).matches;

const isTablet = window.matchMedia(
    "(min-width: 769px) and (max-width: 1100px)"
).matches;


/* =========================================================
   2. PERFORMANCE MODE
   ========================================================= */

const performanceMode =
    prefersReducedMotion
        ? "reduced"
        : isMobile
            ? "mobile"
            : isTablet
                ? "tablet"
                : "desktop";


/* =========================================================
   3. COMMON SELECTORS
   ========================================================= */

const body = document.body;

const heroSection =
    document.querySelector(".hero-section");

const heroImageContainer =
    document.querySelector(".hero-image-container");

const heroImage =
    document.querySelector(".hero-img");

const heroLeft =
    document.querySelector(".hero-text-left");

const heroRight =
    document.querySelector(".hero-text-right");

const navLinks =
    document.querySelectorAll(".nav-link");

const projectCards =
    document.querySelectorAll(".project-card");

const skillBoxes =
    document.querySelectorAll(".skill-box");

const testimonialCards =
    document.querySelectorAll(".testimonial-card");

const buttons =
    document.querySelectorAll(".btn, .arrow-btn");


/* =========================================================
   4. PAGE LOAD ANIMATION
   ========================================================= */

window.addEventListener("load", () => {

    body.classList.add("page-loaded");

    const elements = [
        heroLeft,
        heroImageContainer,
        heroRight
    ];

    elements.forEach((element, index) => {

        if (!element) return;

        if (prefersReducedMotion) return;

        element.style.animationDelay =
            `${index * 0.12}s`;

    });

});


/* =========================================================
   5. ADVANCED CURSOR GLOW
   ========================================================= */

let cursorGlow = null;

if (!prefersReducedMotion) {

    cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "js-cursor-glow";

    cursorGlow.style.cssText = `
        position: fixed;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        left: 0;
        top: 0;
        opacity: 0;

        background: radial-gradient(
            circle,
            rgba(139, 92, 246, 0.22) 0%,
            rgba(139, 92, 246, 0.10) 30%,
            rgba(139, 92, 246, 0.04) 55%,
            transparent 75%
        );

        filter: blur(8px);

        transform:
            translate3d(-50%, -50%, 0);

        will-change:
            transform,
            opacity;
    `;

    body.appendChild(cursorGlow);

}


/* =========================================================
   6. SMOOTH MOUSE FOLLOWING
   ========================================================= */

let mouseX =
    window.innerWidth / 2;

let mouseY =
    window.innerHeight / 2;

let glowX =
    mouseX;

let glowY =
    mouseY;

let glowVisible =
    false;


function updateCursorGlow() {

    if (!cursorGlow) return;

    const speed =
        performanceMode === "mobile"
            ? 0.10
            : performanceMode === "tablet"
                ? 0.12
                : 0.085;


    glowX +=
        (mouseX - glowX) * speed;

    glowY +=
        (mouseY - glowY) * speed;


    cursorGlow.style.transform =
        `
        translate3d(
            ${glowX}px,
            ${glowY}px,
            0
        )
        translate(-50%, -50%)
        `;


    requestAnimationFrame(
        updateCursorGlow
    );

}


if (cursorGlow) {

    requestAnimationFrame(
        updateCursorGlow
    );

}


document.addEventListener(
    "pointermove",
    (event) => {

        if (
            event.pointerType === "touch"
        ) {
            return;
        }


        mouseX =
            event.clientX;

        mouseY =
            event.clientY;


        if (!glowVisible) {

            glowVisible = true;

            cursorGlow.style.opacity =
                performanceMode === "desktop"
                    ? "1"
                    : "0.75";

        }

    },
    {
        passive: true
    }
);


document.addEventListener(
    "pointerleave",
    () => {

        if (!cursorGlow) return;

        cursorGlow.style.opacity =
            "0";

        glowVisible =
            false;

    }
);


/* =========================================================
   7. MOBILE TOUCH GLOW
   ========================================================= */

let touchGlow = null;


if (
    isTouchDevice &&
    !prefersReducedMotion
) {

    touchGlow =
        document.createElement("div");

    touchGlow.className =
        "js-touch-glow";

    touchGlow.style.cssText = `
        position: fixed;

        width: 150px;
        height: 150px;

        border-radius: 50%;

        pointer-events: none;

        z-index: 9997;

        opacity: 0;

        background: radial-gradient(
            circle,
            rgba(139, 92, 246, 0.25),
            rgba(139, 92, 246, 0.08) 45%,
            transparent 75%
        );

        filter: blur(6px);

        transform:
            translate3d(-50%, -50%, 0);

        will-change:
            left,
            top,
            opacity;
    `;

    body.appendChild(
        touchGlow
    );

}


document.addEventListener(
    "touchstart",
    (event) => {

        if (!touchGlow) return;

        const touch =
            event.touches[0];

        touchGlow.style.left =
            `${touch.clientX}px`;

        touchGlow.style.top =
            `${touch.clientY}px`;

        touchGlow.style.opacity =
            "1";

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchmove",
    (event) => {

        if (!touchGlow) return;

        const touch =
            event.touches[0];

        touchGlow.style.left =
            `${touch.clientX}px`;

        touchGlow.style.top =
            `${touch.clientY}px`;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    () => {

        if (!touchGlow) return;

        touchGlow.style.opacity =
            "0";

    },
    {
        passive: true
    }
);


/* =========================================================
   8. HERO MOUSE PARALLAX
   ========================================================= */

let targetParallaxX = 0;
let targetParallaxY = 0;

let currentParallaxX = 0;
let currentParallaxY = 0;


if (
    heroImage &&
    !prefersReducedMotion
) {

    document.addEventListener(
        "pointermove",
        (event) => {

            if (
                event.pointerType === "touch"
            ) {
                return;
            }


            const x =
                (event.clientX /
                    window.innerWidth) -
                0.5;

            const y =
                (event.clientY /
                    window.innerHeight) -
                0.5;


            targetParallaxX =
                x;

            targetParallaxY =
                y;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   9. SCROLL POSITION
   ========================================================= */

let scrollPosition = 0;


window.addEventListener(
    "scroll",
    () => {

        scrollPosition =
            window.scrollY;

    },
    {
        passive: true
    }
);


/* =========================================================
   10. HERO ANIMATION LOOP
   ========================================================= */

function animateHero() {

    if (
        !heroImage ||
        prefersReducedMotion
    ) {

        requestAnimationFrame(
            animateHero
        );

        return;

    }


    const mouseStrength =
        performanceMode === "desktop"
            ? 18
            : performanceMode === "tablet"
                ? 12
                : 7;


    currentParallaxX +=
        (
            targetParallaxX -
            currentParallaxX
        ) * 0.06;


    currentParallaxY +=
        (
            targetParallaxY -
            currentParallaxY
        ) * 0.06;


    const mouseMoveX =
        currentParallaxX *
        mouseStrength;


    const mouseMoveY =
        currentParallaxY *
        mouseStrength;


    const scrollMove =
        Math.min(
            scrollPosition * 0.04,
            35
        );


    heroImage.style.transform =
        `
        translate3d(
            ${mouseMoveX}px,
            ${mouseMoveY - scrollMove}px,
            0
        )
        `;


    requestAnimationFrame(
        animateHero
    );

}


requestAnimationFrame(
    animateHero
);


/* =========================================================
   11. MOBILE TOUCH HERO PARALLAX
   ========================================================= */

let touchParallaxX = 0;
let touchParallaxY = 0;


if (
    heroImage &&
    isTouchDevice &&
    !prefersReducedMotion
) {

    document.addEventListener(
        "touchmove",
        (event) => {

            const touch =
                event.touches[0];

            const centerX =
                window.innerWidth / 2;

            const centerY =
                window.innerHeight / 2;


            touchParallaxX =
                (
                    touch.clientX -
                    centerX
                ) * 0.015;


            touchParallaxY =
                (
                    touch.clientY -
                    centerY
                ) * 0.015;


            targetParallaxX =
                touchParallaxX /
                10;


            targetParallaxY =
                touchParallaxY /
                10;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   12. DEVICE ORIENTATION FALLBACK
   ========================================================= */

if (
    window.DeviceOrientationEvent &&
    !prefersReducedMotion
) {

    window.addEventListener(
        "deviceorientation",
        (event) => {

            if (!isTouchDevice) {
                return;
            }


            if (
                event.gamma === null ||
                event.beta === null
            ) {
                return;
            }


            const gamma =
                Math.max(
                    -30,
                    Math.min(
                        30,
                        event.gamma
                    )
                );


            const beta =
                Math.max(
                    -30,
                    Math.min(
                        30,
                        event.beta
                    )
                );


            targetParallaxX =
                gamma / 30;

            targetParallaxY =
                beta / 30;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   13. SCROLL REVEAL ELEMENTS
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        `
        .about-container,
        .projects-section .section-heading,
        .project-card,
        .experience-section .section-heading,
        .timeline-item,
        .skills-section .section-heading,
        .skill-box,
        .testimonials-section .section-heading,
        .testimonial-card,
        .contact-container
        `
    );


revealElements.forEach(
    (element) => {

        element.classList.add(
            "js-reveal"
        );

    }
);


/* =========================================================
   14. SCROLL REVEAL OBSERVER
   ========================================================= */

if (!prefersReducedMotion) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "js-reveal-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "js-reveal-visible"
            );

        }
    );

}


/* =========================================================
   15. SCROLL REVEAL CSS
   ========================================================= */

const revealStyle =
    document.createElement("style");


revealStyle.textContent = `

    .js-reveal {

        opacity: 0;

        transform:
            translateY(45px);

        transition:
            opacity 0.8s ease,
            transform 0.8s ease;

    }


    .js-reveal-visible {

        opacity: 1;

        transform:
            translateY(0);

    }


    @media (max-width: 768px) {

        .js-reveal {

            transform:
                translateY(25px);

        }

    }


    @media (prefers-reduced-motion: reduce) {

        .js-reveal {

            opacity: 1 !important;

            transform: none !important;

            transition: none !important;

        }

    }

`;


document.head.appendChild(
    revealStyle
);


/* =========================================================
   16. PROJECT STAGGER ANIMATION
   ========================================================= */

projectCards.forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${Math.min(
                index * 0.08,
                0.4
            )}s`;

    }
);


/* =========================================================
   17. SCROLL PROGRESS BAR
   ========================================================= */

const progressBar =
    document.createElement("div");


progressBar.className =
    "js-scroll-progress";


progressBar.style.cssText = `
    position: fixed;

    top: 0;
    left: 0;

    width: 0%;

    height: 3px;

    background: linear-gradient(
        90deg,
        #6d28d9,
        #8b5cf6,
        #a78bfa
    );

    box-shadow:
        0 0 10px
        rgba(139,92,246,0.8),

        0 0 25px
        rgba(139,92,246,0.4);

    z-index: 10001;

    pointer-events: none;
`;


body.appendChild(
    progressBar
);


function updateScrollProgress() {

    const scrollTop =
        window.scrollY;


    const scrollHeight =
        document.documentElement
            .scrollHeight -
        window.innerHeight;


    const progress =
        scrollHeight > 0
            ? (
                scrollTop /
                scrollHeight
            ) * 100
            : 0;


    progressBar.style.width =
        `${progress}%`;

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    {
        passive: true
    }
);


updateScrollProgress();


/* =========================================================
   18. ACTIVE NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    const id =
                        entry.target
                            .getAttribute(
                                "id"
                            );


                    navLinks.forEach(
                        (link) => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }
            );

        },
        {
            threshold: 0.35,

            rootMargin:
                "-10% 0px -45% 0px"
        }
    );


sections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   19. ACTIVE NAV CSS
   ========================================================= */

const activeNavStyle =
    document.createElement("style");


activeNavStyle.textContent = `

    .nav-link.active {

        color:
            #a78bfa;

        text-shadow:
            0 0 10px #8b5cf6,
            0 0 20px
            rgba(139,92,246,0.5);

    }


    .nav-link.active::after {

        width: 100%;

    }

`;


document.head.appendChild(
    activeNavStyle
);


/* =========================================================
   20. PROJECT CARD 3D TILT
   ========================================================= */

if (!prefersReducedMotion) {

    projectCards.forEach(
        (card) => {

            let rect;


            function updateCardRect() {

                rect =
                    card.getBoundingClientRect();

            }


            card.addEventListener(
                "pointerenter",
                (event) => {

                    if (
                        event.pointerType ===
                        "touch"
                    ) {
                        return;
                    }


                    updateCardRect();

                }
            );


            card.addEventListener(
                "pointermove",
                (event) => {

                    if (
                        event.pointerType ===
                        "touch"
                    ) {
                        return;
                    }


                    if (!rect) {

                        updateCardRect();

                    }


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        (
                            (x - centerX) /
                            centerX
                        ) * 7;


                    const rotateX =
                        (
                            (centerY - y) /
                            centerY
                        ) * 7;


                    card.style.transform =
                        `
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-6px)
                        `;

                },
                {
                    passive: true
                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   21. MOBILE TOUCH CARD TILT
   ========================================================= */

projectCards.forEach(
    (card) => {

        card.addEventListener(
            "touchmove",
            (event) => {

                if (
                    !isTouchDevice ||
                    prefersReducedMotion
                ) {
                    return;
                }


                const touch =
                    event.touches[0];


                const rect =
                    card.getBoundingClientRect();


                const x =
                    touch.clientX -
                    rect.left;


                const y =
                    touch.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    (
                        (x - centerX) /
                        centerX
                    ) * 4;


                const rotateX =
                    (
                        (centerY - y) /
                        centerY
                    ) * 4;


                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-3px)
                    `;

            },
            {
                passive: true
            }
        );


        card.addEventListener(
            "touchend",
            () => {

                card.style.transform =
                    "";

            },
            {
                passive: true
            }
        );

    }
);


/* =========================================================
   22. PROJECT CARD MOVING GLOW
   ========================================================= */

projectCards.forEach(
    (card) => {

        const glow =
            document.createElement("div");


        glow.className =
            "js-card-glow";


        glow.style.cssText = `
            position: absolute;

            width: 180px;
            height: 180px;

            border-radius: 50%;

            pointer-events: none;

            opacity: 0;

            background:
                radial-gradient(
                    circle,
                    rgba(139,92,246,0.35),
                    transparent 70%
                );

            filter: blur(15px);

            transform:
                translate(-50%, -50%);

            z-index: 1;

            transition:
                opacity 0.25s ease;
        `;


        card.appendChild(
            glow
        );


        /* Desktop */

        card.addEventListener(
            "pointermove",
            (event) => {

                if (
                    event.pointerType ===
                    "touch"
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                glow.style.left =
                    `
                    ${event.clientX -
                    rect.left}px
                    `;


                glow.style.top =
                    `
                    ${event.clientY -
                    rect.top}px
                    `;


                glow.style.opacity =
                    "1";

            },
            {
                passive: true
            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                glow.style.opacity =
                    "0";

            }
        );


        /* Mobile */

        card.addEventListener(
            "touchstart",
            (event) => {

                if (!isTouchDevice) {
                    return;
                }


                const touch =
                    event.touches[0];


                const rect =
                    card.getBoundingClientRect();


                glow.style.left =
                    `
                    ${touch.clientX -
                    rect.left}px
                    `;


                glow.style.top =
                    `
                    ${touch.clientY -
                    rect.top}px
                    `;


                glow.style.opacity =
                    "1";

            },
            {
                passive: true
            }
        );


        card.addEventListener(
            "touchmove",
            (event) => {

                if (!isTouchDevice) {
                    return;
                }


                const touch =
                    event.touches[0];


                const rect =
                    card.getBoundingClientRect();


                glow.style.left =
                    `
                    ${touch.clientX -
                    rect.left}px
                    `;


                glow.style.top =
                    `
                    ${touch.clientY -
                    rect.top}px
                    `;

            },
            {
                passive: true
            }
        );


        card.addEventListener(
            "touchend",
            () => {

                glow.style.opacity =
                    "0";

            },
            {
                passive: true
            }
        );

    }
);


/* =========================================================
   23. MAGNETIC ELEMENTS
   ========================================================= */

const magneticElements =
    document.querySelectorAll(
        `
        .nav-link,
        .social-sidebar a,
        .btn,
        .arrow-btn
        `
    );


if (!prefersReducedMotion) {

    magneticElements.forEach(
        (element) => {

            let rect;


            element.addEventListener(
                "pointerenter",
                (event) => {

                    if (
                        event.pointerType ===
                        "touch"
                    ) {
                        return;
                    }


                    rect =
                        element.getBoundingClientRect();

                }
            );


            element.addEventListener(
                "pointermove",
                (event) => {

                    if (
                        event.pointerType ===
                        "touch"
                    ) {
                        return;
                    }


                    if (!rect) {

                        rect =
                            element.getBoundingClientRect();

                    }


                    const x =
                        event.clientX -
                        (
                            rect.left +
                            rect.width / 2
                        );


                    const y =
                        event.clientY -
                        (
                            rect.top +
                            rect.height / 2
                        );


                    const strength =
                        element.classList.contains(
                            "nav-link"
                        )
                            ? 0.18
                            : 0.25;


                    element.style.transform =
                        `
                        translate(
                            ${x * strength}px,
                            ${y * strength}px
                        )
                        `;

                },
                {
                    passive: true
                }
            );


            element.addEventListener(
                "pointerleave",
                () => {

                    element.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   24. MOBILE MAGNETIC TOUCH
   ========================================================= */

if (
    isTouchDevice &&
    !prefersReducedMotion
) {

    magneticElements.forEach(
        (element) => {

            element.addEventListener(
                "touchstart",
                () => {

                    element.style.transform =
                        "scale(0.94)";

                },
                {
                    passive: true
                }
            );


            element.addEventListener(
                "touchend",
                () => {

                    element.style.transform =
                        "scale(1)";


                    setTimeout(
                        () => {

                            element.style.transform =
                                "";

                        },
                        150
                    );

                },
                {
                    passive: true
                }
            );

        }
    );

}


/* =========================================================
   25. BACKGROUND PARTICLES
   ========================================================= */

const particleCount =
    performanceMode === "desktop"
        ? 45
        : performanceMode === "tablet"
            ? 25
            : performanceMode === "mobile"
                ? 12
                : 0;


if (
    particleCount > 0 &&
    !prefersReducedMotion
) {

    const particleContainer =
        document.createElement("div");


    particleContainer.className =
        "js-particle-container";


    particleContainer.style.cssText = `
        position: fixed;

        inset: 0;

        overflow: hidden;

        pointer-events: none;

        z-index: -2;
    `;


    body.appendChild(
        particleContainer
    );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement("span");


        const size =
            Math.random() * 3 + 1;


        const left =
            Math.random() * 100;


        const top =
            Math.random() * 100;


        const duration =
            Math.random() * 12 + 8;


        const delay =
            Math.random() * 8;


        particle.style.cssText = `
            position: absolute;

            left: ${left}%;

            top: ${top}%;

            width: ${size}px;

            height: ${size}px;

            border-radius: 50%;

            background:
                rgba(
                    167,
                    139,
                    250,
                    0.7
                );

            box-shadow:
                0 0
                ${size * 5}px
                rgba(
                    139,
                    92,
                    246,
                    0.5
                );

            opacity:
                ${Math.random() * 0.5 + 0.2};

            animation:
                particleFloat
                ${duration}s
                ease-in-out
                ${delay}s
                infinite alternate;
        `;


        particleContainer.appendChild(
            particle
        );

    }


    const particleStyle =
        document.createElement("style");


    particleStyle.textContent = `

        @keyframes particleFloat {

            0% {

                transform:
                    translate3d(
                        0,
                        0,
                        0
                    )
                    scale(1);

            }


            50% {

                transform:
                    translate3d(
                        20px,
                        -30px,
                        0
                    )
                    scale(1.25);

            }


            100% {

                transform:
                    translate3d(
                        -15px,
                        20px,
                        0
                    )
                    scale(0.8);

            }

        }

    `;


    document.head.appendChild(
        particleStyle
    );

}


/* =========================================================
   26. SECTION AMBIENT PURPLE GLOW
   ========================================================= */

const ambientSections =
    document.querySelectorAll(
        "section"
    );


ambientSections.forEach(
    (section) => {

        section.style.position =
            "relative";


        const ambient =
            document.createElement("div");


        ambient.className =
            "js-section-glow";


        ambient.style.cssText = `
            position: absolute;

            width: 320px;

            height: 320px;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle,
                    rgba(
                        139,
                        92,
                        246,
                        0.12
                    ),
                    transparent 70%
                );

            filter: blur(35px);

            pointer-events: none;

            z-index: -1;

            top: 20%;

            right: -120px;
        `;


        section.appendChild(
            ambient
        );

    }
);


/* =========================================================
   27. SECTION GLOW ON SCROLL
   ========================================================= */

if (!prefersReducedMotion) {

    const glowSections =
        document.querySelectorAll(
            ".js-section-glow"
        );


    function updateSectionGlow() {

        const viewportCenter =
            window.innerHeight / 2;


        glowSections.forEach(
            (glow) => {

                const section =
                    glow.parentElement;


                const rect =
                    section.getBoundingClientRect();


                const sectionCenter =
                    rect.top +
                    rect.height / 2;


                const distance =
                    Math.abs(
                        viewportCenter -
                        sectionCenter
                    );


                const opacity =
                    Math.max(
                        0,
                        1 -
                        distance /
                        window.innerHeight
                    );


                glow.style.opacity =
                    `${opacity}`;

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateSectionGlow,
        {
            passive: true
        }
    );


    updateSectionGlow();

}


/* =========================================================
   28. HERO SCROLL MOVEMENT
   ========================================================= */

if (
    heroLeft &&
    heroRight &&
    !prefersReducedMotion
) {

    function updateHeroScroll() {

        if (
            window.scrollY >
            window.innerHeight * 1.2
        ) {
            return;
        }


        const offset =
            window.scrollY * 0.08;


        heroLeft.style.translate =
            `0 ${offset * 0.4}px`;


        heroRight.style.translate =
            `0 ${offset * -0.3}px`;

    }


    window.addEventListener(
        "scroll",
        updateHeroScroll,
        {
            passive: true
        }
    );

}


/* =========================================================
   29. INTERACTIVE PROXIMITY EFFECT
   ========================================================= */

const interactiveElements =
    document.querySelectorAll(
        `
        .nav-link,
        .social-sidebar a,
        .btn,
        .arrow-btn,
        .project-card
        `
    );


if (
    !isTouchDevice &&
    !prefersReducedMotion
) {

    document.addEventListener(
        "pointermove",
        (event) => {

            interactiveElements.forEach(
                (element) => {

                    const rect =
                        element.getBoundingClientRect();


                    const centerX =
                        rect.left +
                        rect.width / 2;


                    const centerY =
                        rect.top +
                        rect.height / 2;


                    const distance =
                        Math.hypot(
                            event.clientX -
                            centerX,

                            event.clientY -
                            centerY
                        );


                    if (
                        distance < 130
                    ) {

                        const intensity =
                            1 -
                            distance /
                            130;


                        element.style.setProperty(
                            "--proximity",
                            intensity
                        );

                    } else {

                        element.style.setProperty(
                            "--proximity",
                            0
                        );

                    }

                }
            );

        },
        {
            passive: true
        }
    );


    const proximityStyle =
        document.createElement(
            "style"
        );


    proximityStyle.textContent = `

        .nav-link,
        .social-sidebar a,
        .btn,
        .arrow-btn {

            filter:
                brightness(
                    calc(
                        1 +
                        (
                            var(--proximity, 0)
                            * 0.25
                        )
                    )
                );

        }

    `;


    document.head.appendChild(
        proximityStyle
    );

}


/* =========================================================
   30. COPY EMAIL BUTTON
   ========================================================= */

const copyButton =
    document.querySelector(
        ".btn-copy"
    );


if (copyButton) {

    copyButton.addEventListener(
        "click",
        async () => {

            const email =
                "mirajul.hossain002@gmail.com";


            try {

                await navigator.clipboard.writeText(
                    email
                );


                const originalHTML =
                    copyButton.innerHTML;


                copyButton.innerHTML =
                    `
                    <i class="fas fa-check"></i>
                    Copied!
                    `;


                setTimeout(
                    () => {

                        copyButton.innerHTML =
                            originalHTML;

                    },
                    1800
                );


            } catch (error) {

                const textarea =
                    document.createElement(
                        "textarea"
                    );


                textarea.value =
                    email;


                document.body.appendChild(
                    textarea
                );


                textarea.select();


                document.execCommand(
                    "copy"
                );


                textarea.remove();


                copyButton.innerHTML =
                    `
                    <i class="fas fa-check"></i>
                    Copied!
                    `;


                setTimeout(
                    () => {

                        copyButton.innerHTML =
                            `
                            <i class="far fa-copy"></i>
                            Copy Email
                            `;

                    },
                    1800
                );

            }

        }
    );

}


/* =========================================================
   31. SMOOTH INTERNAL NAVIGATION
   ========================================================= */

navLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetID =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetID ||
                    !targetID.startsWith("#")
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const navbar =
                    document.querySelector(
                        ".sidebar"
                    );


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 90;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );

    }
);


/* =========================================================
   32. MOBILE CARD TOUCH FEEDBACK
   ========================================================= */

const touchCards = [

    ...projectCards,

    ...skillBoxes,

    ...testimonialCards

];


if (isTouchDevice) {

    touchCards.forEach(
        (card) => {

            card.addEventListener(
                "touchstart",
                () => {

                    card.classList.add(
                        "touch-active"
                    );

                },
                {
                    passive: true
                }
            );


            card.addEventListener(
                "touchend",
                () => {

                    card.classList.remove(
                        "touch-active"
                    );

                },
                {
                    passive: true
                }
            );


            card.addEventListener(
                "touchcancel",
                () => {

                    card.classList.remove(
                        "touch-active"
                    );

                },
                {
                    passive: true
                }
            );

        }
    );


    const touchStyle =
        document.createElement(
            "style"
        );


    touchStyle.textContent = `

        .touch-active {

            border-color:
                rgba(
                    139,
                    92,
                    246,
                    0.55
                ) !important;

            box-shadow:
                0 0 25px
                rgba(
                    139,
                    92,
                    246,
                    0.15
                );

            transition:
                border-color
                0.2s ease,

                box-shadow
                0.2s ease;

        }

    `;


    document.head.appendChild(
        touchStyle
    );

}


/* =========================================================
   33. RESPONSIVE DEVICE DETECTION
   ========================================================= */

function updateDeviceMode() {

    const width =
        window.innerWidth;


    document.body.dataset.device =
        width <= 768
            ? "mobile"
            : width <= 1100
                ? "tablet"
                : "desktop";

}


window.addEventListener(
    "resize",
    updateDeviceMode
);


updateDeviceMode();


/* =========================================================
   34. PREVENT HORIZONTAL OVERFLOW
   ========================================================= */

document.documentElement.style.overflowX =
    "hidden";


document.body.style.overflowX =
    "hidden";


/* =========================================================
   35. PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            cursorGlow
        ) {

            cursorGlow.style.opacity =
                "0";

        }

    }
);


/* =========================================================
   36. REDUCED MOTION FINAL SAFETY
   ========================================================= */

if (prefersReducedMotion) {

    if (cursorGlow) {

        cursorGlow.remove();

        cursorGlow = null;

    }


    if (touchGlow) {

        touchGlow.remove();

        touchGlow = null;

    }


    document
        .querySelectorAll(
            ".js-reveal"
        )
        .forEach(
            (element) => {

                element.classList.add(
                    "js-reveal-visible"
                );

            }
        );

}


/* =========================================================
   37. FINAL INITIALIZATION
   ========================================================= */

console.log(
    "%c Mehraz Experience Portfolio ",
    `
    background:#8b5cf6;
    color:white;
    font-size:16px;
    font-weight:bold;
    padding:8px 14px;
    border-radius:6px;
    `
);


console.log(
    `Device mode: ${performanceMode}`
);


console.log(
    "Advanced interaction system initialized."
);