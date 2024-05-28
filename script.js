document.addEventListener("DOMContentLoaded", () => {
    const images = [
        { src: "images/cat-1.avif", alt: "cat", name: "cat" },
        { src: "images/cat-2.jpg", alt: "cat", name: "cat" },
        { src: "images/joker.jpg", alt: "joker", name: "joker" },
        { src: "images/monstar-1.jpg", alt: "monstar", name: "monstar" },
        { src: "images/monstar-2.jpg", alt: "monstar", name: "monstar" },
        { src: "images/nature.avif", alt: "nature", name: "nature" },
        { src: "images/night.avif", alt: "night", name: "night/moon/dark" },
        { src: "images/night.jpg", alt: "night", name: "night/moon/dark" },
        { src: "images/rabit-1.png", alt: "rabit", name: "rabit" },
        { src: "images/rabit-2.jpg", alt: "rabit", name: "rabit" },
       
    ];

    const gallery = document.getElementById("gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const searchBar = document.getElementById("search-bar");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const downloadBtn = document.getElementById("download");
    const themeToggle = document.getElementById("theme-toggle");
    let currentIndex = 0;

    // Populate gallery with images
    images.forEach((image, index) => {
        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt;
        img.dataset.name = image.name;
        img.dataset.index = index;
        gallery.appendChild(img);
    });

    // Open lightbox
    gallery.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
            currentIndex = parseInt(e.target.dataset.index);
            openLightbox(images[currentIndex]);
        }
    });

    // Close lightbox
    lightbox.addEventListener("click", (e) => {
        if (e.target.classList.contains("close") || e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // Navigate images
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(images[currentIndex]);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(images[currentIndex]);
        // Apply hover effect to the next image
        const nextImg = gallery.querySelector(`img[data-index="${currentIndex}"]`);
        nextImg.classList.add("hover-effect");
        setTimeout(() => {
            nextImg.classList.remove("hover-effect");
        }, 300);
    });

    // Search functionality
    searchBar.addEventListener("input", (e) => {
        const filter = e.target.value.toLowerCase();
        const imgElements = gallery.getElementsByTagName("img");
        Array.from(imgElements).forEach(img => {
            const name = img.dataset.name.toLowerCase();
            img.style.display = name.includes(filter) ? "" : "none";
        });
    });

    // Open lightbox with the selected image
    function openLightbox(image) {
        lightbox.style.display = "flex";
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        downloadBtn.href = image.src;
    }

    // Theme toggle functionality
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
