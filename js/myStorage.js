// 暴露两个方法
;(function(){
    window.ms = {
        set:set,
        get:get,
    };

    // set 方法
    function set(key,val){
        
        localStorage.setItem(key,JSON.stringify(val));
    }

    // get 方法
    function get(key){
        var json =localStorage.getItem(key);
        if (json){
            return JSON.parse(json);
        }
    }


})()


ms.set('name','caixiaowei')
var name = ms.get('name')
console.log('name:',name)