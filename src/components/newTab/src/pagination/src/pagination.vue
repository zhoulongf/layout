<!--
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/newTab/src/pagination/src/pagination.vue
 * @Date: 2021-12-13 11:02:07
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-13 15:29:27
 * @Description: 
-->
<script>
export default {
  name: "Pagination",
  props: {
    hideOnSinglePage: {
      //当只有一页时隐藏分页
      type: Boolean,
      default: false,
    },
    current: {
      //当前位于页数
      type: Number,
      default: 1,
    },
    pageSizes: {
      //每页显示个数选择器的选项设置
      default: () => {
        return [10, 20, 30, 40];
      },
    },
    total: {
      //全部数据
      type: Number,
      default: 100,
    },
    size: {
      //每页显示条目个数
      type: Number,
      default: 10,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleSizeChange(val,$type){
      this.emitData(val,$type)
    },
    emitData($type = "pageSize", val) {
      this.$emit("paginationChance", {
        type: $type, // pageSize  每页多少条改变   current 当前页改变
        data: {
          size: $type === "pageSize" && val ? val : this.size,
          total: this.total,
          pageSizes: this.pageSizes,
          current: $type === "current" && val ? val : this.current,
        },
      });
    },
  },
  render() {
    const modalProps ={
      on:{
        'size-change':(val) =>{
          this.handleSizeChange(val,'pageSize')
        },
        'current-change':(val) =>{
          this.handleSizeChange(val,'current')
        }
      },
      props:{
        ...this.$props,
        layout:'total, sizes, prev, pager, next, jumper'
      }
    }
    return (
        <el-pagination
          class="pagination"
          { ...modalProps } />
      
    );
  },
};
</script>