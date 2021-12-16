<!--
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/Layout.vue
 * @Date: 2021-12-10 11:47:53
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-16 15:11:41
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
      defaultImg:require('../assets/logo.png'),
      names: "",
      tabeData: [{name:2333,name2:2333},{name:54,name2:233433}],
      columns: [
        {
          label:'展开项',
          type:"expand",
           width:120,
          scopedSlots:{
             default: (scope) => (
              <div>
                <el-button type="text">哈哈{scope.row.name}eee</el-button>
              </div>
            )
          }
        },
        {
          label: "源名称",
          prop: "name",
          width:120,
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
    },
    selectionChange(val){
      console.log(val)
    }
  },
  render() {
    return (
      <div>
        <zTable
          data={this.tabeData}
          isIndex={false}
          isSelection={true}
          fields={this.columns}
          onSelectionChange = {this.selectionChange}
        >
          <div slot="empty">哈哈无数据 <img src= {this.defaultImg} /></div>
        </zTable>
        <el-input v-model={this.names} />
      </div>
    );
  }
};
</script>
<style scoped>
</style>
