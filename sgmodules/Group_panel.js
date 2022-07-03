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
let groupName = (await httpAPI("/v1/policy_groups/select?group_name="+🇺🇸 US+"")).policy;
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
	secondName = (await httpAPI("/v1/policy_groups/select?group_name="+🇺🇸 US+"")).policy;
	name = '策略：' + name + '\n' + '节点：' + secondName
}

while(allGroup.includes(rootName)==true){
	rootName = (await httpAPI("/v1/policy_groups/select?group_name="+🇺🇸 US+"")).policy;
}

if(arr[index].isGroup==true && secondName!= rootName){
name='策略：' + name + '\n' + '节点：' + rootName;
}

    $done({
      title:group,
      content:name,
      icon: params.icon,
		"icon-color":params.color
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
