import Vue from 'vue'
import Router from 'vue-router'

import Login from "../views/Login"
import Main from '../views/Main'

import UserInfo from "../views/children/UserInfo"
import UserList from "../views/children/UserList"
import NotFound from '../views/error/NotFound'
Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      // 登录页
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      // 首页
      path: '/main/:username',
      name: 'Main',
      component: Main,
      children:[
        {path:'/user/info/:id',name:'UserInfo',component:UserInfo,props:true},
        {path:'/user/list',name:'UserList',component:UserList}
      ]
    },
    {
      path:'/goMain/:username',
      redirect:'/Main/:username'
    },{
      path:'*',
      component:NotFound
    }
  ]
});
