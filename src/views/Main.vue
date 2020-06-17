<template>
      <el-container style="height: 800px; border: 1px solid #eee;">
        <el-aside width="200px">
          <el-menu class="men">
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>产品设计</template>
              <el-submenu index="3-1">
                <template slot="title">产品档案管理</template>
                <el-menu-item-group>
                  <el-menu-item index="3-1-1">
                    <router-link  to="/product/pr" >产品档案登记</router-link>
                  </el-menu-item>
                  <el-menu-item index="3-1-2">
                    <router-link to="/product/prc">产品档案登记复核</router-link>
                  </el-menu-item>
                  <el-menu-item index="3-1-3">
                    <router-link to="/product/pq">产品档案查询</router-link>
                  </el-menu-item>
                  <el-menu-item index="3-1-4">
                    <router-link to="/product/pfc">产品档案变更</router-link>
                  </el-menu-item>
                  <el-submenu index="4-1">
                    <template slot="title"><i class="el-icon-delete"></i>产品档案删除管理</template>
                    <el-menu-item-group>
                      <el-menu-item index="4-1-1">
                        <router-link to="/product/del/pfd">产品档案删除</router-link>
                      </el-menu-item>
                      <el-menu-item index="4-1-2">
                        <router-link to="/product/del/pfr">产品档案恢复</router-link>
                      </el-menu-item>
                      <el-menu-item index="4-1-3">
                        <router-link to="/product/del/pfp">产品档案永久删除</router-link>
                      </el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3-2">
                <template slot="title">产品物料组成设计</template>
                 <el-menu-item-group>
                      <el-menu-item index="3-2-2-1">
                        <router-link to="/product/mmd">制定物料组成设计单</router-link>
                      </el-menu-item>
                     <el-menu-item index="3-2-2-2">
                       <router-link to="/product/mdc">物料组成设计单审核</router-link>
                     </el-menu-item>
                     <el-menu-item index="3-2-2-3">
                       <router-link to="/product/mq">物料组成设计单查询</router-link>
                     </el-menu-item>
                     <el-menu-item index="3-2-2-4">
                       <router-link to="/product/dc">物料组成设计单变更</router-link>
                     </el-menu-item>
                 </el-menu-item-group>
              </el-submenu>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-coin"></i>生产管理</template>
              <el-submenu index="4-1">
                <template slot="title">产品生产工序设计</template>
                <el-menu-item-group>
                  <el-menu-item index="4-1-1">
                    <router-link  to="/process/mpd">制定产品工序设计单</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-1-2">
                    <router-link to="/process/pc">产品生产工序设计单审核</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-1-3">
                    <router-link to="/process/pq">产品生产工序设计单查询</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-1-4">
                    <router-link to="/process/proc">产品生产工序设计单变更</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4-2">
                <template slot="title">工序物料设计</template>
                <el-menu-item-group>
                  <el-menu-item index="4-2-1">
                    <router-link  to="/pm/mpm">制定工序物料设计单</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-2-2">
                    <router-link to="/pm/pmc">工序物料设计单审核</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-2-3">
                    <router-link to="/pm/pmq">工序物料设计单查询</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-2-4">
                    <router-link to="/pm/pmchange">工序物料设计单变更</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4-3">
                <template slot="title">生产计划管理</template>
                <el-menu-item-group>
                  <el-menu-item index="4-3-1">
                    <router-link  to="/pm/ppr">新发生生产计划登记</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-3-2">
                    <router-link to="/pm/ppc">生产计划审核</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-3-3">
                    <router-link to="/pm/ppq">生产计划查询</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4-4">
              <template slot="title">生产调度管理</template>
              <el-menu-item-group>
                <el-menu-item index="4-4-1">
                  <router-link  to="/pm/fpwo">制定生产派工单</router-link>
                </el-menu-item>
                <el-menu-item index="4-4-2">
                  <router-link to="/pm/pwoc">生产派工单审核</router-link>
                </el-menu-item>
                <el-menu-item index="4-4-3">
                  <router-link to="/pm/pwoq">生产派工单查询</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
              <el-submenu index="4-5">
                <template slot="title">内部生产管理</template>
                <el-menu-item-group>
                  <el-menu-item index="4-5-1">
                    <router-link  to="/pm/pg">生产登记</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-5-2">
                    <router-link to="/pm/pgc">生产登记复核</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-5-3">
                    <router-link to="/pm/pq">生产查询</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-coin">库存管理</i></template>
              <el-submenu index="5-1">
                <template slot="title">安全配置管理</template>
                <el-menu-item-group>
                  <el-menu-item index="5-1-1">
                    <router-link  to="/stock/ssc">制定安全库存配置</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-1-2">
                    <router-link to="/stock/sc">安全库存配置单复核</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-1-3">
                    <router-link to="/stock/sq">安全库存配置单查询</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-1-4">
                    <router-link to="/stock/schange">安全库存配置单变更</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5-2">
                <template slot="title">入库申请管理</template>
                <el-menu-item-group>
                  <el-menu-item index="5-2-1">
                    <router-link  to="/entry/er">入库申请登记</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-2-2">
                    <router-link to="/entry/erc">入库申请登记审核</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-2-3">
                    <router-link to="/entry/eq">入库申请查询</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5-3">
                <template slot="title">出库申请管理</template>
                <el-menu-item-group>
                  <el-menu-item index="5-3-1">
                    <router-link  to="/out/or">出库申请登记</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-3-2">
                    <router-link to="/out/orc">出库申请登记审核</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-3-3">
                    <router-link to="/out/oq">出库申请查询</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5-4">
                <template slot="title">出入库调度管理</template>
                <el-menu-item-group>
                  <el-menu-item index="5-3-1">
                    <router-link  to="/oe/mes">制定入库单</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-3-2">
                    <router-link to="/oe/mos">制定出库单</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5-5">
                <template slot="title">动态库存管理</template>
                <el-menu-item-group>
                  <el-menu-item index="5-5-1">
                    <router-link  to="/dynamic/dsq">动态库存查询</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="text-align:right;font-size:12px;background-color: #409EFF">
            <el-row :gutter="24">
                <el-col :span="10" :offset="4">
                    <h1 style="font-size:30px;color: #ffffff; margin-top:8px;">恩信ERP企业管理系统</h1>
                </el-col>
                <el-col :span="2" :offset="8">
                  <el-dropdown>
                    <i class="el-icon-setting" style="margin-right:15px"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>个人信息</el-dropdown-item>
                      <el-dropdown-item><router-link to="/logout">退出登录</router-link></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!--            <span>{{$route.params.username}}</span> 路由取值方法-->
                  <span>{{$store.getters.getUser.username}}</span>
                </el-col>
            </el-row>

          </el-header>
          <el-main style="background-color: #E4E7ED">
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
 </template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>
  body {
    margin: 0px;
    padding: 0px;
  }
    .men >>> .router-link-active {
    text-decoration: none;
  }
</style>
