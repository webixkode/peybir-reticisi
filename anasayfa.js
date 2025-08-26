// Harita modalını açma
document.querySelector('.open-map').addEventListener('click', function() {
    document.getElementById('mapModal').style.display = 'block';
    document.querySelector('.address-form').style.display = 'none'; // Manuel adres formunu gizle
});

// Harita modalını kapama
document.querySelector('.close-map').addEventListener('click', function() {
    document.getElementById('mapModal').style.display = 'none';
});

// Google Maps API ile haritayı başlatma
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: { lat: -34.397, lng: 150.644 }
    });

    google.maps.event.addListener(marker, 'dragend', function() {
        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();
        console.log("Yeni Konum: " + lat + ", " + lng);
    });
}

// Adresi manuel girme formunu göstermek
document.querySelector('.manual-address').addEventListener('input', function() {
    document.querySelector('.address-form').style.display = 'block';
});

// Adres Kaydetme işlemi
document.querySelector('.submit-address').addEventListener('click', function() {
    var address = document.querySelector('.manual-address').value;
    console.log("Manuel Adres Kaydedildi: " + address);
    // Adresi kaydetme işlemi yapılabilir
});

// Slider dots functionality
document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            updateDots();
        });
    });
    
    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }
    
    // Mevcut showSlide fonksiyonunu güncelle
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        updateDots();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Ürün kartları için event listener'lar
    const productCards = document.querySelectorAll('.product-card');
    const productLinks = document.querySelectorAll('.product-link');
    
    // Ürün kartlarına tıklama efekti
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Eğer tıklanan element link değilse, kartın linkine yönlendir
            if (!e.target.classList.contains('product-link')) {
                const link = this.querySelector('.product-link');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
        
        // Hover efektleri için mouse event'leri
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Ürün linklerine tıklama event'i
    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Loading efekti
            const originalText = this.textContent;
            this.textContent = 'Yükleniyor...';
            this.style.backgroundColor = '#95a5a6';
            
            // Simüle edilmiş yükleme süresi
            setTimeout(() => {
                window.location.href = this.href;
            }, 500);
        });
    });
    
    // Kategori filtreleme fonksiyonu
    function filterProducts(category) {
        const allCards = document.querySelectorAll('.product-card');
        
        allCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Scroll animasyonu için Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Kategori bölümlerini gözlemle
    const categorySection = document.querySelectorAll('.category-section');
    categorySection.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
    
    // Ürün arama fonksiyonu
    function searchProducts(searchTerm) {
        const productCards = document.querySelectorAll('.product-card');
        const searchLower = searchTerm.toLowerCase();
        
        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
            
            if (productName.includes(searchLower) || productDesc.includes(searchLower)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Lazy loading için resim yükleme
    const images = document.querySelectorAll('.product-image img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Gerçek uygulamada data-src kullanılabilir
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Ürün kartları için keyboard navigation
    productCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.product-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
    
    // Global fonksiyonları window objesine ekle
    window.filterProducts = filterProducts;
    window.searchProducts = searchProducts;
});

// Ürün verilerini yönetmek için basit bir sistem
const productData = {
    'beyaz-peynir': {
        name: 'Köy Beyaz Peyniri',
        category: 'taze',
        description: 'İzmir\'in köylerinden gelen geleneksel lezzetler',
        price: '45 TL/kg',
        features: ['Doğal', 'Katkısız', 'Köy Sütü']
    },
    'lor-peynir': {
        name: 'Taze Lor Peyniri',
        category: 'taze',
        description: 'Günlük taze sütten üretilen doğal lor peyniri',
        price: '35 TL/kg',
        features: ['Günlük Taze', 'Düşük Yağlı', 'Protein Açısından Zengin']
    },
    'ricotta': {
        name: 'Ricotta Peyniri',
        category: 'taze',
        description: 'İtalyan usulü hazırlanan kremsi yapıda peynir',
        price: '55 TL/kg',
        features: ['İtalyan Usulü', 'Kremsi Yapı', 'Çok Amaçlı']
    },
    'kasar-peynir': {
        name: 'Eski Kaşar',
        category: 'olgun',
        description: '12 ay olgunlaştırılmış geleneksel kaşar peyniri',
        price: '85 TL/kg',
        features: ['12 Ay Olgun', 'Sert Yapı', 'Yoğun Lezzet']
    },
    'tulum-peynir': {
        name: 'Tulum Peyniri',
        category: 'olgun',
        description: 'Anadolu\'nun geleneksel lezzeti, doğal tulumda olgunlaşmış',
        price: '75 TL/kg',
        features: ['Geleneksel', 'Doğal Tulum', 'Anadolu Lezzeti']
    },
    'cheddar': {
        name: 'Cheddar Peyniri',
        category: 'olgun',
        description: 'İngiliz usulü hazırlanan sert yapıda peynir',
        price: '65 TL/kg',
        features: ['İngiliz Usulü', 'Sert Yapı', 'Çok Yönlü']
    }
};

// Ürün detaylarını getiren fonksiyon
function getProductDetails(productId) {
    return productData[productId] || null;
}
document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll animasyonları
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Üretim sürecindeki itemları gözlemle
    const processItems = document.querySelectorAll('.process-item');
    processItems.forEach(item => {
        observer.observe(item);
    });

    // Sayaç animasyonu
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats-section');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.parentElement.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);
        });
    }

    // Değer öğeleri hover efektleri
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(0deg)';
        });
    });

    // Smooth scroll
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('🧀 Peynir üreticisi sayfası yüklendi!');
});
