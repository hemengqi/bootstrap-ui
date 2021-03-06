var Random = Mock.Random
Random.ctitle();
Random.datetime('yyyy-MM-dd A HH:mm:ss');
Random.cname();
/*虚拟城市列表*/
Mock.mock('http://www.g.cn/10',{
	"success":true,
	"msg":"",
	"list":[{
		"id":"3",
		"org_name":"广东省",
		"pid":"2",
		"level":"2"
	},{
		"id":"36",
		"org_name":"河北省",
		"pid":"226",
		"level":"2"
	}]
});
Mock.mock('http://www.g.cnt/236',{
	"success":false,
	'msg':'暂未开通'
});
Mock.mock('http://www.g.cn/23',{
	"success":true,
	"msg":"",
	"list":[{
		"id":"4",
		"org_name":"广州市",
		"pid":"3",
		"level":"3"
	},{
		"id":"5",
		"org_name":"深圳市",
		"pid":"3",
		"level":"3"
	}]
});
Mock.mock('http://www.g.cn/35',{
	"success":false,
	'msg':'暂未开通'
});
Mock.mock('http://www.g.cn/34',{
	"success":true,
	"msg":"",
	"list":[{
		"id":"7",
		"org_name":"天河区",
		"pid":"4",
		"level":"4"
	},{
		"id":"8",
		"org_name":"海珠区",
		"pid":"4",
		"level":"4"
	}]
});
Mock.mock('http://www.g.cn/48',{
	"success":false,
	'msg':'暂未开通'
});
Mock.mock('http://www.g.cn/47',{
	"success":true,
	"msg":"",
	"list":[{
		"id":"9",
		"org_name":"棠下街道",
		"pid":"7",
		"level":"5"
	},{
		"id":"10",
		"org_name":"员村街道",
		"pid":"7",
		"level":"5"
	}]
});
Mock.mock('http://www.g.cn/table/',{
	"success": true,
	"msg":"",
	"table":{
		"thead":["商家编号","商家名称","创建时间","联系人","联系电话","余额"],
		"tbody|10-20":[{
			"id|100-999": 1,
			"name":'@ctitle(5,8)',
			"time": '@datetime',
			"user": '@cname',
			"mobilie|13500000000-13599999999": 1,
			"balance|0-5000": 1,
		}]
	},
	"total|30-100": 1,
});
Mock.mock('http://www.g.cn/table/5',{
	"success": true,
	"msg":"",
	"table":{
		"thead":["商家编号","商家名称","创建时间","联系人","联系电话","余额"],
		"tbody|5":[{
			"id|100-999": 1,
			"name":'@ctitle(5,8)',
			"time": '@datetime',
			"user": '@cname',
			"mobilie|13500000000-13599999999": 1,
			"balance|0-5000": 1,
		}]
	},
	"total": 50,
});
Mock.mock('http://www.g.cn/table/10',{
	"success": true,
	"msg":"",
	"table":{
		"thead":["商家编号","商家名称","创建时间","联系人","联系电话","余额"],
		"tbody|10":[{
			"id|100-999": 1,
			"name":'@ctitle(5,8)',
			"time": '@datetime',
			"user": '@cname',
			"mobilie|13500000000-13599999999": 1,
			"balance|0-5000": 1,
		}]
	},
	"total": 50,
});
Mock.mock('http://www.g.cn/table/20',{
	"success": true,
	"msg":"",
	"table":{
		"thead":["商家编号","商家名称","创建时间","联系人","联系电话","余额"],
		"tbody|20":[{
			"id|100-999": 1,
			"name":'@ctitle(5,8)',
			"time": '@datetime',
			"user": '@cname',
			"mobilie|13500000000-13599999999": 1,
			"balance|0-5000": 1,
		}]
	},
	"total": 50,
})