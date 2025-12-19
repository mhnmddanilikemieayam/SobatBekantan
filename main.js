// ========== DATA ARTIKEL UNTUK CAROUSEL ==========
const artikelSlides = [
    {
        title: "Monitoring Populasi 2025",
        desc: "Laporan dari Pulau Curiak: pertumbuhan populasi bekantan & aktivitas habitat alami.",
        img: "https://placehold.co/500x250/4a7c59/ffffff?text=Monitoring+2025",
        link: "#"
    },
    {
        title: "Rehabilitasi Mangrove Berhasil",
        desc: "10.000 bibit mangrove berhasil ditanam di Tarakan.",
        img: "https://placehold.co/500x250/ffa500/263324?text=Rehab+Mangrove",
        link: "#"
    }
];

// ========== GENERATE CAROUSEL ==========
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("carouselTrack");
    const indicatorsWrap = document.getElementById("carouselIndicators");

    artikelSlides.forEach((slide, idx) => {
        const slideEl = document.createElement("div");
        slideEl.className = "carousel-slide";
        slideEl.innerHTML = `
            <a class="img-link" href="${slide.link}" target="_blank">
                <img src="${slide.img}">
            </a>
            <div class="carousel-info">
                <h4>${slide.title}</h4>
                <p>${slide.desc}</p>
            </div>`;
        track.appendChild(slideEl);

        const indicator = document.createElement("button");
        if (idx === 0) indicator.classList.add("active");
        indicator.addEventListener("click", () => goToSlide(idx));
        indicatorsWrap.appendChild(indicator);
    });

    const slides = Array.from(track.children);
    let current = 0;

    function update() {
        const width = document.querySelector(".carousel").clientWidth;
        track.style.transform = `translateX(-${current * width}px)`;
        document
            .querySelectorAll(".carousel-indicators button")
            .forEach((btn, i) => btn.classList.toggle("active", i === current));
    }

    function goToSlide(i) {
        current = (i + slides.length) % slides.length;
        update();
    }

    document.getElementById("nextBtn").addEventListener("click", () => goToSlide(current + 1));
    document.getElementById("prevBtn").addEventListener("click", () => goToSlide(current - 1));

    window.addEventListener("resize", update);
    update();
});

// ========== CHART POPULASI ==========

const populasi = [180, 320, 420, 230];

document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("populasiChart");

    if (ctx) {
        new Chart(ctx.getContext("2d"), {
            type: "doughnut",
            data: {
                labels: ["Tarakan", "Curiak", "Barito", "Samarinda"],
                datasets: [
                    {
                        data: populasi,
                        backgroundColor: ["#4a7c59", "#ffa500", "#7fc4fd", "#ff8c00"],
                        borderWidth: 3,
                        borderColor: "#fff"
                    }
                ]
            },
            options: {
                plugins: { legend: { position: "bottom" } },
                cutout: "65%"
            }
        });
    }

    const total = populasi.reduce((a, b) => a + b);

    const donutIds = ["donut1", "donut2", "donut3", "donut4"];

    donutIds.forEach((id, i) => {
        const canvas = document.getElementById(id);
        if (!canvas) return;

        new Chart(canvas.getContext("2d"), {
            type: "doughnut",
            data: {
                labels: ["Populasi", "Sisa"],
                datasets: [
                    {
                        data: [populasi[i], total - populasi[i]],
                        backgroundColor: ["#ffa500", "#e4e4e4"],
                        borderColor: "#fff",
                        borderWidth: 2
                    }
                ]
            },
            options: { plugins: { legend: { display: false } }, cutout: "72%" }
        });
    });
});
