
	// 文档加载完成后载入控制器
	var exports = this;
	(function($, exports) {
		var mod = {};			// 局部上下文

		// 创建控制器
		mod.create = function(includes) {
			var my = function() {
				// 使用apply只是为了传参
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
			if (includes) { my.include(includes); };

			return my;
		};

		exports.Controller = mod;
	})(jQuery, exports);

	// 使用Controller.create()创建控制器
	$(document).ready(function() {
		// 创建控制器类
		var ToggleView = Controller.create({
			init: function(viewId) {
				this.view = $(viewId);
				this.view.mouseover(this.proxy(this.toggleClass));
				this.view.mouseout(this.proxy(this.toggleClass));
			},
			toggleClass: function(e) {
				this.view.toggleClass('over', e.data);
			}
		});

		// 实例化控制器，调用init()
		var t = new ToggleView('#view');
		console.dir(t);
	});