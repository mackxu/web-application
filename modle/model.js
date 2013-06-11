// 创建对象的关系映射
// Model对象将用于创建新的模型和实例
var Model = {
	inherited: function() {},
	created: function() {},

	prototype: {
		init: function() {}
	},

	// 创建新模型
	create: function() {
		var object = Object.create(this);						// 创建子类模型
		object.parent = this;
		object.prototype = object.fn = Object.create(this.prototype);

		object.created();
		this.inherited(object);
		return object;
	},
	// 返回模型的实例
	init: function() {
		var instance = Object.create(this.prototype);			// 实例继承它的原型属性
		instance.parent = this;									// 指明父类
		instance.init.apply(instance, arguments);				// 委托，创建实例时调用初始化函数
		return instance;
	}
};

(function() {
	var User = Model.create();
	var user = User.init();
	console.dir(User);
	console.dir(user);
})();