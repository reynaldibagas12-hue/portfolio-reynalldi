window.isDraggingCategory = false;

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
            document.body.classList.toggle('nav-open');
        });

        // Tutup menu saat link diklik di mobile
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
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

    // 2. Lightbox Handler
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    document.addEventListener('click', (e) => {
        if (e.target && (e.target.classList.contains('lightbox-trigger') || e.target.closest('.grid-photo-item img') || e.target.closest('.featured-item img') || e.target.closest('.category-photos-grid img'))) {
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

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        backToTopBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        });
    }

    // 4. Category Scroll Buttons (Desktop)
    const categoryGrid = document.querySelector('.category-grid');
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');

    if (categoryGrid) {
        if (scrollLeftBtn) {
            scrollLeftBtn.addEventListener('click', () => {
                categoryGrid.scrollBy({ left: -300, behavior: 'smooth' });
            });
        }
        if (scrollRightBtn) {
            scrollRightBtn.addEventListener('click', () => {
                categoryGrid.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }
    }
});

// 5. Category Modal Data & Functions
function generatePhotos(prefix, count) {
    let arr = []; 
    for (let i = 1; i <= count; i++) {
        arr.push(`${prefix}${i}.jpg`); 
    }
    return arr; 
}

const categoryData = {
    'portrait': { title: 'Portrait', pdf: 'pdf/portfolio portrait rey.pdf', photos: generatePhotos('portrait' , 20) },
    'sport': { title: 'Sport', pdf: 'pdf/portfolio sport rey.pdf', photos: generatePhotos('sport' , 20) },
    'wedding': { title: 'Wedding', pdf: 'pdf/portfolio wedding rey.pdf', photos: generatePhotos('wedding' , 20) },
    'corporate': { title: 'Corporate & Event', pdf: 'pdf/Corporate and Event Portfolio.pdf', photos: generatePhotos('corporate', 36) },
    'nightlife': { title: 'Nightlife & Stage', pdf: 'pdf/stage photography reynaldi bagaskara.pdf', photos: generatePhotos('stage', 44) },
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
    const modal = document.getElementById('category-modal');
    const titleEl = document.getElementById('category-title');
    const gridEl = document.getElementById('category-photos-grid');
    const data = categoryData[catKey];
    
    if (!data || !modal || !gridEl) return;

    titleEl.innerText = data.title;
    gridEl.innerHTML = ''; 
    
    const oldPdfBtn = document.querySelector('.category-pdf-btn');
    if (oldPdfBtn) oldPdfBtn.remove();

    if (data.pdf) {
        const pdfLink = document.createElement('a');
        pdfLink.href = data.pdf; 
        pdfLink.target = '_blank'; 
        pdfLink.className = 'category-pdf-btn';
        pdfLink.innerHTML = `Download PDF Portfolio - ${data.title}`;
        gridEl.insertAdjacentElement('beforebegin', pdfLink);
    }

    shuffleArray(data.photos).forEach(photoName => {
        const img = document.createElement('img');
        img.src = `Gambar/Acak/${photoName}`;
        img.setAttribute('loading', 'lazy'); 
        img.setAttribute('decoding', 'async');
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

// 6. Recruitment WhatsApp Pitcher
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
