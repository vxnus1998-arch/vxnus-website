const artistSection = document.querySelector(".artist-section");

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
