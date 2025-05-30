document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const langSwitch = document.getElementById('langSwitch');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Dark mode functionality
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Messages for different languages
    const messages = {
        pl: 'Formularz wysłany! Sprawdź konsolę, aby zobaczyć dane.',
        en: 'Form submitted! Check console to see the data.',
        pt: 'Formulário enviado! Verifique a consola para ver os dados.',
        'pt-br': 'Formulário enviado! Verifique o console para ver os dados.',
        es: '¡Formulario enviado! Compruebe la consola para ver los datos.',
        de: 'Formular gesendet! Überprüfen Sie die Konsole, um die Daten zu sehen.',
        fr: 'Formulaire envoyé ! Vérifiez la console pour voir les données.',
        cs: 'Formulář odeslán! Zkontrolujte konzoli pro zobrazení dat.',
        vi: 'Đã gửi biểu mẫu! Kiểm tra bảng điều khiển để xem dữ liệu.',
        ar: 'تم إرسال النموذج! تحقق من وحدة التحكم لرؤية البيانات.',
        zh: '表单已提交！查看控制台以查看数据。',
        ru: 'Форма отправлена! Проверьте консоль, чтобы увидеть данные.'
    };
    
    // Load preferred language
    const savedLang = localStorage.getItem('preferredLanguage') || 'pl';
    langSwitch.value = savedLang;
    document.documentElement.lang = savedLang;
    updateLanguage(savedLang);
    
    function updateLanguage(lang) {
        // Update all elements with data attributes
        document.querySelectorAll('[data-pl]').forEach(element => {
            if (element.hasAttribute(`data-${lang}`)) {
                element.textContent = element.getAttribute(`data-${lang}`);
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Save language preference
        localStorage.setItem('preferredLanguage', lang);
        
        // Update text direction for Arabic
        document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update form alignment for Arabic
        const loginBox = document.querySelector('.login-box');
        if (loginBox) {
            loginBox.style.textAlign = lang === 'ar' ? 'right' : 'left';
        }
    }
    
    // Language switch event listener
    langSwitch.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });

    // Handle login form if it exists
    if (loginForm) {
        // Check for saved login data
        const savedUsername = localStorage.getItem('savedUsername');
        const savedRemember = localStorage.getItem('rememberMe');

        if (savedUsername && savedRemember === 'true') {
            usernameInput.value = savedUsername;
            rememberCheckbox.checked = true;
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const loginData = {
                username: usernameInput.value,
                password: passwordInput.value
            };

            if (rememberCheckbox.checked) {
                localStorage.setItem('savedUsername', loginData.username);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('savedUsername');
                localStorage.removeItem('rememberMe');
            }

            console.log('Dane logowania:', loginData);
            localStorage.setItem('lastLoginAttempt', new Date().toISOString());
            
            // Show alert in current language
            const currentLang = langSwitch.value;
            alert(messages[currentLang]);
        });
    }

    // Handle register form if it exists
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const registerData = {
                username: usernameInput.value,
                email: document.getElementById('email').value,
                password: passwordInput.value,
                confirmPassword: document.getElementById('confirm-password').value
            };

            if (registerData.password !== registerData.confirmPassword) {
                alert(messages[langSwitch.value]);
                return;
            }

            console.log('Dane rejestracji:', registerData);
            localStorage.setItem('lastRegistrationAttempt', new Date().toISOString());
            
            // Show alert in current language
            const currentLang = langSwitch.value;
            alert(messages[currentLang]);
        });
    }
}); 