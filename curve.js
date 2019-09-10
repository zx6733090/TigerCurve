//获取运行曲线函数
//@param {Number} period 循环周期
//@param {Number} targetValue 目标值。假设周期是8，目标值可以值0到7任意一个数字
//@param {Number} time 运行时间。-1表示手动停止
//@return {Number} 当前位置，-1表示结束
function getCurve(period, targetValue, time) {
    //最大运行速度，如果循环周期长，可以调快点
    var maxSpeed = 30
    if (time > 0) {
        //加速多少圈达到最大速度，表示停止的快慢
        var easeCircle = 12
        var n = Math.max(parseInt(maxSpeed * time / period) - easeCircle, 1)
        //加速时间
        var t1 = time - (n * period + targetValue) / maxSpeed
        //加速度
        var acc = maxSpeed / t1
        return function (t) {
            var rs = 0;
            if (t < t1) {
                //第一段 加速
                rs = acc * t * t / 2
            } else if (t < time - t1) {
                //第二段 匀速
                rs = maxSpeed / 2 * t1 + (t - t1) * maxSpeed
            } else {
                //第三段 减速
                var decTime = (t - (time - t1))
                var cur = maxSpeed - acc * decTime
                if (cur < 0) {
                    rs = -1
                } else {
                    rs = maxSpeed / 2 * t1 + (time - 2 * t1) * maxSpeed + (cur + maxSpeed) / 2 * decTime
                }
            }
            //输出规范化的值
            return Math.round(rs) % period
        }
    } else {
        //停止状态
        var bStop = 0
        //调用停止命令的时候，之前运行的时间
        var decTime = 0
        //调用停止命令的时候，走的路程
        var distance = 0
        var acc = maxSpeed / 0.5
        var func = function (t) {
            var rs = 0
            if (t < 0.5) {
                //第一段 加速
                rs = acc * t * t / 2
            } else if (bStop == 0) {
                //第二段 匀速 ，没有停止命令前，一直保持
                rs = maxSpeed / 2 * 0.5 + (t - 0.5) * maxSpeed
            } else if (bStop == 1) {
                //开始减速，计算需要到达指定位置所需的加速度
                bStop = 2
                decTime = t
                distance = Math.round(maxSpeed / 2 * 0.5 + (t - 0.5) * maxSpeed)
                //减速的圈数，表示减速的快慢
                var easeCircle = 6
                var remain = targetValue - distance % period + easeCircle * period
                acc = maxSpeed * maxSpeed / (2 * remain)
            }
            if (bStop == 2) {
                //减速，到达指定位置
                var t1 = t - decTime
                var cur = maxSpeed - acc * t1
                rs = cur < 0 ? -1 : distance + (maxSpeed + cur) / 2 * t1
            }
            //输出规范化的值
            return Math.round(rs) % period
        }
        func.stop = function () {
            bStop = 1
        }
        return func
    }
}
//获取四个点曲线
//@return {Array} 显示位置数组，null表示结束
function getFourCurve(period, targetValue, time) {
    var arr = []
    for (var i = 0; i < period; i++) {
        if (i != targetValue) {
            arr.push(i)
        }
    }
    //随机除目标值之外的3个值
    var rs = [targetValue]
    for (i = 0; i < 3; i++) {
        var idx = parseInt(Math.random() * arr.length)
        rs.push(arr[idx])
        arr.splice(idx, 1)
    }
    var bEnd = false
    return function (t) {
        if (bEnd) {
            return null
        }
        var rapid = 2
        var early = time - rapid
        var gap = t < early ? 0.3 : 0.05
        if (t < time) {
            return parseInt(t / gap) % 2 == 0 ? rs : []
        } else {
            bEnd = true
            return [targetValue]
        }
    }
}