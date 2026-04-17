// Utilitário para carregar componentes
class ComponentLoader {
    static getBasePath() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s !== '');
        const lastSegment = segments[segments.length - 1] || '';
        const isFile = lastSegment.includes('.');
        const dirSegments = isFile ? segments.slice(0, -1) : segments;
        // Sites hospedados na raiz: localhost, domínio próprio
        // Sites no subdiretório: *.github.io/reponame (sem domínio próprio)
        const hostname = window.location.hostname;
        const isRootHosted = hostname === '' ||
            hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            !hostname.endsWith('github.io');
        const depth = isRootHosted ? dirSegments.length : Math.max(0, dirSegments.length - 1);
        return '../'.repeat(depth);
    }

    static async loadComponent(elementId, componentPath) {
        try {
            const basePath = this.getBasePath();
            const fullPath = basePath + componentPath;
            const response = await fetch(fullPath);
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
            console.error(`Erro ao carregar componente ${componentPath}:`, error);
        }
    }

    static async loadHeader() {
        await this.loadComponent('header-placeholder', 'components/header.html');
        this.initializeNavigation();
    }

    static async loadFooter() {
        await this.loadComponent('footer-placeholder', 'components/footer.html');
    }

    static initializeNavigation() {
        // Inicializar menu móvel
        const navbarToggle = document.getElementById('navbar-toggle');
        const navbarMenu = document.getElementById('navbar-menu');

        if (navbarToggle && navbarMenu) {
            navbarToggle.setAttribute('aria-controls', 'navbar-menu');
            navbarToggle.setAttribute('aria-expanded', 'false');
            navbarToggle.setAttribute('aria-label', navbarToggle.getAttribute('aria-label') || 'Abrir menu principal');

            navbarToggle.addEventListener('click', () => {
                navbarMenu.classList.toggle('active');
                navbarToggle.classList.toggle('active');
                navbarToggle.setAttribute('aria-expanded', navbarMenu.classList.contains('active') ? 'true' : 'false');
            });

            document.addEventListener('keydown', (e) => {
                if (e.key !== 'Escape') return;
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
                navbarToggle.setAttribute('aria-expanded', 'false');
            });
        }

        // Dropdown menu
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');

            if (toggle && menu) {
                toggle.setAttribute('aria-haspopup', 'true');
                toggle.setAttribute('aria-expanded', 'false');

                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    toggle.setAttribute('aria-expanded', dropdown.classList.contains('active') ? 'true' : 'false');
                });

                toggle.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                        toggle.setAttribute('aria-expanded', dropdown.classList.contains('active') ? 'true' : 'false');
                    }

                    if (e.key === 'Escape') {
                        dropdown.classList.remove('active');
                        toggle.setAttribute('aria-expanded', 'false');
                    }
                });

                // Fechar dropdown ao clicar fora
                document.addEventListener('click', (e) => {
                    if (!dropdown.contains(e.target)) {
                        dropdown.classList.remove('active');
                        toggle.setAttribute('aria-expanded', 'false');
                    }
                });

                menu.addEventListener('keydown', (e) => {
                    if (e.key !== 'Escape') return;
                    dropdown.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                });
            }
        });

        // Marcar link ativo
        this.setActiveNavLink();
    }

    static setActiveNavLink() {
        const currentPath = window.location.pathname;
        // Remove o prefixo do repositório (GitHub Pages) para comparação relativa
        const pathParts = currentPath.split('/').filter(Boolean);
        const isLocalhost = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
        // No GitHub Pages o primeiro segmento é o nome do repositório
        const normalizedPath = isLocalhost ? currentPath : '/' + pathParts.slice(1).join('/');

        const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            // Normaliza o href (remove ../ e paths absolutos)
            const cleanHref = href.replace(/^(\.\.\/)*/g, '/').replace(/\/+/g, '/');
            if (normalizedPath.includes(cleanHref) ||
                (normalizedPath === '/' || normalizedPath === '') && href.includes('index.html')) {
                link.classList.add('active');
            }
        });
    }
}

// Inicializar componentes quando a página carregar
document.addEventListener('DOMContentLoaded', async () => {
    await ComponentLoader.loadHeader();
    await ComponentLoader.loadFooter();
    document.dispatchEvent(new CustomEvent('components:ready'));
});

// Função para scroll suave (se necessário)
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
