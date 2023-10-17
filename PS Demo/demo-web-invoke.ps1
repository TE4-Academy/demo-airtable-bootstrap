# Ange URL:en till webbplatsen
$url = 'https://huddinge.se'

# Skicka en GET-förfrågan till webbplatsen och få svaret
$response = Invoke-WebRequest -Uri $url

# Hämta DOM-objektet
$dom = $response.ParsedHtml

# Nu kan vi skapa en Markdown-fil och sammanställa informationen
$markdownContent = @()

# Hämta och skriv ut alla h1 och h2 rubriker
$headings = $dom.getElementsByTagName('h1') + $dom.getElementsByTagName('h2')
foreach ($heading in $headings) {
    $markdownContent += "# $($heading.innerText)"
}

# Hämta och skriv ut alla stycken
$paragraphs = $dom.getElementsByTagName('p')
foreach ($paragraph in $paragraphs) {
    $markdownContent += $paragraph.innerText
}

# Hämta och skriv ut alla länkar
$links = $dom.getElementsByTagName('a')
foreach ($link in $links) {
    $markdownContent += "- [$($link.innerText)]($($link.href))"
}

# Kombinera allt till en enda sträng
$markdownText = $markdownContent -join "`n`n"

# Skriv ut markdown-innehållet till en fil
$markdownText | Out-File -FilePath 'huddinge.md'
