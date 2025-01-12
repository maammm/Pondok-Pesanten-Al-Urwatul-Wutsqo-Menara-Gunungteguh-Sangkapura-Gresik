 function tampilkanTanggal() {
    const today = new Date();
    const hari = today.toLocaleString('id-ID', { weekday: 'long' });
    const tanggal = today.getDate();
    const bulan = today.toLocaleString('id-ID', { month: 'long' });
    const tahun = today.getFullYear();
    const tanggalText = `${hari}, ${tanggal} ${bulan} ${tahun}`;
    document.getElementById("tanggal").textContent = tanggalText;
}

 // Mengubah warna navbar dan teks saat scroll
 window.addEventListener('scroll', function () {
     const navbar = document.getElementById('main-navbar');
     if (window.scrollY > 50) {
         navbar.classList.add('scrolled');
     } else {
         navbar.classList.remove('scrolled');
     }
 });

 // script.js
 let currentSlide = 0;
 let slideInterval;

 function updateIndicators() {
     const dots = document.querySelectorAll('.dot');
     dots.forEach((dot, index) => {
         dot.classList.toggle('active', index === currentSlide);
     });
 }

 function showSlide(index) {
     const slides = document.querySelector('.carousel-slides');
     const totalSlides = slides.children.length;

     if (index >= totalSlides) {
         currentSlide = 0;
     } else if (index < 0) {
         currentSlide = totalSlides - 1;
     } else {
         currentSlide = index;
     }

     const offset = -currentSlide * 100;
     slides.style.transform = `translateX(${offset}%)`;
     updateIndicators();
 }

 function nextSlide() {
     showSlide(currentSlide + 1);
 }

 function prevSlide() {
     showSlide(currentSlide - 1);
 }

 function startAutoSlide() {
     slideInterval = setInterval(nextSlide, 5000);
 }

 function stopAutoSlide() {
     clearInterval(slideInterval);
 }

 // Initialize carousel indicators
 const indicators = document.getElementById('carousel-indicators');
 const slides = document.querySelector('.carousel-slides');
 const totalSlides = slides.children.length;

 for (let i = 0; i < totalSlides; i++) {
     const dot = document.createElement('span');
     dot.className = 'dot';
     dot.addEventListener('click', () => {
         stopAutoSlide();
         showSlide(i);
         startAutoSlide();
     });
     indicators.appendChild(dot);
 }

 updateIndicators();
 startAutoSlide();


 async function loadJadwal() {
     const response = await fetch('fetch_jadwal.php');
     const data = await response.json();
     const tbody = document.querySelector('#jadwalTable tbody');
     tbody.innerHTML = '';
     data.forEach(row => {
         const tr = document.createElement('tr');
         tr.setAttribute('data-bulan', row.bulan);
         tr.innerHTML = `
                <td>${row.minggu_ke}</td>
                <td>${row.nama_santri}</td>
                <td>${row.bulan}</td>
            `;
         tbody.appendChild(tr);
     });
 }

 function filterBulan() {
     const bulan = document.getElementById('bulan').value;
     const rows = document.querySelectorAll('#jadwalTable tbody tr');
     rows.forEach(row => {
         if (bulan === 'all' || row.getAttribute('data-bulan') === bulan) {
             row.style.display = '';
         } else {
             row.style.display = 'none';
         }
     });
 }


 function filterJadwal() {
     const bulan = document.getElementById("bulan").value;
     const minggu = document.getElementById("minggu").value;
     const rows = document.querySelectorAll("#jadwalTable tbody tr");

     rows.forEach(row => {
         const rowBulan = row.getAttribute("data-bulan");
         const rowMinggu = row.getAttribute("data-minggu");

         if ((bulan === "" && minggu === "") ||
             (bulan === rowBulan && (minggu === "" || minggu === rowMinggu)) ||
             (minggu === rowMinggu && (bulan === "" || bulan === rowBulan))) {
             row.style.display = "";
         } else {
             row.style.display = "none";
         }
     });
 }

 // Tentukan tanggal mulai dan akhir pendaftaran
 const startDate = new Date("2025-01-01"); // Tanggal mulai pendaftaran
 const endDate = new Date("2025-01-31"); // Tanggal akhir pendaftaran
 const today = new Date(); // Tanggal hari ini

 const statusElement = document.getElementById("pendaftaran-status");
 const daftarButton = document.getElementById("daftar-button");
 const formElement = document.getElementById("pendaftaran-form");

 if (today >= startDate && today <= endDate) {
     // Pendaftaran dibuka
     statusElement.textContent = "Pendaftaran sudah dibuka!";
     statusElement.classList.add("open");
     daftarButton.classList.remove("disabled");
     daftarButton.href = "pendaftaran.html";
 } else {
     // Pendaftaran ditutup
     statusElement.textContent = "Pendaftaran belum dibuka.";
     statusElement.classList.add("closed");
     daftarButton.classList.add("disabled");
     daftarButton.href = "#";
 }

 function filterKegiatan() {
     const hari = document.getElementById("hari").value;
     const rows = document.querySelectorAll("#kegiatanTable tbody tr");

     rows.forEach(row => {
         const rowHari = row.getAttribute("data-hari");

         if (hari === "" || rowHari === hari) {
             row.style.display = "";
         } else {
             row.style.display = "none";
         }
     });
 }

 document.addEventListener("DOMContentLoaded", () => {
     const sambanganRows = document.querySelectorAll("#jadwalTable tbody tr");
     const kegiatanRows = document.querySelectorAll("#kegiatanTable tbody tr");

     sambanganRows.forEach(row => (row.style.display = "none"));
     kegiatanRows.forEach(row => (row.style.display = "none"));
 });
