> ⚠ 注意       
> v1.0.0以前には、脆弱性があります。必ず最新のバージョンを利用してください。       
> すでにダウンロード済みの場合、git pullを実行することでアップデートが可能です。

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

## LICENSE

### [HTS Voice "NIT ATR503 M001" version 1.05](https://sourceforge.net/projects/open-jtalk/files/HTS%20voice/hts_voice_nitech_jp_atr503_m001-1.05/)

This work is licensed under the [Creative Commons Attribution 3.0 license.](https://creativecommons.org/licenses/by/3.0/deed.ja)

<details><summary>LICENSE</summary><div>

```txt
===============================================================================
                   HTS Voice "NIT ATR503 M001" version 1.05
                           release December 25, 2012


HTS voice trained by using the Nitech Japanese Speech Database "NIT ATR503
M001" is released as a part of Open JTalk (http://open-jtalk.sourceforge.net/).
This voice consists of HMMs trained by using HMM-based Speech Synthesis System
(HTS) version 2.3 alpha (http://hts.sp.nitech.ac.jp/).

*******************************************************************************
                                    Copying
*******************************************************************************

# ----------------------------------------------------------------- #
#           HTS Voice "NIT ATR503 M001"                             #
#           released by HTS Working Group                           #
#           http://open-jtalk.sourceforge.net/                      #
# ----------------------------------------------------------------- #
#                                                                   #
#  Copyright (c) 2003-2012  Nagoya Institute of Technology          #
#                           Department of Computer Science          #
#                                                                   #
#                2003-2008  Tokyo Institute of Technology           #
#                           Interdisciplinary Graduate School of    #
#                           Science and Engineering                 #
#                                                                   #
# Some rights reserved.                                             #
#                                                                   #
# This work is licensed under the Creative Commons Attribution 3.0  #
# license.                                                          #
#                                                                   #
# You are free:                                                     #
#  * to Share - to copy, distribute and transmit the work           #
#  * to Remix - to adapt the work                                   #
# Under the following conditions:                                   #
#  * Attribution - You must attribute the work in the manner        #
#    specified by the author or licensor (but not in any way that   #
#    suggests that they endorse you or your use of the work).       #
# With the understanding that:                                      #
#  * Waiver - Any of the above conditions can be waived if you get  #
#    permission from the copyright holder.                          #
#  * Public Domain - Where the work or any of its elements is in    #
#    the public domain under applicable law, that status is in no   #
#    way affected by the license.                                   #
#  * Other Rights - In no way are any of the following rights       #
#    affected by the license:                                       #
#     - Your fair dealing or fair use rights, or other applicable   #
#       copyright exceptions and limitations;                       #
#     - The author's moral rights;                                  #
#     - Rights other persons may have either in the work itself or  #
#       in how the work is used, such as publicity or privacy       #
#       rights.                                                     #
#  * Notice - For any reuse or distribution, you must make clear to #
#    others the license terms of this work. The best way to do this #
#    is with a link to this web page.                               #
#                                                                   #
# See http://creativecommons.org/ for details.                      #
# ----------------------------------------------------------------- #

See also "COPYING" file in the current directory for details.

*******************************************************************************
                                 Installation
*******************************************************************************

See "INSTALL" in the same directory for details.

*******************************************************************************
                               Acknowledgements
*******************************************************************************

Keiichi Tokuda
Shinji Sako
Heiga Zen
Keiichiro Oura

*******************************************************************************
                                  Who we are
*******************************************************************************

The HTS working group is a voluntary group for developing the HMM-Based Speech
Synthesis System. Current members are

 Keiichi Tokuda      http://www.sp.nitech.ac.jp/~tokuda/
 (Produce and Design)
 Keiichiro Oura      http://www.sp.nitech.ac.jp/~uratec/
 (Design and Development, Main Maintainer)
 Kei Hashimoto       http://www.sp.nitech.ac.jp/~bonanza/
 Sayaka Shiota       http://www.sp.nitech.ac.jp/~sayaka/
 Shinji Takaki       http://www.sp.nitech.ac.jp/~k-prr44/
 Heiga Zen
 Junichi Yamagishi   http://homepages.inf.ed.ac.uk/jyamagis/
 Tomoki Toda         http://spalab.naist.jp/~tomoki/index_e.html
 Takashi Nose
 Shinji Sako         http://www.mmsp.nitech.ac.jp/~sako/
 Alan W. Black       http://www.cs.cmu.edu/~awb/

and the members are dynamically changing. The current formal contact address of
HTS working group and a mailing list for HTS users can be found at
http://hts.sp.nitech.ac.jp/
===============================================================================
```
</div></details><summary>