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
    // Navigasi Burger Menu
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

        // Auto close menu di HP saat diklik
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
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

    // Lightbox Global
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    document.addEventListener('click', (e) => {
        if (e.target && (e.target.classList.contains('lightbox-trigger') || e.target.closest('.category-photos-grid img'))) {
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

    // Scroll Back to Top
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => backToTopBtn.classList.toggle('show', window.scrollY > 500));
        backToTopBtn.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
});

// Generator Foto (Halaman Fotografi)
function generatePhotos(prefix, count) {
    let arr = []; 
    for (let i = 1; i <= count; i++) {
        arr.push(`${prefix}${i}.jpg`); 
    }
    return arr; 
}

const categoryData = {
    'portrait': { title: 'Portrait', pdf: 'pdf/portfolio portrait rey.pdf', photos: generatePhotos('moments' , 47) },
    'sport': { title: 'Sport & Wellness', pdf: 'pdf/portfolio sport rey.pdf', photos: generatePhotos('Sport' , 43) },
    'wedding': { title: 'Wedding', pdf: 'pdf/portfolio wedding rey.pdf', photos: generatePhotos('Wedding' , 12) },
    'corporate': { title: 'Corporate & Event', pdf: 'pdf/Corporate and Event Portfolio.pdf', photos: generatePhotos('corporate', 36) },
    'nightlife': { title: 'Nightlife & Stage', pdf: 'pdf/stage photography reynaldi bagaskara.pdf', photos: generatePhotos('stage', 44) },
    'fnb': { title: 'Food & Beverage', pdf: 'pdf/food and beverage portfolio reynaldi bagaskara.pdf', photos: generatePhotos('fnb', 39) }
};

window.openCategory = function(catKey) {
    const modal = document.getElementById('category-modal'), titleEl = document.getElementById('category-title'), gridEl = document.getElementById('category-photos-grid'), data = categoryData[catKey];
    if (!data || !modal || !gridEl) return;

    titleEl.innerText = data.title;
    gridEl.innerHTML = ''; 

    data.photos.forEach(photoName => {
        const img = document.createElement('img');
        img.src = `gambar/acak/${photoName}`;
        img.setAttribute('loading', 'lazy');
        img.classList.add('lightbox-trigger');
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

// Kategori Video (Halaman Videografi)
const videoData = {
    'wcc': { title: 'WCC Projects', videos: ['wcc 1.mp4', 'wcc 2.mp4'] },
    'recap': { title: 'Recap Event', videos: ['Video1.mp4', 'Video2.mp4'] },
    'content': { title: 'Content Creation', videos: ['Video3.mp4', 'content 1.mp4'] }
};

window.openVideoCategory = function(catKey) {
    const modal = document.getElementById('video-modal'), titleEl = document.getElementById('video-category-title'), gridEl = document.getElementById('video-grid-modal'), data = videoData[catKey];
    if (!data || !modal || !gridEl) return;
    titleEl.innerText = data.title; gridEl.innerHTML = ''; 

    data.videos.forEach(videoName => {
        const videoEl = document.createElement('video');
        videoEl.src = `Video/${videoName}`;
        videoEl.controls = true; 
        gridEl.appendChild(videoEl);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
};

window.closeVideoCategory = function() {
    const modal = document.getElementById('video-modal');
    if(modal) {
        modal.classList.remove('active');
        const videos = modal.querySelectorAll('video');
        videos.forEach(vid => vid.pause());
    }
    document.body.style.overflow = 'auto'; 
};

// Tombol WA
window.sendRecruitmentWA = function() {
    window.open(`https://wa.me/6282196956556`, '_blank');
};
