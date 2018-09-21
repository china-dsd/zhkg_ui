var url = "http://127.0.0.1:8090";
var token = "9385d137-a82f-439c-bbc6-fbb5979edf4e";




$(function(){
    //点击按钮增加选中框
    $('.yw').click(function () {
        $(this).addClass('active');
        $('.hx').removeClass('active');
    })
    $('.hx').click(function () {
        $(this).addClass('active');
        $('.yw').removeClass('active');
    });
})

//成熟度评分 （折线图）
var lineChart_1 = echarts.init(document.getElementById("box1"));
var lineOption_1 = {
    legend: {
        data:['成熟度评分'],
        textStyle: {
            color: '#ffffff',
        },
        // x: "right",
        right: '40'
    },
    xAxis: {
        type: 'category',
        //左右两边不留白
        boundaryGap: false,
        // data: ['2015-7', '2016-1', '2016-7', '2017-1', '2017-7', '2018-1'],
        //刻度不显示
        axisTick:{
            show:false
        },
        //横坐标
        axisLine:{
            lineStyle: {
                color: '#ffffff',
                type: 'dashed'  //'dotted'虚线 'solid'实线
            },

        },
        axisLabel: {
            color:'#ffffff',
            fontSize:'14px'
        },
    },
    yAxis: {
        type: 'value',
        name: '(分)',
        nameTextStyle:{
            color:'#ffffff',
        },
        //刻度不显示
        axisTick:{
            show:false
        },
        // 轴线
        axisLine : {
            show: true,
            lineStyle: {
                color: '#ffffff',
                type: 'dashed',
            }
        },
        axisLabel: {
            color:'#ffffff',
            fontSize:'14px'
        },
        splitLine : {
            show:true,
            lineStyle: {
                color: '#1B7391',
                type: 'dashed',
            }
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    series: [{
        // name:'成熟度评分',
        // data: [100,300,100,300,100,400],
        type: 'line',
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#164270'
                }, {
                    offset: 1,
                    color: '#2E93D4'
                }])
            }
        },
        itemStyle: {
            normal: {
                //点的颜色
                color: "#AF792D",
                lineStyle: {
                    type: 'solid',  //'dotted'虚线 'solid'实线
                    //线的颜色
                    color:'#35ecf4'
                }
            }
        }
    },]
};
lineChart_1.setOption(lineOption_1);
//风险事件数量及金额 （柱状图）
var barChart_1 = echarts.init(document.getElementById("box2"));
barOption_1 = {
    color: ['#daa14f', '#2999d3',],
    grid: {
        right:15,
        containLabel: true,
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: {},
        right:20,
        textStyle:{
            color:'#ffffff',
        }
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data: [],
            //刻度不显示
            axisTick:{
                show:false
            },
            //坐标轴
            axisLine:{
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed'  //'dotted'虚线 'solid'实线
                },
            },
            //横坐标数值
            axisLabel: {
                color:'#ffffff',
                fontSize:'14px'
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            //刻度不显示
            axisTick:{
                show:false
            },
            name: '(个)',
            nameTextStyle:{
                color:'#ffffff',
            },
            // 轴线
            axisLine : {
                show: true,
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed',
                }
            },
            // 轴线值
            axisLabel: {
                color:'#ffffff',
                fontSize:'14px'
            },
            splitLine : {
                show:true,
                lineStyle: {
                    color: '#1B7391',
                    type: 'dashed',
                }
            },
        },
        {
            type: 'value',
            scale: true,
            type: 'value',
            name: '(万元)',
            nameTextStyle:{
                color:'#ffffff',
            },
            min: 0,
            type: 'value',
            //刻度不显示
            axisTick:{
                show:false
            },
            // 轴线
            axisLine : {
                show: true,
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed',
                }
            },
            // 轴线值
            axisLabel: {
                color:'#ffffff',
                fontSize:'14px'
            },
            splitLine : {
                show:true,
                lineStyle: {
                    color: '#1B7391',
                    type: 'dashed',
                }
            },
        }
    ],
    series: []
};
function getBarData_1() {
    $.ajax({
        type:"GET",
        url: url+"/index/barChart?type=1"+"&token="+token,
        data:{},
        dataType:"json",
        success: function(res){
            var data = res.data;
            if(res.code == "000000"){
                var BarData_1= [];
                var _title = [];
                var _name = [];
                $.each(data,function(index){
                    _title.push(data[index].title);
                    _name = data[index].name;
                    var eChart = {};
                    eChart.name=data[index].title
                    eChart.type='bar'
                    eChart.barGap=0
                    eChart.data = data[index].data;
                    if (index == 0) {
                        // 
                    }else{
                        eChart.yAxisIndex=1
                    }
                    BarData_1.push(eChart);
                })
                barOption_1.xAxis[0].data = _name;
                barOption_1.legend.data = _title;
                barOption_1.series = BarData_1;
                barChart_1.setOption(barOption_1);
            }else if(res.code == '100001'){
                location.href="/";
            }
        }
    })
}
getBarData_1()
//风险评估 （饼状图）
var pieChart_1 = echarts.init(document.getElementById("box3_1"));
pieOption_1 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right:80,
        y: 'center',
        data: [],
        textStyle:{
            color:'#ffffff',
        }
    },
    series: [
        {
            name:'风险事件数量图',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[]
        }
    ]
};
pieChart_1.setOption(pieOption_1);
//风险评估 （饼状图）数据对接
function getPieData_1(){
    $.ajax({
        type:'GET',
        url: url+"/index/pieChart?type=1"+"&token="+token,
        data:{},
        dataType:"json",
        success: function(res){
            var data = res.data;
            if(res.code == '000000'){
                var PieData_1 = data;
                var PieName_1 = [];
                $.each(data,function(index){
                    PieName_1.push(data[index].name);    
                })
                pieOption_1.legend.data = PieName_1;
                pieOption_1.series[0].data = PieData_1;
                pieChart_1.setOption(pieOption_1);
            }
            else if(res.code == '100001'){
                location.href="/";
            }
        }   
    })
}
getPieData_1();
//法律案件 （柱状图）
var barChart_2 = echarts.init(document.getElementById("box4"));
barOption_2 = {
    color: ['#daa14f', '#2999d3',],
    grid: {
        left: '6%',
        right:60,
        containLabel: true,
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data:{},
        right:10,
        top:5,
        textStyle:{
            color:'#ffffff',
        }
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
    },
    calculable: true,
    yAxis: [
        {
            type: 'category',
            data: [],
            //刻度不显示
            axisTick:{
                show:false
            },
            //坐标轴
            axisLine:{
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed'  //'dotted'虚线 'solid'实线
                },

            },
            //横坐标数值
            axisLabel: {
                color:'#ffffff',
                fontSize:'14px'
            },
            splitLine : {
                show:true,
                lineStyle: {
                    color: '#1B7391',
                    type: 'dashed',
                }
            },
        }
    ],
    xAxis: [
        {
            type: 'value',
            //刻度不显示
            axisTick:{
                show:false
            },
            name: '(个)',
            nameTextStyle:{
                color:'#ffffff',
            },
            // 轴线
            axisLine : {
                show: true,
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed',
                }
            },
            // 轴线值
            axisLabel: {
                color:'#ffffff',
                fontSize:'14px'
            },
            splitLine : {
                show:true,
                lineStyle: {
                    color: '#1B7391',
                    type: 'dashed',
                }
            },
        },
        {
            type: 'value',
            scale: true,
            type: 'value',
            name: '(万元)',
            nameTextStyle:{
                color:'#ffffff',
            },
            min: 0,
            type: 'value',
            //刻度不显示
            axisTick:{
                show:false
            },
            // 轴线
            axisLine : {
                show: true,
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed',
                }
            },
            // 轴线值
            axisLabel: {
                show:false,
                color:'#ffffff',
                fontSize:'14px'
            },
            splitLine : {
                show:true,
                lineStyle: {
                    color: '#1B7391',
                    type: 'dashed',
                }
            },
        },
    ],
    series: []
};
function getBarData_2() {
    $.ajax({
        type:"GET",
        url: url+"/index/barChart?type=2"+"&token="+token,
        data:{},
        dataType:"json",
        success: function(res){
            var data = res.data;
            if(res.code == "000000"){
                var BarData_2= [];
                var _title = [];
                var _name = [];
                $.each(data,function(index){
                    _title.push(data[index].title);
                    _name = data[index].name;
                    var eChart = {};
                    eChart.name=data[index].title
                    eChart.type='bar'
                    eChart.barGap=0
                    if (index == 0) {
                        eChart.data = data[0].data;
                    } else {
                        // var num = [];
                        // $.each(data[1].data,function(index){
                        //     num.push((data[1].data[index]/1e4).toFixed(1))
                        // })
                        eChart.data = data[1].data;
                        eChart.xAxisIndex=1
                    }
                    BarData_2.push(eChart);
                })
                barOption_2.yAxis[0].data = _name;
                barOption_2.legend.data = _title;
                barOption_2.series = BarData_2;
                barChart_2.setOption(barOption_2);
            }else if(res.code == '100001'){
                location.href="/";
            }
        }
    })
}
getBarData_2()
//各单位全国分布图 (地图)
var mapChart_1 = echarts.init(document.getElementById('box5'))
//数据
var data = [];
var geoCoordMap = {};
var convertData = function(data) {
    var res = [];
    for(var i = 0;i < data.length;i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if(geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
}
//mapChart的配置
var mapOption_1 = {
    geo:{
        map:'china',
        // roam: true,                //定义是否可缩放和拖拽
        itemStyle: {                 //定义样式
            normal: {                //普通状态下的样式
                areaColor: '#A2E3F2',
                borderColor: '#111'
            },
            emphasis: {              //高亮状态下的样式
                areaColor: '#ffffff'
            }
        }
    },
    series: [
        {
            name: '销量',   //series名称
            type: 'scatter',  //series图标类型
            coordinateSystem: 'geo',  //series坐标系类型
            data: convertData(data),   //series数据内容
            symbolSize: function (val) {  //根据值的多少来确定散点的大小
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
         itemStyle: {
             normal: {
                 color: '#ddb926'
             }
         }
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: false,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'purple',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ],

    //视觉映射组件，是标识某一数据范围内数据及颜色对应关系的控件
    visualMap: {
        show:false,
        type: 'continuous', //连续型
        min: 0,             //值域最小，必须参数
        max: 200,           //值域最大，必须参数
        calculable: true,   //是否启用值域漫游，通过拖拽控件手柄选择不同数值范围，达到对图表数据的筛选显示
        inRange: {
            color:['#0A947D','#eac736','#993C2C']  //指定数值从低到高时的颜色变化
        },
        textStyle: {
            color: '#fff'   //值域控件的文本颜色
        }
    }
};
mapChart_1.setOption(mapOption_1);
//审计问题整改记录6_1 （饼图）
var pieChart_2 = echarts.init(document.getElementById("box6_1"));
var pieOption_2 = {
    color: ['#daa14f'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name:'',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[]
        }
    ]
};
pieChart_2.setOption(pieOption_2);
//审计问题整改记录6_2 （饼图）
var pieChart_3 = echarts.init(document.getElementById("box6_2"));
var pieOption_3 = {
    color: ['#2999d3'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name:'',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[]
        }
    ]
};
pieChart_3.setOption(pieOption_3);
//审计问题整改记录6_3 （饼图）
var pieChart_4 = echarts.init(document.getElementById("box6_3"));
var pieOption_4 = {
    color: ['#daa14f'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name:'',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[]
        }
    ]
};
pieChart_4.setOption(pieOption_4);
//审计问题整改记录6_4 （饼图）
var pieChart_5 = echarts.init(document.getElementById("box6_4"));
var pieOption_5 = {
    color: ['#2999d3'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name:'',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[]
        }
    ]
};
pieChart_5.setOption(pieOption_5);
//审计问题整改记录（饼图）数据对接
// var PieData_2 = [];
function getPieData_sj(){
    $.ajax({
        type:"GET",
        url: url+"/index/pieChart?type=2"+"&token="+token,
        data:{},
        dataType:"json",
        success: function(res){
            var data = res.data;
            if(res.code == '000000'){
                // 审计问题整改饼图1
                var PieName_2 = [];
                var PieData_2 = [];
                PieData_2.push(data[0]);
                PieName_2.push(data[0].name);
                $("#pie_2").html(data[0].value);
                pieOption_2.series[0].data = PieData_2;
                pieOption_2.series[0].name = PieName_2;
                pieChart_2.setOption(pieOption_2);
                //审计问题整改饼图2
                var PieName_3 = [];
                var PieData_3 = [];
                PieData_3.push(data[1]);
                PieName_3.push(data[1].name);
                $("#pie_3").html(data[1].value);
                pieOption_3.series[0].data = PieData_3;
                pieOption_3.series[0].name = PieName_3;
                pieChart_3.setOption(pieOption_3);
                //审计问题整改饼图3
                var PieName_4 = [];
                var PieData_4 = [];
                PieData_4.push(data[2]);
                PieName_4.push(data[2].name);
                $("#pie_4").html(data[2].value);
                pieOption_4.series[0].data = PieData_4;
                pieOption_4.series[0].name = PieName_4;
                pieChart_4.setOption(pieOption_4); 
                //审计问题整改饼图4
                var PieName_5 = [];
                var PieData_5 = [];
                PieData_5.push(data[3]);
                PieName_5.push(data[3].name);
                $("#pie_5").html(data[3].value);
                pieOption_5.series[0].data = PieData_5;
                pieOption_5.series[0].name = PieName_5;
                pieChart_5.setOption(pieOption_5);
            }else if(res.code == '100001'){
                location.href="/";
            }
        }
    })
}

getPieData_sj();
//审计问题记录 (柱状图)
var barChart_3 = echarts.init(document.getElementById("box7"));
barOption_3 = {
    color: ['#1D6B94', '#0B947B','#973A2C'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data:{},
        right:50,
        textStyle:{
            color:'#ffffff',
        }
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            axisTick: {show: false},
            data: [],
            //刻度不显示
            axisTick:{
                show:false
            },
            //坐标轴
            axisLine:{
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed'  //'dotted'虚线 'solid'实线
                },

            },
            //横坐标数值
            axisLabel: {
                color:'#ffffff',
                fontSize:'14px',
                interval: 0 ,
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            //刻度不显示
            axisTick:{
                show:false
            },
            name: '(个)',
            nameTextStyle:{
                color:'#ffffff',
            },
            // 轴线
            axisLine : {
                show: true,
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed',
                }
            },
            // 轴线值
            axisLabel: {
                color:'#ffffff',
                fontSize:'14px'
            },
            splitLine : {
                show:true,
                lineStyle: {
                    color: '#1B7391',
                    type: 'dashed',
                }
            },
        },
    ],
    series: []
};
function getBarData_3() {
    $.ajax({
        type:"GET",
        url: url+"/index/barChart?type=3"+"&token="+token,
        data:{},
        dataType:"json",
        success: function(res){
            var data = res.data;
            if(res.code == "000000"){
                var BarData_3= [];
                var _title = [];
                var _name = [];
                $.each(data,function(index){
                    _title.push(data[index].title);
                    _name = data[index].name;
                    var eChart = {};
                    eChart.name=data[index].title
                    eChart.type='bar'
                    eChart.barGap=0
                    eChart.data = data[index].data;
                    BarData_3.push(eChart);
                })
                barOption_3.xAxis[0].data = _name;
                barOption_3.legend.data = _title;
                barOption_3.series = BarData_3;
                barChart_3.setOption(barOption_3);
            }else if(res.code == '100001'){
                location.href="/";
            }
        }
    })
}
getBarData_3()
//合作公司信用等级占比 （饼图）
var pieChart_6 = echarts.init(document.getElementById("box8"));
pieOption_6 = {
    color:['#1A688A','#2999D3','#2999D3','#20977E','#22B89A'],
    tooltip : {
        trigger: 'item',
    },
    legend: {
        type:'scroll',
        x: '250',
        y:'20',
        orient: 'vertical',
        textStyle:{
            color:'#ffffff',
        },
        height:140,
        data:[],
        selected:{},
    },
    calculable : true,
    series : [
        {
            name:'合作公司信用等级占比',
            type:'pie',
            radius : [20, 70],
            center : ['25%', '50%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
            },
            data:[]

        }
    ]
};
pieChart_6.setOption(pieOption_6);
//(柱状堆积)
var barChart_4 = echarts.init(document.getElementById("box10"));
barOption_4 = {
    color: ['#daa14f', '#2999d3',],
    grid: {
        left:8,
        containLabel: true,
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:[],
        right:20,
        textStyle:{
            color:'#ffffff',
        },
    },
    xAxis:  {
        axisLabel: {
            show: true,    //这行代码控制着坐标轴x轴的文字是否显示
            textStyle: {
                color: '#fff',   //x轴上的字体颜色
                fontSize:'10'    // x轴字体大小
            }
        },
        splitLine:{
            show:false,
        },
        axisTick:{
            show:false
        },
        //坐标轴
        axisLine:{
            lineStyle: {
                color: '#ffffff',
                fontSize:'5',
                type: 'dashed'
            },
        },
    },
    yAxis: {
        name: '(万元)',
        //横坐标数值
        axisLabel: {
            show:true,
            fontSize :10,
        },
        type: 'value',
        axisTick:{
            show:false
        },
        //坐标轴
        axisLine:{
            lineStyle: {
                color: '#ffffff',
                type: 'dashed'  //'dotted'虚线 'solid'实线
            },
        },
        splitLine : {
            show:true,
            lineStyle: {
                color: '#1B7391',
                type: 'dashed',
            }
        },
    },
    series: [ ],
};
function getBarData_4(){
    $.ajax({
        type:"GET",
        url:url+"/index/barChart?type=4"+"&token="+token,
        data:{},
        dataType: "json",
        success: function(res){
            var data = res.data;
            if(res.code == "000000"){
                var BarData_4= [];
                var BarTitle_4 = [];
                var BarName_4 = [];
                $.each(data,function(index){
                    BarTitle_4.push(data[index].title);
                    BarName_4 = data[index].name;
                    var eChart = {};
                    eChart.name=data[index].title;
                    eChart.type='bar';
                    eChart.stack='总量';
                    // var data2 = data[index].data;
                    // var _num = [];
                    // $.each(data2,function(index){
                    //     _num.push((data2[index]/1e4).toFixed(1));
                    // });
                    eChart.data = data[index].data;
                    BarData_4.push(eChart);
                })
                barOption_4.xAxis.data = BarName_4;
                barOption_4.legend.data = BarTitle_4;
                barOption_4.series = BarData_4;
                barChart_4.setOption(barOption_4);
            }else if(res.code == '100001'){
                location.href="/";
            }
        }
    })
}
getBarData_4();


//重大风险事件（字浮云）
var wordCloudChart = echarts.init(document.getElementById("box9"));
wordCloud = {
    tooltip: {
        show: true
    },
    series: [{
        textStyle : {
            normal : {
                color : '#36f8ff'
            },
        },
        name: '重大风险事件',
        type: 'wordCloud',
        size: ['100%', '100%'],
        // itemStyle:{
        //      color:'#33edf4',
        // },
        // 旋转最大和最小角度
        rotationRange: [0, 0],
        //rotationStep:30,//文字旋转单位
        // 不知道是啥
        textRotation: [0, 0],
        textPadding: 0,
        autoSize: {
            enable: true,
            minSize: 14
        },
        data: []
    }]
};
wordCloudChart.setOption(wordCloud);
function getwordCloudData(){
    $.ajax({
        type: 'GET',
        url: url+"/index/wordCloud?type=1&token="+token,
        data: {},
        dataType:'json',
        success: function(res){
            var data = res.data;
            var proj_title = data;
            if(res.code =="000000"){
                wordCloud.series[0].data = proj_title;
                wordCloudChart.setOption(wordCloud);
            }else if(res.code == "100001"){
                location.href = '/';
            }
        }
    });
}
getwordCloudData();

