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
