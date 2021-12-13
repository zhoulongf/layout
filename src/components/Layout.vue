<!--
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/Layout.vue
 * @Date: 2021-12-10 11:47:53
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-13 14:30:02
 * @Description: 
-->
<script>
export default {
  name: "layout",
  data() {
    return {
      names:'', 
      data:[
        {name:"fdgf"}
      ],
      columns: [
        {
          label: "源名称",
          prop: "name",
        },
        {
          label: "源名称2",
          prop: "name2",
        },
        {
          label: "源名称3",
          prop: "name3",
        },
        {
          label: "源名称4",
          prop: "name4",
        },
      ],
    };
  },
  methods:{
    currents(val){
      console.log(val)
    }
  },
  render() {
    return (
      <div>
        <comTable data={this.data} fields={this.columns}>
        </comTable>
        <el-input v-model={this.names} />
        <Pagination onPaginationChance ={this.currents} />
      </div>
    );
  },
};
</script>
<style scoped>
</style>
