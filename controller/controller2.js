
	// 文档加载完成后载入控制器
	var exports = this;
	(function($, exports) {
		var mod = {};			// 局部上下文

		// 创建控制器
		mod.create = function(includes) {
			var my = function() {
				// 使用apply只是为了传参
				this._initializer.apply(this, arguments);
				this.init.apply(this, arguments);
			};

			my.fn = my.prototype;
			my.fn.init = function() {};

			my.proxy = function(func) {
				return $.proxy(func, this);
			};
			my.fn.proxy = my.proxy;

			my.include = function(ob) { $.extend(this.fn, ob); };
			my.extend = function(ob) { $.extend(this, ob); };
			// 私有方法
			// 为实例添加属性
			my.include({
				_initializer: function(options) {
					this.options = options;
					for(var key in this.options) {					// 把传递的参数转成实例属性
						this[key] = this.options[key];
					}
					this.elements && this._refreshElements();		// 再添加与DOM相关的属性
				},
				// 需要一个el属性，同时传入选择器
				_$: function(selector) {
					return this.el.find(selector);					// 在限定视图范围内查找
				},
				// 设置本地变量
				_refreshElements: function() {
					for(var key in this.elements) {
						this[this.elements[key]] = this._$(key);
					}
				},
				// 如果有，根据第1个空格来分割
				_eventSplitter: /^(\w+)\s*(.*)$/,
				// 委托事件
				_delegateEvents: function() {}
			});
			if (includes) { my.include(includes); };

			return my;
		};

		exports.Controller = mod;
	})(jQuery, exports);

	// 使用Controller.create()创建控制器
	$(document).ready(function() {
		// 创建控制器类
		var SearchView = Controller.create({
			// 选择器到局部变量的映射
			elements: {
				"input[type=search]" : "searchInput",
				"form" : "searchForm"
			},
			// 实例化时自动调用
			init: function(viewId) {
				// this.el = $(viewId);
				// this._refreshElements();
				this.searchForm.submit(this.proxy(this.searchHandle));
			},

			searchHandle: function() {
				console.log('search');
				return false;
			}
		});

		// 实例化控制器，调用init()
		var t = new SearchView({"el":$('#users')});					// 必须传递el属性
		console.dir(t);
	});