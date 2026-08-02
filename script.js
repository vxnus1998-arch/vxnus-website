// ===== VIDEO CONTROLLER =====

const videos = document.querySelectorAll("video");

const videoObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        const video = entry.target;

        if (entry.isIntersecting) {

            video.play().catch(() => {});

        } else {

            video.pause();

        }

    });

}, {

    threshold: 0.35

});

videos.forEach((video) => {

    videoObserver.observe(video);

});


// ===== ARTIST SECTION FADE =====

const artistSection = document.querySelector(".artist-section");

const artistObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            artistSection.classList.add("is-visible");

        }

    });

}, {

    threshold: 0.3

});

artistObserver.observe(artistSection);
