$total = &"node" ncmbtransit.js
$shell = New-Object -ComObject Shell.Application
$ie = ($shell.Windows() | ?{$_.name -eq 'Internet Explorer' -and $_.LocationName -eq '�}�C�I�t�B�X (�����o������㐸�Z)'})
$ie.Document.frames['bodys'].Document.forms[0].elements[21].value="$total"
