;(function() {
    /**
     * canvas画网格线
     * @param  {Object} ctx canvas 绘图对象
     * @param  {String} color 
     * @param  {Number} stepx x轴间隔大小
     * @param  {Number} stepy y轴间隔大小
     */
    function grid(ctx, color, stepx, stepy) {
        if (!ctx) {
            console.log('canvas context is not exist');
            return;
        }
        ctx.save();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = color;

        for (var i = stepx + 0.5; i < ctx.canvas.width; i += stepx) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, ctx.canvas.height);
            ctx.stroke();
        }

        for (var i = stepy + 0.5; i < ctx.canvas.height; i += stepy) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(ctx.canvas.width, i);
            ctx.stroke();
        }
        ctx.restore();
    }
    /**
     * 使用三次贝塞尔曲线模拟椭圆，此方法也会产生当lineWidth较宽，椭圆较扁时，长轴端较尖锐，不平滑的现象
     * @param {Object} ctx canvas 绘图对象
     * @param {Number} x   中心横坐标
     * @param {Number} y   中心纵坐标
     * @param {Number} a   椭圆横半轴长
     * @param {Number} b   椭圆纵半轴长
     */
    function ellipse(ctx, x, y, a, b) {
        if (!ctx) {
            console.log('canvas context is not exist');
            return;
        }
        var k = .5522848,
            ox = a * k, // 水平控制点偏移量
            oy = b * k; // 垂直控制点偏移量
        ctx.beginPath();
        //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
        ctx.moveTo(x - a, y);
        ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
        ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
        ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
        ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
        ctx.closePath();
        ctx.stroke();
    }

    /**
     * arcTo 创建圆角矩形
     */
    function roundRect(ctx, x, y, width, height, radius) {
        if (!ctx) {
            console.log('canvas context is not exist');
            return;
        }
        ctx.beginPath();
        if (width > 0) {
            ctx.moveTo(x + radius, y);
        } else {
            ctx.moveTo(x - radius, y);
        }

        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);

        if (width > 0) {
            ctx.arcTo(x, y, x + radius, y, radius);
        } else {
            ctx.arcTo(x, y, x - radius, y, radius);
        }
    }

    if (typeof module !== 'undefined' && module.exports) {
        exports.grid = grid;
        exports.ellipse = ellipse;
        exports.roundRect = roundRect;
    } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            exports.grid = grid;
            exports.ellipse = ellipse;
            exports.roundRect = roundRect;
        });
    } else {
        window.grid = grid;
        window.ellipse = ellipse;
        window.roundRect = roundRect;
    }
}());
