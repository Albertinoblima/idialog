/* ===========================
   Authentication Modals - JavaScript
=========================== */

// API Configuration
const API_BASE = localStorage.getItem('idialog-tools-api') || '/api';

/**
 * Abre um modal
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Fecha um modal
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        clearModalMessages();
        resetForms();
        document.body.style.overflow = 'auto';
    }
}

/**
 * Alterna entre modais (ex: login para registro)
 */
function switchModal(fromId, toId) {
    closeModal(fromId);
    openModal(toId);
    return false;
}

/**
 * Limpa mensagens de todos os modais
 */
function clearModalMessages() {
    const messages = document.querySelectorAll('.form-message');
    messages.forEach(msg => {
        msg.classList.remove('show', 'success', 'error', 'loading');
        msg.textContent = '';
    });
}

/**
 * Reseta todos os formulários
 */
function resetForms() {
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
}

/**
 * Exibe uma mensagem no modal
 */
function showMessage(modalId, message, type = 'info') {
    const messageEl = document.getElementById(`${modalId.split('-')[0]}-message`);
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `form-message show ${type}`;

        // Auto-hide success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageEl.classList.remove('show');
            }, 3000);
        }
    }
}

/**
 * Valida se as senhas correspondem
 */
function validatePasswords(password, passwordConfirm) {
    if (password !== passwordConfirm) {
        return false;
    }
    if (password.length < 6) {
        return false;
    }
    return true;
}

/**
 * Realiza requisição à API
 */
async function apiRequest(path, options = {}) {
    const headers = Object.assign({}, options.headers || {});

    let response;
    try {
        response = await fetch(`${API_BASE}${path}`, Object.assign({}, options, { headers }));
    } catch (error) {
        throw new Error('Não foi possível conectar à API. Verifique a URL da API e se o backend está online.');
    }

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || `Erro ${response.status}`);
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        return {};
    }

    return response.json();
}

/**
 * Handler para submissão de login
 */
async function handleLoginSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const modalId = 'login-modal';

    // Validação básica
    if (!email || !password) {
        showMessage(modalId, 'Preencha todos os campos', 'error');
        return;
    }

    showMessage(modalId, 'Autenticando...', 'loading');

    try {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        // Store token
        localStorage.setItem('idialog-tools-token', response.token);

        showSuccessModal('Bem-vindo! Redirecionando para o painel...', () => {
            window.location.href = '/pages/ferramentas/index.html';
        });

    } catch (error) {
        console.error('Login error:', error);
        showMessage(modalId, error.message || 'Erro ao fazer login. Verifique suas credenciais.', 'error');
    }
}

/**
 * Handler para submissão de registro
 */
async function handleRegisterSubmit(event) {
    event.preventDefault();

    const company = document.getElementById('register-company').value.trim();
    const cnpj = document.getElementById('register-cnpj').value.trim();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    const modalId = 'register-modal';

    // Validação básica
    if (!company || !name || !email || !password) {
        showMessage(modalId, 'Preencha todos os campos obrigatórios', 'error');
        return;
    }

    if (!validatePasswords(password, passwordConfirm)) {
        if (password.length < 6) {
            showMessage(modalId, 'A senha deve ter pelo menos 6 caracteres', 'error');
        } else {
            showMessage(modalId, 'As senhas não correspondem', 'error');
        }
        return;
    }

    showMessage(modalId, 'Criando conta...', 'loading');

    try {
        const response = await apiRequest('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                company: {
                    name: company,
                    cnpj: cnpj || ''
                },
                admin: {
                    name: name,
                    email: email,
                    password: password
                }
            })
        });

        localStorage.setItem('idialog-tools-token', response.token);

        showSuccessModal('Conta criada com sucesso! Redirecionando para o painel...', () => {
            window.location.href = '/pages/ferramentas/index.html';
        });

    } catch (error) {
        console.error('Register error:', error);
        showMessage(modalId, error.message || 'Erro ao criar conta. Tente novamente.', 'error');
    }
}

/**
 * Exibe modal de sucesso
 */
function showSuccessModal(message, onClose) {
    const messageEl = document.getElementById('success-message');
    if (messageEl) {
        messageEl.textContent = message;
    }
    openModal('success-modal');

    window.handleSuccessClose = onClose || (() => {
        closeModal('success-modal');
    });
}

/**
 * Handler para fechar modal de sucesso
 */
function handleSuccessClose() {
    if (typeof window.handleSuccessClose === 'function') {
        window.handleSuccessClose();
    } else {
        closeModal('success-modal');
    }
}

/**
 * Fecha modal ao clicar fora dele
 */
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});

/**
 * Fecha modal ao pressionar ESC
 */
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});

/**
 * Redireciona para ferramentas se já estiver autenticado
 */
window.addEventListener('load', function () {
    const token = localStorage.getItem('token');
    if (token && window.location.pathname === '/index.html' || window.location.pathname === '/') {
        // Could redirect here if desired
        // window.location.href = '/pages/ferramentas/index.html';
    }
});

console.log('Auth Modals loaded successfully');
