console.log("🚀 File Converter Loaded Successfully!");

// ===== DOM ELEMENTS =====
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const filePreview = document.getElementById('filePreview');
const fileName = document.getElementById('fileName');
const removeFile = document.getElementById('removeFile');
const uploadContent = document.querySelector('.upload-content');
const converterForm = document.getElementById('converterForm');
const loadingOverlay = document.getElementById('loadingOverlay');

// ===== DRAG & DROP FUNCTIONALITY =====
if (uploadArea) {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when dragging over
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('drag-over');
        }, false);
    });

    // Handle dropped files
    uploadArea.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            displayFileName(files[0]);
        }
    }, false);
}

// ===== FILE INPUT CHANGE =====
if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            displayFileName(e.target.files[0]);
        }
    });
}

// ===== DISPLAY FILE NAME =====
function displayFileName(file) {
    if (fileName && filePreview && uploadContent) {
        fileName.textContent = `📎 ${file.name} (${formatFileSize(file.size)})`;
        uploadContent.style.display = 'none';
        filePreview.style.display = 'flex';
        
        // Add animation
        filePreview.style.animation = 'slideIn 0.3s ease';
    }
}

// ===== FORMAT FILE SIZE =====
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ===== REMOVE FILE =====
if (removeFile) {
    removeFile.addEventListener('click', () => {
        fileInput.value = '';
        filePreview.style.display = 'none';
        uploadContent.style.display = 'block';
        uploadContent.style.animation = 'fadeIn 0.3s ease';
    });
}

// ===== FORM SUBMISSION =====
if (converterForm) {
    converterForm.addEventListener('submit', (e) => {
        // Show loading overlay
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
        
        // Add success message after delay (for demo)
        // In production, this would be handled by the server response
    });
}

// ===== SELECT ANIMATION =====
const selectElement = document.getElementById('convertType');
if (selectElement) {
    selectElement.addEventListener('change', function() {
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

// ===== BUTTON RIPPLE EFFECT =====
const convertBtn = document.getElementById('convertBtn');
if (convertBtn) {
    convertBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// ===== SMOOTH SCROLL ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== FEATURE CARDS INTERSECTION OBSERVER =====
const featureCards = document.querySelectorAll('.feature-card');
if (featureCards.length > 0) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => observer.observe(card));
}