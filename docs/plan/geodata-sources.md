# 真实地理数据源实测结果

| 数据源 | URL | 实测 | 备注 |
|---|---|---|---|
| 杭州市边界 (DataV镜像, 已知基线) | https://raw.githubusercontent.com/Civitasv/DataV_GeoJSON/master/geojson/city/330100.json | 200, 38106 B | 复测通过。杭州市级边界 FeatureCollection。注意该 repo 无 330100_full.json（city_full/ 与 city/ 下均 404），拿不到一次性含全部区县的文件。 |
| 西湖区边界 (GeoMapData_CN) | https://raw.githubusercontent.com/lyhmyd1211/GeoMapData_CN/master/county/330106.json | 200, 11555 B | 已打开确认：标准 FeatureCollection，properties 含 adcode/name(西湖区)/center/centroid，geometry 为 MultiPolygon。同目录 county/330102.json  |
| 西湖区边界 (Vonng/adcode fences, 高精度) | https://raw.githubusercontent.com/Vonng/adcode/master/data/fences/330106.json | 200, 30656 B | 已确认为裸 Polygon geometry（无 Feature 包装，需自行包一层），坐标密度约为 GeoMapData_CN 的 3 倍。330102 同样 200 (5603 B)。 |
| 西湖区边界 (dataease 镜像, 需 commit sha) | https://raw.githubusercontent.com/dataease/dataease/e46e25f426f7c5d6936d30b33b2183cb50e8ddfc/mapFiles/156/156330106.json | 200, 10783 B | FeatureCollection 西湖区 MultiPolygon。main 分支该路径已 404，必须带上面的 commit sha 才能取到。备用。 |
| 西湖区边界 (OSM relation 4591410) | https://raw.githubusercontent.com/missinglink/osm-boundaries/master/data/004/591/410/004591410.geojson | 200, 3076 B | OSM 行政边界导出，Feature + Polygon，含 name:zh/wikidata 标签，精度较低(简化)。可作 OSM 口径的对照源。 |
| 西湖真实水体多边形 (maptalks demo, OSM 导出) | https://raw.githubusercontent.com/maptalks/maptalks.three/master/demo/data/westlake.geojson | 200, 38474 B | 本次最佳命中。已打开确认：单 Feature MultiPolygon，properties {name:'西湖', osm_id:'2308774', fclass:'water'}，bbox 120.119~120.158 / 30.2 |
| 西湖风景区粗略范围 (maptalks demo) | https://raw.githubusercontent.com/maptalks/maptalks.three/master/demo/data/west-lake-area.geojson | 200, 720 B | 单个粗略 Polygon，bbox 119.93~120.19 / 30.13~30.29，是景区大致圈定范围而非水体，价值低，仅可做遮罩。同 repo 的 nanshan-road*.geojson 实为深圳南山(113.9E,22.5N |
| 钱塘江矢量线 (Natural Earth 10m rivers) | https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_rivers_lake_centerlines.geojson | 200, 7307743 B (7.3MB) | 已解析确认：含 name='Fuchun'(富春江—钱塘江同一水道) River LineString，82 点，bbox 117.79~120.16 / 29.48~30.20，末端到达杭州市区江段。精度粗(10m 级)但为真实河道走向， |
| 京杭大运河矢量线 (历史水系教学数据, CHGIS 简化) | https://raw.githubusercontent.com/weponusa/teachany-courseware/d8e08ca9b169b24cb0dbfc64ef37bfcf9f29c301/assets/maps/details/rivers-historical.geojson | 200, 5170 B | 已解析确认：含 '京杭大运河·元代取直后'(13 点 LineString, 南端 ~120.2E,30.3N 即杭州) 与 '隋唐大运河·江南河'(5 点, 119.4~120.6/30.3~32.4)，另有黄河历代故道。声明基于 CHG |
| 330106 (mumuy/data_location) | https://raw.githubusercontent.com/mumuy/data_location/master/code/330106.json | 200, 319 B | 命中但无用：仅为街道 adcode->名称字典（北山街道/西湖街道...），无任何几何。 |
| DataV 官方接口 (geo.datav.aliyun.com) | https://geo.datav.aliyun.com/areas_v3/bound/330106.json | 000 (代理拦截, 连接失败) | areas_v3/bound/330100_full.json 同样 000。此路不通，只能走 GitHub 镜像。 |
| ljtyduyu/DataWarehouse 省级地图 | https://raw.githubusercontent.com/ljtyduyu/DataWarehouse/master/map/geometryProvince/33.json | 404, 14 B | 路径不存在。echarts 官方 repo 的 map/json/province/zhejiang.json 也 404（echarts 4.9 后已移除地图数据）。 |
| Overpass / OSM API / Nominatim / polygons.osm.fr / maps.wikimedia.org | https://overpass-api.de/api/interpreter | 000 (全部被代理拦截) | overpass-api.de、overpass.kumi.systems、api.openstreetmap.org、nominatim.openstreetmap.org、polygons.openstreetmap.fr、maps.w |
| 南宋临安城/古城墙矢量 | https://github.com/search?q=%E4%B8%B4%E5%AE%89%E5%9F%8E+geojson | 未找到 (GitHub code search 仅 2 条无关命中) | GitHub 上不存在可用的临安城墙开源矢量。建议：以 rivers-historical.geojson 的思路，从文献底图手工描 10~20 个点自建简化城墙线，或本期放弃该图层。 |

## 推荐

推荐组合（全部实测 200、内容已打开验证）：1) 区县边界主用 lyhmyd1211/GeoMapData_CN 的 county/{adcode}.json（标准 FeatureCollection，带 adcode/name/centroid，按 330102~330114 循环拉取，与已用的 330100.json 市界同风格）；若需更高精度轮廓，换 Vonng/adcode 的 data/fences/{adcode}.json（点密度约 3 倍，但为裸 geometry 需自行包 Feature）。2) 西湖水体必用 maptalks/maptalks.three 的 demo/data/westlake.geojson——OSM 真实西湖多边形（osm_id 2308774），38KB 可直接渲染，是本次最有价值的发现。3) 钱塘江用 Natural Earth ne_10m_rivers_lake_centerlines.geojson 中 name='Fuchun' 的 River 要素（即富春江—钱塘江干流，末端抵杭州 120.16E/30.2N），下载 7.3MB 后按杭州 bbox 裁剪出该线单独存储，避免运行时拉大文件。4) 京杭大运河用 weponusa/teachany-courseware 的 rivers-historical.geojson 中'京杭大运河·元代取直后'与'江南河'两条 LineString——虽是示意精度，但自带朝代 period 属性，与'时迹'的历史叙事天然匹配；如需城区内运河细节，因 Overpass/OSM API 全被拦截，本环境无法获取，建议接受示意线或手工加密杭州段节点。5) 古城墙/临安城无现成开源矢量，建议手工数字化或本期跳过。注意事项：geo.datav.aliyun.com 与整个 OSM 官方生态（overpass/nominatim/api.osm.org/maps.wikimedia.org）在本环境均不可达，所有数据获取应固定走 raw.githubusercontent.com，且 dataease 镜像必须带 commit sha。
