(function($) {
/*
 * customEach
 *
 * Copyright (c) 2009 hisasann
 *
 * Options:
 * 　eachCount - setTimeoutを挟みたいカウント数
 * 　init - 最初に実行したい関数
 * 　loop - ループ処理時に実行したい関数
 * 　callback - 最後に実行したい関数
 *
 * Description:
 * 　適度にループしたい場合に使えるです。
 *   重いループのとき、IEとかでスクリプト停止のダイアログが出てしまう場合があるが、
 *   これを防ぐために、eachCountずつsetTimeoutを挟むためダイアログが出ないようにできる
 *   ※注意！ customEachを連続して実行したい場合は、必ずcallbackに入れること。
 */

$.customEach = function(object, options) {
	new customEach(object, options);
};

function customEach(object, options) {
	var opts = {
		eachCount: 1,
		eachLength: null,
		init: function() {},
		loop: function() {},
		callback: function() {}
	};

	var makeObject = make(object, options);
		options = makeObject.options;
		object = makeObject.object;

	$.extend(opts, options);

	var i = 0,
		max = object ? object.length : opts.eachLength,
		len;

	object = object ? object : new Array;

	opts.init();
	(function() {
		len = customLen(max, opts.eachCount, i);

		for (;i < len; ++i) {
			opts.loop.call(object[i], i, object[i]);
		}

		if (max <= len){
			opts.callback();
			return;
		}

		setTimeout(arguments.callee, 0);
	})();
}

function make(object, options) {
	var ret = {
		options: null,
		object: null
	};

	if ($.isArray(object) || object && object.length) {
		ret.object = object;
		ret.options = options;
	} else {
		ret.object = null;
		ret.options = object;
	}

	return ret;
}

function customLen(max, count, i) {
	return (function() {
		var next = i + count,
			ret;

		if (max >= next) {
			ret = next;
		} else {
			ret = max;
		}

		return ret;
	})();
}

})(jQuery);
