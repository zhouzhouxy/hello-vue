<template>
  <div class="cen">
    <el-row :gutter="24">
      <el-col :span="10" :offset="16">
        <el-radio-group v-model="pcRadio">
          <el-radio  label="未通过" ch value="false"></el-radio>
          <el-radio label="通过" value="true"></el-radio>
        </el-radio-group>
        <el-button-group>
          <el-button @click="back()">返回</el-button>
          <el-button  @click="commit()">确认</el-button>
        </el-button-group>
      </el-col>
    </el-row>
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
          label="当前库存量">
          <template slot-scope="scope">
            {{amount[scope.$index]}}
          </template>
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
          <el-input type="text" v-model="sPay.checker"></el-input>
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
          <textarea v-model="sPay.remark" rows="4" cols="40"></textarea>
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
      Date.prototype.Format = function (fmt) { // author: meizz
        var o = {
          "M+": this.getMonth() + 1, // 月份
          "d+": this.getDate(), // 日
          "h+": this.getHours(), // 小时
          "m+": this.getMinutes(), // 分
          "s+": this.getSeconds(), // 秒
          "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
          "S": this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
       this.axios.get("http://127.0.0.1:1217/enxin/s-pay-details/query-by-p-id?pId="+this.id,
        {headers:{'Content-Type':'application/json'}})
        .then((response)=>{
          this.sPay=response.data.sPay;
          this.sPayDetails=response.data.list;
          for(let i=0;i<this.sPayDetails.length;i++){
              this.axios.get("http://127.0.0.1:1217/enxin/s-cell/query-s-cell-by-productId?productId="+this.sPayDetails[i]['productId'])
              .then(
                (response)=>{
                  if(response.data.amount==null||response.data.amount==''){
                      response.data.amount=0;
                  }
                  this.amount.push(response.data.amount);
                })
          }
          this.sPay.checker=this.$store.getters.getUser.username;
          this.sPay.checkTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        });



    }
  }
</script>

<style scoped>

</style>
