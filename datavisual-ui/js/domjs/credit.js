var url = "http://127.0.0.1:8090";

$(function(){
    //FF下用JS实现自定义滚动条
    $(".scroll").niceScroll({cursorborder:"",cursorcolor:"rgba(0,0,0,0)",boxzoom:true});
})
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
var zhuzt = echarts.init(document.getElementById('zhuzt'));
var zify = echarts.init(document.getElementById('zify'));
var project = echarts.init(document.getElementById("project"));
var type = echarts.init(document.getElementById("type"));
var money = echarts.init(document.getElementById("money"));

// 指定图表的配置项和数据
var option = {
    title: {
        show: false
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position: function(point, params, dom, rect, size){
            return [point[0]+10,point[1]];
        },
    },
    series: [{
        name: '审计次数',
        type: 'pie',
        radius: '80%',
        center: ['50%', '60%'],
        // data: [{
        //         value: 335,
        //         name: '13%'
        //     },
        //     {
        //         value: 310,
        //         name: '12%'
        //     },
        //     {
        //         value: 234,
        //         name: '9%'
        //     },
        //     {
        //         value: 135,
        //         name: '5%'
        //     },
        //     {
        //         value: 1548,
        //         name: '60%'
        //     }
        // ],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        label: {
            normal: {
                position: 'inner'
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        }
    }]
};
                    
// x坐标数据换行的方法
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
    var provideNumber = 3; // 每行能显示的字的个数
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
// 指定图表的配置项和数据
var option2 = {
    color: ['#daa14f', '#2999d3', ],
    title: {
        text: "各二级单位合作单位数量",
        textStyle: {
            color: "#fff",
            fontSize:20,
            fontWeight:400,
            fontStyle: 'normal',
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
        // data: ['1中国航天建设集团有限公司', '2中国花藤工业有限公司', '3湖南航天有限责任公司', '4湖南航天有限责任公司', '5湖南航天有限责任公司',
        //     '湖南航天有限责任公司', '中国航天建设集团有限公司', '中国花藤工业有限公司', '湖南航天有限责任公司', '湖南航天有限责任公司',
        //     '湖南航天有限责任公司', '湖南航天有限责任公司', '中国航天建设集团有限公司', '中国花藤工业有限公司', '湖南航天有限责任公司',
        //     '98中国航天建设集团有限公司', '99中国花藤工业有限公司', '100湖南航天有限责任公司'
        // ],
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
            interval: 0 ,
            showMinLabel:true,
            showMaxLabel:true,
            formatter:huanhang
        },
    }],
    yAxis: [{
            type: 'value',
            // 0刻度对齐
            // max:function(value){
            //     return -value.min;
            // },
            // min: 'dataMin',
            splitNumber: 4,
            //刻度不显示
            axisTick: {
                show: false
            },
            name: '(家)',
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
            name: '',
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
                    color: '#1B7391',
                    type: 'dashed',
                }
            },
            // 轴线值
            axisLabel: {
                color: '#ffffff',
                fontSize: '14px'
            },
            splitLine: {
                show: false,
            },
        }
    ],
    series: [{
            name: '审计事件数量',
            type: 'bar',
            barGap: 0,
            // data: [320, 332, 301, 334, 390, 820, 220, 330, 440, 230, 125, 205, 334, 390,
            //     820, 220, 330, 256
            // ]
        },
        

    ]
};
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

var option3 = {
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
                color : function() {
                    return '#36f8ff'
                }
            },
        },
        autoSize: {
            enable: true,
            minSize: 14
        },
        // data: [
        //     {
        //         name: "Sam S Club",
        //         value: 10000,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Macys",
        //         value: 6181,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Amy Schumer",
        //         value: 4386,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Jurassic World",
        //         value: 4055,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Charter Communications",
        //         value: 2467,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Chick Fil A",
        //         value: 2244,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Planet Fitness",
        //         value: 1898,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Pitch Perfect",
        //         value: 1484,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Express",
        //         value: 1112,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Home",
        //         value: 965,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Johnny Depp",
        //         value: 847,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Lena Dunham",
        //         value: 582,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Lewis Hamilton",
        //         value: 555,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "KXAN",
        //         value: 550,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Mary Ellen Mark",
        //         value: 462,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Farrah Abraham",
        //         value: 366,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Rita Ora",
        //         value: 360,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Serena Williams",
        //         value: 282,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "NCAA baseball tournament",
        //         value: 273,
        //         itemStyle: createRandomItemStyle()
        //     },
        //     {
        //         name: "Point Break",
        //         value: 265,
        //         itemStyle: createRandomItemStyle()
        //     }
        // ]
    }]
};
var option4 = {
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'none'
        },
        position: function(point, params, dom, rect, size){
            return [point[0]+10,point[1]];
        },
    },
    legend: {
        x: 'left',
        y: 'center',
        left: "220",
        top: '25',
        // itemWidth: '12',
        itemHeight: "12",
        orient: 'vertical',
        textStyle: {
            color: '#ffffff',
        },
        // data: ['离任经济审计', '财务决算审计', '任中经济责任审计', '效益审计', '国防科工局科研费审计','固定资产投资决算审计','效益审计','内部控制审计']
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
        // data: [{
        //         value: 10,
        //         name: '离任经济审计'
        //     },
        //     {
        //         value: 5,
        //         name: '财务决算审计'
        //     },
        //     {
        //         value: 15,
        //         name: '任中经济责任审计'
        //     },
        //     {
        //         value: 25,
        //         name: '效益审计'
        //     },
        //     {
        //         value: 20,
        //         name: '国防科工局科研费审计'
        //     },
        //     {
        //         value: 15,
        //         name: '固定资产投资决算审计'
        //     },
        //     {
        //         value: 9,
        //         name: '效益审计'
        //     },
        //     {
        //         value: 6,
        //         name: '内部控制审计'
        //     }
        // ]

    }]
};
var option5 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position: function(point, params, dom, rect, size){
            return [point[0]+10,point[1]];
        },
    },
    legend: {
        x: 'left',
        y: 'center',
        left: "220",
        top: '20',
        itemHeight: "12",
        orient: 'vertical',
        textStyle: {
            color: '#ffffff',
        },
        // data: ['内控管理', '会计核算', '合同管理', '会计基础管理', '资金管理','存货管理','招投标管理']
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
        // data: [{
        //         value: 10,
        //         name: '内控管理'
        //     },
        //     {
        //         value: 5,
        //         name: '会计核算'
        //     },
        //     {
        //         value: 15,
        //         name: '合同管理'
        //     },
        //     {
        //         value: 25,
        //         name: '会计基础管理'
        //     },
        //     {
        //         value: 20,
        //         name: '资金管理'
        //     },
        //     {
        //         value: 20,
        //         name: '存货管理'
        //     },
        //     {
        //         value: 20,
        //         name: '招投标管理'
        //     },
        // ]

    }]
};
var option6 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position: function(point, params, dom, rect, size){
            return [point[0]+10,point[1]];
        },
    },
    legend: {
        x: 'left',
        y: 'center',
        left: "220",
        top: '20',
        // itemWidth: '12',
        itemHeight: "12",
        orient: 'vertical',
        textStyle: {
            color: '#ffffff',
        },
        // data: ['限期管理', '可能导致违法坐牢', '管理建议', '通报批评', '违法违纪处分','其他']
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
                    fontWeight:'normal'
                }
            },
        },
        
        // data: [{
        //         value: 10,
        //         name: '限期管理'
        //     },
        //     {
        //         value: 5,
        //         name: '可能导致违法坐牢'
        //     },
        //     {
        //         value: 15,
        //         name: '管理建议'
        //     },
        //     {
        //         value: 25,
        //         name: '通报批评'
        //     },
        //     {
        //         value: 20,
        //         name: '违法违纪处分'
        //     },
        //     {
        //         value: 3,
        //         name: '其他'
        //     }
        // ]

    }]
};







// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
zhuzt.setOption(option2);
zify.setOption(option3);
project.setOption(option4);
type.setOption(option5);
money.setOption(option6);
$(function() {
    // 处理列表点击事件
    var listli = $(".credit-content-list").find("li");
    listli.click(function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });
    // 表格表头的点击效果切换
    var tabletheadli = $(".credit-content-table").find(".li");
    tabletheadli.click(function(){
        $(".li").removeClass("active").addClass("noactive");
        $(this).removeClass("noactive").addClass("active");
    });
    //审计次数
    var numtheadli = $(".credit-content-num").find(".li");
    numtheadli.click(function(){
        console.log(1);
        $(".li").removeClass("active").addClass("noactive");
        $(this).removeClass("noactive").addClass("active");
    });
    // 翻页页码效果
    var pageli = $(".page").find("li");
    pageli.click(function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });
    // 时间区间选择器
    $('#date-range').dateRangePicker({
        endDate: new Date()
    });
    // 升序降序按钮
    $(".ascending").click(function(){
        // trim()删除在字符串前面和后面的所有空格
        var label = $.trim($(this).html());
        
        if(label == "降序"){
            $(this).html("升序");

        }else{
            $(this).html("降序");
        }
    });
});
