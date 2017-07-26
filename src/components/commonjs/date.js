export function myformatDate(date,fmt){
	if(/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
	}
	let o ={
		"M+" : date.getMonth()+1,
		"d+" : date.getDate(),
		"h+" : date.getHours(),
		"m+" : date.getMinutes(),
		"s+" : date.getSeconds()
	}
	for(let k in o){
		if(new RegExp(`(${k})`).test(fmt)){
			let str = RegExp.$1.length===1 ? o[k]+'': padLeftZero(o[k]+'');
			fmt = fmt.replace(RegExp.$1,str)
		}
	}
	return fmt;
}
function padLeftZero(str){
	return ('00'+str).substr(str.length);
}
