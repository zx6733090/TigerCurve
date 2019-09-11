# TigerCurve
生成运行曲线函数

### 用法
**1.** 在8个数(0-7)为周期的循环中，到达目标值4,时间为5秒，返回一个速度曲线。这个曲线函数只有一个参数time,返回当前的位置。 如果为手动停止，时间传-1,调用stop停止。

实例:
> var func = getCurve(8,4,5)   
> var result = func(3) //在第3秒的位置，为result

> var func = getCurve(8,4,-1)   //手动停止  
> func.stop()    //主动停止，会调整加速度，自动停在目标值。
  
效果图(曲线轨迹在最后一张图左边):

  ![two](https://github.com/zx6733090/TigerCurve/blob/master/two.gif) 

**2.**  从4个点中，选择目标值，闪烁由慢到快，最后停在目标点

实例:
> var func = getFourCurve(8,4,5)  
> var result = func(3) //在第三秒需要显示的点数组

效果图(曲线轨迹在最后一张图右边):

  ![one](https://github.com/zx6733090/TigerCurve/blob/master/one.gif) 

曲线轨迹:

![three](https://github.com/zx6733090/TigerCurve/blob/master/three.jpg) 
