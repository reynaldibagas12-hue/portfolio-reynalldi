// ===============================================
// SCRIPT UTAMA PORTFOLIO - REYNALDI BAGASKARA
// ===============================================

window.isDraggingCategory = false;

// Inisialisasi AOS & Preloader
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
}

window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('premium-loader');
        if(loader) loader.classList.add('hidden');
    }, 300); 
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Burger Menu Toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Auto close menu saat link diklik di mobile
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Navbar hide/show on scroll
    if (navbar) {
        window.addEventListener('scroll', () => {
            let currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
            lastScroll = currentScroll;
        });
    }

    // 2. Lightbox Global untuk Zoom Foto
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    document.addEventListener('click', (e) => {
        if (e.target && e.target.tagName === 'IMG' && (e.target.closest('.masonry-grid') || e.target.classList.contains('lightbox-trigger'))) {
            if (lightbox && lightboxImg) {
                lightboxImg.src = e.target.src;
                lightbox.classList.add('active');
            }
        }
        if (e.target.classList.contains('modal-close') || e.target === lightbox) {
            if(lightbox) lightbox.classList.remove('active');
        }
    });

    // 3. Scroll Back to Top Button
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                topBtn.classList.add('show');
            } else {
                topBtn.classList.remove('show');
            }
        });
        topBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        });
    }
});

// ===============================================
// 2. GENERATOR KATEGORI GALERI FOTO
// ===============================================
function generatePhotos(prefix, count) {
    let arr = []; 
    for (let i = 1; i <= count; i++) {
        arr.push(`${prefix}${i}.jpg`); 
    }
    return arr; 
}

const photoData = {
    'portrait': { title: 'Portrait', photos: generatePhotos('moments', 15) },
    'sport': { title: 'Sport & Wellness', photos: generatePhotos('Sport', 15) },
    'wedding': { title: 'Wedding', photos: generatePhotos('Wedding', 12) },
    'corporate': { title: 'Corporate & Event', photos: generatePhotos('corporate', 15) },
    'nightlife': { title: 'Nightlife & Stage', photos: generatePhotos('stage', 15) },
    'fnb': { title: 'Food & Beverage', photos: generatePhotos('fnb', 15) }
};

window.openGallery = function(key) {
    const modal = document.getElementById('gallery-modal');
    const title = document.getElementById('gallery-title');
    const grid = document.getElementById('gallery-grid');
    if (!modal || !photoData[key]) return;

    title.innerText = photoData[key].title;
    grid.innerHTML = '';
    
    photoData[key].photos.forEach(imgName => {
        const img = document.createElement('img');
        img.src = `gambar/acak/${imgName}`;
        img.loading = 'lazy';
        grid.appendChild(img);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

// ===============================================
// 3. KATEGORI VIDEO (HALAMAN VIDEOGRAFI)
// ===============================================
const videoData = {
    'wcc': { title: 'WCC Projects', videos: ['wcc 1.mp4', 'wcc 2.mp4', 'wcc 3.mp4'] },
    'recap': { title: 'Recap Event', videos: ['Video1.mp4', 'Video2.mp4'] },
    'content': { title: 'Content Creation', videos: ['Video3.mp4', 'content 1.mp4'] }
};

window.openVideoGallery = function(key) {
    const modal = document.getElementById('video-modal');
    const title = document.getElementById('video-title');
    const grid = document.getElementById('video-grid');
    if (!modal || !videoData[key]) return;

    title.innerText = videoData[key].title;
    grid.innerHTML = '';

    videoData[key].videos.forEach(vidName => {
        const videoEl = document.createElement('video');
        videoEl.src = `Video/${vidName}`;
        videoEl.controls = true;
        videoEl.preload = 'metadata';
        grid.appendChild(videoEl);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// ===============================================
// 4. CAMPAIGN MODAL (MARKETING)
// ===============================================
const campaignData = {
    'steak': { title: 'Steak to The Point', desc: 'Yield management targeting expat di hari Senin. Cost per message Rp8.968.', kpi1: 'Rp2.5 Juta Budget', kpi2: 'Efisiensi Leads' },
    'pizza': { title: 'Pizza with Papa', desc: 'Aktivasi Father\'s day. Menghasilkan 115.4K Views dan 1.570 Link Clicks.', kpi1: '115.4K Views', kpi2: 'Rp312 CPC' },
    'brunch': { title: 'Casa Summer Brunch', desc: 'Membuka jam operasional pagi. Menaikkan sitting occupancy hingga 48.2%.', kpi1: '+48.2% Occupancy', kpi2: '+35% Bill Amount' }
};

window.openCampaign = function(key) {
    const modal = document.getElementById('campaign-modal');
    const content = document.getElementById('campaign-content');
    if(!modal || !campaignData[key]) return;
    const data = campaignData[key];
    
    content.innerHTML = `
        <span class="badge badge-ig">EXECUTIVE REPORT</span>
        <h2 style="text-align:left; color:#fff; margin: 15px 0;">${data.title}</h2>
        <p style="color:var(--text-secondary); margin-bottom: 25px; line-height: 1.6;">${data.desc}</p>
        <div style="display:flex; gap:15px; margin-bottom:20px; flex-wrap:wrap;">
            <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; border:1px solid var(--border-color); flex:1; text-align:center;">
                <h4 style="color:var(--highlight-color); font-size:1.2rem;">${data.kpi1}</h4>
            </div>
            <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; border:1px solid var(--border-color); flex:1; text-align:center;">
                <h4 style="color:var(--highlight-color); font-size:1.2rem;">${data.kpi2}</h4>
            </div>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};
