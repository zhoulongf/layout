<!--
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/Layout.vue
 * @Date: 2021-12-10 11:47:53
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-13 09:40:06
 * @Description: 
-->
<script>
export default {
  name: "layout",
  data() {
    return {
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
  render(h) {
    return (
      <div>
        <comTable data={this.data} fields={this.columns}>
        </comTable>
      </div>
    );
  },
};
</script>
<style scoped>
</style>
