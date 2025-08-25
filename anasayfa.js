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
