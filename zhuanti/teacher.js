var tpage = {
    init: function() {
        this.getNum();
        this.discount(); //折扣倒计时
    },
    getNum: function() {
        var num = $('#status').text();
        this.stateChange(num);
    },
    stateChange: function(num) {
        if (num == 1) {
            this.beforeAct(num);
        } else if (num == 2) {
            $('#timeBefore').hide();
            $('#timeNow').show();
            this.nowAct(num);
        } else {
            $('#timeBefore').hide();
            $('.timeAfter').css('display', 'inline-block').show();
        };
    },
    beforeAct: function(num) {
        var endTime = Date.parse($('#timeBefore').attr('end-time')); //time end
        var startTime = Date.parse($('#timeBefore').attr('start-time')); //time start
        var leftTime = endTime - startTime; //time left
        var timer = $('#timeBefore').find('time');
        tpage.countTime(leftTime, timer, num);
    },
    nowAct: function(num) {
        var endTime = Date.parse($('#timeNow').attr('end-time')); //time end
        var startTime = Date.parse($('#timeNow').attr('start-time')); //time start
        var leftTime = endTime - startTime; //time left
        var timer = $('#timeNow').find('time');
        tpage.countTime(leftTime, timer, num);
    },
    discount: function() {
        var num = $('#status').text();
        if (num == 1 || num == 3) {
            return false; //当活动未开始或者结束则终止
        }
        var endTime = Date.parse($('.discount').attr('end-time')); //time end
        var startTime = Date.parse($('.discount').attr('start-time')); //time start
        var leftTime = endTime - startTime; //time left
        var timer = $('.discount').find('time');
        tpage.countTime(leftTime, timer, 4); //不能1或者2
    },
    countTime: function(t, timer, num) {

        setInterval(function() {
            // console.log(t);
            if (t >= 0) { //t等于0继续计算
                var d = Math.floor(t / 1000 / 60 / 60 / 24); //days
                var h = Math.floor(t / 1000 / 60 / 60 % 24); //hours
                var m = Math.floor(t / 1000 / 60 % 60); //minutes
                var s = Math.floor(t / 1000 % 60); //seconds
            }

            if (h < 10)
                h = "0" + h;
            if (m < 10)
                m = "0" + m;
            if (s < 10)
                s = "0" + s;

            t -= 1000;

            if (t < 0) {
                location.reload();
            }

            if (num == 1) {
                if (d == 0) {
                    timer.html('距活动开始还有' + h + "时" + m + "分" + s + "秒");
                } else {
                    timer.html('距活动开始还有' + d + "天" + h + "时" + m + "分" + s + "秒");
                }
            } else if (num == 2) {
                timer.html('活动开始啦！距结束还有' + h + "时" + m + "分" + s + "秒");
            } else {
                timer.html("<span>" + m + "</span>" + "分" + "<span>" + s + "</span>" + "秒");
            }

        }, 1000)
    }
}

$(function() {
    tpage.init();
})
