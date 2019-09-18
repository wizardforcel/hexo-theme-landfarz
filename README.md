# Hexo Theme: LandFarz

このテーマは、[LandFarz](https://github.com/wizardforcel/hexo-theme-landfarz.git)をぷらずまが自分用に改造したものです。

## 入手

```
git clone https://github.com/wizardforcel/hexo-theme-landfarz.git themes/landfarz
```

## 更新

```
cd themes/lanfarz
git pull
```

## 配置

`_config.yml`：

``` yaml
menu:
  Home: /
  Archives: /archives

sidebar: right

widgets:
- search
- category
- recent_posts
- tag
- tagcloud

links:
  - url: https://hogehoge
    title: hogefuga

# Duoshuo
duoshuo_shortname: 

fancybox: true

google_analytics:
rss: 
google_site_verification: 
baidu_site_verification: 
icon: 
```

+ `menu` - 上部メニュー
+ `sidebar` - サイドバー
+ `widgets` - サイドバーウィジェット
+ `duoshuo_shortname` - （中国のSNS向け機能なので消します）
+ `fancybox` - jQuery使っていい感じにポップアップ画像出すやつ？
+ `google_analytics` - Google Analytics ID
+ `rss` - rss
+ `google_site_verification` - googleのなんかのID？
+ `icon` - アイコン？

## ライセンス

[MIT License](LICENSE)