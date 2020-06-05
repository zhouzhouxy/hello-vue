<template>
  <div>
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
      <el-table :data="list"
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
        <el-table-column prop="productClass"
                         label="档次级别"   width="180px">
        </el-table-column>
        <el-table-column label="指定设计单">
          <template slot-scope="scope">
            <router-link :to="{name:'AddDesignMaterial',params:{id:list[scope.$index].id}}">指定设计单</router-link>
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
    name: "productFilePerpetualDel",
    data(){
      return {
        see:true,
        condition: {
          firstKindId: '',
          secondKindId: '',
          thirdKindId: '',
          deleteTag:'0',
          dma:'0',
          type: '商品',
          date1: '',
          date2: '',
          pageNum:1,
          pageSize:5,
        },
        useType: [],
        total:0,
        L1: [],
        L2: [],
        L3: [],
        list:[],
      }
    },
    methods:{
      //加载表格
      loadTable(){
        this.axios.post("http://localhost:1217/enxin/d-file/searchDFileByCondition", this.condition, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.list = response.data.list;
          this.total = response.data.total;
          this.see = false;
        })
          .catch(function (error) {
          })
      },
      //查询
      onSubmit(){
        this.see=false;
        this.loadTable();
      },
      handleCurrentChange(val){
        // this.getTables();
        this.condition.pageNum=val;
        this.loadTable();
      },
      //指定设计单
      handleEdit(v1,v2,v3){

      }
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
        });
      //查询用途类型和档次
      this.axios
        .get("http://localhost:1217/publicChar/queryGradeAndUseType")
        .then(response=>{
          this.useType = response.data.useType;
          this.grade = response.data.grade;
        })
        .catch(function(error){
          console.log(error);
        })
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

</style>



