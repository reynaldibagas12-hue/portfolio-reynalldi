// Variable global
window.isDraggingCategory = false;

// ===============================================
//  1. INISIALISASI & PRE-LOADER (PERFORMA TINGGI)
// ===============================================
AOS.init({ duration: 800, once: true });

window.addEventListener('load', () => {
    // Timeout dipercepat jadi 300ms agar halaman lebih cepat muncul
    setTimeout(() => {
        const loader = document.getElementById('premium-loader');
        if(loader) loader.classList.add('hidden');
    }, 300); 
});

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    function adjustFooter() {
        if (window.innerWidth > 768 && footer && main) {
            main.style.marginBottom = footer.offsetHeight + 'px';
        } else {
            main.style.marginBottom = '0';
        }
    }
    
    setTimeout(adjustFooter, 500);
    window.addEventListener('resize', adjustFooter);

    // ===============================================
    //  2. NAVIGASI, BURGER MENU & AUTO-HIDE
    // ===============================================
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    if (navbar) {
        window.addEventListener('scroll', () => {
            let currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) navbar.classList.add('nav-hidden');
            else navbar.classList.remove('nav-hidden');
            lastScroll = currentScroll;
        });
    }

    // ===============================================
    //  3. KURSOR LENSA KAMERA (UPGRADED)
    // ===============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const interactables = document.querySelectorAll('a, button, .grid-photo-item img, .featured-item, input, textarea, .cat-card, .cat-scroll-btn, .side-nav-tab');

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
            el.addEventListener('mouseenter', () => {
                cursorRing.classList.add('lens-focus');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0)'; 
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('lens-focus');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // ===============================================
    //  4. UNIFIED LIGHTBOX
    // ===============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    document.addEventListener('click', (e) => {
        if (e.target && (e.target.classList.contains('lightbox-trigger') || e.target.closest('.grid-photo-item img') || e.target.closest('.featured-item img'))) {
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

    // ===============================================
    //  5. VIDEO HOVER & BUTTON EFFECT & SWIPER & GSAP
    // ===============================================
    document.querySelectorAll('.video-item video').forEach(vdo => {
        vdo.addEventListener('mouseenter', () => vdo.play().catch(() => {}));
        vdo.addEventListener('mouseleave', () => vdo.pause());
    });

    document.querySelectorAll('.cta-button, .filter-btn, .focus-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const pos = btn.getBoundingClientRect();
            btn.style.transform = `translate(${(e.pageX - pos.left - pos.width / 2) * 0.3}px, ${(e.pageY - pos.top - pos.height / 2 - window.scrollY) * 0.5}px)`;
        });
        btn.addEventListener('mouseout', () => btn.style.transform = 'translate(0px, 0px)');
    });

    if (document.querySelector('.featuredSwiper')) {
        new Swiper('.featuredSwiper', {
            slidesPerView: 1, spaceBetween: 20, loop: true,
            autoplay: { delay: 3500, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: { 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 30 } }
        });
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        const hc = document.querySelector('.horizon-container'), hw = document.querySelector('.horizon-wrapper');
        if (hc && hw) {
            gsap.to(hc, {
                x: () => -(hc.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: { trigger: hw, start: "top top", end: () => `+=${hc.scrollWidth - window.innerWidth}`, pin: true, scrub: 1, invalidateOnRefresh: true }
            });
        }
    }

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => backToTopBtn.classList.toggle('show', window.scrollY > 500));
        backToTopBtn.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // ===============================================
    //  8. ARROW KONTROL SAJA (KATEGORI GALERI) - Mouse Scroll dihapus
    // ===============================================
    const categoryGrid = document.querySelector('.category-grid');
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');

    if (categoryGrid) {
        // Kontrol Panah (Kiri Kanan)
        if (scrollLeftBtn) {
            scrollLeftBtn.addEventListener('click', () => {
                categoryGrid.scrollBy({ left: -320, behavior: 'smooth' });
            });
        }
        if (scrollRightBtn) {
            scrollRightBtn.addEventListener('click', () => {
                categoryGrid.scrollBy({ left: 320, behavior: 'smooth' });
            });
        }
    }
});

// ===============================================
//  6. KATEGORI FOTO & WHATSAPP (GLOBAL FUNCTIONS)
// ===============================================
function generatePhotos(prefix, count) {
    let arr = []; 
    for (let i = 1; i <= count; i++) {
        arr.push(`${prefix}${i}.jpg`); 
    }
    return arr; 
}

const categoryData = {
    'portrait': { title: 'Portrait', pdf: 'pdf/portfolio portrait rey.pdf', photos: generatePhotos('moments' , 40) },
    'sport': { title: 'Sport', pdf: 'pdf/portfolio sport rey.pdf', photos: generatePhotos('Sport' , 21) },
    'wedding': { title: 'Wedding', pdf: 'pdf/portfolio wedding rey.pdf', photos: generatePhotos('Wedding' , 10) },
    'corporate': { title: 'Corporate & Event', pdf: 'pdf/Corporate and Event Portfolio.pdf', photos: generatePhotos('corporate', 36) },
    'nightlife': { title: 'Nightlife & Stage', pdf: 'pdf/stage photography reynaldi bagaskara.pdf', photos: generatePhotos('stage', 44) },
    // DITAMBAHKAN KATEGORI BARU PRIVATE PARTY
    'private-party': { title: 'Private Party', pdf: '', photos: generatePhotos('party', 20) },
    'property': { title: 'Property Visuals', pdf: 'pdf/interior & exterior portfolio reynaldi bagaskara.pdf', photos: generatePhotos('property', 31) },
    'fnb': { title: 'Food & Beverage', pdf: 'pdf/food and beverage portfolio reynaldi bagaskara.pdf', photos: generatePhotos('fnb', 39) }
};

function shuffleArray(array) {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

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
        pdfLink.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 8px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>Download PDF Portfolio - ${data.title}`;
        gridEl.insertAdjacentElement('beforebegin', pdfLink);
    }

    shuffleArray(data.photos).forEach(photoName => {
        const img = document.createElement('img');
        img.src = `gambar/acak/${photoName}`;
        img.setAttribute('loading', 'lazy'); 
        img.setAttribute('decoding', 'async');
        img.classList.add('lightbox-trigger');
        gridEl.appendChild(img);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeCategory = function() {
    document.getElementById('category-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
};

// ===============================================
//  7. LOGIKA REKRUTMEN HRD (WA CTA)
// ===============================================
let selectedRole = "";

window.quickPitch = function(role) {
    document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    selectedRole = role;
};

window.sendRecruitmentWA = function() {
    const roleText = selectedRole ? `untuk posisi *${selectedRole}*` : "untuk berdiskusi lebih lanjut";
    const message = `Halo Rey! Saya telah meninjau portofolio Anda dan tertarik untuk menjadwalkan waktu diskusi ${roleText} di perusahaan kami. Kapan waktu luang Anda?`;
    
    window.open(`https://wa.me/6282196956556?text=${encodeURIComponent(message)}`, '_blank');
};
