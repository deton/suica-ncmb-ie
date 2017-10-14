$total = &"node" ncmbtransit.js
$shell = New-Object -ComObject Shell.Application
$ie = ($shell.Windows() | ?{$_.name -eq 'Internet Explorer' -and $_.LocationName -eq 'マイオフィス (国内出張旅費後精算)'})
$ie.Document.frames['bodys'].Document.forms[0].elements[21].value="$total"
