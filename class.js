
	var Class = function(parent) {
		var klass = function() {
			this.init.apply(this, arguments);
		};
		if (parent) {										// 如果存在，继承父类实例的原型
			var subclass = function() {};
			subclass.prototype = parent.prototype;
			klass.prototype = new subclass;					// 改变klass的原型
		}

		klass.prototype.init = function() {};				// 默认的初始化的方法
		
		klass.fn = klass.prototype;							// 定义prototype的别名
		
		klass.fn.parent = klass;							// 定义类别名

		klass._super = klass.__proto__;						// 理解不了，不知道指向哪里

		klass.proxy = function(func) {						// 添加一个proxy函数
			var self = this;
			return (function() {							// 返回一个指定执行作用域的函数
				return func.apply(self, func);
			});
		}

		klass.fn.proxy = klass.proxy;						// 为实例添加proxy方法
															
		klass.extend = function(obj) {						// 给类添加属性
			var extended = obj.extended;
			for(var i in obj) {
				klass[i] = obj[i];
			}
			if (extended) { extended(klass); }
		};
		
		klass.include = function(obj) {						// 为实例添加属性
			var included = obj.included;
			for(var i in obj) {
				klass.fn[i] = obj[i];
			}
			if (included) { included(klass); }
		};

		return klass;
	};														// 此分号不能省略