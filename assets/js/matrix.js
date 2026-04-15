/* Matrix Rain Effect - iDialog Futuristic Theme */
(function () {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    function draw() {
        // Fade trail: alpha ligeiramente maior = fundo some mais rápido, caracteres mais nítidos
        ctx.fillStyle = 'rgba(10, 10, 15, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const y = drops[i] * fontSize;

            // Cabeça da coluna: branco brilhante
            ctx.fillStyle = '#e0fff8';
            ctx.fillText(text, i * fontSize, y);

            // Segundo caractere logo atrás: ciano claro
            if (drops[i] > 1) {
                ctx.fillStyle = 'rgba(0, 229, 255, 0.85)';
                ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, (drops[i] - 1) * fontSize);
            }

            // Rastro: verde neon mais vivo
            ctx.fillStyle = 'rgba(0, 255, 136, 0.65)';

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', function () {
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    });
})();
