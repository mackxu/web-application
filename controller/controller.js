// 控制器
// 规定了它该做什么事情
(function($, exports) {
	var my = function(includes) {
		if (includes) this.include(includes);
	};
	my.fn = my.prototype;

	// 保证func将my对象作为上下文中执行
	my.fn.proxy = function(func) {
		return $.proxy(func, this);
	};
	// DOM就绪后执行func
	// func用于处理与DOM交互的事情
	my.fn.load = function(func) {
		$(this.proxy(func));
	};
	// 为控制器添加属性
	my.fn.include = function(obj) {
		$.extend(this, obj);
	};

	exports.Controller = my;
})(jQuery, window);