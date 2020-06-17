<template>
  <div class="box">
    <el-row :gutter="24">
      <el-col :span="10" :offset="16">
        <el-radio-group v-model="pcRadio">
          <el-radio  label="未通过" ch value="false"></el-radio>
          <el-radio label="通过" value="true"></el-radio>
        </el-radio-group>
        <el-button-group>
          <el-button type="danger" @click="back()">返回</el-button>
          <el-button type="primary" @click="commit()">确认</el-button>
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
            <el-input type="text" v-model="gather.checker"></el-input>
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
        <el-col :span="22" :offset="2">
          <textarea v-model="gather.remark" rows="2" cols="40"></textarea>
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
              pcRadio:'未通过',
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
              this.$router.push('/entry/erc');
          },
          commit(){
              console.log(this.pcRadio)
            if(this.pcRadio=="通过"){
              this.gather.checkTag="1";
            }else{
              this.gather.checkTag="2";
            }
            this.axios.put("http://127.0.0.1:1217/enxin/s-gather/pass-check",
                this.gather,{headers:{'Content-Type':'application/json'}})
              .then((response)=>{
                  if(response.data.success){
                    this.$notify({
                      title: '成功',
                      message: response.data.message,
                      type: 'success'
                    });
                    this.$router.push("/entry/erc");
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
          this.axios.get("http://127.0.0.1:1217/enxin/s-gather/query-by-id?id="+this.id,
            {headers:{'Content-Type':'application/json'}})
            .then((response)=>{
              this.gatherList=response.data.list;
              this.gather=response.data.sGather;
              this.gather.checker=this.$store.getters.getUser.username;
              this.gather.checkTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
            });



        }
    }
</script>

<style scoped>
  .box{
    width:1217px;
    margin:0px auto;
    border:1px solid #0c0c0c;
    padding: 35px;
    border-radius:5px;
    box-shadow:0 0 25px #091e25;
  }
</style>
