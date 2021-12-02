⚠ 注意
```
v1.0.0以前には、脆弱性があります。必ず最新のバージョンを利用してください。       
すでにダウンロード済みの場合、git pullを実行することでアップデートが可能です。
```

# Damare

DamareはDiscord読み上げBotです。    
Windowsでのみ動作して、Softalkに依存しています。

## YouTube紹介動画

[![](https://img.youtube.com/vi/kt_3HDIt3gQ/0.jpg)](https://www.youtube.com/watch?v=kt_3HDIt3gQ)

## 前提条件

- Windows
- Microsoft .NET Framework4.0
- Node.js
- Yarn

## 使い方

まずはこのリポジトリをクローンします

```bash
git clone https://github.com/Chipsnet/damare.git
```

リポジトリのディレクトリへ移動します

```bash
cd damare
```

依存関係をインストールします

```bash
yarn install
```

[Softalk](https://www.vector.co.jp/soft/winnt/art/se412443.html)をダウンロードして、解凍、中から出てきた `softalk` フォルダを `damare/softalk` に配置します。

`damare/softalk/SofTalk.exe` を実行し、環境設定を開きます。

![](https://i.gyazo.com/a19435f44264640bbc57a80038a4922d.png)

`録音`タブを開き、`録音時は読み上げを省略する`にチェックを入れます。

![](https://i.gyazo.com/e50302643ac4ca110999947dcf55ce91.png)

完了したらSoftalkを終了します。

[Discord Developer Portal](https://discord.com/developers/applications)にアクセスして、アプリケーションのトークンを取得します。

`damare/config.yml`を作成し、以下のように編集します。      
guildIdでは、使用するサーバーのIDを入力してください。       
prefixには、コマンドとして認識するための識別子を入力します。（例えばprefixに`;`を設定すると、コマンドは`;help`のようになります。）

```yml
token: token
useguild: guildId
prefix: ";"
```

以下のコマンドで実行します

```bash
yarn start
```

## Q&A

### Botが読み上げなくなった

内部エラーによりキューの処理が正常にされなかった可能性があります。      
`reset`コマンドを実行してみてください。それでも直らない場合は`stop`で一度停止してから`talk`で再度読み上げ開始してみてください。

それでも直らない場合はお手数ですがBotを再起動してください。

### Botを実行すると実行したPCがうるさい

使い方にある`録音時は読み上げを省略する`にチェックを入れたかどうか確認してください。

## お布施

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/A0A81VPXD)
