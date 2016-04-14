(function($){
/*筛选容器*/
(function($){
	var fillter = {
		init: function(obj,args){
			this.fillHtml(obj,args);
			this.bindEvent(obj,args);
		},
		fillHtml: function(obj,args){
			var fillterStr = '';
			var fillter = args.fillters;
			var hidden = '';
			for (var i = 0; i < fillter.length; i++) {
				hidden = i>args.options.show-1?'hidden':'';
				fillterStr +='<div id="'+fillter[i].label.name+'" class="clearfix f_line '+hidden+'">'+
					'<div class="f_label col-xs-2">'+
		                '<label>'+fillter[i].label.cnt+'：</label>'+
		            '</div>'+
		            '<div class="f_cnt col-xs-10">';
		            for(var e = 0 ; e < fillter[i].list.length ; e++){

		            	fillterStr +='<label class="f_item" for="'+fillter[i].label.name+fillter[i].list[e].name+'"><input class="hidden" id="'+fillter[i].label.name+fillter[i].list[e].name+'" type="radio" name="'+fillter[i].label.name+'" value="'+fillter[i].list[e].name+'" />'+fillter[i].list[e].cnt+'</label>';
		            }
		                
		        fillterStr +='</div></div>';
			};
			$(obj).html('<form class="fillterForm fillter-box"><div class="fillter-cnt">'+fillterStr+'</div><div class="fillter-action"><span id="show-more" class="fillter-more action-btn">显示更多<span class="caret"></span></span><span id="clear-fillter" class="btn-default action-btn">清除筛选</span></div></form>');
		},
		outPut: function(obj,args){
			if(typeof(args.callback)=='function'){
				args.callback($(obj).find('.fillterForm').serialize());
			}
		},
		bindEvent: function(obj,args){
			return (function(){
				$(obj).on('click','.f_item',function(){
					$(this).addClass('active').siblings('.f_item').removeClass('active');
					fillter.outPut(obj,args);
				}).on('click','.fillter-more',function(){
					$(this).toggleClass('dropup');
					var hidden = $(obj).find('.f_line.hidden');
					if(!hidden.hasClass('show')){
						hidden.addClass('show');
					}else{
						hidden.removeClass('show').find('.f_item').removeClass('active').find('input').prop('checked',false);
					}
				}).on('click','#clear-fillter',function(){
					$('.f_line').find('.f_item').removeClass('active').find('input').prop('checked',false);
					fillter.outPut(obj,args);
				})
			})();
		}
	};
	$.fn.addFillter = function(option){
		var options = $.extend({
			'options': {
				'show': 0,//默认显示所有筛选项
			},
			'fillters': [{
				'label':'示例',
				'list': [{
					'name':'test1',
					'cnt':'示例1',
				},{
					'name':'test2',
					'cnt':'示例2',
				},]
			}],
			'callback': function(searchQuery){
                console.log('searchQuery'+searchQuery);
            }
		},option);
		fillter.init(this,options);
	}
})(jQuery);
/*日期选择*/
(function($){
	var date = {
		init: function(obj,args){
			this.fillHtml(obj,args);
			this.bindEvent(obj,args);
		},
		fillHtml: function(obj,args){
			var str = btnStr = '';
			var inputStr = '<div class="input-daterange input-group">'+
                            '<input type="text" class="form-control" name="'+args.input.start+'" />'+
                            '<span class="input-group-addon">至</span>'+
                            '<input type="text" class="form-control" name="'+args.input.end+'" />'+
                            '<span class="input-group-btn">'+
                                '<button class="btn btn-default date-sure" type="button">确定</button>'+
                            '</span>'+
                        '</div>';
			if(args.btn){
				btnStr += '<div class="btn-group pull-left">'+
                    '<button type="button" class="btn btn-success time-point time-month" data-time="month">前一月</button>'+
                    '<button type="button" class="btn btn-info time-point time-week" data-time="week">前一周</button>'+
                    '<button type="button" class="btn btn-primary time-point time-today" data-time="today">今天</button>'+
                    '<button type="button" class="btn btn-default time-calendar glyphicon glyphicon-calendar"></button>'+
                '</div>';
                str = '<div class="clearfix">'+btnStr+'<div class="pull-left date-group hidden"><form class="dateForm">'+inputStr+'</form></div></div>';
			}else{
				str = inputStr;
			};
			$(obj).html(str);
		},
		getDate: function(stamp){
			var d = new Date(stamp);    //根据时间戳生成的时间对象
			return (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate());
		},
		outPut: function(obj,args){
			if(typeof(args.callback)=='function'){
				args.callback($(obj).find('.dateForm').serialize());
			}
		},
		bindEvent: function(obj,args){
			var $start = $('input[name="'+args.input.start+'"]'),
				$end = $('input[name="'+args.input.end+'"]');
			$(obj).on('click','.time-calendar',function(){
				var date = $(obj).find('.date-group');
				if(date.hasClass('hidden')){
					date.removeClass('hidden');
				}else{
					date.addClass('hidden').find('input').val('');
				}
			}).on('click','.date-sure',function(){
				date.outPut(obj,args);
			}).on('click','.time-point',function(){
				var time = $(this).data('time'),start = 0;
					today = new Date().getTime();
				switch(time){
					case 'today': 
						start = today;
						break;
					case 'week': 
						start = today - 1000*60*60*24*7;
						break;
					case 'month':
						start = today - 1000*60*60*24*30;
						break;
				}
				$start.val(date.getDate(start));
				$end.val(date.getDate(today));
				date.outPut(obj,args);
			}).find('.input-daterange').datepicker({
	            maxViewMode: 0,
	            language: "zh-CN",
	            daysOfWeekDisabled: "6",
	            format: args.format,
	            //autoclose: true
	        });
		}
	}
	$.fn.addTimePicker = function(option){
		var options = $.extend({
			'btn': true,//按钮开关，false为仅为input
			'btnType': {
				'month': true, //前一月
				'week': true,
				'day': true,
			},
			'format': 'yyyy-mm-dd',
			'input': {
				'start':'start_date',
				'end':'end_date',
			},
			'callback': function(date){
                console.log(date);
            }
		},option);
		date.init(this,options);
	}
})(jQuery);
/*城市选择*/
(function($){
	var city = {
		init: function(obj,args){
			if(!args.url) {console.log('缺少请求城市列表url');return;}
			this.fillHtml(obj,args);
			this.bindEvent(obj,args);
		},
		fillHtml: function(obj,args){
            var liStr = tabStr = selectStr = str = '';
            $.each(args.levels,function(i,e){
            	var active1 = i==0?'active':'hidden',
            		active2 = i==0?'active':'',
            		selected = i==args.levels.length-1?true:false;
            	selectStr += '<option value="'+e.level+'" selected="'+selected+'">'+e.label+'</option>';
            	liStr += '<li role="presentation" class="tabs-item '+active1+'" data-init="'+e.label+'"><a href="#'+e.name+'" role="tab" data-toggle="tab"><span class="selected">'+e.label+'</span><span class="caret"></span></a></li>';
            	tabStr += '<div class="tab-pane '+active2+'" id="'+e.name+'"></div>';
            });
            str = '<div class="cityPicker"><form class="cityForm">'+
            	'<select class="levelSelect btn btn-default">'+selectStr+'</select>'+
					'<button class="btn btn-default city-select" type="button">'+
                    	'<span class="city-selected">筛选城市</span><span class="caret"></span>'+
                	'</button>'+
                	'<div class="city-box hidden">'+
                		'<ul class="nav nav-tabs" role="tablist">'+liStr+'</ul>'+
                		'<div class="tab-content">'+tabStr+'</div>'+
                	'</div>'+
                	'<input type="hidden" name="'+args.input+'" />'+
                '</form></div>';
	        $(obj).html(str);
	        /*填充城市*/
	        this.fillCitys(obj,args);
		},
		fillCitys: function(obj,args){
			var href = args.href||setFillters.href;
			var selected = parseInt(helper.urlToObject(href)['org_id']);
			/*初始化*/
			city.initCity(obj,args);
			if(selected){
				city.getAllCity({
                    'id': selected,
                    'url': '/order/api.php?s=api/org/get_detail_by_org',
                    'callback': function(data){
                        $(obj).find('.levelSelect').val(data.length);
                        args.endLevel = data.length;
                        $(obj).find('.city-selected').html(data.slice(1).map(function(e,i){
                            return e.org_name;
                        }).join('/'));
                        /*填充城市*/
						$.each(data,function(e,i){
							var curLevel = parseInt(i.level),
								curId = i.id;
							$(obj).find('.tabs-item').eq(curLevel-2).find('.selected').html(i.org_name);
							if(curLevel == data.length){
								$(obj).find('[data-id="'+curId+'"]').parent('li').addClass('active');
							}else{
								city.nextLevel(obj,curLevel,curId,args);
							}
						});
                    }
                });
			}
		},
		initCity: function(obj,args){
			$(obj).find('.tabs-item').map(function(tab,i){
				if($(this).index()==0){
					$(this).find('a').click();
				}else{
					$(this).addClass('hidden');
				};
				$(this).find('.selected').html($(this).data('init'));

			});
			$(obj).find('.tab-pane').html('');
			city.getCity(args,1,0,function(data){
					$('#'+args.levels[0].name).html(data);
				});
		},
		getCity: function(args,curLevel,curId,FN){
			 console.log(curLevel);
			 $.ajax({
	            url: args.url+curLevel+curId,
	            method: 'post',
	            data: {
	                'level': curLevel+1,
	                'pid': curId,
	            },
	            success: function(data){
	                data = JSON.parse(data);
	                console.log(data.success);
	                if(data.success){
	                	console.log(data);
	                	FN(city.getCityStr(curLevel+1,data.list));
	                }else{
	                	FN(data.msg);
	                }
	            },
	            error: function(error){
	            	FN(error);
	            }
	        })
		},
		getAllCity: function(args){
			$.ajax({
				url: args.url,
				method: 'post',
				data: {id: args.id},
				success: function(data){
					if(data.success){
						args.callback(data.data)
					}else{
						args.callback(data.msg)
					}
				},
				error: function(error){
					args.callback(error);
				}
			})
		},
		getCityStr: function(level,data){
			return '<ul class="nav nav-pills">'+data.map(function(city,i){
					return '<li><a class="select-item" data-level='+level+' data-id='+city.id+'>'+city.org_name+'</a></li>'
				}).join('')+'</ul>';
		},
		nextLevel: function(obj,curLevel,curId,args){
			var tab = $(obj).find('.tabs-item').eq(curLevel-1),
				tabPane = $(tab.find('a').attr('href'));
			tab.removeClass('hidden');
			tab.find('a').click();
			city.getCity(args,curLevel,curId,function(data){
					tabPane.html(data);
					$(obj).find('[data-id="'+curId+'"]').parent('li').addClass('active');
				});
		},
		bindEvent: function(obj,args){
			$(obj).on('click','.city-select',function(){
				var cityBox = $(this).siblings('.city-box');
				/*显示城市面板*/
				cityBox.removeClass('hidden');				
			}).on('change','.levelSelect',function(){
				/*更新城市终止层级*/
				args.endLevel = $(this).val();
				/*清空城市*/
				//city.initCity(obj,args);
			}).on('click','.select-item',function(){
				/*记录下一层级和城市id*/
				var curLevel = $(this).data('level'),
					curId = $(this).data('id');
				/*tab填充地址*/
				$(obj).find('.tabs-item').eq(curLevel-2).find('.selected').html($(this).html());
				if(curLevel == parseInt(args.endLevel)){
					/*隐藏城市面板*/
					$(obj).find('.city-box').addClass('hidden');
					/*填充选中*/
					$(obj).find('.city-selected').html($(obj).find('.selected').map(function(){
							return $(this).html();
					}).get().join('/'));
					/*填充网点id到表单*/
					$('input[name="'+args.input+'"]').val(curId);
					if(typeof(args.callback)=='function'){
						args.callback($(obj).find('.cityForm').serialize());
					}
				}else{
					/*进入下一级*/
					city.nextLevel(obj,curLevel,curId,args);
				}
			}).on('click','.tabs-item a',function(){
				$(this).parent('.tabs-item').nextAll('.tabs-item').map(function(i,tab){
					$(tab).addClass('hidden').find('.selected').html($(tab).data('init'))
				});
			})
		}
	}
	$.fn.addCityPicker = function(option){
		var options = $.extend({
			'url': '',
			'levels': [],
            'endLevel': 0,/*城市终止层级*/
			'input': 'org_id',
			'callback': function(){}
		},option);
		city.init(this,options);
	}
})(jQuery);
/*搜索框*/
(function($){
	var search = {
		init: function(obj,args){
			this.fillHtml(obj,args);
			this.bindEvent(obj,args);
		},
		fillHtml: function(obj,args){
			var str = '<form class="searchForm"><div class="input-group">'+
                    '<input id="searchInput" type="text" class="form-control" name="search_query" placeholder="搜索">'+
                    '<span class="input-group-btn searchBtn">'+
                        '<button class="btn btn-default glyphicon glyphicon-search" type="button"></button>'+
                    '</span>'+
                '</div></form>';
			$(obj).html(str);
		},
		bindEvent: function(obj,args){
			$(obj).on('click','.searchBtn',function(){
				if(typeof(args.callback) == 'function'){
					args.callback($(obj).find('.searchForm').serialize());
				}
			})
		}
	};
	$.fn.addSearch = function(option){
		var options = $.extend({
			'callback':function(){}
		},option);
		search.init(this,options);
	}
})(jQuery);
/*多选框*/
(function($){
	var checkbox = {
		init: function(obj,args){
			this.fillHtml(obj,args);
			this.bindEvent(obj,args);
		},
		fillHtml: function(obj,args){
			var labelStr = args.input.map(function(e,i){
				return '<label for="'+e.id+'"><input id="'+e.id+'" class="check-item" type="'+e.type+'" name="'+e.name+'" value="'+e.val+'">'+e.label+'</label>'
			}).join('');
			$(obj).html('<form class="saleTypeForm">'+labelStr+'</form>');

		},
		bindEvent: function(obj,args){
			$(obj).on('change','.check-item',function(){
				if(typeof(args.callback)=='function'){
					args.callback($(obj).find('form').serialize());
				}
			})
		}
	};
	$.fn.addCheckbox = function(option){
		checkbox.init(this,$.extend({
			'input':[],
			'callback': function(){},
		},option))
	}
})(jQuery);
/*下拉框*/
(function($){
	var select = {
		init: function(obj,args){
			this.fillHtml(obj,args);
			this.bindEvent(obj,args);
		},
		fillHtml:function(obj,args){
			var selectStr = args.selects.map(function(i,e){
				return '<select class="btn btn-default" name="'+i.name+'">'+i.options.map(function(i,e){
					var selected = i.default?'selected':'';
					return '<option '+selected+' val="'+i.val+'">'+i.label+'</option>'
				}).join('')+'</select>';
			}).join('');
			$(obj).html('<form class="selectForm">'+selectStr+'</form>');
		},
		bindEvent: function(obj,args){
			$(obj).on('change','select',function(){
				if(typeof(args.callback)=='function'){
					args.callback($(obj).find('form').serialize());
				}
			})
		},
	}
	$.fn.addSelect = function(option){
		select.init(this,$.extend({
			'select':[],
		},option));
	}
})(jQuery);
/*表格生成*/
(function($){
	var table = {
		init:function(obj,args){
			this.fillHtml(obj,args);
			this.bindEvent(obj,args);
		},
		fillHtml:function(obj,args){
			var actions = args.actions,
				thead = action = tbody = actBtn = '';
			if(actions.length>0){
				action = '<th>操作</th>';
				actBtn = '<td>'+actions.map(function(i,e){
					var btnClass = e%2==0?'default':'primary';
					return '<button class="btn btn-'+btnClass+' btn-'+i.type+'">'+i.label+'</button>'
				}).join('')+'</td>';
			};
			thead = '<thead><tr>'+args.data.thead.map(function(i,e){
				return '<th>'+i+'</th>';
			}).join('')+action+'</tr></thead>';
			$.each(args.data.tbody,function(e,i){
				var tr = '';
				for(var k in i){
					tr += '<td class="td-'+k+'">'+i[k]+'</td>';
				}
				tbody += '<tr id="'+i.id+'">'+tr+actBtn+'</tr>'
			});
			$(obj).html('<table class="table table-hover table-bordered">'+thead+tbody+'</table>')
		},
		bindEvent: function(obj,args){
			$.each(args.actions,function(i,e){
				if(typeof(e.callback)=='function'){
					$(obj).on('click','.btn-'+e.type,function(){
						e.callback($(this).parent('td').siblings('.td-id').html());
					})
				}
			})
		}
	};
	$.fn.addTable = function(option){
		table.init(this,$.extend({
			'data':'',
			'actions':[],
		},option))
	}
})(jQuery);
/*全局配置变量*/
	var setFillters = {
		href: '',
		init: function(obj,args){
			this.href = args.href;
			this.fillHtml(obj,args);
			this.fillData(helper.urlToObject(args.href));
		},
		fillHtml: function(obj,args){
			for (k in args.fillters){
				if(!helper.isEmptyObject(args.fillters[k])){
					setFillters.actionFn[k](obj,args.fillters[k]);
				}
			}
		},
		actionFn:{
			'addFillter':function(obj,args){
				$(obj).find(args.cnt).addFillter(args.config);
			},
			'addTimePicker': function(obj,args){
				$(obj).find(args.cnt).addTimePicker(args.config);
			},
			'addCheckbox':function(obj,args){
				$(obj).find(args.cnt).addCheckbox(args.config);
			},
			'addSearch': function(obj,args){
				$(obj).find(args.cnt).addSearch(args.config);
			},
			'addCityPicker': function(obj,args){
				$(obj).find(args.cnt).addCityPicker(args.config);
			},
			'addSelect': function(obj,args){
				$(obj).find(args.cnt).addSelect(args.config);
			},
		},
		fillData: function(obj){
			//console.log(obj);
			for( k in obj){
                var input = $('input[name="'+k+'"]'),
                    type = input.attr('type');
                if(obj[k]){
	                if(type=='text'){
	                    input.val(obj[k]).parents('.hidden').removeClass('hidden');
	                }else if(type == 'radio'){
	                    $('#'+k+obj[k]).prop('checked',true).parents('.f_item').addClass('active').parents('.f_line.hidden').addClass('show');
	                }else if(type == 'hidden'){
	                    input.val(obj[k]);
	                }else if(type == 'checkbox'){
	                    input.prop('checked',true);
	                };
	            }
            }
		},
		
	};
	$.fn.setFillters = function(option){
		setFillters.init(this,$.extend({
			'href': '',/*需处理url*/
			'fillters': {/*设置筛选*/
				/*筛选*/
				'addFillter': {},
				/*时间选择*/
				'addTimePicker': {},
				/*订单类型*/
				'addCheckbox': {},
				/*输入框搜索*/
				'addSearch': {},
				/*联动选择城市*/
				'addCityPicker': {},
			}
		},option));
	}
})(jQuery);
/*页面组件初始化*/
(function($){
	var pageWidgets = {
		init: function(args){
			for(var k in args){
				if(!helper.isEmptyObject(args[k])){
					pageWidgets[k](args[k]);
				}
			}
		},
		setBreadcrumb: function(args){
			$(args.cnt).html('<ol class="breadcrumb border-box bottom padding">'+args.list.map(function(i,e){
				var target = i.newpage?'target="_blank"':'';
				return '<li><a href="'+i.link+'" '+target+'>'+i.label+'</a></li>'
			}).join('')+'</ol>');
		},
		setFillters: function(args){
			$(args.cnt).setFillters(args.config);
		},
	};
	$.extend({
		pageInit:function(option){
			pageWidgets.init($.extend(true,{
				'setBreadcrumb':{},
				'setFillters':{},
			},option))
		}
	})
})(jQuery)
var helper = {
	urlToObject: function(url){
		var i = url.indexOf('&');
        var obj = {};
        if(i>0){
            
            url = url.substring(i+1);
            url = url.split('&');
            $.each(url,function(i,e){
                e = e.split('=');
                obj[e[0]] = e[1];
            })
        }
        return obj;
	},
	isEmptyObject: function(obj){
		for(var i in obj){
		    if(obj.hasOwnProperty(i)){
		      return false;
		    }
		}
		return true;
	},
};