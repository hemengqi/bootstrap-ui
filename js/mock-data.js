$.mockjax({
	url: '/test/1',
/*	data:{
		'level': 2,
		'pid': 0,
	},*/
	status: 200,
    responseText: {
		"success":true,
		"msg":"",
		"pagination":{"is_end":false,"next":1,"pre":1,"page_count":1,"page":1,"page_size":100000,"count":10},
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
	}
});
$.mockjax({
	url: '/test/2',
/*	data: {
		'level':3,
		'pid': 3,
	},*/
	status: 200,
	respondText:{
		"success":true,
		"msg":"",
		"pagination":{"is_end":false,"next":1,"pre":1,"page_count":1,"page":1,"page_size":100000,"count":3},
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
	}
});
