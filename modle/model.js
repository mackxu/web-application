// GUID生成器
Math.guid = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16|0, v = c == 'x' ? r:(r&0x3|0x8);
		return v.toString(16);
	}).toUpperCase();
};

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
	},
	// 添加对象属性
	extend: function(o) {
		var extended = o.extended;
		jQuery.extend(this, o);
		if (typeof extended === 'function') extended(this);
	},
	// 添加实例属性
	include: function(o) {
		var included = o.included;
		jQuery.extend(this.prototype, o);
		if (typeof included === 'function') included(this);
	}
};

Model.records = {};												// 用来保存资源对象
Model.extend({
	find: function(id) {
		return this.records[id];
	}
});												
Model.include({
	newRecord: true,
	create: function() {
		if(!this.id) this.id = Math.guid();
		this.newRecord = false;
		this.parent.records[this.id] = this;
	},
	destory: function() {
		delete this.parent.records[this.id];
	},
	update: function() {
		this.parent.records[this.id];
	},
	save: function() {
		this.newRecord ? this.create() : this.update();
	}
});

(function() {
	var User = Model.create();
	User.include({
		init: function(attrs) {
			jQuery.extend(this, attrs);
		},
		load: function() {}
	});
	var user = User.init();
	user.name = 'zhangsan';
	user.save();

	var user2 = User.init();
	user2.name = 'lisi';
	user2.save();

	console.dir(User);
})();



console.log(Math.guid());