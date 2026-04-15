$base = "C:\Users\alber\Downloads\revista_concurso\materias\"
$fenceFiles = @(
    "direito-processual-penal\reforco\acao-penal.html",
    "direito-processual-penal\reforco\inquerito-policial.html",
    "direito-processual-penal\reforco\nulidades.html",
    "direito-processual-penal\reforco\prisao-cautelar.html",
    "direito-processual-penal\reforco\provas.html",
    "raciocinio-logico\simulado.html"
)
foreach ($rel in $fenceFiles) {
    $fp = $base + $rel
    $c = [System.IO.File]::ReadAllText($fp, [System.Text.Encoding]::UTF8)
    # Remove any leading blank lines/whitespace before <!DOCTYPE
    $c = $c.TrimStart("`r`n ".ToCharArray())
    [System.IO.File]::WriteAllText($fp, $c, [System.Text.Encoding]::UTF8)
    $firstLine = ($c -split "`n", 2)[0]
    Write-Host "Fixed: $(Split-Path $fp -Leaf) -> [$firstLine]"
}
