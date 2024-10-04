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
        { src: "images/butterfly.png", alt: "butterfly", name: "hand/butterfly" },
        { src: "images/flower.png", alt: "clouds", name: "butterfly/flower" },
        { src: "images/coffee.jpg", alt: "coffee", name: "evening/coffee" },
        { src: "images/clouds.jpg", alt: "clouds", name: "clouds/sky" }
      
    ];

    const gallery = document.getElementById("gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const themeToggleBtn = document.getElementById("theme-toggle");
    const searchBar = document.getElementById("search-bar");
    const downloadBtn = document.getElementById("download");
    let currentIndex = 0; // To keep track of the current image index
    let filteredImages = images;

    // Generate the gallery
    function renderGallery(images) {
        gallery.innerHTML = "";
        images.forEach((image, index) => {
            const img = document.createElement("img");
            img.src = image.src;
            img.alt = image.alt;
            img.setAttribute("data-index", index);
            gallery.appendChild(img);
        });
    }

    // Open lightbox
    gallery.addEventListener("click", (event) => {
        if (event.target.tagName === "IMG") {
            currentIndex = event.target.getAttribute("data-index");
            lightboxImg.src = images[currentIndex].src;
            downloadBtn.href = images[currentIndex].src; // Set download link
            lightbox.style.display = "flex";
        }
    });

    // Close lightbox
    document.querySelector(".close").addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Navigate to the previous image
    document.getElementById("prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Wrap around
        updateLightboxImage();
    });

    // Navigate to the next image
    document.getElementById("next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length; // Wrap around
        updateLightboxImage();
    });

    // Function to update lightbox image and download link
    function updateLightboxImage() {
        lightboxImg.src = images[currentIndex].src;
        downloadBtn.href = images[currentIndex].src; // Update download link
    }

    // Theme toggle
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Filter images based on search
    searchBar.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        filteredImages = images.filter((img) => img.name.toLowerCase().includes(query));
        renderGallery(filteredImages);
    });

    renderGallery(images);
});
