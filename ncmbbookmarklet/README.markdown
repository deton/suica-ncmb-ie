# 出張申請システムへの反映bookmarklet

最初はbookmarkletで作成していたが、
出張申請システムは、IEの互換表示を有効にしないと使えないが、
ncmb.jsは互換表示が有効だと動作しないため断念。

また、ツールバー非表示でウィンドウが開かれると、
ツールバー上bookmarkletボタンが押せないので、
ウィンドウが開かれる前に、
同名のウィンドウを別のbookmarkletを手で実行して開いておく手間も必要。

## ファイルリスト
* getds.js: 出張費用のフィールドに出張費用の値を反映するbookmarklet

## bookmarklet
ncmb.min.jsとgetds.jsを挿入するbookmarklet:
```
<a href="javascript:(function(){function%20L(a,d,s){if(a.length>0){d=document;s=d.createElement('script');s.src='http://localhost:8000/'+a.shift();s.onload=function(){L(a)};d.body.appendChild(s)}}L(['ncmb.min.js','getds.js'])})()">NCMBから値取得</a>
```

ncmb.min.jsとgetds.jsを挿入するbookmarklet(IE互換表示用):
```
<a href="javascript:(function(){function%20L(a,d,s){if(a.length>0){d=document;s=d.createElement('script');s.src='http://localhost:8000/'+a.shift();s.onreadystatechange=function(){if(this.readyState=='loaded'||this.readyState=='complete')L(a)};d.body.appendChild(s)}}L(['ncmb.min.js','getds.js'])})()">NCMBから値取得</a>
```

ツールバー付きで特定の名前のウィンドウを開いておくためのbookmarklet:
```
<a href='javascript:window.open("about:blank","SBWD","menubar=1,toolbar=1")'>open SBWD win</a>
```
