// ==========================================
// STANDARD BACKGROUND VIDEO CONTROLLER
// ==========================================

const standardVideos = document.querySelectorAll(
    "video:not(#storyIntro):not(#storyLoop)"
);

const videoObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const video = entry.target;

            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    },
    {
        threshold: 0.35
    }
);

standardVideos.forEach((video) => {
    videoObserver.observe(video);
});

// ==========================================
// ARTIST SECTION FADE
// ==========================================

const artistSection = document.querySelector(".artist-section");

if (artistSection) {
    const artistObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    artistSection.classList.add("is-visible");
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    artistObserver.observe(artistSection);
}

// ==========================================
// STORY IMAGINED VIDEO SEQUENCE
// ==========================================

const storySection = document.querySelector(".story-section");
const storyIntro = document.getElementById("storyIntro");
const storyLoop = document.getElementById("storyLoop");

let storyStarted = false;
let crossfadeStarted = false;

function beginStoryCrossfade() {
    if (crossfadeStarted) return;

    crossfadeStarted = true;
    storyLoop.currentTime = 0;

    storyLoop.play()
        .then(() => {
            storyLoop.classList.add("active");
            storyIntro.classList.remove("active");
        })
        .catch(() => {});
}

if (storySection && storyIntro && storyLoop) {

    storyIntro.addEventListener("timeupdate", () => {
        if (
            Number.isFinite(storyIntro.duration) &&
            storyIntro.duration - storyIntro.currentTime <= 0.6
        ) {
            beginStoryCrossfade();
        }
    });

    // Backup in case Safari misses the timeupdate threshold.
    storyIntro.addEventListener("ended", beginStoryCrossfade);

    const storyObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    if (!storyStarted) {
                        storyStarted = true;
                        storyIntro.currentTime = 0;
                        storyIntro.play().catch(() => {});
                    } else if (crossfadeStarted) {
                        storyLoop.play().catch(() => {});
                    } else {
                        storyIntro.play().catch(() => {});
                    }

                } else {
                    storyIntro.pause();
                    storyLoop.pause();
                }

            });
        },
        {
            threshold: 0.35
        }
    );

    storyObserver.observe(storySection);
}

// ===== ALBUM HOVER VIDEO =====

document.querySelectorAll(".album").forEach(album => {

    const video = album.querySelector("video");

    album.addEventListener("mouseenter", () => {

        video.currentTime = 0;
        video.play();

    });

    album.addEventListener("mouseleave", () => {

        video.pause();
        video.currentTime = 0;

    });

});
