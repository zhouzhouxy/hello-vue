<template>
  <div class="cen">
    <el-row :gutter="24">
      <el-col :span="10" :offset="16">
        <el-button-group>
          <el-button @click="back()">返回</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <div class="order">
      <el-row :gutter="24">
        <h4 style="text-align: center">入库申请单</h4>
      </el-row>
      <el-row :gutter="24" class="header">
        <el-col :span="3">
          <span>入库人:</span>
        </el-col>
        <el-col :span="4">
          <span>{{gather.storer}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>入库理由:</span>
        </el-col>
        <el-col :span="4">
          <span v-if="gather.reason==1">生产入库</span>
          <span v-else-if="gather.reason==2">库存初始</span>
          <span v-else-if="gather.reason==3">赠送</span>
          <span v-else-if="gather.reason==4">内部归还</span>
          <span v-else>其他归还</span>
        </el-col>
      </el-row>
      <el-table :header-cell-style="tableHeaderStyle"
                :data="gatherList" stripe  >
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称">
        </el-table-column>
        <el-table-column
          prop="productId"
          label="商品编号">
        </el-table-column>
        <el-table-column
          prop="productDescribe"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="amountUnit"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="costPrice"
          label="成本单价（元）">
        </el-table-column>
        <el-table-column
          prop="subtotal"
          label="小计">
        </el-table-column>
      </el-table>
      <el-row :gutter="24">
        <el-col :span="3">
          <span>总计数:</span>
        </el-col>
        <el-col :span="4">
          <span >{{gather.amountSum}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>总金额:</span>
        </el-col>
        <el-col :span="4">
          <span>{{gather.costPriceSum}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="3">
          <span>登记人:</span>
        </el-col>
        <el-col :span="4">
          <span>{{gather.register}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>登记时间:</span>
        </el-col>
        <el-col :span="8">
          <span>{{gather.registerTime}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="3">
          <span>审核人:</span>
        </el-col>
        <el-col :span="4">
          <span>{{gather.checker}}</span>
         </el-col>
        <el-col :span="3" :offset="5">
          <span>审核时间:</span>
        </el-col>
        <el-col :span="8">
          <span>{{gather.checkTime}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="2">
          <span >备注：</span>
        </el-col>
        <el-col :span="22">
          <span>{{gather.remark}}</span>
         </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "checkEntry",
    props:['id'],
    data(){
      return{
        pcRadio:'pass',
        gather:{},
        gatherList:[],
        tableHeaderStyle:{
          'background':'skyblue',
          'color':'#fff'
        },
      }
    },
    methods:{
      back(){
        this.$router.push('/entry/eq');
      },

    },
    created(){
      this.axios.get("http://127.0.0.1:1217/enxin/s-gather/query-by-id?id="+this.id,
        {headers:{'Content-Type':'application/json'}})
        .then((response)=>{
          this.gatherList=response.data.list;
          this.gather=response.data.sGather;
        });



    }
  }
</script>

<style scoped>

</style>
