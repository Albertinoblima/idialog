(function () {
    'use strict';

    function initRevealOnScroll() {
        const items = document.querySelectorAll('[data-reveal]');
        if (!items.length) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion || !('IntersectionObserver' in window)) {
            items.forEach((item) => item.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.18,
            rootMargin: '0px 0px -6% 0px'
        });

        items.forEach((item) => observer.observe(item));
    }

    function initRevealDetails() {
        const blocks = document.querySelectorAll('.blog-reveal');
        blocks.forEach((details) => {
            const action = details.querySelector('.blog-summary-action');
            if (!action) return;

            const setLabel = () => {
                action.textContent = details.open ? 'Ocultar explicacao' : 'Ver explicacao';
            };

            setLabel();
            details.addEventListener('toggle', setLabel);
        });
    }

    function initTabs() {
        const tabGroups = document.querySelectorAll('[data-blog-tabs]');

        tabGroups.forEach((group) => {
            const buttons = group.querySelectorAll('[data-tab-target]');
            const panels = group.querySelectorAll('[data-tab-panel]');
            if (!buttons.length || !panels.length) return;

            const activateTab = (id) => {
                buttons.forEach((button) => {
                    const isActive = button.getAttribute('data-tab-target') === id;
                    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
                    button.tabIndex = isActive ? 0 : -1;
                });

                panels.forEach((panel) => {
                    const isActive = panel.getAttribute('data-tab-panel') === id;
                    panel.classList.toggle('is-active', isActive);
                    panel.hidden = !isActive;
                });
            };

            buttons.forEach((button) => {
                button.addEventListener('click', () => activateTab(button.getAttribute('data-tab-target')));
                button.addEventListener('keydown', (event) => {
                    const currentIndex = Array.from(buttons).indexOf(button);
                    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
                    event.preventDefault();

                    const direction = event.key === 'ArrowRight' ? 1 : -1;
                    const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
                    buttons[nextIndex].focus();
                    activateTab(buttons[nextIndex].getAttribute('data-tab-target'));
                });
            });

            const firstTabId = buttons[0].getAttribute('data-tab-target');
            activateTab(firstTabId);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initRevealOnScroll();
        initRevealDetails();
        initTabs();
    });
})();
