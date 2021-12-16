<!--
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/Layout.vue
 * @Date: 2021-12-10 11:47:53
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-16 11:20:33
 * @Description: 
-->
<script>
const modalProps ={
  on:{
    'tabOneClick':(scope) =>{console.log(111), this.tabOneClick.bind(this,1,scope)}
  }
}
export default {
  name: "layout",
  data() {
    return {
      names: "",
      tabeData: [
        { name: "张三", name2: "李四" },
        { name: "张1", name2: "李2" },
      ],
      columns: [
        {
          label: "源名称",
          prop: "name",
          align: "center",
          renderHeader:this.renderHeader,
          scopedSlots: {
            default: (scope) => (
              <div>
                <el-button type="text" on-click={this.tabOneClick.bind(this,1,scope)}>哈哈{scope.row.name}</el-button>
              </div>
            )
          },
        },
        {
          label: "源名称2",
          prop: "name2",
          scopedSlots:{
            header: (scope) => (
              <div>
                <el-button type="text">{scope.column.label}34</el-button>
              </div>
            )
          }
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
  methods: {
    tabOneClick(label,item){
      console.log(label,item)
    },
    renderHeader(h,{column,$index}){
      return h('div',{class:'cell'},[<el-button type='text'>{column.label}{$index}w</el-button>])
    },
    currents(val) {
      console.log(val);
    }
  },
  render() {
    return (
      <div>
        <zTable
          data={this.tabeData}
          isIndex={true}
          isExpand={false}
          fields={this.columns}
        >
          <div slot="empty">哈哈无数据</div>
        </zTable>
        <el-input v-model={this.names} />
      </div>
    );
  }
};
</script>
<style scoped>
</style>
