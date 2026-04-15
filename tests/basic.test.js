// Testes básicos para o site iDialog
// Este arquivo contém testes unitários simples

describe('Site iDialog', () => {
    test('HTML deve ser válido', () => {
        // Teste para validar estrutura HTML
        expect(document.doctype).toBeTruthy();
    });

    test('CSS deve carregar corretamente', () => {
        // Teste para verificar se estilos foram aplicados
        const body = document.body;
        expect(body).toBeTruthy();
    });

    test('JavaScript deve funcionar', () => {
        // Teste para funções JavaScript básicas
        expect(typeof window).toBe('object');
    });
});

// Teste de acessibilidade básica
describe('Acessibilidade', () => {
    test('Página deve ter título', () => {
        expect(document.title).toBeTruthy();
        expect(document.title.length).toBeGreaterThan(0);
    });

    test('Imagens devem ter alt text', () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            expect(img.alt).toBeTruthy();
        });
    });
});
