<template>
    <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handlerCheckAllChange">全选</el-checkbox>
        <div style="margin:15px 0;"></div>
        <el-checkbox-group v-model="checkedCities"  @change="handlerCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
  const cityOptions=['上海','北京','广州','深圳'];
    export default {
        name: "Test",
        data(){
          return{
            checkAll:false,
            checkedCities:['上海','北京'],
            cities:cityOptions,
            isIndeterminate:true
          };
        },
      methods:{
          handlerCheckAllChange(val){
            this.checkedCities=val?cityOptions:[];
            this.isIndeterminate=false;
          },
          handlerCheckedCitiesChange(value){
            let checkedCount=value.length;
            this.checkAll=checkedCount===this.this.cities.length;
            this.isIndeterminate=checkedCount>0&&checkedCount<this.cities.length;
          }
      }
    }


</script>

<style scoped>

</style>
