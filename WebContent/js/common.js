//当前APP的根路径，主要为js动态构造完整的uri而设置的
var basePath = getWebAppRootPath();
var accessUrl = basePath + "/dataaccess.json";
var logicUrl = basePath + "/businesslogic.json";

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

/**
 * 判断一个字符串是否以某个词开始
 */
String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);

    return reg.test(this);
};

/**
 * 判断某个字符串是否以某个词结束
 */
String.prototype.endWith = function (str) {
    var reg = new RegExp(str + "$");

    return reg.test(this);
};

var Common = {
    /**
     * 跳转到登陆页面
     */
    jumpToLogin: function () {
        top.window.location = 'enter.action';
    },

    //EasyUI用DataGrid用日期格式化
    TimeFormatter: function (value, rec, index) {
        if (value == undefined) {
            return "";
        }

        var dateValue = new Date(value);

        return dateValue.pattern("HH:mm");
    },

    DateTimeFormatter: function (value, row, index) {
        if (value == undefined) {
            return "";
        }

        var dateValue = new Date(value);

        return dateValue.pattern("yyyy-MM-dd HH:mm");
    },

    //EasyUI用DataGrid用日期格式化
    DateFormatter: function (value, row, index) {
        if (value == undefined) {
            return "";
        }

        var dateValue = new Date(value);

        return dateValue.pattern("yyyy-MM-dd");
    },

    /**
     * 功能：获取指定id的datagrid对应的特征字段选定值的数组
     * 参数：
     *    gridId datagrid对应的id
     *    idFied 特征字段
     *    paramName url参数名
     * 返回值：
     *    选定的特征字段数组
     */
    getSelectedIds: function (gridId, idField, paramName) {
        var ids = [];

        var rows = $(gridId).datagrid('getChecked');
        for (var i = 0; i < rows.length; i++) {
            var map = {};

            map['name'] = paramName;
            map['value'] = rows[i][idField];

            ids.push(map);
        }

        return ids;
    },

    /**
     * 依据ds的key值，将数据加载到对应id的输入框中
     * 参数：ds 有key-value组成的数据集
     */
    loadData: function (ds) {
        for (var key in ds) {
            if ($('#' + key).length > 0)
                $('#' + key).val(ds[key]);
        }
    },

    /**
     * 依据ds的key值，将数据加载到对应id的span/div中
     * 参数：ds 有key-value组成的数据集
     */
    loadLabelData: function (ds) {
        for (var key in ds) {
            if ($('#' + key).length > 0)
                $('#' + key).html(ds[key]);
        }
    },

    /**
     * 显示Ajax加载数据的等待提示框和遮罩
     */
    ajaxLoading: function () {
        $("<div class=\"datagrid-mask\"></div>").css({
            display: "block",
            width: "100%",
            height: $(window).height()
        }).appendTo("body");
        $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理中，请稍候...").appendTo("body").css({
            display: "block",
            left: ($(document.body).outerWidth(true) - 190) / 2,
            top: ($(window).height() - 45) / 2
        });
    },

    /**
     * 隐藏Ajax加载数据的等待提示框和遮罩
     */
    ajaxLoadEnd: function () {
        $(".datagrid-mask").remove();
        $(".datagrid-mask-msg").remove();
    },

    /**
     * 从树中提取到相邻的节点，规则如下：
     *    如果有兄弟节点，就选取这个节点的上一个兄弟节点
     *    如果没有兄弟节点，就选取父节点
     * 参数：
     *   treeObj 树形对象(jquery对象)
     *   node 当前节点(需要删除的节点)
     **/
    getNeighborNode: function (treeObj, node) {
        var nodes;
        var lastNode = null;

        //选择相邻的节点
        //如果有兄弟节点，选择相邻的兄弟节点
        var parentNode = treeObj.tree('getParent', node.target);
        if (parentNode) {
            //有父节点，通过父节点得到所有子节点
            nodes = treeObj.tree('getChildren', parentNode.target);
            if (nodes.length == 1) lastNode = parentNode;
        } else {
            //没有父节点，则查询出所有根节点
            nodes = treeObj.tree('getRoots');
        }

        //遍历所有节点，找到相邻的节点
        if (lastNode == null) {
            var len = nodes.length;

            //根节点中只有一个节点，删除当前节点后，没有相邻节点
            if (len > 1) {
                for (var i = 0; i < len; i++) {
                    if (lastNode != null) {
                        //如果当前节点(不是第一个节点)是指定的节点，则相邻节点是上一个节点
                        if (nodes[i].id == node.id) break;

                        //如果第一个节点是指定节点，则当前节点就是指定节点的相邻节点
                        if (lastNode.id == node.id) {
                            lastNode = nodes[i];
                            break;
                        }
                    }

                    lastNode = nodes[i];
                }
            }
        }

        return lastNode;
    },

    /**
     * 创建数据网格的参数对象
     * 参数： loadUrl 动态加载数据的url
     *          headHeight 包含表格前与表格头以及分页部分的高度
     **/
    createDatagridOptions: function (loadUrl, headHeight) {
        var hHeight = (typeof headHeight != "undefined") ? headHeight : 135;
        var rowCount = Math.floor((document.body.clientHeight - hHeight) / 25);

        var opts = {};
        opts['url'] = basePath + loadUrl;
        opts['pageList'] = [10, 20, 30, 40, 50];
        opts['pageSize'] = rowCount;
        opts['pageList'].push(rowCount);

        //当数据查询完成时，判断数据是否超过一页，如果少于一页，则不显示分页，否则显示分页
        /*
         opts['onLoadSuccess'] = function(data){
             $(".datagrid-body").css("overflow", "hidden");
            if(data.total<=opts.pageSize){
                $(".datagrid-pager").hide();
            }else{
                $(".datagrid-pager").show();
            }
        };
        */

        return opts;
    },

    /**
     * 创建数据网格的参数对象(动态计算分页查询数据显示条数)
     * @param bPath 项目路径
     * @param loadUrl 动态加载数据的url
     * @param headHeight 包含表格前与表格头以及分页部分的高度
     * @param params 分页查询所需要的参数
     * @returns {___anonymous7643_7644}
     */
    createDatagridOptionsParams: function (bPath, loadUrl, headHeight, params) {
        var hHeight = (typeof headHeight != "undefined") ? headHeight : 135;
        var rowCount = Math.floor((document.body.clientHeight - hHeight) / 25);
        var opts = {};
        opts['url'] = bPath + loadUrl;
        opts['pageList'] = [10, 20, 30, 40, 50];
        opts['pageSize'] = rowCount;
        opts['pageList'].push(rowCount);
        opts['queryParams'] = params;

        //当数据查询完成时，判断数据是否超过一页，如果少于一页，则不显示分页，否则显示分页
        /*
         opts['onLoadSuccess'] = function(data){
             $(".datagrid-body").css("overflow", "hidden");
            if(data.total<=opts.pageSize){
                $(".datagrid-pager").hide();
            }else{
                $(".datagrid-pager").show();
            }
        };
        */

        return opts;
    },

    /**
     * 创建数据网格的参数对象(动态计算分页查询数据显示条数)，高度固定的datagrid
     * @param bPath 项目路径
     * @param loadUrl 动态加载数据的url
     * @param Height datagrid的导读
     * @param params 分页查询所需要的参数
     * @returns {___anonymous7643_7644}
     */
    createDatagridOptionsParamsForHeight: function (bPath, loadUrl, Height, params) {
        var rowCount = Math.floor((Height) / 25);
        var opts = {};
        opts['url'] = bPath + loadUrl;
        opts['pageList'] = [10, 20, 30, 40, 50];
        opts['pageSize'] = rowCount;
        opts['pageList'].push(rowCount);
        opts['queryParams'] = params;

        //当数据查询完成时，判断数据是否超过一页，如果少于一页，则不显示分页，否则显示分页

//	 	opts['onLoadSuccess'] = function(data){
//	 		$(".datagrid-body").css("overflow", "hidden");
//			if(data.total<=opts.pageSize){
//				$(".datagrid-pager").hide();
//			}else{
//				$(".datagrid-pager").show();
//			}
//		};

        return opts;
    },

    /**(每行计算高度为36)
     * 创建数据网格的参数对象(动态计算分页查询数据显示条数)
     * @param bPath 项目路径
     * @param loadUrl 动态加载数据的url
     * @param headHeight 包含表格前与表格头以及分页部分的高度
     * @param params 分页查询所需要的参数
     * @returns {___anonymous7643_7644}
     */
    createDatagridOptionsParamsTwo: function (bPath, loadUrl, headHeight, params) {
        var hHeight = (typeof headHeight != "undefined") ? headHeight : 135;
        var rowCount = Math.floor((document.body.clientHeight - hHeight) / 35);
        var opts = {};
        opts['url'] = bPath + loadUrl;
        opts['pageList'] = [10, 20, 30, 40, 50];
        opts['pageSize'] = rowCount;
        opts['pageList'].push(rowCount);
        opts['queryParams'] = params;

        //当数据查询完成时，判断数据是否超过一页，如果少于一页，则不显示分页，否则显示分页
        /*
         opts['onLoadSuccess'] = function(data){
             $(".datagrid-body").css("overflow", "hidden");
            if(data.total<=opts.pageSize){
                $(".datagrid-pager").hide();
            }else{
                $(".datagrid-pager").show();
            }
        };
        */

        return opts;
    },

    /**
     * 创建数据网格的参数对象
     * 参数： loadUrl 动态加载数据的url
     *          headHeight 包含表格前与表格头以及分页部分的高度
     **/
    createDatagridOptionsExt: function (bPath, loadUrl, headHeight) {
        var hHeight = (typeof headHeight != "undefined") ? headHeight : 135;
        var rowCount = Math.floor((document.body.clientHeight - hHeight) / 25);
        var opts = {};
        opts['url'] = bPath + loadUrl;
        opts['pageList'] = [10, 20, 30, 40, 50];
        opts['pageSize'] = rowCount;
        opts['pageList'].push(rowCount);

        //当数据查询完成时，判断数据是否超过一页，如果少于一页，则不显示分页，否则显示分页
        /*
         opts['onLoadSuccess'] = function(data){
             $(".datagrid-body").css("overflow", "hidden");
            if(data.total<=opts.pageSize){
                $(".datagrid-pager").hide();
            }else{
                $(".datagrid-pager").show();
            }
        };
        */

        return opts;
    },

    /**
     * 以text的形式加载数据到指定DOM对象
     * @param data 加载数据
     * @param selector DOM对象的jquery选择器
     * @param label 指定加载对象的标签
     * @param attribute 指定加载对象属性
     */
    loadDataForDOM: function (data, selector, label, attribute) {
        var loadobj = $(selector).find(label);
        $(loadobj).each(function () {
            var $this = $(this);
            var attr = $this.attr('name');
            if (attribute != undefined) {
                attr = $this.attr(attribute);
            }
            if (attr != undefined) {
                if (typeof (data) != 'object') {
                    //console.log("type of data " + typeof(data));
                }
                if (data[attr]) {
                    var text = data[attr];
                    $this.text(text);
                } else {
                    $this.text("");
                }
            }
        });
    }
};

/**
 * 将form提交的数据转化成形如{name:value...}的json
 */
$.fn.serializeObject = function () {
    var o = {};

    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });

    return o;
};

/**
 * 图片预览插件，点击图片进入全屏预览模式
 */
$.fn.picturePreview = function (options, idName) {
    //若没有传入参数则不进入预览
    if (options == null) {
        return
    }
    //图片类型，用于判断传入的是文件还是url
    var imageType = /^image\//;
    //图片数组下标
    var pageIndex = 0;
    //判断传入的参数类型，再初始化
    if (imageType.test(options[0].type)) {
        //初始化
        init("file");
    } else {
        init("url");
    }

    /**
     * 初始化图片预览
     *    若传入file则预览的时候切换img标签的file属性，
     *    若传入url则预览的时候切换img标签的src属性
     */
    function init(type) {
        var div = document.getElementById(idName);
        //创建遮罩层容器
        var div1 = document.createElement("div");
        div1.id = "picture";
        div.appendChild(div1);
        document.getElementById("picture").style.display = "";
        //清除关闭按钮
        $("#mask_close").remove();
        //清除放大图片
        $("#picZoom").remove();
        //清除左翻页
        $("#leftPage").remove();
        //清除右翻页
        $("#rightPage").remove();

        //创建遮罩层
        $("#picture").css({
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 9999,
            height: "100%",
            width: "100%",
            background: "black",
            opacity: 0.9
        });

        var height = ($("#picture").height() - 500) / 2;
        var width = ($("#picture").width() - 800) / 2;
        //在遮罩层上添加img标签，用于显示图片
        var img = document.createElement("img");
        img.id = "picZoom";
        if (type == "file") {
            //需要转换文件后才能显示
            fileReader(options[0], img);
            img.file = options[0];
            firstFileSize(options[0]);
        } else {
            img.src = options[0].url;
            firstImgSize(options[0].url);
        }
        div.appendChild(img);
        $("#picZoom").css({position: "absolute", top: height, left: width, zIndex: 9999});
        document.getElementById("picZoom").style.display = "";
        //让图片同比例放大缩小
        zoomPicture();

        //添加左翻页按钮
        var img = document.createElement("img");
        img.id = "leftPage";
        img.src = basePath + "/images/mask_left.png";
        img.style = "cursor:pointer";
        img.width = 32;
        div.appendChild(img);
        $("#leftPage").css({position: "absolute", top: $("#picture").height() / 2, left: 0, zIndex: 9999});
        document.getElementById("leftPage").style.display = "";

        //添加右翻页按钮
        var img = document.createElement("img");
        img.id = "rightPage";
        img.src = basePath + "/images/mask_right.png";
        img.style = "cursor:pointer";
        img.width = 32;
        div.appendChild(img);
        $("#rightPage").css({position: "absolute", top: $("#picture").height() / 2, right: 0, zIndex: 9999});
        document.getElementById("rightPage").style.display = "";
        //实现翻页浏览功能
        turnPage(type);

        //向遮罩层添加关闭按钮
        var img = document.createElement("img");
        img.id = "mask_close";
        img.src = basePath + "/images/mask_close.png";
        img.style = "cursor:pointer";
        img.width = 32;
        div.appendChild(img);
        $("#mask_close").css({position: "absolute", right: 0, top: 0, zIndex: 9999});
        $("#mask_close").click(function () {
            //关闭遮罩层
            document.getElementById("picture").style.display = "none";
            document.getElementById("mask_close").style.display = "none";
            document.getElementById("picZoom").style.display = "none";
            document.getElementById("leftPage").style.display = "none";
            document.getElementById("rightPage").style.display = "none";
        });
    }

    /*
     * 图片预览翻页功能
     */
    function turnPage(type) {
        //隐藏左翻页按钮
        document.getElementById("leftPage").style.display = "none";
        if (options.length == 1) {
            //隐藏右翻页按钮
            document.getElementById("rightPage").style.display = "none";
        }

        //左翻页点击事件
        $("#leftPage").click(function () {
            pageIndex--;
            //第一页隐藏左翻页按钮
            if (pageIndex == 0) {
                document.getElementById("leftPage").style.display = "none";
            }
            //左翻页后显示右翻页按钮
            if (pageIndex != options.length) {
                document.getElementById("rightPage").style.display = "";
            }
            if (type == "file") {
                //切换图片file属性
                var img = document.getElementById("picZoom");
                img.file = options[pageIndex];
                //需要转换文件后才能显示
                fileReader(options[pageIndex], img);
                //初始化图片尺寸
                firstFileSize(options[pageIndex]);
            } else {
                //切换图片src
                $("#picZoom").attr("src", options[pageIndex].url);
                //初始化图片尺寸
                firstImgSize(options[pageIndex].url);
            }
        });

        //右翻页点击事件
        $("#rightPage").click(function () {
            pageIndex++;
            //右翻页后显示左翻页按钮
            if (pageIndex != 0) {
                document.getElementById("leftPage").style.display = "";
            }
            //最后页隐藏右翻页按钮
            if (pageIndex == (options.length - 1)) {
                document.getElementById("rightPage").style.display = "none";
            }
            if (type == "file") {
                //切换图片file属性
                var img = document.getElementById("picZoom");
                img.file = options[pageIndex];
                //需要转换文件后才能显示
                fileReader(options[pageIndex], img);
                //初始化图片尺寸
                firstFileSize(options[pageIndex]);
            } else {
                //切换图片src
                $("#picZoom").attr("src", options[pageIndex].url);
                //初始化图片尺寸
                firstImgSize(options[pageIndex].url);
            }

        });

    }

    /*
     * 图片同比例缩放（maxHeight=680px;maxWidth=1000px;）
     */
    function zoomPicture(width, height, type) {
        var maxWidth = 800;
        var maxHeight = 500;
        if (type == "file") {
            //当图片宽度大于maxWidth
            if (width > maxWidth) {
                //高度同比例缩放
                var scale = maxWidth / width;
                $("#picZoom").height(height * scale);
                //将图片宽度设为最大宽度
                $("#picZoom").width(maxWidth);
                //让图片居中显示
                autoPicture();
                //缩放后，若高度还大于最大高度，则再设置图片高度为最大高度
                if ($("#picZoom").height() > maxHeight) {
                    //获取宽度缩放比例
                    var scale = maxHeight / $("#picZoom").height();
                    $("#picZoom").width(maxWidth * scale);
                    //将高度设置为最大高度
                    $("#picZoom").height(maxHeight);
                    //让图片居中显示
                    autoPicture();
                }
            } else {
                if (height > maxHeight) {//当图片的高度大于maxHeight
                    //获取宽度缩放比例
                    var scale = maxHeight / height;
                    $("#picZoom").width(width * scale);
                    //将图片高度设为最大高度
                    $("#picZoom").height(maxHeight);
                    //让图片居中显示
                    autoPicture();
                } else {//当图片的高度小于等于maxHeight,则显示图片自身的宽高

                    $("#picZoom").width(width);
                    //将图片高度设为最大高度
                    $("#picZoom").height(height);
                    //让图片居中显示
                    autoPicture();
                    return;
                }
            }
        } else {
            //当图片宽度大于maxWidth
            if ($("#picZoom").width() > maxWidth) {
                //高度同比例缩放
                var scale = maxWidth / $("#picZoom").width();
                $("#picZoom").height($("#picZoom").height() * scale);
                //将图片宽度设为最大宽度
                $("#picZoom").width(maxWidth);
                //让图片居中显示
                autoPicture();

                //缩放后，若高度还大于最大高度，则再设置图片高度为最大高度
                if ($("#picZoom").height() > maxHeight) {
                    //获取宽度缩放比例
                    var scale = maxHeight / $("#picZoom").height();
                    $("#picZoom").width(maxWidth * scale);
                    //将宽度设置为最大宽度
                    $("#picZoom").height(maxHeight);
                    //让图片居中显示
                    autoPicture();
                }
            } else {
                if ($("#picZoom").height() > maxHeight) {//当图片的高度大于maxHeight
                    //获取宽度缩放比例
                    var scale = maxHeight / $("#picZoom").height();
                    $("#picZoom").width($("#picZoom").width() * scale);
                    //将图片高度设为最大高度
                    $("#picZoom").height(maxHeight);
                    //让图片居中显示
                    autoPicture();
                } else {//当图片的高度小于等于maxHeight,则显示图片自身的宽高
                    //让图片居中显示
                    autoPicture();
                    return;
                }
            }
        }
    }

    /*
     * 初始化图片的最初尺寸
     */
    function firstImgSize(url) {
        var img = document.createElement("img");
        img.src = url;
        img.id = "firstImg";

        img.onload = function () {
            $("#picZoom").height(img.height);
            $("#picZoom").width(img.width);
            //图片等比例缩放
            zoomPicture();
        };
    }

    /*
     * 让图片居中显示
     */
    function autoPicture() {
        if ($("#picZoom").height() == 0) {
            return;
        } else {
            //让图片居中显示
            var height = ($("#picture").height() - $("#picZoom").height()) / 2;
            var width = ($("#picture").width() - $("#picZoom").width()) / 2;
            $("#picZoom").css("top", height);
            $("#picZoom").css("left", width);
        }
    }

    /*
     * 初始化传file时图片尺寸
     */
    function firstFileSize(file) {
        var img = new Image();
        fileReader1(file, img);
    }

    /*
     * 传入文件时，用于读取文件
     */
    function fileReader(file, img) {
        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
    }

    //用于初始化file图片尺寸
    function fileReader1(file, img) {
        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
        //监听文件读取结束后事件  
        reader.onloadend = function (e) {
            //图片等比例缩放
            zoomPicture(img.width, img.height, "file");
        };
    }
};

// 固话校验规则
var regexTel = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;

// 手机校验规则
var regexMobile = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
/**
 * 自定义远程验证方法，和validBox一起使用
 */
$.extend($.fn.validatebox.defaults.rules, {
    remoteValid: {
        validator: function (value, param) {

            var params = {};
            params[param[1]] = value;
            if ($(param[2]) != null) {
                params = $.extend(params, param[2]);
            }
            var data = $.ajax({
                url: param[0],
                type: 'post',
                data: params,
                async: false,
                cache: false,
                dataType: 'json'
            }).responseJSON;

            if (data.resultCode && data.resultCode == 1) {
                return true;
            } else if (data) {
                return $.isEmptyObject(data);
            } else {
                return false;
            }
        },
        message: '请输入合法的内容'
    },

    /**
     * 电话号码校验规则
     */
    telephone: {
        validator: function (value) {
            return regexTel.test(value) || regexMobile.test(value);
        },
        message: '请输入正确的手机或者固话号码'
    },

    /**
     * 手机号码校验规则
     */
    mobile: {
        validator: function (value) {
            return regexMobile.test(value);
        },
        message: '请输入正确的手机号码'
    },

    /**
     * 手机号码校验规则
     */
    fixedTel: {
        validator: function (value) {
            return regexTel.test(value) || regexMobile.test(value);
        },
        message: '请输入正确的固话号码'
    }

});

/**
 * 自定义远程验证方法，和textBox一起使用
 */
$.extend($.fn.textbox.defaults.rules, {
    remoteMyValid: {
        validator: function (value, param) {

            var params = {};
            params[param[1]] = value;
            if ($(param[3]) != null) {
                params = $.extend(params, param[3]);
            }
            params['logicId'] = param[2];

            var data = $.ajax({
                url: param[0],
                type: 'post',
                data: params,
                async: false,
                cache: false,
                dataType: 'json'
            }).responseJSON;

            if (data.resultCode == 1)
                //通过验证
                return true;
            else
                //未通过验证
                return false;
        },
        message: '请输入合法的内容'
    }
});

/**
 * 页面加载的时候自动执行的某些操作
 * 1、发起一个获取当前用户的请求，如果请求返回结果是resultCode等于0，则跳转到登录页面
 *
 */
window.onload = function () {
    $.ajax({
        url: basePath + "/frame_sysrole_finduser.json",
        type: "post",
        success: function (data) {
            if (data != null && data['resultCode'] != null && data['resultCode'] == 0)
                top.window.location = basePath;
        }
    });
};

/**
 * 获取上一个页面传过来的值
 * @param str 请求参数名
 */
function getRequestParam(str) {
    var LocString = String(window.document.location.href);
    var rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(LocString), tmp;
    if (tmp = rs) {
        return tmp[2];
    }
    return "";
}

/**
 * 获取web应用程序根路径
 */
function getWebAppRootPath() {
    if (!top.basePath) {
        $.ajax({
            async: false,
            url: "../../api_dataaccess.json",
            data: {
                accessId: '9801',
                paramId: 'app.base_path'
            },
            type: "post",
            success: function (result) {
                if (result && result.paramValue) {
                    top.basePath = window.location.protocol + '//' + window.location.host + result.paramValue;
                    if (top.basePath.lastIndexOf('/') == top.basePath.length - 1) {
                        top.basePath = top.basePath.substring(0, top.basePath.length - 1);
                    }
                } else {
                    alert("请勿非法访问本系统。");
                    self.close();
                }
            }
        });
    }

    return top.basePath;
}

//获取上一个页面传过来的值
function getString(str) {
    var LocString = String(window.document.location.href);
    var rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(LocString), tmp;
    if (tmp = rs) {
        return tmp[2];
    }
    return "";
} 