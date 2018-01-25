$total = &"node" ncmbtransit.js
$shell = New-Object -ComObject Shell.Application
$ie = ($shell.Windows() | ?{$_.name -eq 'Internet Explorer' -and $_.LocationName -like 'マイオフィス (国内出張*精算)'})
$ie.Document.frames['bodys'].Document.forms[0].elements[21].value="$total"
