// 0.导入 gulp
const gulp = require('gulp');
// 1-1.导入 gulp-cssmin 第三方包
// 作用: 专门把 css 文件进行压缩处理
const cssmin = require('gulp-cssmin');
// 1-2.导入 gulp-autoprefixer 第三方包
// 作用： 自动添加前缀,传入一个参数：需要兼容那些浏览器直接百度
const autoprefixer = require('gulp-autoprefixer');
// 2-1.导入 gulp-babel 第三方包,ES6 转换成 ES5
const babel = require('gulp-babel');
// 2-2.导入 gulp-uglify 第三方包,压缩 js 文件
const uglify = require('gulp-uglify');
// 3.导入 gulp-htmlmin 第三方包,压缩 html 文件
const htmlmin = require('gulp-htmlmin');
// 7.导入 dist 第三方包,
// 专门负责在打包之前, 把 dist 目录删除掉
const del = require('del');
// 8.导入 gulp-webserver 第三方包
const webserver = require('gulp-webserver');
const { watch } = require('gulp');


// 任务1 ：打包 css 文件
const cssHandler = () => {
    // 找到需要打包的源文件
    return gulp
        .src('./src/css/*.css')
        .pipe(autoprefixer()) // 添加前缀
        // .pipe(cssmin()) // 压缩
        .pipe(gulp.dest('./dist/css')) //把 流 存放到指定目录下
}
// 任务2 : 打包 js 文件
const jsHandler = () => {
    // 找到需要打包的源文件
    return gulp
        .src('./src/javascripts/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        })) //ES6 转 ES5
        // .pipe(uglify()) //压缩
        .pipe(gulp.dest('./dist/javascripts')) //保存
}
// 任务3 : 打包 html 文件
const htmlHandler = () => {
    // 4-1. 找到 html 文件
    return gulp
        .src('./src/pages/*.**')
        // 因为 htmlmin 的所有打包信息都需要以参数的形式进行配置
        // .pipe(htmlmin({ // 压缩
        //     collapseWhitespace: true, // 去除空白内容
        //     // collapseBooleanAttributes: true, // 简写布尔值属性
        //     // removeAttributeQuotes: true, // 去除属性上的双引号
        //     // removeComments: true, // 去除注释
        //     // removeEmptyElements: true, // 去除空元素
        //     // removeEmptyAttributes: true, // 去除空的属性
        //     // removeScriptTypeAttributes: true, // 去除 script 标签上的 type 属性
        //     // removeStyleLinkTypeAttributes: true, // 去除 style 标签和 link 标签上的 type 属性
        //     // minifyJS: true, // 压缩内嵌式 js 代码, 不认识 ES6
        //     // minifyCSS: true, // 压缩内嵌式 css 文本, 不能自动加前缀
        // }))
        .pipe(gulp.dest('./dist/pages/')) // 保存
}
// 任务4 ： 转存 image 文件
const imgHandler = () => {
    // 找到需要打包的源文件
    return gulp
        .src('./src/assert/*.**') //找到目录下的所有文件
        .pipe(gulp.dest('./dist/assert')) //保存
}
// 任务5 ：转存 assets 文件
const assetsHandler = () => {
    // 找到需要转存 assets 文件
    return gulp
        .src('./src/assert/*/**') //找到目录下的所有文件夹
        .pipe(gulp.dest('./dist/assert')) //保存
}
// 7. 删除 dist 文件
const delHandler = () => {
    return del('./dist')
}
// 8.创建一个基于 gulp 的服务器
const webHandler = () => {
    return gulp
        .src('./dist')
        .pipe(webserver({ //开启服务器
            host: 'www.xiaomi.com',
            port: 8080,
            open: './pages/index.html', //默认打开哪一个文件, 从 dist 目录开始向后写
            livereload: true, //自动刷新
            proxies: [
                {
                  source: '/localhost',
                  target: 'http://localhost:80/kangjia/login.php'
                },
                {
                    source: '/localhost',
                    target: 'http://localhost:80/kangjia/register.php'
                  }
              ]
        }))
}
// 9.开启监控任务
const watchHandler = () => {
    // 没有返回值,不需要 return
    // 实时开启监控,多个任务同时执行的时候,需要把这个任务放在最后
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHandler);
    gulp.watch('./src/pages/*.html',htmlHandler);
    gulp.watch('./src/assets/*/**',assetsHandler);
}



// 配置一个默认执行的任务
const defaultHandler = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, jsHandler, htmlHandler,imgHandler,assetsHandler),
    webHandler,
    watchHandler
)
// 导出任务
// 为什么一定要起名叫做 default
// 因为你在命令行执行的时候, 如果书写 $ gulp default
// 可以简写成 $ gulp
module.exports.default = defaultHandler;