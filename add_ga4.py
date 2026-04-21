#!/usr/bin/env python3
"""Add GA4 tag to all HTML files that are missing it."""
import os, re, glob

GA4_TAG = """    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-MN7ZZDKVP"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-MN7ZZDKVP');
    </script>"""

MEASUREMENT_ID = 'G-MN7ZZDKVP'

# Pastas a pular (comparação exata de segmentos do caminho)
SKIP_DIRS = {'pages/admin', 'components'}
SKIP_FILENAMES = {'index_backup.html'}

updated = []
skipped = []

for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in {'.git', 'node_modules', '__pycache__'}]
    for fname in files:
        if not fname.endswith('.html'):
            continue
        fpath = os.path.join(root, fname)
        norm = fpath.replace('\\', '/').lstrip('./')
        # Pula pastas específicas e arquivos de backup
        if any(norm.startswith(s) for s in SKIP_DIRS) or fname in SKIP_FILENAMES:
            skipped.append(fpath)
            continue
        with open(fpath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        if MEASUREMENT_ID in content:
            continue  # já tem a tag
        # Insere logo após <head> (case-insensitive)
        new_content = re.sub(
            r'(<head\b[^>]*>)',
            r'\1\n' + GA4_TAG,
            content,
            count=1,
            flags=re.IGNORECASE
        )
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated.append(fpath)
            print(f'  ✓ {fpath}')
        else:
            print(f'  ✗ No <head> found: {fpath}')

print(f'\nTotal updated: {len(updated)}')
print(f'Skipped (admin/components): {len(skipped)}')
