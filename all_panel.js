#!name=all_panel
#!desc=all and all
[Script]
//surge pro
functionstatus = type=generic, script-path= https://raw.githubusercontent.com/lalalayes/rules_surge/main/surgepro

#網路詳情 标题显示为根节点名
#NET_info = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/TributePaulWalker/Profiles/main/JavaScript/Surge/ipcheck.js,argument=icon=externaldrive.connected.to.line.below&color=#9a7ff7&group=𝐏𝐫𝐨𝐱𝐲
net-info-panel=type=generic,timeout=10,script-path=https://raw.githubusercontent.com/ventusyu/ventus/main/Panel/Net-info-panel.js

#流量统计 点击以切换网络界面
TrafficStatistics = type=generic,timeout=10,script-path= https://raw.githubusercontent.com/fishingworld/something/main/PanelScripts/trafficstatistics.js ,argument=icon=arrow.up.arrow.down.circle&color=#5d84f8

# 流媒体解锁检测
stream-all = type=generic, timeout=15, script-path=https://raw.githubusercontent.com/LucaLin233/Luca_Conf/main/Surge/JS/stream-all.js

//dns
刷新DNS = type=generic,timeout=3,script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/asset/flushDNS.js,argument=title=𝐓𝐞𝐬𝐭 𝐋𝐚𝐭𝐞𝐧𝐜𝐲&icon=arrow.clockwise.heart&color=# ffccff&server=false



[Panel]
#Surge 标题,可显示启动时间,点击刷新为重载配置
functionstatus = script-name=functionstatus, title="Surge", content="请刷新", update-interval=60

# 网络详情
net-info-panel=title="网络状态",content="请刷新",style=info,script-name=net-info-panel,update-interval=3600

# 流媒体解锁检测
stream-all = script-name=stream-all, title="流媒体解锁检测", content="请刷新面板", update-interval=600

#流量统计
TrafficStatistics = script-name=TrafficStatistics,update-interval=1

//dns
刷新DNS = script-name=刷新DNS,update-interval=1


[MITM]
hostname = %APPEND% e.189.cn:443