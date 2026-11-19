# 搜索频道

搜索频道是 CloudSaver 的基础搜索源：订阅公开的 TG 资源频道，即可在站内搜索 / 浏览其分享内容。

## 功能管理

管理员进入「**配置管理 → 搜索频道**」即可集中管理：

![搜索频道管理页](/screenshots/search-channels.png)

- **增删与排序**：拖动调整展示优先级，可启用 / 停用 / 删除频道
- **有效性检测**：单个或批量检测频道可达性，异常频道可重试
- **网络诊断**：分步检查代理配置、公共网络与 Telegram/t.me 连通性
- **导入 / 导出 / 复制配置**：方便迁移与分享频道列表
- 频道要求：仅支持**公开的**订阅频道；id 即频道链接最后一段（如 `t.me/xxxx` 中的 `xxxx`），名称可自定义

::: tip
频道过多会影响搜索与请求速度。硬件允许时，可在设置中调大**搜索最大并行请求数**（超过频道总数即为一次性并发请求）。
:::

## 批量导入频道列表

以下列表结合 [PanSou](https://github.com/fish2018/pansou) 项目整理的公开频道信息与历史频道配置（2025-08 全量检测有效版），共 125 个。使用频道管理页的「**导入配置**」选择**增量导入**（不影响现有配置），导入后可自行整理命名、排序或禁用不需要的频道。

::: details 展开频道配置 JSON（点击右上角复制）

```json
[
  {
    "name": "115网盘资源分享频道",
    "id": "Lsp115"
  },
  {
    "name": "阿里云盘发布频道",
    "id": "shareAliyun"
  },
  {
    "name": "夸克云盘综合资源",
    "id": "Quark_Movies"
  },
  {
    "name": "阿里云盘4K影视",
    "id": "Aliyun_4K_Movies"
  },
  {
    "name": "阿里云盘资源",
    "id": "zaihuayun"
  },
  {
    "name": "盘酱酱Club",
    "id": "PanjClub"
  },
  {
    "name": "天翼云盘资源频道",
    "id": "tianyirigeng"
  },
  {
    "name": "123云盘资源频道",
    "id": "xx123pan"
  },
  {
    "name": "123云盘综合频道",
    "id": "zyzhpd123"
  },
  {
    "name": "天翼云盘综合频道",
    "id": "tyypzhpd"
  },
  {
    "name": "奥斯卡4K蓝光（精品）影视磁力站",
    "id": "Oscar_4Kmovies"
  },
  {
    "name": "移动云盘资源分享",
    "id": "ydypzyfx"
  },
  {
    "name": "百度网盘综合频道",
    "id": "bdwpzhpd"
  },
  {
    "name": "阿里云盘吧",
    "id": "Q66share"
  },
  {
    "name": "百度网盘资源分享",
    "id": "BaiduCloudDisk"
  },
  {
    "name": "网盘资源收藏（移动云盘）",
    "id": "yunpan139"
  },
  {
    "name": "网盘资源收藏（UC网盘）",
    "id": "yunpanuc"
  },
  {
    "name": "热门短剧/擦边短剧/精选短剧/在线预览",
    "id": "duanjucabian"
  },
  {
    "name": "YOYO资源|夸克|短剧",
    "id": "yoyokuakeduanju"
  },
  {
    "name": "Shares_115_Channel",
    "id": "Channel_Shares_115"
  },
  {
    "name": "爷青回动画分享",
    "id": "yeqingjie_GJG666"
  },
  {
    "name": "迅雷云盘",
    "id": "gotopan"
  },
  {
    "name": "影巢",
    "id": "oneonefivewpfx"
  },
  {
    "name": "帧影时光",
    "id": "zhenyingsg"
  },
  {
    "name": "全网擦边｜电影｜资源分享",
    "id": "CBduanju"
  },
  {
    "name": "UC夸克百度迅雷资源分享",
    "id": "ucquark"
  },
  {
    "name": "短剧大全资源",
    "id": "weichengduanju666"
  },
  {
    "name": "影享空间",
    "id": "yingxiangkj"
  },
  {
    "name": "夸克网盘资源收藏夹",
    "id": "QuarkFree"
  },
  {
    "name": "综艺网盘资源频道",
    "id": "TG654TG"
  },
  {
    "name": "115影视资源分享频道",
    "id": "QukanMovie"
  },
  {
    "name": "leo资源(夸克)",
    "id": "leoziyuan"
  },
  {
    "name": "夸克（百草）",
    "id": "baicaoZY"
  },
  {
    "name": "综合(云盘影库)",
    "id": "yunpanx"
  },
  {
    "name": "夸克(网盘高分影视)",
    "id": "SharePanFilms"
  },
  {
    "name": "综合(UC网盘发)",
    "id": "ucwpzy"
  },
  {
    "name": "综合(肯德基の4K)",
    "id": "XiangxiuNBB"
  },
  {
    "name": "天翼影视原盘资源频道",
    "id": "tyysypzypd"
  },
  {
    "name": "懒狗集中营",
    "id": "vip115hot"
  },
  {
    "name": "天翼资源频道",
    "id": "txtyzy"
  },
  {
    "name": "学习频道",
    "id": "xxziliao"
  },
  {
    "name": "夸克(书籍)",
    "id": "BooksRealm"
  },
  {
    "name": "电影网盘分享",
    "id": "bdbdndn11"
  },
  {
    "name": "爱影115资源分享频道",
    "id": "pan115_share"
  },
  {
    "name": "学习频道2",
    "id": "sndkdkdl"
  },
  {
    "name": "网盘资源收藏(123云盘)",
    "id": "yp123pan"
  },
  {
    "name": "网盘资源收藏(迅雷云盘)",
    "id": "yunpanxunlei"
  },
  {
    "name": "天翼刮削资源分享",
    "id": "tianyifc"
  },
  {
    "name": "天翼-影链湾资源频道",
    "id": "peccxinpd"
  },
  {
    "name": "115网盘资源发布",
    "id": "ysxb48"
  },
  {
    "name": "123网盘(比比追更)",
    "id": "yingshifenxiang123"
  },
  {
    "name": "123网盘(112233)",
    "id": "zyfb123"
  },
  {
    "name": "123网盘(taoxgzy)",
    "id": "taoxgzy"
  },
  {
    "name": "wp123zy",
    "id": "wp123zy"
  },
  {
    "name": "yunpan189",
    "id": "yunpan189"
  },
  {
    "name": "yydf_hzl",
    "id": "yydf_hzl"
  },
  {
    "name": "Q_dongman",
    "id": "Q_dongman"
  },
  {
    "name": "movielover8888_film3",
    "id": "movielover8888_film3"
  },
  {
    "name": "Baidu_netdisk",
    "id": "Baidu_netdisk"
  },
  {
    "name": "D_wusun",
    "id": "D_wusun"
  },
  {
    "name": "FLMdongtianfudi",
    "id": "FLMdongtianfudi"
  },
  {
    "name": "QQZYDAPP",
    "id": "QQZYDAPP"
  },
  {
    "name": "安卓软件游戏破解资源分享",
    "id": "rjyxfx"
  },
  {
    "name": "PikPak_Share_Channel",
    "id": "PikPak_Share_Channel"
  },
  {
    "name": "btzhi",
    "id": "btzhi"
  },
  {
    "name": "newproductsourcing",
    "id": "newproductsourcing"
  },
  {
    "name": "yunpanNB",
    "id": "yunpanNB"
  },
  {
    "name": "kkdj001",
    "id": "kkdj001"
  },
  {
    "name": "xxzlzn",
    "id": "xxzlzn"
  },
  {
    "name": "pxyunpanxunlei",
    "id": "pxyunpanxunlei"
  },
  {
    "name": "jxwpzy",
    "id": "jxwpzy"
  },
  {
    "name": "夸克网盘动漫资源",
    "id": "kuakedongman"
  },
  {
    "name": "xiangnikanj",
    "id": "xiangnikanj"
  },
  {
    "name": "solidsexydoll",
    "id": "solidsexydoll"
  },
  {
    "name": "guoman4K",
    "id": "guoman4K"
  },
  {
    "name": "zdqxm",
    "id": "zdqxm"
  },
  {
    "name": "kduanju",
    "id": "kduanju"
  },
  {
    "name": "cilidianying",
    "id": "cilidianying"
  },
  {
    "name": "百度(书籍)",
    "id": "dzsgx"
  },
  {
    "name": "破解资源",
    "id": "qiuyuezt"
  },
  {
    "name": "bsbdbfjfjff",
    "id": "bsbdbfjfjff"
  },
  {
    "name": "MCPH01",
    "id": "MCPH01"
  },
  {
    "name": "MCPH02",
    "id": "MCPH02"
  },
  {
    "name": "MCPH03",
    "id": "MCPH03"
  },
  {
    "name": "jdjdn1111",
    "id": "jdjdn1111"
  },
  {
    "name": "MCPH086",
    "id": "MCPH086"
  },
  {
    "name": "hdhhd21",
    "id": "hdhhd21"
  },
  {
    "name": "Q66Share",
    "id": "Q66Share"
  },
  {
    "name": "douerpan",
    "id": "douerpan"
  },
  {
    "name": "baidu_yppan",
    "id": "baidu_yppan"
  },
  {
    "name": "Q_jilupian",
    "id": "Q_jilupian"
  },
  {
    "name": "Netdisk_Movies",
    "id": "Netdisk_Movies"
  },
  {
    "name": "yunpanquark",
    "id": "yunpanquark"
  },
  {
    "name": "Q_dianying",
    "id": "Q_dianying"
  },
  {
    "name": "domgmingapk",
    "id": "domgmingapk"
  },
  {
    "name": "dianying4k",
    "id": "dianying4k"
  },
  {
    "name": "tgbokee",
    "id": "tgbokee"
  },
  {
    "name": "ucshare",
    "id": "ucshare"
  },
  {
    "name": "godupan",
    "id": "godupan"
  },
  {
    "name": "gokuapan",
    "id": "gokuapan"
  },
  {
    "name": "tgsearchers7",
    "id": "tgsearchers7"
  },
  {
    "name": "wpan8",
    "id": "wpan8"
  },
  {
    "name": "yy80986098",
    "id": "yy80986098"
  },
  {
    "name": "ciliziyuanku",
    "id": "ciliziyuanku"
  },
  {
    "name": "jzmm_123pan",
    "id": "jzmm_123pan"
  },
  {
    "name": "gimy115",
    "id": "gimy115"
  },
  {
    "name": "WFYSFX03",
    "id": "WFYSFX03"
  },
  {
    "name": "gimy100",
    "id": "gimy100"
  },
  {
    "name": "gimy115iso",
    "id": "gimy115iso"
  },
  {
    "name": "aliyunys",
    "id": "aliyunys"
  },
  {
    "name": "clouddriveresources",
    "id": "clouddriveresources"
  },
  {
    "name": "XunLeiPinDao",
    "id": "XunLeiPinDao"
  },
  {
    "name": "a123fxme",
    "id": "a123fxme"
  },
  {
    "name": "WPpindao",
    "id": "WPpindao"
  },
  {
    "name": "kuyupan",
    "id": "kuyupan"
  },
  {
    "name": "djya5",
    "id": "djya5"
  },
  {
    "name": "yingshiziyuanpindao",
    "id": "yingshiziyuanpindao"
  },
  {
    "name": "zh_vip",
    "id": "zh_vip"
  },
  {
    "name": "pan_guangya",
    "id": "pan_guangya"
  },
  {
    "name": "gdsharing",
    "id": "gdsharing"
  },
  {
    "name": "kuakenetpan",
    "id": "kuakenetpan"
  },
  {
    "name": "kelea555",
    "id": "kelea555"
  },
  {
    "name": "tianyiyunpanpindao",
    "id": "tianyiyunpanpindao"
  },
  {
    "name": "PikPakShareChannel",
    "id": "PikPakShareChannel"
  },
  {
    "name": "ayzgzf",
    "id": "ayzgzf"
  }
]
```

:::

## 来源说明与致谢

- 以上频道源引用了开源项目 [PanSou](https://github.com/fish2018/pansou) 中整理的部分公开信息数据
- 所有数据均来源于互联网公开可获取的内容，仅用于学习与研究目的
- 感谢 PanSou 项目作者 [fish2018](https://github.com/fish2018) 与提供搜索频道的朋友；若该引用与原作者意愿不符，请通过 Issue 联系，我们将及时移除

## 目前支持抓取的网盘类型

百度网盘、夸克网盘、115 云盘、天翼云盘、阿里云盘、123 云盘、移动云盘、迅雷云盘、UC 网盘、光鸢盘、HDHive，以及磁力（Magnet）与 ED2K 链接。其中**夸克、115、天翼、123** 支持一键转存，其余类型可点击资源标题跳转原始页面。

[![网盘支持范围：夸克、115、天翼、123 支持一键转存；其他列出的网盘链接支持识别与跳转；磁力和 ED2K 支持提取与复制](/diagrams/cloud-drive-support.webp)](/diagrams/cloud-drive-support.png)

点击图片可查看高清原图。
