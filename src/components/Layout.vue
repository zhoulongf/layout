<!--
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/Layout.vue
 * @Date: 2021-12-10 11:47:53
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-14 16:39:08
 * @Description: 
-->
<script>
export default {
  name: "layout",
  data() {
    return {
      names:'', 
      tabeData:[],
      columns: [
        {
          label: "源名称",
          prop: "name",
          align:'center'
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
        <zTable data={this.tabeData} fields={this.columns}>
          <div slot='empty'>哈哈无数据</div>
        </zTable>
        <el-input v-model={this.names} />
      </div>
    );
  },
};
</script>
<style scoped>
</style>
