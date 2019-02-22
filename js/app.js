import $ from '../lib/zepto.js';//zepto没有用 CommonJs 规范的方法 module.exports 来导出模块
import webApp from '../lib/app/app.js';

var App = webApp({
	container: 'app',
	animate: { effects: ['slideInRight', 'slideOutLeft'], delay: 600 },
	preLoad: function () {

	},
	aftLoad: function () {
		loadPercent(100);
	}
})
	.other('/index', { temId: 'tempIndex', create: createIndex })
	.when('/button', { temId: 'tempButton' })
	.when('/form', { temId: 'tempForm' })
	.when('/dialog', { temId: 'tempDialog', create: createDialog })
	.init();

function bindEvent() {
	$('.icon-home').live('click', function () {
		App.setPage('/index');
	});
}

function createIndex(ctx, elem) {
	elem.on('click', '[data-hash]', function () {
		var hash = $(this).attr('data-hash');
		hash && ctx.setPage(hash);
	});
}

function createDialog(ctx, elem) {
	var load = $('#loading'),
		fresh = $('#freshing'),
		share = elem.find('#share'),
		dialog = elem.find('#dialog');
	elem.find('[data-tag=loading]').on('click', function () {
		load.show();
		loadPercent(30);
		setTimeout(function () {
			loadPercent(100);
		}, 2000);
	});
	elem.find('[data-tag=freshing]').on('click', function () {
		fresh.show();
		setTimeout(function () {
			fresh.hide();
		}, 2000);
	});
	elem.find('[data-tag=share]').on('click', function () {
		share.show();
	});
	share.on('click', function () {
		share.hide();
	});
	elem.find('[data-tag=dialog]').on('click', function () {
		dialog.addClass('active');
	});
	dialog.find('a').on('click', function () {
		dialog.removeClass('active');
	})
}

bindEvent();