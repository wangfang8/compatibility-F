       /**
 * Created by Administrator on 2017/5/13 0013.
 */
function id(id){
    return document.getElementById(id)
}

//innertext和textContent兼容
function getText(ele){
    if(typeof (ele.textContent =="string")){
        return ele.textContent
    }else{
        return ele.innerText
    }
}
function setText(ele,text){
    if(typeof (ele.textContent == "string")){
        ele.textContent = text;
    }else{
        ele.innerText = text;
    }
}




//下一个元素节点
function getNextElement(ele){
    if(ele.nextElementSibling){
        return ele.nextElementSibling
    }else{
        var node = ele.nextSibling;
        while(node.nodeType!=1){
            node = node.nextSibling;
        }
        return node;
    }
}

//上一个元素节点
function getPreviousElement(ele){
    if(ele.previousElementSibling){
        return ele.previousElementSibling;
    }else{
        var node = ele.previousSibling;
        while(node.nodeType!=1){
            node = node.previousSibling;
        }
        return node;
    }
}

//封装获得多属性的animate函数
function animate(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for(var key in json){
            if(key=="opacity"){
                var leader = parseInt(getStyle(obj,key)*100)||0;
                var target = json[key]*100;
                var step = (target-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader+step;
                obj.style[key] = leader/100;
            }else if(key=="zIndex"){
                var leader = parseInt(getStyle(obj,key))||0;
                var target = json[key];
                var step = (target-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader+step;
                obj.style[key] = leader;
            }else{
                var leader = parseInt(getStyle(obj,key))||0;
                var target = json[key];
                var step = (target-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader+step;
                obj.style[key] = leader+"px";
            }
            if(leader!=target){
                flag = false;
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(typeof fn == "function"){
                fn();
            }
        }
    },20)
}


/**
 * 获得属性的兼容模式
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}


/**
 * 封装了一个兼容的scroll函数
 * 在外面定义一个对象接收返回值 可以用点语法
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll(){
    return {
        top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,
        left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0
    }
}
//var obj = scroll();


/**
 * 封装一个兼容获取浏览器可视区的函数
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function client(){
    return{
        width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0,
        height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0
    }
}

/**
 * 封装了一个获取页面坐标的兼容函数
 * @param e
 * @returns {{pageX: (*|Number), pageY: (*|Number)}}
 */
function page(e){
    return {
        pageX: e.pageX|| e.clientX+document.documentElement.scrollLeft,
        pageY: e.pageY|| e.clientY+document.documentElement.scrollTop
    }
}


/**
 * 封装一个显示隐藏的函数
 * @param ele
 */
function show(ele){
    ele.style.display = "block";
}
function hide(ele){
    ele.style.display = "none";
}


/**
 * 封装了一个注册多个事件的函数
 * @param obj
 * @param type
 * @param listener
 */
function addEventListener(obj,type,listener){
    if(obj.addEventListener){
        obj.addEventListener(type,listener,false)
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,listener)
    }else{
        obj["on"+type] = listener
    }
}
/**
 * 封装了一个移除事件的函数
 * @param obj
 * @param type
 * @param listener
 */
function removeEventListener(obj,type,listener){
    if(obj.removeEventListener){
        obj.removeEventListener(type,listener,false)
    }else if(obj.detachEvent){
        obj.detachEvent('on'+type,listener)
    }else{
        obj['on'+type] = null;
    }
}
/**
 * 封装了一个阻止事件冒泡的函数
 * @param e
 */
function stopPropagation(e){
    e = e || window.event;
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}

var eve = {
    //注册事件的函数
    addEventListener: function (obj,type,listener) {
        if(obj.addEventListener){
            obj.addEventListener(type,listener,flase);
        }else if(obj.attachEvent){
            obj.attachEvent("on"+type,listener);
        }else{
            obj["on"+type] = listener;
        }
    },
    //移除事件的函数
    removeEventListener: function (obj,type,listener) { 
        if(obj.removeEventListener){
            obj.removeEventListener(type,listener,flase);
        }else if(obj.detachEvent){
            obj.detachEvent("on"+type,listener)
        }else{
            obj["on"+type] = null;
        }
    },
    //阻止冒泡的函数
    stopPropagation: function (e) {
        e = e || window.event;
        if(e.stopPropagation){
            return e.stopPropagation();
        }else{
            return e.cancelBubble = true;
        }
    }
}

/**
 * 封装了一个随机生成16进制颜色的函数
 * @returns {string}
 */
function createColor(){
    var box = $('#box');
    var str = '#';
    var colors = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']

    for(var i = 0 ; i < 6; i++){
        var index = Math.floor(Math.random()*colors.length)
        str += colors[index];
    }
    return str;
}
console.log(createColor());
