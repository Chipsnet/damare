# Damare

DamareはDiscord読み上げBotです。    
Windowsでのみ動作して、Softalkに依存しています。

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

[Discord Developer Portal](https://discord.com/developers/applications)にアクセスして、アプリケーションのトークンを取得します。

`damare/config.yml` を作成し、以下のように編集します。      
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

## お布施

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/A0A81VPXD)