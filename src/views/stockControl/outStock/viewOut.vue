<template>
  <div class="cen">
    <div class="order">
      <el-row :gutter="24">
        <h4 style="text-align: center">出库申请单</h4>
      </el-row>

      <el-row :gutter="24" class="header">
        <el-col :span="3">
          <span>出库人:</span>
        </el-col>
        <el-col :span="4">
          <span>{{sPay.storer}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>出库理由:</span>
        </el-col>
        <el-col :span="4">
          <span v-if="sPay.reason==1">生产领料</span>
          <span v-else-if="sPay.reason==2">赠送</span>
          <span v-else-if="sPay.reason==3">内部借领</span>
          <span v-else>其他借领</span>
        </el-col>
      </el-row>
      <el-table :header-cell-style="tableHeaderStyle"
                :data="sPayDetails" stripe  >
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
          <span >{{sPay.amountSum}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>总金额:</span>
        </el-col>
        <el-col :span="4">
          <span>{{sPay.costPriceSum}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="3">
          <span>登记人:</span>
        </el-col>
        <el-col :span="4">
          <span>{{sPay.register}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>登记时间:</span>
        </el-col>
        <el-col :span="8">
          <span>{{sPay.registerTime}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="3">
          <span>审核人:</span>
        </el-col>
        <el-col :span="4">
            <span>{{sPay.checker}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>审核时间:</span>
        </el-col>
        <el-col :span="8">
          <span>{{sPay.checkTime}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="2">
          <span >备注：</span>
        </el-col>
        <el-col :span="22">
          <span>{{sPay.remark}}</span>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "outEntry",
    props:['id'],
    data(){
      return{
        pcRadio:'pass',
        gather:{},
        sPay:{},
        gatherList:[],
        sPayDetails:[],
        amount:[],
        tableHeaderStyle:{
          'background':'skyblue',
          'color':'#fff'
        },
      }
    },
    methods:{
      back(){
        this.$router.push('/out/orc');
      },
      //根据产品id查询可用数量
      async  queryAmount(productId){
        let i=0;
         i=this.axios.get("http://127.0.0.1:1217/enxin/s-cell/query-s-cell-by-productId?productId="+productId)
          .then(
            (response)=>{
                return response.data.amount;
              });
        return i;
      },
      async commit(){
        if(this.pcRadio=="通过"){
          this.sPay.checkTag="1";
          //判断是否当前库存量是否大于数量
          for(let i=0;i<this.sPayDetails.length;i++){
            let flag=false;
            await this.axios.get("http://127.0.0.1:1217/enxin/s-cell/query-s-cell-by-productId?productId="+this.sPayDetails[i]['productId'])
              .then(
                (response)=>{
                    if(response.data.amount<this.sPayDetails[i]['amount']){
                      flag=true;
                    }
                });
              if(flag){
                this.$notify({
                  title: '警告',
                  message: '出库数量有误，请返回确认',
                  type: 'warning'
                });
                return;
              }
          }
        }else{
          this.sPay.checkTag="2";
        }
        console.log(this.sPay)
       this.axios.put("http://127.0.0.1:1217/enxin/s-pay/pass-check",
          this.sPay,{headers:{'Content-Type':'application/json'}})
          .then((response)=>{
            if(response.data.success){
              this.$notify({
                title: '成功',
                message: response.data.message,
                type: 'success'
              });
              this.$router.push("/out/orc");
            }else {
              this.$notify({
                title: '失败',
                message: response.data.message,
                type: 'error'
              });
            }
          })
      }
    },
    created(){
       this.axios.get("http://127.0.0.1:1217/enxin/s-pay-details/query-by-p-id?pId="+this.id,
        {headers:{'Content-Type':'application/json'}})
        .then((response)=>{
          this.sPay=response.data.sPay;
          this.sPayDetails=response.data.list;
        });



    }
  }
</script>

<style scoped>

</style>
