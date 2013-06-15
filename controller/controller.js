// 控制器
// 规定了它能做什么事情
// 问题，控制器的一部分在生成DOM之前就载入了，
// 另一部分则在页面文档载入完成后触发的回调函数里
(function($, exports) {
	var my = function(includes) {
		if (includes) this.include(includes);
	};
	my.fn = my.prototype;

	// 返回函数
	// 保证func将my对象作为上下文执行
	my.fn.proxy = function(func) {
		return $.proxy(func, this);
	};
	// DOM就绪后执行func
	// func用于处理与DOM交互的事情
	my.fn.load = function(func) {
		// 等价于$(document).ready(function() { this.proxy(func) });
		$(this.proxy(func));
	};
	// 为控制器添加属性，而不是为它的实例添加属性
	my.fn.include = function(obj) {
		$.extend(this, obj);
	};

	exports.Controller = my;
})(jQuery, window);

// 实例：
(function($, Controller) {
	
	var my = new Controller;

	my.toggleClass = function(e) {
		console.dir(this);
		this.view.toggleClass('over', e.data);
	};

	my.load(function() {
		this.view = $('#view');
		this.view.mouseover(this.proxy(this.toggleClass), true);
		this.view.mouseout(this.proxy(this.toggleClass), false);

	});
})(jQuery, Controller);