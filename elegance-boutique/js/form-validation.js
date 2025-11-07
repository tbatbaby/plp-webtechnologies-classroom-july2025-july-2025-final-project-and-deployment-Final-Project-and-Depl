// Form Validation for Elegance Boutique Website

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form elements
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const phone = document.getElementById('phone');
        
        // Get error elements
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');
        
        // Reset previous errors
        resetErrors([nameError, emailError, subjectError, messageError]);
        removeErrorStyles([name, email, subject, message]);
        
        let isValid = true;
        
        // Name validation
        if (name.value.trim() === '') {
            showError(nameError, 'Please enter your full name');
            addErrorStyle(name);
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(nameError, 'Name must be at least 2 characters long');
            addErrorStyle(name);
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(emailError, 'Please enter your email address');
            addErrorStyle(email);
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(emailError, 'Please enter a valid email address');
            addErrorStyle(email);
            isValid = false;
        }
        
        // Subject validation
        if (subject.value === '') {
            showError(subjectError, 'Please select a subject');
            addErrorStyle(subject);
            isValid = false;
        }
        
        // Message validation
        if (message.value.trim() === '') {
            showError(messageError, 'Please enter your message');
            addErrorStyle(message);
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(messageError, 'Message must be at least 10 characters long');
            addErrorStyle(message);
            isValid = false;
        }
        
        // Phone validation (optional)
        if (phone && phone.value.trim() !== '') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phone.value.trim().replace(/[-\s\(\)]/g, ''))) {
                // Create phone error element if it doesn't exist
                let phoneError = document.getElementById('phoneError');
                if (!phoneError) {
                    phoneError = document.createElement('div');
                    phoneError.id = 'phoneError';
                    phoneError.className = 'error';
                    phone.parentNode.appendChild(phoneError);
                }
                showError(phoneError, 'Please enter a valid phone number');
                addErrorStyle(phone);
                isValid = false;
            }
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage('Thank you for your message! We will get back to you within 24 hours.');
            
            // In a real application, you would send the form data to a server here
            console.log('Form submitted with data:', {
                name: name.value,
                email: email.value,
                phone: phone ? phone.value : '',
                subject: subject.value,
                message: message.value
            });
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                removeSuccessMessage();
            }, 5000);
        }
    });
    
    // Real-time validation for better UX
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            // Remove error style as user types
            if (input.classList.contains('error-input')) {
                removeErrorStyle([input]);
                const errorElement = document.getElementById(input.id + 'Error');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            }
        });
    });
}

// Newsletter Form Validation
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        
        if (emailInput.value.trim() === '') {
            showInlineError(emailInput, 'Please enter your email address');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showInlineError(emailInput, 'Please enter a valid email address');
            return;
        }
        
        // Show success message
        showSuccessMessage('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            removeSuccessMessage();
        }, 5000);
    });
});

// Product Search Validation
const productSearch = document.getElementById('product-search');
if (productSearch) {
    const searchBtn = document.getElementById('search-btn');
    
    searchBtn.addEventListener('click', () => {
        performSearch();
    });
    
    productSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Helper Functions
function validateField(field) {
    const value = field.value.trim();
    let errorMessage = '';
    
    switch (field.type) {
        case 'text':
            if (field.id === 'name') {
                if (value === '') {
                    errorMessage = 'Please enter your full name';
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                }
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === '') {
                errorMessage = 'Please enter your email address';
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'select-one':
            if (value === '') {
                errorMessage = 'Please select a subject';
            }
            break;
            
        case 'textarea':
            if (value === '') {
                errorMessage = 'Please enter your message';
            } else if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (errorMessage) {
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            showError(errorElement, errorMessage);
            addErrorStyle([field]);
        }
    } else {
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        removeErrorStyle([field]);
    }
}

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function showInlineError(inputElement, message) {
    // Remove existing error
    let existingError = inputElement.parentNode.querySelector('.inline-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show new error
    const errorElement = document.createElement('div');
    errorElement.className = 'inline-error';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    inputElement.parentNode.appendChild(errorElement);
    addErrorStyle([inputElement]);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorElement.remove();
        removeErrorStyle([inputElement]);
    }, 3000);
}

function resetErrors(errorElements) {
    errorElements.forEach(error => {
        if (error) {
            error.style.display = 'none';
        }
    });
}

function addErrorStyle(elements) {
    elements.forEach(element => {
        if (element) {
            element.classList.add('error-input');
            element.style.borderColor = 'red';
        }
    });
}

function removeErrorStyle(elements) {
    elements.forEach(element => {
        if (element) {
            element.classList.remove('error-input');
            element.style.borderColor = '';
        }
    });
}

function showSuccessMessage(message) {
    // Remove existing success message
    removeSuccessMessage();
    
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.id = 'successMessage';
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    successMessage.textContent = message;
    document.body.appendChild(successMessage);
}

function removeSuccessMessage() {
    const existingMessage = document.getElementById('successMessage');
    if (existingMessage) {
        existingMessage.remove();
    }
}

function performSearch() {
    const searchTerm = productSearch.value.trim();
    
    if (searchTerm === '') {
        showInlineError(productSearch, 'Please enter a search term');
        return;
    }
    
    if (searchTerm.length < 2) {
        showInlineError(productSearch, 'Search term must be at least 2 characters long');
        return;
    }
    
    // In a real application, you would perform the search here
    console.log('Searching for:', searchTerm);
    
    // Show search results (simulated)
    showSuccessMessage(`Searching for "${searchTerm}"... (This is a demo)`);
    
    // Clear search after a delay
    setTimeout(() => {
        productSearch.value = '';
    }, 2000);
}

// Additional CSS for form validation
const validationStyles = `
    .error {
        color: #d32f2f;
        font-size: 0.9rem;
        margin-top: 5px;
        display: none;
    }
    
    .error-input {
        border-color: #d32f2f !important;
        background-color: #ffebee;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
        color: #333;
    }
    
    .form-group input,
    .form-group textarea,
    .form-group select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: inherit;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
        outline: none;
        border-color: var(--primary-color);
    }
    
    .inline-error {
        color: #d32f2f;
        font-size: 0.9rem;
        margin-top: 5px;
    }
`;

// Inject styles into the document
const styleSheet = document.createElement('style');
styleSheet.textContent = validationStyles;
document.head.appendChild(styleSheet);

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        showError,
        resetErrors,
        addErrorStyle,
        removeErrorStyle
    };
}