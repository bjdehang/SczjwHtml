/* -----------------------------------------/
 * 功能：弹出层显示及居中显示
 * 参数：
 * 返回：
 * 作者：ZHANGHAIBIN
/ ---------------------------------------- */

(function($) {
    // 弹出层
    $.fn.popupshow = function(options) {
        var settings = $.extend({
            'popupId': null, // 弹出层id
            'url': null, // 要插入的HTML的URL, 如果弹层隐藏在页面中, 则不用设置
            'string': null, // html 字符串
            'maskId': 'mask', // 遮罩id,null不显示遮罩
            'position': 'fixed', // 定位类别[fixed|absolute]
            'noscroll': false, // 是否禁止页面滚动[true|false]
            'zindex': null, // z-index值
            'width': null,  // 宽度
            'height': null, // 高度
            'countdown': null,   // 倒计时关闭(正整数,以秒为单位)
            'timer': null,   // 倒计时数字输出位置
            'jump': null,    // 关闭时跳转URL
            'fn': null, // 弹出调用函数
            'callback': null // 关闭回调
        }, options);

        // 如果popupId不存在, 则返回
        if (!settings.popupId) return false;
        // 重命名参数名称
        var _popupId = settings.popupId,
            _url = settings.url,
            _string = settings.string,
            _maskId = settings.maskId,
            _position = settings.position,
            _noscroll = settings.noscroll,
            _zindex = settings.zindex,
            _width = settings.width,
            _height = settings.height,
            _countdown = settings.countdown,
            _timer = settings.timer,
            _jump = settings.jump;

        var $popup = $("#" + _popupId);
        // 倒计时节点
        var $countdown = $('<div class="countdownTxt">');

        // 弹出层显示
        if ($popup.length > 0) {
            // 如果弹层已弹出, 则返回
            if ($popup.is(':visible')) return;
            // 关闭其他已弹出弹层
            closeActive();
            // 判断是否启用遮罩
            if (_maskId !== null) mask();
            // 显示自有弹层并添加属性
            $popup.attr({popup: "show", popmark: "own"}).show();
            // 禁止页面滚动
            if (_noscroll === true) var _scroll = noscroll();
            // 设置宽高
            if (_width !== null) $popup.css("width", _width + 'px');
            if (_height !== null) $popup.css("height", _height + 'px');
            // 设置zIndex值
            if (_zindex !== null) {
                $popup.css({zIndex: Number(_zindex) + 1});
            } else {
                var zIndex = $("#" + _maskId).css('z-index');
                $popup.css({zIndex: Number(zIndex) + 1})
            }
            // 弹层定位
            popupPsotion(_popupId, _position);
            //关闭弹层
            $("#" + _popupId + " .close").bind('click', function() {
                close($(this), _scroll);
                $("#" + _maskId).hide();
            });
            // 弹出调用函数
            if (settings.fn !== null) settings.fn();
            // 倒计时关闭
            if (_countdown !== null) countdown(_countdown, _timer);
        } else if (_string !== null) {
            // 如果弹层已弹出, 则返回
            if ($('body').find("#" + _popupId).length) return;
            // 关闭其他已弹出弹层
            closeActive();
            //判断是否启用遮罩
            if (_maskId !== null) mask();
            // 插入弹层
            $('body').append(_string);

            var $popup = $("#" + _popupId);
            // 添加属性
            $popup.attr("popup", "show").show();
            // 禁止页面滚动
            if (_noscroll === true) var _scroll = noscroll();
            // 设置宽高
            if (_width !== null) $popup.css("width", _width + 'px');
            if (_height !== null) $popup.css("height", _height + 'px');
            // 设置zIndex值
            if (_zindex !== null) {
                $popup.css({zIndex: Number(_zindex) + 1});
            } else {
                var zIndex = $("#" + _maskId).css('z-index');
                $popup.css({zIndex: Number(zIndex) + 1})
            }
            // 弹层定位
            popupPsotion(_popupId, _position);
            //关闭弹层
            $("#" + _popupId + " .close").bind('click', function() {
                close($(this), _scroll);
                $("#" + _maskId).hide();
            });
            // 弹出调用函数
            if (settings.fn !== null) settings.fn();
            // 倒计时关闭
            if (_countdown !== null) countdown(_countdown, _timer);
        } else if (_url !== null) {
            $.ajax({
                type: "GET",
                url: _url,
                success: function(res) {
                    // 如果弹层已弹出, 则返回
                    if ($('body').find("#" + _popupId).length) return;
                    // 关闭其他已弹出弹层
                    closeActive();
                    //判断是否启用遮罩
                    if (_maskId !== null) mask();
                    // 插入弹层
                    $('body').append(res);

                    var $popup = $("#" + _popupId);
                    // 添加属性
                    $popup.attr("popup", "show").show();
                    // 禁止页面滚动
                    if (_noscroll === true) var _scroll = noscroll();
                    // 设置宽高
                    if (_width !== null) $popup.css("width", _width + 'px');
                    if (_height !== null) $popup.css("height", _height + 'px');
                    // 设置zIndex值
                    if (_zindex !== null) {
                        $popup.css({zIndex: Number(_zindex) + 1});
                    } else {
                        var zIndex = $("#" + _maskId).css('z-index');
                        $popup.css({zIndex: Number(zIndex) + 1})
                    }
                    // 弹层定位
                    popupPsotion(_popupId, _position);
                    //关闭弹层
                    $("#" + _popupId + " .close").bind('click', function() {
                        close($(this), _scroll);
                        $("#" + _maskId).hide();
                    });
                    // 弹出调用函数
                    if (settings.fn !== null) settings.fn();
                    // 倒计时关闭
                    if (_countdown !== null) countdown(_countdown, _timer);
                }
            });
        } else {
            return false;
        }
        // 禁止页面滚动
        function noscroll() {
            var $html = $('html');
            var originHtml = $html.attr('style');
            $html.css({overflow: 'hidden'});
            return originHtml;
        }
        // 遮罩
        function mask() {
            var $mask = $("#" + _maskId);
            if ($mask.length > 0) {
                // 如果遮罩以显示, 则返回
                if ($mask.is(":visible")) return;
                $mask.show().css({zIndex: _zindex});
            } else {
                var maskNode = $("<div class='passport-mask' id='" + _maskId + "'>");
                $('body').append(maskNode);
                maskNode.show().css({zIndex: _zindex});
            }
        }
        // 关闭其他已弹出弹层
        function closeActive() {
            $('body').find('[popup="show"]').attr("popup","hide").find('.close').click();
        }
        // 倒计时关闭
        function countdown(time, node) {
            // 参数说明:
            // 1. time是设定的倒计时时间;
            // 2. node是自定义显示倒计时的位置;
            if ((typeof time != 'number') || time <= 1) throw new Error('参数类型错误或小于等于1');
            var _time = Math.ceil(time - 1);
            var _popup = $("#" + _popupId);
            // 显示倒计时
            _timerNum();
            // 清除倒计时
            window.clearTimeout(this._t);
            // 倒计时开始
            this._t = window.setTimeout(function() {
                if (_time > 1) {
                    // 显示倒计时
                    _timerNum();
                   return countdown(_time, node);
                } else {
                    $("#" + _popupId + " .close").click();
                }
            }, 1000);

            function _timerNum() {
                // 如果自定义了时间显示节点名, 则在指定位置显示倒计时
                if (node !== null) {
                    _popup.find(node).text(_time + "秒");
                } else {
                    _popup.find("." + $countdown[0].className).remove();
                    _popup.children('.wrap').append($countdown).find($countdown).text(_time + "秒");
                }
            }
        }
        //关闭按钮
        function close(obj, noscroll) {
            // 清除倒计时
            window.clearTimeout(this._t);
            // 取消禁止页面滚动
            if (_noscroll === true) {
                if (noscroll == undefined) {
                    $('html').removeAttr('style');
                } else {
                    $('html').attr('style', noscroll);
                }
            }
            // 跳转
            if (_jump !== null) document.location = _jump;
            // 设置弹层属性
            var _popup = obj.parents("#" + _popupId);
            var _mark = _popup.attr("popmark");
            _popup.attr("popup", "hide");
            // 如果popmark属性为own则隐藏，否则删除
            if (_mark == "own") {
                _popup.hide();
            } else {
                _popup.remove();
            }
            // 关闭回调
            if (settings.callback !== null) settings.callback();
        }
        //弹层定位
        function popupPsotion(popupId, position) {
            var $popup = $("#" + popupId),
                $win = $(window),
                winW = $win.width(),
                winH = $win.height(),
                popupW = $popup.width(),
                popupH = $popup.height(),
                scrollT = $win.scrollTop(),
                scrollL = $win.scrollLeft();
            if (popupH > winH) {
                // 如果弹层高度大于视窗高度, popupTop为滚动条Top值
                var popupTop = scrollT,
                    popupLeft = (winW - popupW) / 2 + scrollL;

                $popup.css({
                    position: "absolute",
                    top: popupTop,
                    left: popupLeft,
                    margin: 0
                });
            } else if (position == "fixed") {
                var popupTop = (winH - popupH) / 2,
                    popupLeft = (winW - popupW) / 2;

                $popup.css({
                    position: "fixed",
                    top: popupTop,
                    left: popupLeft,
                    margin: 0
                });
            } else if (position == "absolute") {
                var popupTop = (winH - popupH) / 2 + scrollT,
                    popupLeft = (winW - popupW) / 2 + scrollL;

                $popup.css({
                    position: "absolute",
                    top: popupTop,
                    left: popupLeft,
                    margin: 0
                });
            }
        }
        // 窗口调整时重新定位
        $(window).resize(function() {
            popupPsotion(_popupId, _position);
        });
    };
})(jQuery);

/* -----------------------------------------/
 * 功能：表单验证(空、最小长度、最大长度)
 * 参数：
 * 返回：[true, val] || false
 * 作者：ZhangHinBin
/ ---------------------------------------- */
function verify(obj, e, args) {
    var settings = $.extend({
        'note': '该项为必填项', // 提示文本
        'minlength': null, // 最小长度验证(参数：正整数)
        'maxlength': null, // 最大值长度验证(参数：正整数)
        'valelem': null,    // 取值元素(默认this)
        'target': null, // 文本插入目标位置
        'tagname': 'span', // html标签名称
        'successhint': true,   // 是否显示成功提示
        'callback': null // 回调函数
    },args);

    var $this = $(obj);
    // 检查是否自定义取值元素
    if (settings.valelem !== null) {
        if ($this.first().attr('type') == 'radio' || $this.first().attr('type') == 'checkbox') {
            var val = $(obj + ':checked').val();
        } else {
            var val = $.trim(settings.valelem.val());
        };
    } else {
        if ($this.first().attr('type') == 'radio' || $this.first().attr('type') == 'checkbox') {
            var val = $(obj + ':checked').val();
        } else {
            var val = $.trim($this.val());
        };
    }
    var _note = '<'+ settings.tagname + ' class="note error-txt">' + settings.note + '</' + settings.tagname + '>';
    var _successNote = '<'+ settings.tagname + ' class="note success-txt"><i class="icon icon-success"></i></' + settings.tagname + '>';

    // 获取焦点时删除提示
    if ($this.attr('type') == 'file') {
        // safari 兼容
        $this.bind("click", function() {
            delNote();
        });
    } else {
        $this.bind("focus", function() {
            delNote();
        });
    }
    if (!val || val === 'null') {
        e.preventDefault();
        // 删除错误提示
        delNote();
        // 判断提示文本是否设置
        if (settings.note === null) {
            // 插入提示
            insetNote('<'+ settings.tagname + ' class="note error-txt">该项为必填项</' + settings.tagname + '>');
        } else {
            // 插入提示
            insetNote(_note);
        }
        return false;
    } else {

        if (settings.minlength !== null && settings.maxlength !== null) {
            if (typeof settings.minlength != 'number' && typeof settings.minlength != 'number') return new TypeError();
            var _val = $.trim($this.val());
            if (_val.length < settings.minlength) {
                var _note = '<'+ settings.tagname + ' class="note error-txt"><i class="icon icon-warn"></i>字段长度最少' + settings.minlength + '个字符</' + settings.tagname + '>';
                e.preventDefault();
                // 插入提示
                insetNote(_note);
                return false;
            } else if (_val.length > settings.maxlength) {
                var _note = '<'+ settings.tagname + ' class="note error-txt"><i class="icon icon-warn"></i>字段长度超过' + settings.maxlength + '个字符</' + settings.tagname + '>';
                e.preventDefault();
                // 插入提示
                insetNote(_note);
                return false;
            } else {
                return successFn(_successNote);
            }

        } else if (settings.minlength !== null) {
            if (typeof settings.minlength != 'number') return new TypeError();
            var _val = $.trim($this.val());
            var _note = '<'+ settings.tagname + ' class="note error-txt"><i class="icon icon-warn"></i>字段长度最少' + settings.minlength + '个字符</' + settings.tagname + '>';
            if (_val.length < settings.minlength) {
                e.preventDefault();
                // 插入提示
                insetNote(_note);
                return false;
            } else if (settings.maxlength !== null) {
                if (typeof settings.maxlength != 'number') return new TypeError();
                var _val = $.trim($this.val());
                var _note = '<'+ settings.tagname + ' class="note error-txt"><i class="icon icon-warn"></i>字段长度超过' + settings.maxlength + '个字符</' + settings.tagname + '>';
                if (_val.length > settings.maxlength) {
                    e.preventDefault();
                    // 插入提示
                    insetNote(_note);
                    return false;
                } else {
                    return successFn(_successNote);
                }
            } else {
                return successFn(_successNote);
            }
        } else if (settings.maxlength !== null) {
            if (typeof settings.maxlength != 'number') return new TypeError();
            var _val = $.trim($this.val());
            var _note = '<'+ settings.tagname + ' class="note error-txt"><i class="icon icon-warn"></i>字段长度超过' + settings.maxlength + '个字符</' + settings.tagname + '>';
            if (_val.length > settings.maxlength) {
                e.preventDefault();
                // 插入提示
                insetNote(_note);
                return false;
            } else if (settings.minlength !== null) {
                if (typeof settings.minlength != 'number') return new TypeError();
                var _val = $.trim($this.val());
                var _note = '<'+ settings.tagname + ' class="note error-txt"><i class="icon icon-warn"></i>字段长度最少' + settings.minlength + '个字符</' + settings.tagname + '>';
                if (_val.length < settings.minlength) {
                    e.preventDefault();
                    // 插入提示
                    insetNote(_note);
                    return false;
                } else {
                    return successFn(_successNote);
                }
            } else {
                return successFn(_successNote);
            }
        } else {
            return successFn(_successNote);
        }
    }
    // 插入提示
    function insetNote(note) {
        // 删除提示
        delNote();
         // 判断文本插入目标是否设置
        if (settings.target === null) {
            $this.parent().append(note);
        } else {
            settings.target.append(note);
        }
    }
    // 删除提示
    function delNote() {
        if (settings.target !== null) {
            settings.target.find('.note.error-txt').remove();
            settings.target.find('.note.success-txt').remove();
        } else {
            var _errNote = $this.siblings('.note.error-txt');
            var _successNote = $this.siblings('.note.success-txt');
            _errNote.remove();
            _successNote.remove();
        }
    }
    // 验证正确
    function successFn(note) {
        if (settings.successhint === true){
            // 删除提示
            delNote();
            // 插入成功提示
            if (settings.target === null) {
                $this.parent().find('.note.success-txt').remove();
                $this.parent().append(note);
            } else {
                settings.target.find('.note.success-txt').remove();
                settings.target.append(note);
            }
        }
        // 执行回调函数
        if (settings.callback !== null) {
            return settings.callback(val, e);
        } else {
            return [true, val];
        }
    }
}

var JIUYE = {
    init: function() {
        this.bindEle();
        this.popup();
        this.tipsClose('.tips-notice');
        $('.progress').each(function() {
            JIUYE.progress($(this));
            JIUYE.markSlice($(this));
        });
//      this.canvasSize();
        this.faqDrop('.faq-item');
    },
    bindEle:function() {
        $('#inforPop').bind('click', this.priceHint);
        $('#user-name,.user-center,#user-name p').bind("mouseover",this.userContent);
    },
    priceHint:function(){
        var $this = $(this);
        $this.popupshow({
            popupId: 'priceHint',
        });
        return false;
    },
    userContent:function(){//头部用户中心下拉
        $('.user-center').show();
        $('.jiaotou').addClass("rotate");
        JIUYE.stopEventBubble();
        $(document).bind("mouseover",function(){
            $('.user-center').hide();
            $('.jiaotou').removeClass("rotate");
        });
    },
    stopEventBubble: function() {//阻止冒泡事件
        function getEvent(){
            if(window.event)    {return window.event;}
            func=getEvent.caller;
            while(func!=null){
                var arg0=func.arguments[0];
                if(arg0){
                    if((arg0.constructor==Event || arg0.constructor ==MouseEvent
                        || arg0.constructor==KeyboardEvent)
                        ||(typeof(arg0)=="object" && arg0.preventDefault
                            && arg0.stopPropagation)){
                        return arg0;
                    }
                }
                func=func.caller;
            }
            return null;
        }
        var e=getEvent();
        if(window.event){
            //e.returnValue=false;//阻止自身行为
            e.cancelBubble=true;//阻止冒泡
        }else if(e.preventDefault){
            //e.preventDefault();//阻止自身行为
            e.stopPropagation();//阻止冒泡
        }
    },
    loading: function() {
        var html = $('<div class="loading"></div>');
        var temp = '<div class="spinner">';
        for (var i = 1; i <= 5; i++) {
            temp += '<div class="rect' + i + '"></div>\n';
        }
        temp += '</div><div class="text">内容加载中...</div>';
        html.append(temp);
        return html;
    },
    popup: function() {
        $('.js-tuifei').bind("click", function() {
            $(this).popupshow({
                popupId: 'pop-tuifei',
            });
            return false;
        });
        $('.js-task').bind("click", function() {
            $("#homework_info").html('');
            var $this = $(this);
            // 获取 ID和属性
            var homeworkId = $this.parents('article');
            if (!homeworkId.attr('id')) throw new Error('id 不存在或为空');
            var attr = homeworkId.attr('attr');
            var data = {} ;
            data.job_id = $("#job_id").val();
            data.path_id = $("#path_id").val();
            data.task_id = $("#task_id").val();
            data.class_id = $("#class_id").val();
            data.period =  $("#period").val();
            data.homework_id = attr ;
            $.ajax({
                url:"/task/user_homework_info",
                type:"post",
                data:data,
                dataType : 'json' ,
                success: function (res) {
                    var html = '' ;
                    if (res.can_submit_times <= 3 && res.as_remind_times == 2) {
                        html += '提示 ：你还剩下 <span>'+res.can_submit_times+'</span>次作业批改机会' ;
                        $("#homework_info").html(html);
                    }else if (res.as_remind_times == 1) {
                        html += '提示 ：本次提交之后会自动锁定，直到老师批改完毕' ;
                        $("#homework_info").html(html);
                    }
                },
                err: function () {

                }
            })
            $(this).popupshow({
                popupId: 'pop-task',
                fn: function() {
                    $('.sc-btn').unbind('click');
                    $('.sc-btn').bind("click", JIUYE.uploadFile);
                    $('#submitTask').unbind('click');
                    $('#submitTask').bind('click', function(e) {
                        JIUYE.submitTask(e,attr);
                    });
                },
                callback: function() {
                    // 关闭删除提示清空数据
                    $('#formTask').find('.note.error-txt').remove();
                    $('#formTask').find('input, textarea').val('');
                    $('#formTask').find('.sc-txt').text('只能传'+ext+'格式文件，大小不得超过'+confHomework.maxSize+'MB');
                }
            });
            return false;
        });
        $('.js-shenpi').bind("click", function() {
            var answers_id = $(this).attr("answers_id");
            var data = {'answers_id' : answers_id}
            $(this).popupshow({
                popupId: 'pop-shenpi',
                fn: function() {
                    if ($('#taskmainvideo').length) {
                        videojs('taskmainvideo').pause();
                    }
                    //$("#pop-shenpi .teacher-video").html(JIUYE.loading());
                    $.ajax({
                        type:"post",
                        url:"/task/dianping",
                        data : data ,
                        dataType:'json',
                        success: function(res) {
                            var html ='' ;
                                if (res.teacher_video_url) {
                                    html += '<div class="videobox">';
                                    html += '<video id="shenpivideo" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="autoplay" width="600" height="344" poster="/Current/home/images/play_bg.jpg" data-setup="{}">' ;
                                    html += '<source src="'+res.teacher_video_url+'" type="video/mp4" /> ' ;
                                    html += '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>' ;
                                    html += '</video>';
                                    html += '</div>';
                                }
                                html += '<div class="teacher-comments">' ;
                                html += '<p>' ;
                                html += '<strong>老师点评：' + res.score +'分</strong><br/>' ;
                                if (res.teacher_message) {
                                    html += res.teacher_message + '</p> ' ;
                                }
                                html += '</p> ' ;
                                html += '</div>' ;

                            $("#pop-shenpi .teacher-video").html(html);
                            var $videobox = $("#pop-shenpi .teacher-video .videobox");
                            if (!$videobox.length) {
                                $("#pop-shenpi .teacher-video .teacher-comments").css({
                                    height: 290
                                });
                            }
                        }
                    });
                },
                callback: function() {
                    // 关闭回调
                    // 关闭暂停
                    if ($('#shenpivideo').length) {
                        videojs('shenpivideo').pause();
                    }
                    $("#pop-shenpi .teacher-video").html('');
                }
            });
            return false;
        });
        // 作业提示
        $('.js-tasktips').bind("click", function() {

            var homework_id = $(this).attr('homework_id');
            var data = {'homework_id':homework_id}
            $(this).popupshow({
                popupId: 'pop-tasktips',
                fn: function() {
                    $("#pop-tasktips .teacher-comments").html(JIUYE.loading());
                    $.ajax({
                        type:"post",
                        url:"/task/tips",
                        data: data,
                        dataType:'json',
                        success: function(res) {
                            if(res.intro){
                                var html= "<p><strong>作业提示：</strong><br/>" + res.intro + '</p>';
                            }else{
                                var html= "<p><strong>作业提示：</strong><br/>好好努力，暂无作业提示</p>";
                            }
                            $("#pop-tasktips .teacher-comments").html(html);
                        }
                    });
                },
                callback: function() {
                    $("#pop-tasktips .teacher-comments p").html('');
                }
            });
            return false;
        });
        // 讲解视频
        $('.js-explainvideo').bind("click", function() {
            var homework_id = $(this).attr('homework_id');
            var data = {'homework_id':homework_id}
            $(this).popupshow({
                popupId: 'pop-explainvideo',
                fn: function() {
                    if ($('#taskmainvideo').length) {
                        videojs('taskmainvideo').pause();
                    }
                    $("#pop-explainvideo .videobox").html(JIUYE.loading());
                    $.ajax({
                        type:"post",
                        url:"/task/tips",
                        data: data,
                        dataType:'json',
                        success: function(res) {
                            if (res.video) {
                                var html = '' ;
                                    html += '<video id="explainvideo" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="autoplay" width="600" height="344" poster="/Current/home/images/play_bg.jpg" data-setup="{}">' ;
                                    html += '<source src=' + res.video + ' type="video/mp4" />' ;
                                    html += '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>';
                                    html += '</video>' ;
                            }else{
                                var html= "暂无视频讲解";
                            }
                            $("#pop-explainvideo .videobox").html(html);
                        }
                    });
                },
                callback: function() {
                    // 关闭暂停
                    if ($('#explainvideo').length) {
                        videojs('explainvideo').pause();
                        $("#pop-explainvideo .videobox").html('');
                    }
                }
            });
            return false;
        });
    },
    uploadFile: function() {
        $("input[name='homework_url']").change(function() {
            var filenameReg = /[^\\]+[\.]+\w+$/;
            var fileName = filenameReg.exec($(this).val());
            if (fileName != '') {
                $('.sc-txt').html(fileName);
            }
        });
    },
    tipsClose: function(obj) {
        $(obj + ' .tips-close').bind('click', function() {
            $(this).parent(obj).fadeOut(500, function() {
                $(this).remove();
            });
        });
    },
    progress: function(obj) {
        var progress = obj.attr('data-progress');
        var progressFast = obj.find('.progress-fast');
        var progressPlan = obj.find('.progress-plan');
        var progressNow = obj.find('.progress-now');
        var fastWidth = progress.split(",")[0];
        var planWidth = progress.split(",")[1];
        var nowWidth = progress.split(",")[2];
        var barWidth = obj.find('.progress-bar').width();
        // 最快进度
        TweenMax.to(progressFast, 0.2, {width: fastWidth + "%", onComplete: function() {
            // 计划进度
            TweenMax.to(progressPlan, 0.2, {width: planWidth + "%", onComplete: function() {
                // 我的进度
                TweenMax.to(progressNow, 0.2, {width: nowWidth + "%", onComplete: function() {
                    // 显示提示我的进度
                    progressNow.find('.tooltip').stop(true, true).fadeIn(200);
                    // 其他提示信息 hover 事件
                    obj.find('.progress-bar>div:not(".progress-now") .dot').hover(function() {
                        var dot_this = Math.round($(this).position().left);
                        var progress_now = progressNow.find('.dot');
                        var dot_now = Math.round(progress_now.position().left);
                        // 当前进度与我的进度+/-100是, 隐藏我的进度提示
                        if ((dot_this - dot_now) < 100 || (dot_this - dot_now) < -100) {
                            progressNow.find('.tooltip').stop(true, true).fadeOut(200);
                        }
                        $(this).parent().find('.tooltip').stop(true, true).fadeIn(200);
                    }, function() {
                        $(this).parent().find('.tooltip').stop(true, true).fadeOut(200);
                        progressNow.find('.tooltip').stop(true, true).fadeIn(200);
                    });
                }, ease:Expo.easeOut});
            }, ease:Expo.easeOut});
        }, ease:Expo.easeOut});
    },
    submitTask: function(e,f) {
    	if( typeof stat != 'undefined' )
    	{
    		stat.efunc({pa:0003,pc:5.1,po:79015,jZy:f});
    	}
        var upload = verify('#taskUpload', e, {
            note: '请选择要上传的作业',
            successhint: false,
            target: $('#taskUpload').parents('.sc-content')
        });
        var $content = $('#taskContent').val();
        if ($content) {
            var content = verify('#taskContent', e, {
                note: '',
                minlength: 5,
                maxlength: 1000,
                successhint: false,
                tagname: 'div'
            });
        }else{
            JKXY.msgBox(0, '还是说点什么吧！' , 600);
            return false;
        }
        // 要提交的数据
        var data = {};
        data.homework_id = f ;
        if (upload[0] == true) {
            //data.upload = upload[1];
            data.job_id = $("#job_id").val();
            data.path_id = $("#path_id").val();
            data.task_id = $("#task_id").val();
            data.class_id = $("#class_id").val();
            data.period =  $("#period").val();
            if ($content) {
                if (content[0] == true) {
                    data.message = content[1];
                    ajaxsubmit(data);
                    $('#submitTask').addClass('disabled');
                    $('#submitTask').unbind('click');
                }
            } else {
                ajaxsubmit(data);
                $('#submitTask').addClass('disabled');
                $('#submitTask').unbind('click');
            }
        }

        // 提交函数
        function ajaxsubmit(data) {

            data.message = encodeURIComponent(data.message);
            $.ajaxFileUpload({
                url:'/task/subWork/',//上传附件的脚本
                secureuri :false,
                fileElementId :'taskUpload',//file控件id
                data : data ,
                dataType : 'json',
                success : function (res){
                    if (res.tip == 'sus') {
                        JKXY.msgBox(1, res.msg , 3000)
                        $('#formTask').find('.note.error-txt').remove();
                        $('#formTask').find('input, textarea').val('');
                        $('#formTask').find('.sc-txt').text('只能传'+ext+'格式文件，大小不得超过'+confHomework.maxSize+'MB');
                        $("#pop-task .close").click();
                        if( typeof stat != 'undefined' )
				    	{
				    		stat.efunc({pa:0003,pc:5.3,po:79017,jZy:f,jZyS:1});
				    	}
                        document.location.reload()
                    }else{
                        JKXY.msgBox(0, res.msg , 3000);
                        // if($('#sumaryresult .summary-relearn .con #summarycon').length == 1){
                        // 	$('#sumaryresult .summary-relearn .con').html('<h3>任务全部作业最后一次提交老师批改及格（60分）后才可以提交过关申请。</h3>');
                        // }
                        if( typeof stat != 'undefined' )
				    	{
				    		stat.efunc({pa:0003,pc:5.3,po:79017,jZy:f,jZyS:0});
				    	}
                        $('#formTask').find('.note.error-txt').remove();
                    }
                },
                error: function(res){
                	if( typeof stat != 'undefined' )
			    	{
			    		stat.efunc({pa:0003,pc:5.3,po:79017,jZy:f,jZyS:0});
			    	}
                    if (res.msg) {
                        JKXY.msgBox(0, res.msg , 3000) ;
                    }else{
                        JKXY.msgBox(0, '只能传'+ext+'格式文件，大小不得超过'+confHomework.maxSize+'MB' , 3000) ;
                    }
                }
            });
        }
    },
    canvasSize: function() {
        $('canvas').attr({width: 260, height: 260});
    },
    markSlice: function(obj) {
        var maskData = obj.attr('data-mark');
        var $mark_li = obj.find('.progress-mark li');
        var modulo = maskData % 4;
        var quotient = Math.floor(maskData / 4);
        if (modulo > 2) quotient = quotient + 1;

        obj.find('.progress-mark li:not(:last)').each(function(i) {
            $(this).text(i * quotient);
        });
        $mark_li.last().text(maskData);
    },
    timermask: function(obj, color, size) {
        var html = '<div class="showtimemask ' + color + ' '+ size + '">STOP</div>';
        obj.find('.showtimemask').remove();
        obj.append(html);
    },
    faqDrop: function(elem) {
        var self = this;
        var $elem = $(elem);
        var $title = $elem.children('dt');
        var href = document.location.hostname;
        var id, dataId;
        $title.bind('click', function() {
            var $this = $(this);
            var $item = $this.parent('dl');
            id = $item.attr('id');
            dataId = $item.attr('data-id');

            if (!$item.hasClass('active')) {
                $elem.removeClass('active');
                $item.addClass('active');
                self.setUrl(href ,id, dataId);
            } else {
                $item.removeClass('active');
            }
        });
    },
    setUrl: function(href, id, dataId) {
        if (id == undefined || dataId == undefined) return;
        var http = window.location.protocol + '//';
        var url = http + href + '/faq/' + dataId;
        if (!!(window.history && history.pushState)) {
            history.pushState(null, null, url);
        } else {
            window.location.href = url
        }
    }
};

// 倒计时
JIUYE.showTimes = function (startTime, lastTime, step) {
    this.startTime = Date.parse(startTime);  //开始时间
    this.lastTime = Date.parse(lastTime);  //到期时间
    this.step = step * 1000;  //执行的阶段时间，一般是1秒
};
JIUYE.showTimes.prototype = {
    atTime: function (a, b) {
        //参数说明：a:到期回调方法，b:倒计时回调方法
        var that = this;
        var timeold = parseFloat(Number(that.lastTime) - Number(that.startTime));
        var msPerDay = 24 * 60 * 60 * 1000;
        var e_daysold = timeold / msPerDay
        var daysold = Math.floor(e_daysold);  //天
        var e_hrsold = (e_daysold - daysold) * 24;
        var hrsold = Math.floor(e_hrsold);  //小时
        var e_minsold = (e_hrsold - hrsold) * 60;
        var minsold = Math.floor((e_hrsold - hrsold) * 60);  //分钟
        var seconds = Math.round((e_minsold - minsold) * 60);  //秒
        var msSeconds = Math.ceil(Math.round(((e_minsold - minsold) * 60 - seconds) * 1000) / 100) * 10;
        if (msSeconds == 100) {
            msSeconds = 99;
        }
        if (that.startTime >= that.lastTime) {
            arguments[0]();
        } else {
            arguments[1](that.getStr(daysold), that.getStr(hrsold), that.getStr(minsold), that.getStr(seconds), that.getStr(msSeconds));
            that.startTime = parseInt(that.startTime) + that.step;
            window.setTimeout(function () {
                that.atTime(a, b);
            }, that.step);
        }
    },
    getStr: function (num) {
        return num.toString().length < 2 ? "0" + num : num;
    }
};
$(function() {
    JIUYE.init();
})
var JKXY = JKXY || {};
JKXY.msgBox = function(status, msg, show_time, callBack) {
	var msg = msg ? msg : '亲爱的VIP，这是来自极客学院小雪的 Hello~';
	var id = "warning";
	var show_time = parseInt(show_time) ? parseInt(show_time) : 1500;
	switch (status) {
		case 1:
			var color_class = "waring-success";
			break;
		case 0:
			var color_class = "waring-failure";
			break;
		case 2:
		default:
			var color_class = "waring-sub";
			break;
	}
	var html;
	html = '<div class="web-dia-tip ' + color_class + '" id="' + id + '" >';
	html += msg;
	html += '</div>';
	$('body').append(html);

	var _W = $('#' + id).width() / 2;
	$('#' + id).css("marginLeft", -_W);
	$('#' + id).animate({
		top: "0px",
		opacity: 1
	}, 300, function() {
		$('#' + id).delay(show_time).animate({
			top: "-50px",
			opacity: 0
		}, 500, function() {
			$('#' + id).remove();
			if (typeof(callBack) == 'function') {
				callBack();
			}
		});
	});
};

var domain = {
    domain: function(url){
        var durl=/http:\/\/([^\/]+)\//i;
        var hosts = url.match(durl);
        hosts = hosts[1];
        d_arr = hosts.split('.');
        hosts = d_arr[d_arr.length - 2] + '.' + d_arr[d_arr.length - 1];
        return hosts;
    },
    domain_pre: function(url){
        var durl=/http:\/\/([^\/]+)\//i;
        var hosts = url.match(durl);
        hosts = hosts[1];
        d_arr = hosts.split('.');
        return d_arr[0];
    },
    domain_arr: function(url){
        var durl=/http:\/\/([^\/]+)\//i;
        var hosts = url.match(durl);
        hosts = hosts[1];
        d_arr = hosts.split('.');
        return d_arr;
    },
    currentUrl:window.location.href
};
var host_arr = domain.domain_arr(window.location.href);
var baseUrl = host_arr[1] + '.' + host_arr[2];
var passportUrl= "http://passport." + baseUrl;
var wwwUrl = "http://www."  + baseUrl;
var jiuyeUrl = "http://jiuye." + baseUrl ;
var myUrl = "http://my." + baseUrl ;
var safeCodeUrl = passportUrl + "/sso/verify";
var passportUrlFix = host_arr[1] + '.' + host_arr[2];
var qq_login_url = passportUrl + '/connect/qq',
    wx_login_url = passportUrl + '/connect/weixin',
    weibo_login_url = passportUrl + '/connect/weibo',
    eoe_login_url=passportUrl + '/connect/eoe';

var event_stop = {
    rightdia: false,
    usercare: false
};
var pub_url = "static/";
var www_url = wwwUrl;//"http://www.jikexueyuan.lc/";
var jiuye_url = jiuyeUrl ;
var my_url = myUrl ;
var qq_login_url = passportUrl + "/connect/qq";
var wx_login_url = passportUrl + "/connect/weixin";
var weibo_login_url = passportUrl + "/connect/weibo";
var eoe_login_url = passportUrl + "/connect/eoe";

var uname,
    code,
    uid,
    reg= new RegExp("(^| )uname=([^;]*)(;|$)");
    if (document.cookie.match(reg) && document.cookie.match(reg)[2]) {
        uname = decodeURI(document.cookie.match(reg)[2]);
    }
    reg= new RegExp("(^| )code=([^;]*)(;|$)");
    if (document.cookie.match(reg) && document.cookie.match(reg)[2]) {
        code = decodeURI(document.cookie.match(reg)[2]);
    }
    reg= new RegExp("(^| )uid=([^;]*)(;|$)");
    if (document.cookie.match(reg) && document.cookie.match(reg)[2]) {
        uid = document.cookie.match(reg)[2]
    }
var isLogin = uname ? true : false;

var login = {
    login:
        '<span>' +
            '<a href="javascript:void(0);" class="diaLoginBtn" activity="activity" postion="event_index_header" rel="nofollow">' +
                '登录' +
            '</a>' +
        '</span>' +
        '<em>' +
            '|' +
        '</em>' +
        '<span>' +
            '<a href="javascript:void(0);" class="diaRegBtn" activity="activity" postion="event_index_header" rel="nofollow">' +
                '注册' +
            '</a>' +
        '</span>',
    info: '<div class="greencolor relative user-name" id="user-name">' +
            '<p>' +
                '<a href="' + www_url + '/member/" id="login-user">' +
                    uname +
                '</a>' +
                '<img src="http://e.jikexueyuan.com/static/images/jiaotou.png"' +
                'class="jiaotou">' +
            '</p>' +
            '<div class="user-center absolute">' +
                '<img src="http://e.jikexueyuan.com/static/images/abc.png" class="sj-icon absolute">' +
                '<div>' +
                    // '<a href="' + my_url + '">' +
                    //     '个人主页' +
                    // '</a>' +
                    // '<a href="' + www_url + '/member/">' +
                    //     '个人中心' +
                    // '</a>' +
                    // '<a href="' + www_url + '/member/mycourse.html">' +
                    //     '我的课程' +
                    // '</a>' +
                    '<a href="' + jiuye_url + '/myclass">' +
                        '我的就业班' +
                    '</a>' +
                    // '<a href="' + www_url + '/member/freevip.html">' +
                    //     '免费VIP' +
                    // '</a>' +
                    // '<a href="' + www_url + '/member/mycode.html">' +
                    //     '我的F码' +
                    // '</a>' +
                    // '<a href="' + www_url + '/member/setting.html">' +
                    //     '账号设置' +
                    // '</a>' +
                    // '<a href="' + www_url + '/member/connect.html">' +
                    //     '一键绑定' +
                    // '</a>' +
                    '<a href="'+ passportUrl +'/submit/logout">' +
                        '退出' +
                    '</a>' +
                '</div>' +
            '</div>' +
        '</div>'
};

if (isLogin) {
    $('.loginbox_event').html(login.info);
} else {
    $('.loginbox_event').html(login.login);
}

$(function() {
    $('.signUp').on('click',function(){
        if(isLogin){
            // 申请报名要去到的报名页面
            var class_id = $('.signUp').attr("class_id");
            // window.location.href="/enroll/signup?class_id=" + class_id;
            window.open("/enroll/signup?class_id=" + class_id,"_blank");
        }else{
            $(this).addClass('loginnow');
        }
    });
});
