// 工具函数
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}

export function isEqual(obj1, obj2) {
    if (!isObject(obj1) && !isObject(obj1)) {
        // 值类型比较
        return obj1 === obj2;
    }
    if (obj1 === obj2) {
        return true;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        const res = isEqual(obj1[key], obj2[key]);
        if (!res) {
            return res;
        }
    }
    return true;
}

export function convert(url, params){
    const keys = Object.keys(params);
    if(keys.length>0){
        for(let i=0;i<keys.length;i++){
            const key = keys[i];
            if(i===0){
                url += "?" + key + "=" + params[key];
            }else{
                url += "&" + key + "=" + params[key];
            }
        }

    }
    return url;
}