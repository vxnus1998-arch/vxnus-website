// ==========================================
// STANDARD BACKGROUND VIDEO CONTROLLER
// ==========================================

const standardVideos = document.querySelectorAll(
    "video:not(#storyIntro):not(#storyLoop):not(.album-video)"
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
const creationAlbum = document.querySelector(".creation");

let storyStarted = false;
let crossfadeStarted = false;
let creationRevealTimer = null;


/*
Switches from the one-time intro video
to the continuing loop video.
*/

function beginStoryCrossfade() {

    if (crossfadeStarted) {
        return;
    }

    crossfadeStarted = true;

    storyLoop.currentTime = 0;

    storyLoop
        .play()
        .then(() => {

            storyLoop.classList.add("active");
            storyIntro.classList.remove("active");

        })
        .catch(() => {});
}


/*
Starts the Story Imagined sequence
the first time the section enters view.
*/

function startStorySequence() {

    storySection.classList.add("is-visible");

    storyIntro.currentTime = 0;

    storyIntro.play().catch(() => {});

    if (creationAlbum) {

        creationRevealTimer = window.setTimeout(() => {

            creationAlbum.classList.add("album-revealed");

        }, 3500);

    }
}


if (storySection && storyIntro && storyLoop) {

    /*
    Begin the crossfade just before the intro ends.
    */

    storyIntro.addEventListener("timeupdate", () => {

        if (
            Number.isFinite(storyIntro.duration) &&
            storyIntro.duration - storyIntro.currentTime <= 0.6
        ) {
            beginStoryCrossfade();
        }

    });


    /*
    Safari backup in case timeupdate misses
    the final 0.6-second window.
    */

    storyIntro.addEventListener(
        "ended",
        beginStoryCrossfade
    );


    const storyObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    storySection.classList.add("is-visible");
    // Trigger all Story CSS animations
    storySection.classList.add("is-visible");

    if (!storyStarted) {

        storyStarted = true;

                    if (!storyStarted) {
        storyIntro.currentTime = 0;
        storyIntro.play().catch(() => {});

                        storyStarted = true;
                        startStorySequence();
    } else if (crossfadeStarted) {

                    } else if (crossfadeStarted) {
        storyLoop.play().catch(() => {});

                        storyLoop.play().catch(() => {});
    } else {

                    } else {
        storyIntro.play().catch(() => {});

                        storyIntro.play().catch(() => {});
    }

} else {

                    }
    storyIntro.pause();
    storyLoop.pause();

                } else {
}

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


// ==========================================
// ALBUM HOVER VIDEOS
// ==========================================

document.querySelectorAll(".album").forEach((album) => {

    const video = album.querySelector(".album-video");

    if (!video) {
        return;
    }

    album.addEventListener("mouseenter", () => {

        video.currentTime = 0;

        video.play().catch(() => {});

    });

    album.addEventListener("mouseleave", () => {

        video.pause();
        video.currentTime = 0;

    });

});
