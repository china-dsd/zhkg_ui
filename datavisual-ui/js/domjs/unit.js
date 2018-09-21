var url = "http://127.0.0.1:8090";
var token = "9385d137-a82f-439c-bbc6-fbb5979edf4e";


$(function () {
    //FF下用JS实现自定义滚动条
    $(".scroll").niceScroll({
        cursorborder: "",
        cursorcolor: "rgba(0,0,0,0)",
        boxzoom: true
    });
})

$(function(){
    $('.yw').click(function () {
        $(this).addClass('active');
        $('.hx').removeClass('active');
    })
    $('.hx').click(function () {
        $(this).addClass('active');
        $('.yw').removeClass('active');
    });
    scrollsY(".scrollbox");		//多个Y轴
    scrollsXY(".scrollXY");	//多个X轴
})

// 成熟度评分 (折线图)
var lineChart_1 = echarts.init(document.getElementById("box1"));
lineOption_1 = {
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
//风险事件数量及金额 (柱状图)
var barChart_1 = echarts.init(document.getElementById("box2"));
barOption_1 = {
    color: ['#daa14f', '#2999d3',],
    grid: {
        // left: '6%',
        right: 15,
        containLabel: true,
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: [],
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
barChart_1.setOption(barOption_1);
var url = "http://test.flyingsu.com:9000/zxfk";
var token = "9385d137-a82f-439c-bbc6-fbb5979edf4e";
//风险事件数量及金额 (柱状图)数据对接
function getBarData_1(){
    $.ajax({
        type:"GET",
        url: url+"/unit/barChart?type=1"+"&token="+token,
        data:{},
        dataType:"json",
        success: function(res){
            var data = res.data;
            if(res.code == '000000'){
                var BarData_1 = [];
                var BarTitle = [];
                var BarName = [];
                $.each(data,function(index){
                        BarTitle.push(data[index].title);
                        BarName = data[index].name;
                        var eChart = {};                        
                        eChart.name = data[index].title;
                        eChart.type = 'bar';
                        eChart.barGap = 0;
                        eChart.data = data[index].data;
                        if (index == 0) {
                            // 
                        }else{
                            eChart.yAxisIndex=1
                        }
                        BarData_1.push(eChart);
                })
                barOption_1.xAxis[0].data = BarName;
                barOption_1.legend.data = BarTitle;
                barOption_1.series = BarData_1;
                barChart_1.setOption(barOption_1);
            }
        }
    })
}
getBarData_1();

//审计问题记录 (柱状图)
var barChart_2 = echarts.init(document.getElementById("box3"));
barOption_2 = {
    color: ['#1D6B94', '#0B947B','#973A2C'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: [],
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
barChart_2.setOption(barOption_2);
//审计问题记录 (柱状图)数据对接
function getBarData_2(){
    $.ajax({
        type:"GET",
        url: url+"/unit/barChart?type=2"+"&token="+token,
        data:{},
        dataType:"json",
        success: function(res){
            var data = res.data;
            if(res.code == '000000'){
                var BarData_2 = [];
                var BarTitle = [];
                var BarName = [];
                $.each(data,function(index){
                        BarTitle.push(data[index].title);
                        BarName = data[index].name;
                        var eChart = {};                        
                        eChart.name = data[index].title;
                        eChart.type = 'bar';
                        eChart.barGap = 0;
                        eChart.data = data[index].data;
                        BarData_2.push(eChart);
                })
                barOption_2.xAxis[0].data = BarName;
                barOption_2.legend.data = BarTitle;
                barOption_2.series = BarData_2;
                barChart_2.setOption(barOption_2);
            }
        }
    })
}
getBarData_2();

//法律案件数量及金额 （柱状图）
var barChart_3 = echarts.init(document.getElementById("box4"));
barOption_3 = {
    color: ['#daa14f', '#2999d3',],
    grid: {
        left: '13%',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: [],
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
            name: '(件)',
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
        }
    ],
    series: []
};
barChart_3.setOption(barOption_3);
//法律案件数量及金额 （柱状图）数据对接
function getBarData_3(){
    $.ajax({
        type:"GET",
        url: url+"/unit/barChart?type=3"+"&token="+token,
        data:{},
        dataType:"json",
        success: function(res){
            var data = res.data;
            if(res.code == '000000'){
                var BarData_3 = [];
                var BarTitle = [];
                var BarName = [];
                $.each(data,function(index){
                        BarTitle.push(data[index].title);
                        BarName = data[index].name;
                        var eChart = {};                        
                        eChart.name = data[index].title;
                        eChart.type = 'bar';
                        eChart.barGap = 0;
                        if (index == 0) {
                            eChart.data = data[0].data;
                        } else {
                            var num = [];
                            $.each(data[1].data,function(index){
                                num.push((data[1].data[index]/1e4).toFixed(1))
                            })
                            eChart.data = num;
                            eChart.xAxisIndex=1
                        }
                        BarData_3.push(eChart);
                })
                barOption_3.yAxis[0].data = BarName;
                barOption_3.legend.data = BarTitle;
                barOption_3.series = BarData_3;
                barChart_3.setOption(barOption_3);
            }
        }
    })
}
getBarData_3();

//审计问题整改记录7_1 （饼图）
var pieChart_1 = echarts.init(document.getElementById("box7_1"));
pieOption_1 = {
    color: ['#daa14f'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name: [],
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
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

//审计问题整改记录7_2 （饼图）
var pieChart_2 = echarts.init(document.getElementById("box7_2"));
pieOption_2 = {
    color: ['#2999d3'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name:[],
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
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
pieChart_2.setOption(pieOption_2);

//审计问题整改记录7_3 （饼图）
var pieChart_3 = echarts.init(document.getElementById("box7_3"));
pieOption_3 = {
    color: ['#daa14f'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name:[],
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
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
pieChart_3.setOption(pieOption_3);

//审计问题整改记录7_4 （饼图）
var pieChart_4 = echarts.init(document.getElementById("box7_4"));
pieOption_4 = {
    color: ['#2999d3'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name:[],
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
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
pieChart_4.setOption(pieOption_4);

function getPieData_1() {
    $.ajax({
        type: 'GET',
        url: url+"/unit/pieChart?type=1"+"&token="+token,
        data: {},
        dataType: "json",
        success: function(res){
            var data = res.data;
            if(res.code =='000000'){
                var _series1 = [];
                var _series2 = [];
                var _series3 = [];
                var _series4 = [];
                //第一个饼图
                _series1.push(data[0]);
                pieOption_1.series[0].data = _series1;
                pieOption_1.series[0].name = _series1[0].name;
                pieChart_1.setOption(pieOption_1);
                $("#box7_1_span").html(_series1[0].value);
                //第二个饼图
                _series2.push(data[1]);
                pieOption_2.series[0].data = _series2;
                pieOption_2.series[0].name = _series2[0].name;
                pieChart_2.setOption(pieOption_2);
                $("#box7_2_span").html(_series2[0].value);
                //地三个饼图
                _series3.push(data[2]);
                pieOption_3.series[0].data = _series3;
                pieOption_3.series[0].name = _series3[0].name;
                pieChart_3.setOption(pieOption_3);
                $("#box7_3_span").html(_series3[0].value);
                //第四个饼图
                _series4.push(data[3]);
                pieOption_4.series[0].data = _series4;
                pieOption_4.series[0].name = _series4[0].name;
                pieChart_4.setOption(pieOption_4);
                $("#box7_4_span").html(_series4[0].value);
            }else if(res.code == '100001'){
                location.href='/'
            }
        }
    });
}
getPieData_1();

//合作公司信用等级占比 （饼图）
var pieChart_5 = echarts.init(document.getElementById("box9"));
pieOption_5 = {
    color:['#1A688A','#2999D3','#2999D3','#20977E','#22B89A'],
    tooltip : {
        trigger: 'item',
    },
    legend: {
        type:'scroll',
        x :  '47%',
        height: 140,
        orient: 'vertical',
        textStyle:{
            color:'#ffffff',
        },
        data:[],
        selected: {}
    },
    calculable : true,
    series : [
        {
            name:'半径模式',
            type:'pie',
            // radius:70%
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
pieChart_5.setOption(pieOption_5);
//风险事件统计 （雷达图）
var radarChart = echarts.init(document.getElementById("box10"));
radarOption = {
    tooltip: {
        trigger: 'axis'
    },
    radar: [
        {
            indicator: [
                // {text: '品牌', max: 100},
                // {text: '内容', max: 100},
                // {text: '可用性', max: 100},
                // {text: '功能', max: 100}
            ],

        },
    ],
    series: [
        {
            type: 'radar',
            tooltip: {
                trigger: 'item'
            },
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [
                // {
                //     value: [60,73,85,40],
                //     name: '某软件'
                // }
            ]
        },


    ]
};
radarChart.setOption(radarOption);
//风险评估11_1 (饼图)
var pieChart_6 = echarts.init(document.getElementById("box11_1"));
pieOption_6 = {
    color: ['#daa14f', '#2999d3','#22B89A'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right:0,
        y: 'center',
        data:[],
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
pieChart_6.setOption(pieOption_6);
function getPieData_2(){
    $.ajax({
        type:"GET",
        url: url+"/unit/pieChart?type=2"+"&token="+token,
        data: {},
        dataType: "json",
        success:function(res){
            var data = res.data;
            if(res.code == '000000'){
                var _lenged = [];
                $.each(data,function(index){
                    _lenged.push(data[index].name);
                });
                pieOption_6.legend.data = _lenged;
                pieOption_6.series[0].data = data;
                pieChart_6.setOption(pieOption_6);
            }else if (res.code == '100001'){
                location.href = '/';
            }
        }
    });
}
getPieData_2();

