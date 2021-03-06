import SMERouter from 'sme-router';
// bus工具
import bus from '../util/bus';
// 首页视图
import home_template from '../views/home.html';
// 404视图
import not_found_template from '../views/404.html';
 import movie_template from "../views/movies/movie-list.html"


//movie页面控制器
import movie_controller from "../controllers/movie/movie";

//page-header页面控制器
import page_header_controller from "../controllers/page-header";
//profile页面控制器
import profile_controller from "../controllers/profile/profile";

import order_controller from "../controllers/order/order";

import frontProfile_controller from "../controllers/frontProfile/frontProfile"
var router = null

// 启动路由的方法
const _init = () => {
    // 实例化路由工具
    router = new SMERouter('router-view');
    
    // 中间件会先执行 为导航按钮添加高亮样式
    router.use((req, res, next) => {
        _activeLink(req.route);
    })

    //匹配头部信息,如果不加/，就不会再执行
    router.route("/",page_header_controller.render);

    // 开始匹配各个路由
    router.route('/movie-list', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(movie_template);
    })


    //电影路由
    router.route("/movie-lead",movie_controller.lead)
    router.route("/movie-list",movie_controller.list)
    router.route("/movie-save",movie_controller.save)
    router.route("/movie-update",movie_controller.update)

    //个人中心路由
    router.route("/profile-list",profile_controller.list)

    router.route("/order-list",order_controller.list)
    
    //前台用户管理
    router.route("/frontProfile-list",frontProfile_controller.list)

    // 404路由
    router.route('/not-found', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(not_found_template)
        _navLink('.not-found a[to]')
    })

    //上面的没有匹配到就会跳转404路由或者首页
    router.route('*', (req, res, next) => {
        if ( req.url === '' ) { // 刚进入项目，没有hash值，重定向到home
            res.redirect('/movie-list')
        } else { // 如果路径匹配不到，导向404
            res.redirect('/not-found')
        }     
    })

    // 因为在控制器中无法使用到router，所以给bus绑定事件，在其他模块中触发bus的事件
    //enevt.on('xx',()=>{})
    bus.on('go', (path, body = {}) =>  router.go(path, body) )
    bus.on('back', () =>  router.back() )  
    

    // 给按钮添加事件
    _navLink()
}

// 给导航按钮添加点击事件
const _navLink = (selector) => {
    let $navs = $(selector || '.sidebar-menu li.nav-link[to]')
    $navs.on('click',async function () {
        let _path = $(this).attr('to')
        router.go(_path)
    })
}

// 给导航按钮添加不同的类名
// @param route 当前路由的hash值
const _activeLink = (route) => {
    let $navs = $('.sidebar-menu li[to]')
    $navs.removeClass('active')
    $navs.filter(`[to='${route}']`)
         .addClass('active')
}



export default {
    init: _init,
    navLink: _navLink
}

