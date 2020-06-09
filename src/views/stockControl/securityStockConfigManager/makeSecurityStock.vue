<template>
  <div>
    <span>产品档案查询</span>

    <div v-show="see">
      <el-form ref="condition" :model="condition" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="condition.firstKindId" placeholder="一级分类">
            <el-option v-for="firstKindId in L1" :label="firstKindId.kindName" :value="firstKindId.id"  :key="firstKindId.kindName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="condition.secondKindId" placeholder="二级分类">
            <el-option v-for="secondKindId in L2" :label="secondKindId.kindName" :value="secondKindId.id" :key="secondKindId.id"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="三级分类">
          <el-select v-model="condition.thirdKindId" placeholder="三级分类">
            <el-option v-for="thirdKindId in L3" :label="thirdKindId.kindName" :value="thirdKindId.id" :key="thirdKindId.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="5">
            <el-date-picker type="date" v-model="condition.date1" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="5">
            <el-date-picker type="date" v-model="condition.date2" placeholder="选择时间" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>

      </el-form>
    </div>
    <div v-show="!see">
      <el-table :data="list"  stripe
                style="width:100%">
        <el-table-column
          prop="productId"
          label="产品编号"
          width="180"></el-table-column>
        <el-table-column prop="productName"
                         label="产品名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="type"
                         label="用途类型"
                         width="180px">
        </el-table-column>
        <el-table-column prop="firstKindName"
                         label="I级分类"
                         width="180px">
        </el-table-column>
        <el-table-column prop="secondKindName"
                         label="二级分类"   width="180px">
        </el-table-column>
        <el-table-column prop="thirdKindName"
                         label="三级分类"   width="180px">
        </el-table-column>
        <el-table-column prop="responsiblePerson"
                         label="产品经理"   width="180px">
        </el-table-column>
        <el-table-column label="制定">
          <template slot-scope="scope">
              <router-link :to="{name:'AddSecurityStock',params:{id:list[scope.$index].id}}">制定</router-link>
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
  </div>
</template>

<script>
  export default {
    name: "makeSecurityStock",
    data(){
      return {
        see:true,
        dialogVisible:false,
        L1: [],
        L2: [],
        L3: [],
        list:[],
        useType: [],
        condition: {
          firstKindId: '',
          secondKindId: '',
          thirdKindId: '',
          deleteTag:'0',
          type: '',
          date1: '',
          date2: '',
          pageNum:1,
          pageSize:5,
          dct:'0'
        },
        total:0,
        DFile: {},
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      //关闭模态框
      handleClose() {
        this.dialogVisible = false;
      },
      //切换页
      handleCurrentChange(val) {
        // this.getTables();
        this.condition.pageNum = val;
        this.loadTables();
      },
      loadTables() {
        this.axios.post("http://localhost:1217/enxin/d-file/searchDFileByCondition",
          this.condition, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
          console.log(response.data)
          this.list = response.data.list;
          this.total = response.data.total;
          this.see = false;
        })
          .catch(function (error) {
          })
      },
      //查询
      onSubmit() {
        this.loadTables();
      },
    },
    created:function(){
      //根据父Id查询一级分类
      this.axios
        .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid=0")
        .then(response =>{
          this.L1=response.data;
        })
        .catch(function(error){
          //请求失败处理
          console.log(error)
        });

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
      }
    }
  }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .showInfo{
    width: 40px;
    color: #67C23A;
  }
</style>
