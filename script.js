// ==========================================
// STANDARD VIDEO CONTROLLER
// ==========================================

const standardVideos = document.querySelectorAll(
    "video:not(#storyIntro):not(#storyLoop):not(album-video)"
);

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

    threshold: 0.01,
    rootMargin: "300px 0px"

});

standardVideos.forEach(video => {

    videoObserver.observe(video);

});



// ==========================================
// ARTIST SECTION
// ==========================================

const artistSection = document.querySelector(".artist-section");

if (artistSection) {

    const artistObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                artistSection.classList.add("is-visible");

            }

        });

    }, {

        threshold: 0.30

    });

    artistObserver.observe(artistSection);

}



// ==========================================
// STORY SECTION
// ==========================================

const storySection = document.querySelector(".story-section");

const storyIntro = document.getElementById("storyIntro");

const storyLoop = document.getElementById("storyLoop");

storyIntro.load();
storyLoop.load();

let storyStarted = false;

let storyLoopStarted = false;



function startStoryLoop(){

    if(storyLoopStarted) return;

    storyLoopStarted = true;

    storyLoop.currentTime = 0;

    storyLoop.play().then(()=>{

        storyLoop.classList.add("active");

        storyIntro.classList.remove("active");

    }).catch(()=>{});

}



if(storySection){

    const storyObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                storySection.classList.add("is-visible");

                if(!storyStarted){

                    storyStarted = true;

                    storyIntro.currentTime = 0;

                    storyIntro.play().catch(()=>{});

                }

                else{

                    if(storyLoopStarted){

                        storyLoop.play().catch(()=>{});

                    }

                    else{

                        storyIntro.play().catch(()=>{});

                    }

                }

            }

            else{

                storyIntro.pause();

                storyLoop.pause();

            }

        });

    },{

        threshold:0.35
    

    });

    storyObserver.observe(storySection);

}



storyIntro.addEventListener("timeupdate",()=>{

    if(

        Number.isFinite(storyIntro.duration) &&

        storyIntro.duration-storyIntro.currentTime<=0.55

    ){

        startStoryLoop();

    }

});

storyIntro.addEventListener("ended",startStoryLoop);



// ==========================================
// ALBUM HOVER VIDEO
// ==========================================

document.querySelectorAll(".album").forEach(album=>{

    const video = album.querySelector(".album-video");

    if(!video) return;

    album.addEventListener("mouseenter",()=>{

        video.currentTime = 0;

        video.play().catch(()=>{});

    });

    album.addEventListener("mouseleave",()=>{

        video.pause();

        video.currentTime = 0;

    });

});



// ==========================================
// PRELOAD STORY LOOP
// ==========================================

if(storyLoop){

    storyLoop.load();

}
