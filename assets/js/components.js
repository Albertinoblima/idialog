// Utilitário para carregar componentes
class ComponentLoader {
    static getBasePath() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;
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
            navbarToggle.addEventListener('click', () => {
                navbarMenu.classList.toggle('active');
                navbarToggle.classList.toggle('active');
            });
        }

        // Dropdown menu
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');

            if (toggle && menu) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                });

                // Fechar dropdown ao clicar fora
                document.addEventListener('click', (e) => {
                    if (!dropdown.contains(e.target)) {
                        dropdown.classList.remove('active');
                    }
                });
            }
        });

        // Marcar link ativo
        this.setActiveNavLink();
    }

    static setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && (currentPath.includes(href.replace('/iDialog', '')) ||
                (currentPath.endsWith('index.html') && href.includes('index.html')))) {
                link.classList.add('active');
            }
        });
    }
}

// Inicializar componentes quando a página carregar
document.addEventListener('DOMContentLoaded', async () => {
    await ComponentLoader.loadHeader();
    await ComponentLoader.loadFooter();
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
