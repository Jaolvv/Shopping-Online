/**
* 功能：给某个cookie设置值和参数，可以对cookie进行各种操作
*
* 参数：name cookie名称
*	value cookie的值
*	options cookie的参数
*
* 使用方法：
* 	1、cookie(’name’, ‘value’);
* 		设置cookie的值，把name变量的值设为value
* 	2、cookie(’name’, ‘value’, {expires: 7, path: ‘/’, domain: ‘cbsst.com’, secure: true});
* 		新建一个cookie 包括有效期 路径 域名等
* 	3、cookie(’name’, ‘value’);
* 		新建cookie
* 	4、cookie(’name’, null);
* 		删除一个cookie
*	5、cookie('name');
*		取得cookie中的值
**/
function cookie(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } 
    else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        
        return cookieValue;
    }
};
