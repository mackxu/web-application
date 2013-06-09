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
