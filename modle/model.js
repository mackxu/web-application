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
Model.LocalStorage = {
	saveLocal: function() {
		var result = [];										// 把记录转换为数组
		for(var i in this.records) {
			result.push(this.records[i]);
		}
		localStorage[name] = JSON.stringify(result);
	},
	loadLocal: function(name) {
		var result = JSON.parse(localStorage[name]);
		this.populate(result);
	}
};
Model.extend({
	find: function(id) {
		return this.records[id];
	},
	// 创建新的模型时，设置一个新的records对象
	created: function() {
		this.records = {};
		this.attributes = [];
	},
	// 对给定的值做遍历、创建实例并更新records对象
	populate: function(values) {
		this.records = {};										// 重置model和records

		for (var i = 0, len = values.length; i < len; i++) {
			var record = this.init(values[i]);
			record.newRecord = false;
			this.records[record.id] = record;
		}
	},
	toJSON: function() {
		return this.attributes();
	}
});												
Model.include({
	newRecord: true,
	create: function() {
		if(!this.id) this.id = Math.guid();
		this.newRecord = false;
		this.parent.records[this.id] = this.dup();
	},
	destory: function() {
		delete this.parent.records[this.id];
	},
	update: function() {
		this.parent.records[this.id] = this.dup();
	},
	save: function() {
		this.newRecord ? this.create() : this.update();
	},
	// 深度克隆
	dup: function() {
		return jQuery.extend(true, {}, this);
	},
	attributes: function() {
		var result = {};
		for(var i in this.parent.attributes) {
			var attr = this.parent.attributes[i];
			result[attr] = this[attr];
		}
		result.id = this.id;
		return result;
	},
	// 将新纪录提交给服务器
	createRemote: function(url, callback) {
		$.post(url, this.attributes(), callback);
	},
	updateRemote: function(url, callback) {
		$.ajax({
			url: url,
			data: this.attributes(),
			success: callback,
			type: 'PUT'
		});
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