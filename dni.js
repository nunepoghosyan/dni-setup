// Configuration for Dynamic Number Insertion
const dniConfig = {
    default: {
        number: '(555) 123-4567',
        tel: '+15551234567'
    },
    sources: {
        'google': {
            number: '(555) 111-1111',
            tel: '+15551111111'
        },
        'facebook': {
            number: '(555) 222-2222',
            tel: '+15552222222'
        },
        'email': {
            number: '(555) 333-3333',
            tel: '+15553333333'
        }
    }
};

function initDNI() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    
    let currentSource = 'default';

    // Check if a valid source is present in URL
    if (utmSource && dniConfig.sources[utmSource.toLowerCase()]) {
        currentSource = utmSource.toLowerCase();
        // Persist source for the session
        sessionStorage.setItem('dni_source', currentSource);
    } else {
        // Check if there's a persisted source
        const storedSource = sessionStorage.getItem('dni_source');
        if (storedSource && dniConfig.sources[storedSource]) {
            currentSource = storedSource;
        }
    }

    updatePhoneNumbers(currentSource);
}

function updatePhoneNumbers(sourceKey) {
    const data = dniConfig.sources[sourceKey] || dniConfig.default;
    
    // Update text content
    const textElements = document.querySelectorAll('.dni-phone-text');
    textElements.forEach(el => {
        el.textContent = data.number;
    });

    // Update href for links
    const linkElements = document.querySelectorAll('a.dni-phone-link');
    linkElements.forEach(el => {
        el.href = `tel:${data.tel}`;
    });

    console.log(`DNI: Updated phone numbers for source '${sourceKey}'`);
}

// Run on load
document.addEventListener('DOMContentLoaded', initDNI);
