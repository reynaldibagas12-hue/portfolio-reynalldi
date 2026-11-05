// ===============================================
// SCRIPT UTAMA PORTFOLIO - REYNALDI BAGASKARA
// ===============================================
window.isDraggingCategory = false;

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

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

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

    // 2. Custom Cursor (Desktop Only)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const interactables = document.querySelectorAll('a, button, img, .cat-card, .pillar-card, .cs-card');

    if (window.innerWidth > 1024 && cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px';
        });

        function renderCursor() {
            ringX += (mouseX - ringX) * 0.15; ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('lens-focus'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('lens-focus'));
        });
    }

    // 3. Lightbox Global
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    document.addEventListener('click', (e) => {
        if (e.target && (e.target.classList.contains('lightbox-trigger') || e.target.closest('.featured-item img') || (e.target.tagName === 'IMG' && e.target.closest('.category-photos-grid')))) {
            let targetImg = e.target;
            if(!targetImg.getAttribute('src')) targetImg = targetImg.querySelector('img'); 
            
            if (lightbox && lightboxImg && targetImg) {
                lightboxImg.setAttribute('src', targetImg.getAttribute('src'));
                lightbox.classList.add('active');
            }
        }
        if (e.target.classList.contains('lightbox-close') || e.target === lightbox) {
            if(lightbox) lightbox.classList.remove('active');
        }
    });

    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => backToTopBtn.classList.toggle('show', window.scrollY > 400));
        backToTopBtn.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // 5. Swiper Carousel Homepage
    if (typeof Swiper !== 'undefined' && document.querySelector('.featuredSwiper')) {
        new Swiper('.featuredSwiper', {
            slidesPerView: 1, spaceBetween: 20, loop: true,
            autoplay: { delay: 3500, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: { 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 30 } }
        });
    }
});

// ===============================================
// 2. GENERATOR KATEGORI FOTO (PORTRAIT)
// ===============================================
function generatePhotos(prefix, count) {
    let arr = []; 
    for (let i = 1; i <= count; i++) { arr.push(`${prefix}${i}.jpg`); }
    return arr; 
}

const categoryData = {
    'portrait': { title: 'Portrait', pdf: 'pdf/portfolio portrait rey.pdf', photos: generatePhotos('moments', 47) },
    'sport': { title: 'Sport & Wellness', pdf: 'pdf/portfolio sport rey.pdf', photos: generatePhotos('Sport', 43) },
    'wedding': { title: 'Wedding', pdf: 'pdf/portfolio wedding rey.pdf', photos: generatePhotos('Wedding', 12) },
    'corporate': { title: 'Corporate & Event', pdf: 'pdf/Corporate and Event Portfolio.pdf', photos: generatePhotos('corporate', 36) },
    'nightlife': { title: 'Nightlife & Stage', pdf: 'pdf/stage photography reynaldi bagaskara.pdf', photos: generatePhotos('stage', 44) },
    'private-party': { title: 'Private Party', pdf: '', photos: generatePhotos('party', 18) },
    'fnb': { title: 'Food & Beverage', pdf: 'pdf/food and beverage portfolio reynaldi bagaskara.pdf', photos: generatePhotos('fnb', 39) }
};

window.openCategory = function(catKey) {
    const modal = document.getElementById('category-modal'), titleEl = document.getElementById('category-title'), gridEl = document.getElementById('category-photos-grid'), data = categoryData[catKey];
    if (!data || !modal || !gridEl) return;

    titleEl.innerText = data.title;
    gridEl.innerHTML = ''; 
    
    const oldPdfBtn = document.querySelector('.category-pdf-btn');
    if (oldPdfBtn) oldPdfBtn.remove();

    if (data.pdf) {
        const pdfLink = document.createElement('a');
        pdfLink.href = data.pdf; pdfLink.target = '_blank'; pdfLink.className = 'category-pdf-btn';
        pdfLink.innerHTML = `📄 Download PDF Portfolio - ${data.title}`;
        gridEl.insertAdjacentElement('beforebegin', pdfLink);
    }

    data.photos.forEach(photoName => {
        const img = document.createElement('img');
        img.src = `gambar/acak/${photoName}`;
        img.setAttribute('loading', 'lazy');
        gridEl.appendChild(img);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeCategory = function() {
    const modal = document.getElementById('category-modal');
    if(modal) modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

// ===============================================
// 3. GENERATOR KATEGORI VIDEO (PORTRAIT)
// ===============================================
const videoData = {
    'wcc': { title: 'WCC Projects', videos: ['wcc 1.mp4', 'wcc 2.mp4', 'wcc 3.mp4', 'wcc 4.mp4', 'WCC5.mp4', 'WCC6.mp4', 'WCC7.mp4'] },
    'recap': { title: 'Recap Event', videos: ['Video1.mp4', 'Video2.mp4'] },
    'content': { title: 'Content Creation', videos: ['Video3.mp4', 'content 1.mp4', 'content 2.mp4', 'content 3.mp4', 'content 4.mp4', 'content 5.mp4'] }
};

window.openVideoCategory = function(catKey) {
    const modal = document.getElementById('video-modal');
    const titleEl = document.getElementById('video-category-title');
    const gridEl = document.getElementById('video-grid-modal');
    const data = videoData[catKey];
    
    if (!data || !modal || !gridEl) return;

    titleEl.innerText = data.title;
    gridEl.innerHTML = ''; 

    data.videos.forEach(videoName => {
        const videoEl = document.createElement('video');
        videoEl.src = `Video/${videoName}`;
        videoEl.controls = true; 
        videoEl.setAttribute('preload', 'metadata');
        gridEl.appendChild(videoEl);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
};

window.closeVideoCategory = function() {
    const modal = document.getElementById('video-modal');
    if(modal) {
        modal.classList.remove('active');
        modal.querySelectorAll('video').forEach(vid => vid.pause());
    }
    document.body.style.overflow = 'auto'; 
};

// ===============================================
// 4. WHATSAPP CTA PITCH PADA HOMEPAGE
// ===============================================
let selectedRole = "";
window.quickPitch = function(role) {
    document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');
    selectedRole = role;
};

window.sendRecruitmentWA = function() {
    const roleText = selectedRole ? `untuk posisi *${selectedRole}*` : "untuk berdiskusi mengenai potensi kerjasama marketing";
    const message = `Halo Rey! Saya telah meninjau portofolio Anda dan tertarik untuk berdiskusi ${roleText}. Kapan Anda ada waktu luang?`;
    window.open(`https://wa.me/6282196956556?text=${encodeURIComponent(message)}`, '_blank');
};
