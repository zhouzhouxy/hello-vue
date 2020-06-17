<template>
  <div>
    <div v-show="vis">
      <el-row :gutter="20">
        <el-col :offset="8" :span="4">
          <el-button type="primary" @click="onSubmit">立即查询</el-button>
        </el-col>

      </el-row>
      <el-row :gutter="20" class="el-row" >
        <el-col :span="6" class="leftCol">
          <span>请选择产品I级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.firstKindId" placeholder="一级分类">
            <el-option v-for="firstKindId in L1" :label="firstKindId.kindName" :value="firstKindId.id"  :key="firstKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择产品II级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.secondKindId" placeholder="二级分类">
            <el-option v-for="secondKindId in L2" :label="secondKindId.kindName" :value="secondKindId.id" :key="secondKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择产品III级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.thirdKindId" placeholder="三级分类">
            <el-option v-for="thirdKindId in L3" :label="thirdKindId.kindName" :value="thirdKindId.id" :key="thirdKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择产品</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.goodsId" placeholder="商品">
            <el-option v-for="goods in goodsList" :label="goods.productName" :value="goods.id" :key="goods.id">{{goods.productName}}</el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择配置单状态</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.checkTag" placeholder="设计单状态">
            <el-option label="等待" value="0"></el-option>
            <el-option label="执行" value="3"></el-option>
            <el-option label="完成" value="1"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请输入登记时间</span>
        </el-col>
        <el-col :span="4">
          <el-date-picker type="date" placeholder="选择日期" v-model="condition.date1"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="4">
          <el-date-picker type="date" placeholder="选择日期" v-model="condition.date2"></el-date-picker>
        </el-col>
      </el-row>
    </div>
    <div v-show="!vis">
      <el-table :data="list"
                style="width:100%">
        <el-table-column
          prop="storeId"
          label="设计单编号"
          width="200">
        </el-table-column>
        <el-table-column prop="productId"
                         label="产品编号"
                         width="180">
        </el-table-column>
        <el-table-column prop="productName"
                         label="产品名称"
                         width="180px">
        </el-table-column>
        <el-table-column label="配置单状态"
                         width="180px">
          <template slot-scope="scope">
             <span v-if="scope.row.checkTag==0">等待</span>
            <span v-if="scope.row.checkTag==1">完成</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态"
                         width="180px">
          <template slot-scope="scope">
            <span v-if="scope.row.checkTag==0">等待复核</span>
            <span v-if="scope.row.checkTag==1">复核通过</span>
          </template>
        </el-table-column>
        <el-table-column
          label="查看详情"   width="180px">
          <template slot-scope="scope">
            <el-button @click="viewMaterial(scope.row.id)">
              查看详情
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        background
        :page-size="5"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!--  点击 显示物料组成设计单-->
    <el-dialog width="1200px" :visible.sync="dialogFormVisible">

      <div class="box">
        <h4 style="text-align: center">安全库存配置单</h4>
        <el-row :gutter="24">
          <el-col :span="12">
            <span>产品名称:</span>
            <span>{{sCell.productName}}</span>
          </el-col>
          <el-col :span="12">
            <span>产品编号:</span>
            <span>{{sCell.productId}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <span>库存报警下线数:</span>
            <span>{{sCell.minAmount}}</span>
          </el-col>
          <el-col :span="12" >
            <span>库存报警上线数:</span>
            <span>{{sCell.maxAmount}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <span>设置B/N或S/N</span>
          </el-col>
          <el-col :span="8">
              <span>否</span>
          </el-col>
          <el-col :span="4">
            <span>设计人</span>
          </el-col>
          <el-col :span="8">
            <span></span>
           </el-col>
        </el-row>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="库号" prop="number"></el-table-column>
          <el-table-column label="库房名称" prop="name"></el-table-column>
          <el-table-column label="存储地址编号" prop="siteNumber"></el-table-column>
          <el-table-column label="存储地址名称" >
            <template slot-scope="scope">
              <span>{{sCell.firstKindName}}-{{sCell.secondKindName}}-{{sCell.thirdKindName}}</span>
            </template>
          </el-table-column>

          <el-table-column label="存储单元简称" >
            <template slot-scope="scope">
              <span></span>
            </template>
          </el-table-column>
          <el-table-column label="最大存储量" >
            <template slot-scope="scope">
              <el-input class="input"  v-model="sCell.maxCapacityAmount"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="存储单位">
            <template slot-scope="scope">
                <span>部</span>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="24">
          <el-col :span="3">
            <span>复核人</span>
          </el-col>
          <el-col :span="9">
            <span>{{sCell.checker}}</span>
          </el-col>
          <el-col :span="3">
            <span>复核时间</span>
          </el-col>
          <el-col :span="9">
            {{sCell.checkTime}}
           </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">确  定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "processMaterialQuery",
    data(){
      return{
        vis:true,
        L1:[],
        L2:[],
        L3:[],
        demand:'',
        goodsList:[],
        condition:{
          pageNum:1,
          pageSize:5,
        },
        tableData:[{
          number:'1',
          name:'成品库',
          siteNumber:'01-01-01',
        }
        ],
        tableHeaderStyle:{
          'background':'skyblue',
          'color':'#fff'
        },
        list:[],
        total:0,
        dialogFormVisible:false,
        sCell:{},
        details:[],
        dModule:{},
        designProcedure:{},
      }
    },
    methods:{
      //查看设计单详情
      viewMaterial(id){
        this.axios
          .get("http://localhost:1217/enxin/s-cell/querySCellById?id="+id)
          .then(response => {
            this.sCell = response.data;
            this.dialogFormVisible=true;
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      handleCurrentChange(val){
        this.condition.pageNum=val;
        this.loadTable();
      },
      onSubmit(){
        this.loadTable();
        this.vis=false;
      },
      loadTable(){
        this.axios.post("http://localhost:1217/enxin/s-cell/queryScellByCondition",
          this.condition, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
          this.list = response.data.list;
          this.total = response.data.total;
        })
          .catch(function (error) {
          })
      },
    },
    created:function(){
      //根据父Id查询一级分类
      this.axios
        .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid=0")
        .then(response =>{
          this.L1=response.data;
          console.log(this.L1)
        })
        .catch(function(error){
          //请求失败处理
          console.log(error)
        }),
        //查询用途类型和档次
        this.axios
          .get("http://localhost:1217/publicChar/queryGradeAndUseType")
          .then(response=>{
            this.useType=response.data.useType;
            this.grade=response.data.grade;
          })
          .catch(function(error){
            console.log(error);
          }),
        //查询所有的商品
        this.axios.
        get("http://localhost:1217/enxin/m-design-procedure/queryAllGoods")
          .then((response)=>{
            // console.log(response)
            this.goodsList=response.data;
          })
          .catch(function(error){console.log(error)})
    },
    computed:{
      firstKindId:function(){
        return this.condition.firstKindId;
      },
      secondKindId:function(){
        return this.condition.secondKindId;
      }
    },
    watch:{
      //一级分类
      firstKindId(newVal,oldVal){
        this.axios
          .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid="+newVal)
          .then(response =>{
            this.L2=response.data;
          })
          .catch(function(error){
            //请求失败处理
            console.log(error)
          });
      },
      secondKindId(newVal,oldVal){
        console.log("点击二级分类加载")
        this.axios
          .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid="+newVal)
          .then(response =>{
            this.L3=response.data;
          })
          .catch(function(error){
            //请求失败处理
            console.log(error)
          });
      },
    }
  }
</script>

<style scoped>
  .leftCol{
    background-color: rgb(217, 236, 255);
    padding: 10px;
    text-align: center;
  }
  .el-row{
    border: 1px solid white;
  }
</style>

