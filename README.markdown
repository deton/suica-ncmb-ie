# Suicaから出張費用をスマホで読み取って、PCで使う出張申請システムに反映

出張後に、乗り換え案内で調べて申請するのが面倒になったので作成。

* [スマホ用Suica読取・mBaaS送信アプリsuica2ncmb](suica2ncmb)
* [出張申請システムへの反映スクリプトncmb2ie](ncmb2ie)


```
Suica ---> suica2ncmb ---> NCMB mBaaS ---> ncmb2ie ---> 出張申請システム(MSIE)
```

## 拡張/改良案
* スマホ上アプリへのNCMB APIキー設定を、PC上に表示したQRコード等で行う

## 参考
* [出張申請システムへの反映bookmarklet](ncmbbookmarklet)。
  最初はbookmarkletで作成していたが、
  出張申請システムは、IEの互換表示を有効にしないと使えないが、
  ncmb.jsは互換表示が有効だと動作しないため断念。
