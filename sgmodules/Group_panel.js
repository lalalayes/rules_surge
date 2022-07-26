/*
 * 由@fishingworld编写
 * 原脚本地址：https://raw.githubusercontent.com/fishingworld/something/main/groupPanel.js
 * 由@Rabbit-Spec修改
 * 更新日期：2022.06.16
 * 版本：1.9
示例↓↓↓ 
----------------------------------------
[Panel]
Group-Panel = script-name=Group-Panel,update-interval=1
[Script]
Group-Panel = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/fishingworld/something/main/groupPanel.js,argument=icon=network&color=#86abee&group=Master
  对应参数：
	icon：图标
	color：图标颜色
	group：策略组名称
*/

;(async () => {

let params = getParams($argument);
let group=params.group;
let proxy = await httpAPI("/v1/policy_groups");
let groupName = (await httpAPI("/v1/policy_groups/select?group_name="+encodeURIComponent(group)+"")).policy;
var proxyName= [];
let arr = proxy[""+group+""];
let allGroup = [];

for (var key in proxy){
   allGroup.push(key)
    }


for (let i = 0; i < arr.length; ++i) {
proxyName.push(arr[i].name);
}

let index;

for(let i = 0;i < proxyName.length; ++i) {
	if(groupName==proxyName[i]){
index=i
	}
};

if($trigger == "button"){
index += 1;

if(index>arr.length-1){
	index = 0;
	}
$surge.setSelectGroupPolicy(group, proxyName[index]);

};

let name =proxyName[index];
let secondName;
let rootName = name;
if(allGroup.includes(rootName)==true){
	secondName = (await httpAPI("/v1/policy_groups/select?group_name="+encodeURIComponent(rootName)+"")).policy;
	name = '策略：' + name + '\n' + '节点：' + secondName
}

while(allGroup.includes(rootName)==true){
	rootName = (await httpAPI("/v1/policy_groups/select?group_name="+encodeURIComponent(rootName)+"")).policy;
}

if(arr[index].isGroup==true && secondName!= rootName){
name='策略：' + name + '\n' + '节点：' + rootName;
}
	
	
let url = "http://ip-api.com/json/?lang=zh-CN"

$httpClient.get(url, function(error, response, data){
    let jsonData = JSON.parse(data)
    let country = jsonData.country
    let emoji = getFlagEmoji(jsonData.countryCode)
    let city = jsonData.city
    let isp = jsonData.isp
    let ip = jsonData.query
   $done({
      title:group,
      content:name+`IP信息：${ip}\n运营商：${isp}\n所在地：${emoji}${country} - ${city}`,
      icon: params.icon,
		"icon-color":params.color
    });
});

   
})();


function httpAPI(path = "", method = "GET", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
};

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}
