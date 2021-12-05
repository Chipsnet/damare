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

### Softalkを使用する場合

以下の手順に従って、Softalkをセットアップします。

<details><summary>Softalkのセットアップ手順</summary>

## 対象デバイス

- Windows

## 手順

このソフトウェアにはSoftalkが含まれていないので、まずはインストールします。
[Softalk](https://www.vector.co.jp/soft/winnt/art/se412443.html)をダウンロードして、解凍、中から出てきた `softalk` フォルダを `damare/softalk` に配置します。

`damare/softalk/SofTalk.exe` を実行し、環境設定を開きます。

![](https://i.gyazo.com/a19435f44264640bbc57a80038a4922d.png)

`録音`タブを開き、`録音時は読み上げを省略する`にチェックを入れます。

![](https://i.gyazo.com/e50302643ac4ca110999947dcf55ce91.png)

完了したらSoftalkを終了します。
</details>

### OpenJTalkを使用する場合

以下の手順に従って、OpenJTalkをセットアップします。

<details><summary>OpenJTalkのセットアップ手順</summary>

## 対象デバイス

- Linux
- Windows
- Mac

## 手順

### Linuxの場合

Ubuntuでは、以下のようにしてOpenJTalkをインストールします。

```sh
sudo apt install open-jtalk
```

Ubuntu以外でも同様にOpenJTalkをインストールします。

### Windowsの場合

[Windowsで音声合成Open JTalk \- Qiita](https://qiita.com/mkgask/items/0bf9c26dc96e7b0b45ac)

こちらの記事を参考に、OpenJTalkをインストールします。

その後、OpenJTalkのフォルダにパスを通します。

### Macの場合

Homebrewインストール環境下で

```sh
brew install open-jtalk
```

と実行して、OpenJTalkをインストールします。

</details>

### 設定ファイル

`damare/config.yml`を作成し、以下のように編集します。<br>
#### `token`
[Discord Developer Portal](https://discord.com/developers/applications)にアクセスして、取得したアプリケーションのトークンを貼り付けてください
#### `guildId`
使用するサーバーのIDを入力してください。<br>
#### `prefix`
コマンドとして認識するための識別子を入力します。（例えば`prefix`に`;`を設定すると、Discord内でコマンドを使用する際に`;help`のようになります。）
#### `voiceclient`
Damareが使用する音声合成エンジンを指定します。<br>
| config | Engine    | Available                |
|--------|-----------|--------------------------|
| 1      | Softalk   | Windows                  |
| 2      | OpenJTalk | Mac/Winodws/Linux/Docker |

__Mac/Linux/Dockerの場合は必ず`2`を指定してください__<br>
指定しなかった場合は自動的にSoftalkが使用されます。

```yml
token: token
useguild: guildId
prefix: ";"
voiceclient: 1 #Softalk(Windows): 1 / OpenJTalk(Mac/Windows/Linux/Docker): 2
```

Dockerを使用していない場合は、以下のコマンドで実行します

```bash
yarn start
```

## Dockerを使用する場合
リポジトリをクローンします
```bash
git clone https://github.com/Chipsnet/damare.git
```

リポジトリのディレクトリへ移動します
```bash
cd damare
```

[設定ファイル](#設定ファイル)にもとづいて設定します。

Dockerイメージをビルドします。
```bash
docker build -t damare .
```
Dockerコンテナを`-d`デーモンとして起動します。
```bash
docker run -d damare
```
以下のコマンドを打つとDamareコンテナ内のログを見ることができます。
```bash
docker logs (docker run後に表示されたuid)
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

## ライセンス

このソフトウェアに含まれるボイスデータや辞書データなどのライセンスを記載しています。

### [HTS Voice "NIT ATR503 M001" version 1.05](https://sourceforge.net/projects/open-jtalk/files/HTS%20voice/hts_voice_nitech_jp_atr503_m001-1.05/)

This work is licensed under the [Creative Commons Attribution 3.0 license.](https://creativecommons.org/licenses/by/3.0/deed.ja)

<details><summary>LICENSE</summary>

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
</details>

### [open_jtalk_dic_utf_8-1.11](https://sourceforge.net/projects/open-jtalk/files/Dictionary/open_jtalk_dic-1.11/)

Copyright (c) 2009, Nara Institute of Science and Technology, Japan.

All rights reserved.

<details><summary>LICENSE</summary>

```txt
Copyright (c) 2009, Nara Institute of Science and Technology, Japan.

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.
Neither the name of the Nara Institute of Science and Technology
(NAIST) nor the names of its contributors may be used to endorse or
promote products derived from this software without specific prior
written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Copyright (c) 2011-2017, The UniDic Consortium
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

 * Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the
   distribution.

 * Neither the name of the UniDic Consortium nor the names of its
   contributors may be used to endorse or promote products derived
   from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/* ----------------------------------------------------------------- */
/*           The Japanese TTS System "Open JTalk"                    */
/*           developed by HTS Working Group                          */
/*           http://open-jtalk.sourceforge.net/                      */
/* ----------------------------------------------------------------- */
/*                                                                   */
/*  Copyright (c) 2008-2016  Nagoya Institute of Technology          */
/*                           Department of Computer Science          */
/*                                                                   */
/* All rights reserved.                                              */
/*                                                                   */
/* Redistribution and use in source and binary forms, with or        */
/* without modification, are permitted provided that the following   */
/* conditions are met:                                               */
/*                                                                   */
/* - Redistributions of source code must retain the above copyright  */
/*   notice, this list of conditions and the following disclaimer.   */
/* - Redistributions in binary form must reproduce the above         */
/*   copyright notice, this list of conditions and the following     */
/*   disclaimer in the documentation and/or other materials provided */
/*   with the distribution.                                          */
/* - Neither the name of the HTS working group nor the names of its  */
/*   contributors may be used to endorse or promote products derived */
/*   from this software without specific prior written permission.   */
/*                                                                   */
/* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND            */
/* CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,       */
/* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF          */
/* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE          */
/* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS */
/* BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,          */
/* EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED   */
/* TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,     */
/* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON */
/* ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,   */
/* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY    */
/* OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE           */
/* POSSIBILITY OF SUCH DAMAGE.                                       */
/* ----------------------------------------------------------------- */
```
</details>

### [open_jtalk_dic_shift_jis-1.11](https://sourceforge.net/projects/open-jtalk/files/Dictionary/open_jtalk_dic-1.11/)

Copyright (c) 2009, Nara Institute of Science and Technology, Japan.

All rights reserved.

<details><summary>LICENSE</summary>

```txt
Copyright (c) 2009, Nara Institute of Science and Technology, Japan.

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.
Neither the name of the Nara Institute of Science and Technology
(NAIST) nor the names of its contributors may be used to endorse or
promote products derived from this software without specific prior
written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Copyright (c) 2011-2017, The UniDic Consortium
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

 * Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the
   distribution.

 * Neither the name of the UniDic Consortium nor the names of its
   contributors may be used to endorse or promote products derived
   from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/* ----------------------------------------------------------------- */
/*           The Japanese TTS System "Open JTalk"                    */
/*           developed by HTS Working Group                          */
/*           http://open-jtalk.sourceforge.net/                      */
/* ----------------------------------------------------------------- */
/*                                                                   */
/*  Copyright (c) 2008-2016  Nagoya Institute of Technology          */
/*                           Department of Computer Science          */
/*                                                                   */
/* All rights reserved.                                              */
/*                                                                   */
/* Redistribution and use in source and binary forms, with or        */
/* without modification, are permitted provided that the following   */
/* conditions are met:                                               */
/*                                                                   */
/* - Redistributions of source code must retain the above copyright  */
/*   notice, this list of conditions and the following disclaimer.   */
/* - Redistributions in binary form must reproduce the above         */
/*   copyright notice, this list of conditions and the following     */
/*   disclaimer in the documentation and/or other materials provided */
/*   with the distribution.                                          */
/* - Neither the name of the HTS working group nor the names of its  */
/*   contributors may be used to endorse or promote products derived */
/*   from this software without specific prior written permission.   */
/*                                                                   */
/* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND            */
/* CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,       */
/* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF          */
/* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE          */
/* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS */
/* BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,          */
/* EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED   */
/* TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,     */
/* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON */
/* ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,   */
/* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY    */
/* OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE           */
/* POSSIBILITY OF SUCH DAMAGE.                                       */
/* ----------------------------------------------------------------- */

```
</details>

### [HTS Voice "Mei"](https://sourceforge.net/projects/mmdagent/files/MMDAgent_Example/MMDAgent_Example-1.8/)

This work is licensed under the [Creative Commons Attribution 3.0 license.](https://creativecommons.org/licenses/by/3.0/deed.ja)

<details><summary>LICENSE</summary>

```
# ----------------------------------------------------------------- #
#           HTS Voice "Mei"                                         #
#           released by MMDAgent Project Team                       #
#           http://www.mmdagent.jp/                                 #
# ----------------------------------------------------------------- #
#                                                                   #
#  Copyright (c) 2009-2018  Nagoya Institute of Technology          #
#                           Department of Computer Science          #
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

```
</details>
