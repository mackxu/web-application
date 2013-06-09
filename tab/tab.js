// 插件：选项卡
jQuery.fn.tabs = function(control) {
	var $tabs = $(this),
		$control = $(control);

	$tabs.find('li').click(function() {
		// 从列表项中删除和添加active类
		$tabs.find('li').removeClass('active');
		this.className = 'active';

		// 对应内容的显示
		var tabName = $(this).attr('data-tab');
		$control.find('[data-tab]').hide();
		$control.find('[data-tab="' + tabName +'"]').show();
	});
	
	// 初始化状态
	$tabs.find('li:first').addClass('active');				// 选中选项卡
	$control.find('>[data-tab]').hide().first().show();		// 只显示第一个div
};
// 自定义事件tabs.change
jQuery.fn.tabs2 = function(control) {
	var $tabs = $(this),
		$control = $(control);

	// 利用事件委托，监听单击选项卡事件
	$tabs.delegate('li', 'click', function() {
		// 单击的选项卡的data-tab属性值
		var tabName = $(this).attr('data-tab');
		// 在单击时触发自定义事件
		$tabs.trigger('tabs.change', tabName);
	});

	// 绑定自定义事件
	// 解耦回调函数，易扩展
	$tabs.bind('tabs.change', function(e, tabName) {
		$tabs.find('li').removeClass('active');
		$tabs.find('>[data-tab="'+ tabName +'"]').addClass('active');
	});

	$tabs.bind('tabs.change', function(e, tabName) {
		$control.find('>[data-tab]').hide();
		$control.find('>[data-tab="'+ tabName +'"]').show();
	});

	// 初始化状态
	var firstName = $tabs.find('li:first').attr('data-tab');
	$tabs.trigger('tabs.change', firstName);
};