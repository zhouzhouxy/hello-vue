import Vue from 'vue'
import Router from 'vue-router'

import Login from "../views/Login"
import Main from '../views/Main'

import UserInfo from "../views/children/UserInfo"
import UserList from "../views/children/UserList"
import NotFound from '../views/error/NotFound'

//产品设计页面
import ProductRegister from '@/views/product/manager/productRegister'
import ProductRegisterCheck from '../views/product/manager/productRegisterCheck'
import ProductFileQuery from  '@/views/product/manager/productFileQuery'
import ProductFileChange from '@/views/product/manager/productFileChange'
import ProductQuery from '@/views/product/manager/conditionQuery'
//产品档案删除管理
import ProductFileDel from '@/views/product/manager/del/productFileDel'
import ProductFileRecover from '@/views/product/manager/del/fileDeleteRecover'
import ProductFilePerpetualDel from '@/views/product/manager/del/productFilePerpetualDel'

//产品物料组成设计
import MakeMaterialDesign from '@/views/product/materialDesign/makeMaterialDesign'
import MakeMaterialDesignCheck from '@/views/product/materialDesign/materialDesignCheck'
import MaterialQuery from '@/views/product/materialDesign/materialQuery'
import MaterialDesignChange from '@/views/product/materialDesign/materialDesignChange'
import AddDesignMaterial from '@/views/product/materialDesign/addDesignMaterial'
import ChangeMaterial from '@/views/product/materialDesign/changeMaterial'

//生产管理
//产品生产工序设计
import MakeProductProcessDesign from '@/views/process/productDesign/makeProductProcessDesign'
import AddProcessDesign from '@/views/process/productDesign/addProcessDesign'
import ProcessCheck from '@/views/process/productDesign/processCheck'
import ProcedureQuery from '@/views/process/productDesign/procedureQuery'
import ProcedureChange from '@/views/process/productDesign/procedureChange'
import ChangeProcedure from '@/views/process/productDesign/changeProcedure'

//工序物料设计
import MakeProcessMaterial from '@/views/process/materials/makeProcessMaterials'
import ProcessMaterialsCheck from '@/views/process/materials/processMaterialsCheck'
import ProcessMaterialQuery from '@/views/process/materials/processMaterialQuery'
import ProcessMaterialChange from '@/views/process/materials/processMaterialChange'
import AddProcessMaterials from '@/views/process/materials/addProcessMaterials'
import CheckProcessMaterial from '@/views/process/materials/checkProcessMaterials'
import ChangeProcessMaterial from '@/views/process/materials/changeProcessMaterials'

//生产计划管理
import NewProductionPlanRegister from '@/views/process/production/newPlanRegister'
import ProductionPlanCheck from '@/views/process/production/planCheck'
import ProductionPlanQuery from '@/views/process/production/planQuery'
import ApplyDetail from '@/views/process/production/applyDetail'
import QueryApplyDetail from '@/views/process/production/queryApply'

//生产调度管理
import FormulateProductionWorkOrder from '../views/process/productionDispatching/formulateProductionWorkOrder'
import ProductionWorkOrderCheck from '../views/process/productionDispatching/productionWorkOrderCheck'
import ProductionWorkOrderQuery from '../views/process/productionDispatching/productionWorkOrderQuery'
import ViewManufacture from '../views/process/productionDispatching/viewManufacture'
import ViewManufacture2 from '../views/process/productionDispatching/viewManufacture2'

//内部生产管理
import ProductionRegister from '@/views/process/innerProductionManager/productionRegister'
import ProductionRegisterCheck from '@/views/process/innerProductionManager/productionRegisterCheck'
import ProductionQuery from '@/views/process/innerProductionManager/productionQuery'

import test from '@/views/Test'


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
      //测试页面
    {
      path:'/test',
      name:'test',
      component:test
    },
    {
      // 首页
      path: '/main',
      name: 'Main',
      component: Main,
      children:[
        {path:'/user/info/:id',name:'UserInfo',component:UserInfo,props:true},
        {path:'/user/list',name:'UserList',component:UserList},
        {path:'/product/pr',name:'ProductRegister',component:ProductRegister},
        {path:'/product/prc',name:'ProductRegisterCheck',component:ProductRegisterCheck},
        {path:'/product/pfq',name:'ProductFileQuery',component:ProductFileQuery},
        {path:'/product/pfc',name:'ProductFileChange',component:ProductFileChange},
        {path:'/product/pq',name:'ProductQuery',component:ProductQuery},
        {path:'/product/del/pfd',name:"ProductFileDel",component:ProductFileDel},
        {path:'/product/del/pfr',name:"ProductFileRecover",component:ProductFileRecover},
        {path:'/product/del/pfp',name:"ProductFilePerpetualDel",component:ProductFilePerpetualDel},
        {path:'/product/mmd',name:"MakeMaterialDesign",component:MakeMaterialDesign},
        {path:'/product/mdc',name:"MakeMaterialDesignCheck",component:MakeMaterialDesignCheck},
        {path:'/product/mq',name:"MaterialQuery",component:MaterialQuery},
        {path:'/product/dc',name:"MaterialDesignChange",component:MaterialDesignChange},
        {path:'/design/material/:id',name:'AddDesignMaterial',component:AddDesignMaterial,props:true},
        {path:'/design/cm/:id',name:'ChangeMaterial',component:ChangeMaterial,props:true},
        {path:'/process/apd/:id',name:'AddProcessDesign',component:AddProcessDesign,props:true},
        {path:'/process/mpd',name:'MakeProductProcessDesign',component:MakeProductProcessDesign},
        {path:'/process/pc',name:'ProcessCheck',component:ProcessCheck},
        {path:'/process/pq',name:'ProcedureQuery',component:ProcedureQuery},
        {path:'/process/proc',name:'ProcedureChange',component:ProcedureChange},
        {path:'/process/cp/:id',name:'ChangeProcedure',component:ChangeProcedure,props:true},
        {path:'/pm/apm/:id',name:'AddProcessMaterials',component:AddProcessMaterials,props:true},
        {path:'/pm/mpm',name:'MakeProcessMaterial',component:MakeProcessMaterial},
        {path:'/pm/pmc',name:'ProcessMaterialsCheck',component:ProcessMaterialsCheck},
        {path:'/pm/cpm/:id',name:'CheckProcessMaterial',component:CheckProcessMaterial,props:true},
        {path:'/pm/pmq',name:'ProcessMaterialQuery',component:ProcessMaterialQuery},
        {path:'/pm/pmchange',name:'ProcessMaterialChange',component:ProcessMaterialChange},
        {path:'/pm/changepm/:id',name:'ChangeProcessMaterial',component:ChangeProcessMaterial,props:true},
          //生产计划管理
        {path:'/pm/ppr',name:'NewProductionPlanRegister',component: NewProductionPlanRegister},
        {path:'/pm/ppc',name:'ProductionPlanCheck',component: ProductionPlanCheck },
        {path:'/pm/ppq',name:'ProductionPlanQuery',component:ProductionPlanQuery},
        {path:'/pm/ad/:applyId',name:'ApplyDetail',component:ApplyDetail,props:true},
        {path:'/pm/qad/:applyId',name:'QueryApplyDetail',component:QueryApplyDetail,props:true},
        //生产调度管理
        {path:'/pm/fpwo',name:'FormulateProductionWorkOrder',component:FormulateProductionWorkOrder},
        {path:'/pm/pwoc',name:'ProductionWorkOrderCheck',component:ProductionWorkOrderCheck},
        {path:'/pm/pwoq',name:'ProductionWorkOrderQuery',component:ProductionWorkOrderQuery},
        {path:'/pm/vm/:id',name:'ViewManufacture',component:ViewManufacture,props:true},
        {path:'/pm/vm2/:id',name:'ViewManufacture2',component:ViewManufacture2,props:true},
        //内部生产管理
        {path:'/pm/pg',name:'ProductionRegister',component:ProductionRegister},
        {path:'/pm/pgc',name:'ProductionRegisterCheck',component:ProductionRegisterCheck},
        {path:'/pm/pq',name:'ProductionQuery',component:ProductionQuery},

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
