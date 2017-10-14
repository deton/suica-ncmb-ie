# 出張申請システムへの反映スクリプトncmb2ie

スマホ用Suica読取・mBaaS送信アプリsuica2ncmbが、
NCMB mBaaSに送信・保存した出張費用をnode.jsで取得して、
事前にIEで開いておいた出張申請システム画面の出張費用のフィールドに、
PowerShellを使って反映させます。

## 準備
* ncmb2ie.bat内の、NCMB APIキーや、HTTP proxyサーバの値を設定
* `npm i`を実行してNCMB SDKインストール

## 使い方
* 出張申請システムにログインし、出張費用入力フィールドが表示された状態にする
* ncmb2ie.batを実行

## ファイルリスト
* ncmb2ie.bat: 全体制御用バッチファイル。proxyやNCMB APIキー設定。
* ie.ps1: ncmbtransit.jsを実行して出張費用を取得し、
  出張申請システムの画面を開いているIEウィンドウを特定して、
  出張費用のフィールドに出張費用の値を反映するPowerShellスクリプト
* ncmbtransit.js: NCMBから出張費用を取得してstdoutに表示するnode.jsスクリプト

## 拡張/改良案
* 合計の出張費用だけの反映でなく、出張日や出張先の自動入力
* node.jsとPowerShell両方が必要な点の改良
    * PowerShellでNCMBアクセス
    * node.jsでIE制御(Edge.jsやnode-win32oleを利用)
    * JScriptでNCMBアクセスとIE制御
