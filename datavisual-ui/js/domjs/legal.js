var url = "http://127.0.0.1:8090";
var token = "9385d137-a82f-439c-bbc6-fbb5979edf4e";

$(function(){
    //FF下用JS实现自定义滚动条
    $(".scroll").niceScroll({cursorborder:"",cursorcolor:"rgba(0,0,0,0)",boxzoom:true});
})
//jquery
$(function () {
    // 处理列表点击事件
    var listli = $(".audit-content-list").find("li");
    listli.click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });
    // 表格表头的点击效果切换
    var tabletheadli = $(".audit-content-table").find(".lipie");
    tabletheadli.click(function () {
        $(".audit-content-table .lipie").removeClass("active").addClass("noactive");
        $(this).removeClass("noactive").addClass("active");
    });
    // 表头标题的转换
    var liranking = $(".liranking");
    var limoney = $(".limoney");
    var lirankingth = $(".liranking-th");
    var limoneyth = $(".limoney-th");
    var litimes = $(".litimes");
    var litimesed = $(".litimesed");
    var litimesth = $(".litimes-th");
    var litimesedth = $(".litimesed-th");
    var type = 4;
    liranking.click(function () {
        lirankingth.css({
            display: 'block'
        });
        limoneyth.css({
            display: 'none'
        });
        initRankOfImportance(1);
    });
    limoney.click(function () {
        lirankingth.css({
            display: 'none'
        });
        limoneyth.css({
            display: 'block'
        });
        initRankOfImportance(2);
    });
    litimes.click(function () {
        litimesth.css({
            display: 'block'
        });
        litimesedth.css({
            display: 'none'
        });
        type = 4;
        getPieData_4_5(4);
    });
    litimesed.click(function () {
        litimesth.css({
            display: 'none'
        });
        litimesedth.css({
            display: 'block'
        });
        type = 5;
        getPieData_4_5(5);

    });
    //审计次数
    var numtheadli = $(".audit-content-num").find(".li");
    numtheadli.click(function () {
        $(".li").removeClass("active").addClass("noactive");
        $(this).removeClass("noactive").addClass("active");
    });
    // 时间区间选择器
    $('#date-range').dateRangePicker({
        endDate: new Date()
    });

    // 升序降序按钮
    $(".ascending").click(function () {
        // trim()删除在字符串前面和后面的所有空格
        var label = $.trim($(this).html());

        if (label == "降序") {
            $(this).html("升序");
            getPieData_4_5(type, 'desc');
        } else {
            $(this).html("降序");
            getPieData_4_5(type, 'asc');
        }
    });

    // 时间区间选择器
    function time() {
        var date = new Date();
        var timestart = date.getFullYear() + '-01-01';
        var month = date.getMonth() + 1;
        var dates = date.getDate() - 1;
        if (month < 10) {
            var timemonth = '0' + month;
        } else {
            var timemonth = month;
        }
        if (dates < 10) {
            var timedate = '0' + dates;
        } else {
            var timedate = dates;
        }
        var timeend = date.getFullYear() + '-' + timemonth + '-' + timedate;
        $('#date-range').val(timestart + ' to ' + timeend);
        var param = {
            startDate: timestart,
            endDate: timeend
        }
        return getBarData_1(param);
    }
    time();
    $(".zhuzt-search-btn").click(function () {
        var timevalue = $("#date-range").val();
        if (timevalue == "") {
            return time();
        }
        var timevalues = timevalue.split(" to ");
        var timevaluesstart = timevalues[0];
        var timevaluesend = timevalues[1];
        var param = {
            startDate: timevaluesstart,
            endDate: timevaluesend
        }
        getBarData_1(param);
    });
    //点击重置按钮回到初始值
    $('.reset').click(function () {
        time();
    })
});

// 指定图表的配置项和数据
var pieOption_4_5 = {
    title: {
        show: false
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position: function (point, params, dom, rect, size) {
            return [point[0] + 10, point[1]];
        },
    },
    series: [{
        // name: '审计次数',
        type: 'pie',
        radius: '80%',
        center: ['50%', '60%'],
        data: [],
        label: {
            normal: {
                show: false
            }
        },
    }]
};
var pieChart_4_5 = echarts.init(document.getElementById('main'));

function getPieData_4_5(type, sort = 'asc') {
    $.ajax({
        type: "GET",
        url: url + "/faw/pieChart?type=" + type + "&sort=" + sort + "&token=" + token,
        data: {},
        dataType: "json",
        success: function (res) {
            var data = res.data;
            if (res.code == '000000') {
                var html = '';
                html += '<tr><td style="width: 10%;">&nbsp;</td>' +
                    '<td style="width: 70%;color:#36f8ff;">单位名称</td>' +
                    '<td style="width: 20%;color:#36f8ff;">次数</td></tr>';
                $.each(data, function (commentIndex, item) {
                    html += '<tr><td style="width: 10%;">' + (commentIndex + 1) + '</td>' +
                        '<td style="width: 70%;">' + item.name + '</td>' +
                        '<td style="width: 20%;">' + item.value + '</td></tr>';
                })
                $("#sjcs").html(html);
                pieOption_4_5.series[0].data = data;
                if (type == 4) {
                    pieOption_4_5.series[0].name = "审计次数";
                } else if (type == 5) {
                    pieOption_4_5.series[0].name = "被审计次数";
                }
                pieChart_4_5.setOption(pieOption_4_5);
            } else if (res.code == '100001') {
                location.href = "/";
            }
        }
    });
}
getPieData_4_5(4);
// 基于准备好的dom，初始化echarts实例
// 指定图表的配置项和数据
//barOption_1
var huanhang = function (params) {
    var newParamsName = ""; // 最终拼接成的字符串
    var paramsNameNumber = params.length; // 实际标签的个数
    var provideNumber = 4; // 每行能显示的字的个数
    var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
    /**
     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
     */
    // 条件等同于rowNumber>1
    if (paramsNameNumber > provideNumber) {
        /** 循环每一行,p表示行 */
        for (var p = 0; p < rowNumber; p++) {
            var tempStr = ""; // 表示每一次截取的字符串
            var start = p * provideNumber; // 开始截取的位置
            var end = start + provideNumber; // 结束截取的位置
            // 此处特殊处理最后一行的索引值
            if (p == rowNumber - 1) {
                // 最后一次不换行
                tempStr = params.substring(start, paramsNameNumber);
            } else {
                // 每一次拼接字符串并换行
                tempStr = params.substring(start, end) + "\n";
            }

            newParamsName += tempStr; // 最终拼成的字符串
            newParamsName = newParamsName.substring(0, 19);
        }


    } else {
        // 将旧标签的值赋给新标签
        newParamsName = params;
    }
    //将最终的字符串返回
    return newParamsName;
}
var barChart_1 = echarts.init(document.getElementById('zhuzt'));

var barOption_1 = {
    color: ['#daa14f', '#2999d3', ],
    title: {
        text: "法律案件数量及金额",
        textStyle: {
            color: "#fff",
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 'normal',
        },
        left: "45",
        top: "8",
        fontSize: 20,
    },
    // 设置图的位置
    grid: {
        top: "75",
        x: '0',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true

    },

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    // 标注
    legend: {
        data: {},
        right: 550,
        top: 15,
        // itemWidth: '12',
        // itemHeight: "12",
        textStyle: {
            color: '#ffffff',
            width: '137'
        }
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        axisTick: {
            show: false
        },
        data: [],
        //刻度不显示
        axisTick: {
            show: false
        },
        //坐标轴
        axisLine: {
            lineStyle: {
                color: '#ffffff',
                type: 'dashed' //'dotted'虚线 'solid'实线
            },

        },
        //横坐标数值
        axisLabel: {
            color: '#ffffff',
            fontSize: '14px',
            // 解决x坐标的数据显示不全
            interval: 0,
            // showMinLabel:true,
            // showMaxLabel:true,
            formatter: huanhang
        },
    }],
    yAxis: [{
            type: 'value',
            splitNumber: 4,
            //刻度不显示
            axisTick: {
                show: false
            },
            name: '(个)',
            nameTextStyle: {
                color: '#ffffff',
            },
            // 轴线
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed',
                }
            },
            // 轴线值
            axisLabel: {
                color: '#ffffff',
                fontSize: '14px'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#1B7391',
                    type: 'dashed',
                }
            },
        },
        {
            scale: true,
            type: 'value',
            name: '(万元)',
            nameTextStyle: {
                color: '#ffffff',
            },
            min: 0,
            //刻度不显示
            axisTick: {
                show: false
            },
            // 轴线
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed',
                }
            },
            // 轴线值
            axisLabel: {
                color: '#ffffff',
                fontSize: '14px'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#1B7391',
                    type: 'dashed',
                }
            },
        }
    ],
    series: {}
};

function getBarData_1(param = null) {
    $.ajax({
        type: "GET",
        url: url + "/faw/barChart?type=1" + "&token=" + token,
        data: param,
        dataType: "json",
        success: function (res) {
            var data = res.data;
            if (res.code == "000000") {
                var BarData_1 = [];
                var _title = [];
                var _name = [];
                $.each(data, function (index) {
                    _title.push(data[index].title);
                    _name = data[index].name;
                    var eChart = {};
                    eChart.name = data[index].title
                    eChart.type = 'bar'
                    eChart.barGap = 0
                    eChart.data = data[index].data;
                    if (index == 0) {
                        // 
                    } else {
                        eChart.yAxisIndex = 1
                    }
                    BarData_1.push(eChart);
                })
                barOption_1.xAxis[0].data = _name;
                barOption_1.legend.data = _title;
                barOption_1.series = BarData_1;
                barChart_1.setOption(barOption_1);
            } else if (res.code == '100001') {
                location.href = "/";
            }
        }
    })
}
getBarData_1();
// 基于准备好的dom，初始化echarts实例

var pieChart_1 = echarts.init(document.getElementById("project"));
var pieOption_1 = {
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'none'
        },
        position: function (point, params, dom, rect, size) {
            return [point[0] + 10, point[1]];
        },
    },
    legend: {
        type: 'scroll',
        x: 'left',
        y: 'center',
        left: "220",
        top: '25',
        height: 170,
        itemHeight: "12",
        orient: 'vertical',
        textStyle: {
            color: '#ffffff',
        },
        data: [],
        selected: {},
        tooltip: {
            show: true
        },
        formatter: function (name) {
            return echarts.format.truncateText(name, 90, '1px Microsoft Yahei', '…');
        },
    },
    calculable: true,
    series: [{
        name: '审计项目类型',
        type: 'pie',
        radius: "58%",
        center: ['32%', '40%'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false
            }
        },
        data: []
    }]
}

function getPieData_1() {
    $.ajax({
        type: "GET",
        url: url + "/faw/pieChart?type=1&sort=asc" + "&token=" + token,
        data: {},
        dataType: "json",
        success: function (res) {
            var proj_title = [];
            var data = res.data;
            var _pieSelected1 = [];
            if (res.code == '000000') {
                proj_title = data;
                var _pieTitle1 = [];
                $.each(data, function (index) {
                    _pieTitle1.push(proj_title[index].name);
                    if (index >= 5) {
                        _pieSelected1.push(proj_title[index].name);
                    }
                });
                // 默认选中5条数据
                var selectResult = {};
                for (var a = 0; a < _pieSelected1.length; a++) {
                    selectResult[_pieSelected1[a]] = false;
                }
                pieOption_1.legend.selected = selectResult;

                pieOption_1.series[0].data = proj_title;
                pieOption_1.legend.data = _pieTitle1;
                pieChart_1.setOption(pieOption_1);
            } else if (res.code == '100001') {
                location.href = "/";
            }
        }
    });
}
getPieData_1();

var pieChart_2 = echarts.init(document.getElementById("type"));
var pieOption_2 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position: function (point, params, dom, rect, size) {
            return [point[0] + 10, point[1]];
        },
    },
    legend: {
        x: 'left',
        y: 'center',
        left: "220",
        top: '20',
        type: 'scroll',
        height: 170,
        width: 20,
        itemHeight: "12",
        orient: 'vertical',
        textStyle: {
            color: '#ffffff',
        },
        data: [],
        selected: {},
        tooltip: {
            show: true
        },
        formatter: function (name) {
            return echarts.format.truncateText(name, 90, '1px Microsoft Yahei', '…');
        },
    },
    calculable: true,
    series: [{
        name: '问题类型',
        type: 'pie',
        radius: "58%",
        center: ['32%', '40%'],
        label: {
            normal: {
                show: false
            },
            // 去掉高亮时的指示线和名称
            emphasis: {
                show: false
            }
        },
        data: []

    }]
};

function getPieData_2() {
    $.ajax({
        type: "GET",
        url: url + "/faw/pieChart?type=2" + "&token=" + token,
        data: {},
        dataType: "json",
        success: function (res) {
            var projectTitle = [];
            var data = res.data;
            var _pieSelected2 = [];
            if (res.code == '000000') {
                projectTitle = data;
                var _pieTitle2 = [];
                $.each(data, function (index) {
                    _pieTitle2.push(projectTitle[index].name);
                    if (index >= 5) {
                        _pieSelected2.push(projectTitle[index].name);
                    }
                });
                pieOption_2.series[0].data = projectTitle;
                pieOption_2.legend.data = _pieTitle2;
                // 默认选中5条数据
                var selectResult = {};
                for (var a = 0; a < _pieSelected2.length; a++) {
                    selectResult[_pieSelected2[a]] = false;
                }
                pieOption_2.legend.selected = selectResult;
                pieChart_2.setOption(pieOption_2);
            } else if (res.code == '100001') {
                location.href = "/";
            }
        }
    });
}
getPieData_2();

var pieChart_3 = echarts.init(document.getElementById("money"));
var pieOption_3 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position: function (point, params, dom, rect, size) {
            return [point[0] + 10, point[1]];
        },
    },
    legend: {
        x: 'left',
        y: 'center',
        left: "220",
        top: '20',
        type: 'scroll',
        height: 170,
        width: 20,
        itemHeight: "12",
        orient: 'vertical',
        textStyle: {
            color: '#ffffff',
        },
        data: [],
        selected: {},
        tooltip: {
            show: true
        },
        formatter: function (name) {
            return echarts.format.truncateText(name, 90, '1px Microsoft Yahei', '…');
        },
    },
    calculable: true,
    series: [{
        name: '问题金额',
        type: 'pie',
        radius: "58%",
        center: ['32%', '40%'],
        label: {
            normal: {
                show: false,
                position: 'inner',
                formatter: '{b}:{c}:{d}%',
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal'
                }
            },
        },

        data: []

    }]
};

function getPieData_3() {
    $.ajax({
        type: "GET",
        url: url + "/faw/pieChart?type=3" + "&token=" + token,
        data: {},
        dataType: "json",
        success: function (res) {
            var data = res.data;
            var project_title = [];
            var _pieSelected3 = [];
            if (res.code == '000000') {
                project_title = data;
                var _pieTitle3 = [];
                $.each(data, function (index) {
                    _pieTitle3.push(project_title[index].name);
                    if (index >= 5) {
                        _pieSelected3.push(project_title[index].name);
                    }
                });
                // 默认选中5条数据
                var selectResult = {};
                for (var a = 0; a < _pieSelected3.length; a++) {
                    selectResult[_pieSelected3[a]] = false;
                }
                pieOption_3.legend.selected = selectResult;

                pieOption_3.legend.data = _pieTitle3;
                pieOption_3.series[0].data = project_title;
                pieChart_3.setOption(pieOption_3);
            } else if (res.code == '100001') {
                location.href = "/";
            }
        }
    });
}
getPieData_3();

function getLineData_1() {
    $.ajax({
        type: "GET",
        url: url + "/faw/lineChart?type=1" + "&token=" + token,
        data: {},
        dataType: "json",
        success: function (res) {
            var data = res.data;
            var Ldata = [];
            var Xdata = [];
            var Sdata = [];
            if (res.code == '000000') {
                $.each(data, function (index) {
                    Ldata.push(data[index].title);
                    Xdata = data[index].name;
                    Sdata.push(data[index].data);
                })
                lineOption_1.legend.data = Ldata;
                lineOption_1.xAxis[0].data = Xdata;
                lineOption_1.series[0].name = Ldata[0];
                lineOption_1.series[0].data = Sdata[0];
                lineOption_1.series[1].name = Ldata[1];
                lineOption_1.series[1].data = Sdata[1];
                lineChart_1.setOption(lineOption_1);
            } else if (res.code == '100001') {
                location.href = "/";
            }
        }
    });
}
getLineData_1();

var lineChart_1 = echarts.init(document.getElementById('group'));
var lineOption_1 = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: [],
        textStyle: {
            color: '#ffffff',
        },
        // x: "right",
        right: '40'
    },
    grid: {
        x: '0',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        data: [],
        //刻度不显示
        axisTick: {
            show: false
        },
        //坐标轴
        axisLine: {
            lineStyle: {
                color: '#ffffff',
                type: 'dashed' //'dotted'虚线 'solid'实线
            },
        },
        //横坐标数值
        axisLabel: {
            color: '#ffffff',
            fontSize: '14px',
            interval: 0,
            // showMinLabel:true,
            // showMaxLabel:true,
        },
    }],
    yAxis: [{
            type: 'value',
            name: '时段水方',
            position: 'left',
            name: '(万元)',
            splitNumber: 4,
            // axisLabel: {
            //     formatter: '{value} （万m³）'
            // },
            // 轴线
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed',
                }
            },
            // 轴线值
            axisLabel: {
                color: '#ffffff',
                fontSize: '14px'
            },
            //刻度不显示
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#1B7391',
                    type: 'dashed',
                }
            },
        },
        { // 轴线
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed',
                }
            },
            // 轴线值
            axisLabel: {
                color: '#ffffff',
                fontSize: '14px'
            },
            //刻度不显示
            axisTick: {
                show: false
            },
            type: 'value',
            name: '累计水方',
            splitNumber: 4,
            // min: 0,
            // max: 500,
            position: 'right',
            name: '(万元)',
            // axisLabel: {
            //     formatter: '{value} （万m³）'
            // }
            // 控制水平线为虚线
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#1B7391',
                    type: 'dashed',
                }
            },
        },
    ],
    series: [{
            name: [],
            type: 'line',
            yAxis: 1,
            itemStyle: {
                normal: {
                    // 折点颜色
                    color: '#faab41',
                    // 折线颜色
                    lineStyle: {
                        color: '#faab41'
                    }
                }
            },
            data: []
        },
        {
            name: [],
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: '#34facc',
                    lineStyle: {
                        color: '#34facc'
                    }
                }
            },
            data: []
        }

    ]
};

//时间戳转化
function gettime(time) {
    var date = new Date(time)
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}

function initRankOfImportance(type) {
    $.ajax({
        type: "GET",
        url: url + "/faw/tableChart?type=" + type + "&token=" + token,
        data: {},
        dataType: "json",
        success: function (res) {
            if (res.code == '000000') {
                var data = res.data;
                var html = '';
                html += '<tr class="liranking-th">' +
                    '<td style="width: 1%;">&nbsp;&nbsp;</td>' +
                    '<td style="width: 7%;color:#36f8ff;">二级单位</td>' +
                    '<td style="width: 7%;color:#36f8ff;">我方涉案单位</td>' +
                    '<td style="width: 7%;color:#36f8ff;">对方涉案单位</td>' +
                    '<td style="width: 6%;color:#36f8ff;">诉讼角色</td>' +
                    '<td style="width: 6%;color:#36f8ff;">案件类型</td>' +
                    '<td style="width: 6%;color:#36f8ff;">案件类别</td>' +
                    '<td style="width: 6%;color:#36f8ff;">审判阶段</td>' +
                    '<td style="width: 6%;color:#36f8ff;">立案时间</td>' +
                    '<td style="width: 6%;color:#36f8ff;">撤销案件时间</td>' +
                    '<td style="width: 6%;color:#36f8ff;">标的金额</td>' +
                    '<td style="width: 6%;color:#36f8ff;">案件状态</td>' +
                    '<td style="width: 6%;color:#36f8ff;">更新时间</td>' +
                    '<td style="width: 6%;color:#36f8ff;">涉及两金金额</td>' +
                    '<td style="width: 6%;color:#36f8ff;">挽回经济损失金额</td>' +
                    '<td style="width: 6%;color:#36f8ff;">化解两金金额</td>' +
                    '<td style="width: 6%;color:#36f8ff;">结案方式</td></tr>'
                $.each(data, function (commentIndex, item) {
                    html += '<tr><td style="width: 1%;">' + (commentIndex + 1) + '</td>' +
                        '<td style="width: 7%;">' + item.susejdw + '</td>' +
                        '<td style="width: 7%;">' + item.bqysadw + '</td>' +
                        '<td style="width: 7%;">' + item.dfsadw + '</td>' +
                        '<td style="width: 6%;">' + item.litigationArbitration + '</td>' +
                        '<td style="width: 6%;">' + item.caseType1 + '</td>' +
                        '<td style="width: 6%;">' + item.caseType2 + '</td>' +
                        '<td style="width: 6%;">' + item.scjd + '</td>' +
                        '<td style="width: 6%;">' + gettime(item.prosecutionDate) + '</td>' +
                        '<td style="width: 6%;">' + gettime(item.closingTime) + '</td>' +
                        '<td style="width: 6%;">' + item.bdje + '</td>' +
                        '<td style="width: 6%;">' + item.byxzByjaZzbl + '</td>' +
                        '<td style="width: 6%;">' + gettime(item.updateTime) + '</td>' +
                        '<td style="width: 6%;">' + item.sjljje + '</td>' +
                        '<td style="width: 6%;">' + item.whjjssje + '</td>' +
                        '<td style="width: 6%;">' + item.hjljje + '</td>' +
                        '<td style="width: 6%;">' + item.jafs + '</td></tr>';
                });
                $(".t_r_content .hh").html(html);
            }
            //跳转登录页面
            else if (res.code == '100001') {
                location.href = "/";
            }
            // ....
            else {
                var html = '';
                var i = 0;
                for (i = 0; i < 6; i++) {
                    html += '<tr><td style="width: 1%;">' + (i + 1) + '</td>' +
                        '<td style="width: 10%;">' + '</td>' +
                        '<td style="width: 10%;">' + '</td>' +
                        '<td style="width: 10%;">' + '</td>' +
                        '<td style="width: 7%;">' + '</td>' +
                        '<td style="width: 11%;">' + '</td>' +
                        '<td style="width: 5%;">' + '</td>' +
                        '<td style="width: 10%;">' + '</td>' +
                        '<td style="width: 10%;">' + '</td>' +
                        '<td style="width: 8%;">' + '</td>' +
                        '<td style="width: 8%;">' + '</td></tr>';
                };
                $(".t_r_content .hh").html(html);
            }

        }
    });
}
initRankOfImportance(1);

var wordCloudChart = echarts.init(document.getElementById('zify'));
// 字符颜色
function createRandomItemStyle() {
    return {
        normal: {
            color: 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
            ].join(',') + ')'
        }
    };
}
var wordCloudOption = {
    title: {
        text: '',
        link: 'http://www.google.com/trends/hottrends'
    },
    tooltip: {
        show: true
    },
    series: [{
        name: 'Google Trends',
        type: 'wordCloud',
        size: ['80%', '80%'],
        textRotation : [0, 45, 90, -45],
        rotationRange: [0, 0],
        textPadding: 0,
        textStyle : {
            normal : {
                color :  '#36f8ff'
            },
        },
        autoSize: {
            enable: true,
            minSize: 14
        },

    }]
};
// 使用刚指定的配置项和数据显示图表。
wordCloudChart.setOption(wordCloudOption);

scrollsXY(".scrollXY");	//多个X轴