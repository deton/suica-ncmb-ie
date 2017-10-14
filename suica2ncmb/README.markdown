# スマホ用Suica読取・mBaaS送信アプリsuica2ncmb

[Cordova](http://cordova.io)を使ったハイブリッドアプリ。

Suica読み取りを、[cordova-plugin-suicareader](https://github.com/deton/cordova-plugin-suicareader) で行って、
ユーザが選択した履歴を合計して出張費用を算出して、NCMB mBaaSに送信。

### 準備
[ニフクラmobile backend](http://mb.cloud.nifty.com)(NCMB)でNCMBアプリ作成
(注意:無料のBasicプランの場合、1か月使わないとNCMBアプリが削除されます)。

NCMBへの初回送信時に、NCMB APIキーの設定が必要です。
一度設定したらlocalStorageに保存します。

### 使い方
* suica2ncmbアプリ起動後、履歴が表示されるまでSuicaをスマホにかざす
* 送信する履歴をチェックボックスで選択した後、送信ボタンを押してNCMBに送信

### 備考
* NFCカード検出音が鳴った後、カードをすぐに離すとSuica履歴を読み取れない場合あり。
* ARROWS系端末は充電中はNFCカード読み取り不可
