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
        formatter: "{a} <br/>{b} : {c} ({d}%)"
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
        url: url + "/fengxpg/pieChart?type=" + type + "&sort=" + sort + "&token=" + token,
        data: {},
        dataType: "json",
        success: function (res) {
            var data = res.data;
            if (res.code == '000000') {
                var html = '';
                html = '<tr><td style="width: 10%;">&nbsp;</td>' +
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
                    pieOption_4_5.series[0].name = "二级单位采纳次数情况";
                } else if (type == 5) {
                    pieOption_4_5.series[0].name = "二级单位未采纳次数情况";
                }
                pieChart_4_5.setOption(pieOption_4_5);
            } else if (res.code == '100001') {
                location.href = "/";
            }
        }
    });
}
getPieData_4_5(4);
// 指定图表的配置项和数据
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
            // console.log(newParamsName.substring(0, 19))
        }


    } else {
        // 将旧标签的值赋给新标签
        newParamsName = params;
    }
    //将最终的字符串返回
    return newParamsName;
}
// 饼图文字换行
var huanhangPie = function (params) {
    var newParamsName = ""; // 最终拼接成的字符串
    var paramsNameNumber = params.length; // 实际标签的个数
    var provideNumber = 7; // 每行能显示的字的个数
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
            // console.log(newParamsName.substring(0, 19))
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
        text: "风险事项数量及审计金额",
        textStyle: {
            color: "#fff",
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 'normal',
        },
        left: "45",
        top: "8"
    },
    // 设置图的位置
    grid: {
        top: "75",
        x: '60'
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
        right: 500,
        top: 15,
        // itemWidth: '12',
        // itemHeight: "12",
        textStyle: {
            color: '#ffffff',
            width: '137'
        },


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
        url: url + "/fengxpg/barChart?type=1" + "&token=" + token,
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
        position: function (point, params, dom, rect, size) {
            return [point[0] + 30, point[1]];
        },
        axisPointer: {
            type: 'none'
        }
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
        formatter: function (name) {
            return echarts.format.truncateText(name, 90, '1px Microsoft Yahei', '…');
        },
        tooltip: {
            show: true
        },
    },
    calculable: true,
    series: [{
        name: '事项类型',
        type: 'pie',
        radius: "58%",
        center: ['32%', '40%'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}项 ({d}%)"
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
        url: url + "/fengxpg/pieChart?type=1&sort=asc" + "&token=" + token,
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
        position: function (point, params, dom, rect, size) {
            return [point[0] + 30, point[1]];
        },
        formatter: "{a} <br/>{b} : {c}项 ({d}%)"
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
        formatter: function (name) {
            return echarts.format.truncateText(name, 90, '1px Microsoft Yahei', '…');
        },
        tooltip: {
            show: true
        },
    },
    calculable: true,
    series: [{
        name: '事项风险程度',
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
        url: url + "/fengxpg/pieChart?type=2" + "&token=" + token,
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
        position: function (point, params, dom, rect, size) {
            return [point[0] + 30, point[1]];
        },
        formatter: "{a} <br/>{b} : {c} ({d}%)"
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
        formatter: function (name) {
            return echarts.format.truncateText(name, 90, '1px Microsoft Yahei', '…');
        },
        tooltip: {
            show: true
        },
    },
    calculable: true,
    series: [{
        name: '采纳情况',
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
        url: url + "/fengxpg/pieChart?type=3" + "&token=" + token,
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
//(柱状堆积)
var barChart_4 = echarts.init(document.getElementById("box10"));
barOption_4 = {
    color: ['#daa14f', '#2999d3', '#c23531'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        textStyle: {
            color: '#ffffff',
        },
        data: []
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: [],
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
            fontSize: '12px'
        },
    },
    yAxis: {
        name: '(次)',
        //横坐标数值
        axisLabel: {
            show: true,
            fontSize: 12,
        },
        type: 'value',
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
        splitLine: {
            show: true,
            lineStyle: {
                color: '#1B7391',
                type: 'dashed',
            }
        },
    },
    series: []
};

function getBarData_4() {
    $.ajax({
        type: "GET",
        url: url + "/fengxpg/barChart?type=2" + "&token=" + token,
        data: {},
        dataType: "json",
        success: function (res) {
            var data = res.data;
            if(res.code == "000000"){
                var BarData_4= [];
                var BarTitle_4 = [];
                var BarName_4 = [];
                $.each(data, function (index) {
                    BarTitle_4.push(data[index].title);
                    BarName_4 = data[index].name;
                    var eChart = {};
                    eChart.name = data[index].title;
                    eChart.type = 'bar';
                    eChart.stack = '总量';
                    eChart.data = data[index].data;
                    BarData_4.push(eChart);
                })
                barOption_4.xAxis.data = BarName_4;
                barOption_4.legend.data = BarTitle_4;
                // console.log(BarData_4.reverse());
                barOption_4.series = BarData_4;
                barChart_4.setOption(barOption_4);
            } else if (res.code == '100001') {
                location.href = "/";
            }
        }
    })
}
getBarData_4();
//时间戳转化
function gettime(time) {
    var date = new Date(time)
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}

function initRankOfImportance(type) {
    $.ajax({
        type: "GET",
        url: url + "/fengxpg/tableChart?type=" + type + "&token=" + token,
        data: {},
        dataType: "json",
        success: function (res) {
            if (res.code == '000000') {
                var data = res.data;
                var html = '';
                html += '<tr class="liranking-th">' +
                    '<td style="width: 1%;color:#36f8ff;">&nbsp;&nbsp;</td>' +
                    '<td style="width: 10%;color:#36f8ff;">二级单位名称</td>' +
                    '<td style="width: 10%;color:#36f8ff;">三级或四级单位名称</td>' +
                    '<td style="width: 10%;color:#36f8ff;">审议事项名称</td>' +
                    '<td style="width: 7%;color:#36f8ff;">事项类型</td>' +
                    '<td style="width: 11%;color:#36f8ff;">最终审议单位级次</td>' +
                    ' <td style="width: 5%;color:#36f8ff;">审议机构</td>' +
                    '<td style="width: 10%;color:#36f8ff;">主责部门</td>' +
                    '<td style="width: 10%;color:#36f8ff;">事项风险程度</td>' +
                    '<td style="width: 8%;color:#36f8ff;">提交时间</td>' +
                    '<td style="width: 8%;color:#36f8ff;">审计金额（万元）</td>  </tr>'
                $.each(data, function (commentIndex, item) {
                    html += '<tr><td style="width: 1%;">' + (commentIndex + 1) + '</td>' +
                        '<td style="width: 10%;">' + item.erjdwmc + '</td>' +
                        '<td style="width: 10%;">' + item.sanjhsjdwmc + '</td>' +
                        '<td style="width: 10%;">' + item.shenysxmc + '</td>' +
                        '<td style="width: 7%;">' + item.shixlx + '</td>' +
                        '<td style="width: 11%;">' + item.zuizsydwjc + '</td>' +
                        '<td style="width: 5%;">' + item.shenyjg + '</td>' +
                        '<td style="width: 10%;">' + item.zhuzbm + '</td>' +
                        '<td style="width: 10%;">' + item.shixfxcd + '</td>' +
                        '<td style="width: 8%;">' + gettime(item.zCreatetime) + '</td>' +
                        '<td style="width: 8%;">' + item.shejje + '</td></tr>';
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
        data: []
    }]
};
// 使用刚指定的配置项和数据显示图表。
wordCloudChart.setOption(wordCloudOption);
scrollsXY(".scrollXY");//多个X轴