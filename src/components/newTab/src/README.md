<!--
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/newTab/src/README.md
 * @Date: 2021-12-16 16:14:27
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-16 16:30:58
 * @Description: 
-->
#### 分页介绍
**如何使用**
>未发布使用
```
import Vue from 'vue';
import Pagination from './components/newTab/src/pagination/index'
Vue.use(Pagination)
```
**发布使用**
```
import {Pagination} from 'fei-admin-ui'
Vue.use(Pagination)
```
#### table介绍
**如何使用**
```
import eTable from './components/newTab/index'
Vue.use(eTable)
```

| 参数          | 说明     | 类型     | 可选值 | 默认值    |
| ------------- | -------- | -------- | ----------|--------- |
drag | 是否支持拖拽 | _boolean_ | - | _false_ |
emptyColumnText | 列数据为空时显示的文本内容 | _string_ | - | - |
Pagination | 分页组件布局 | _string_ | - | _`total, sizes, ->, prev, pager, next, jumper`_ |
fields | 列结构定义 | _Array<_Item_>_ | - | - |
isIndex | 是否显示列序号 | _boolean_ | - | _true_ |
isSelection | 是否显示多选框 | _boolean_ | - | _true_ |
isPagination | 是否需要分页组件 | _boolean_ | - | _true_ |
total | 数据总数 | _number_ | - | - |
paginationSize | 分页大小 | _number_ | - | _10_ |
pageSizes | 每页显示个数选择器的选项设置 | _number[]_ | - | _[10, 20, 50, 100]_ |
paginationChance | 当前页数，支持 .sync 修饰符 | _number_ | - | _1_ |
empty | 自定义空数组显示 | slot | - | _1_ |
renderHeader | 自顶替头部 | Function  | - | 或者通过slot插槽自定义实现 |
expand | 展开项 | Function | - | 通过slot插槽自定义实现,默认为暂无展开项数据


```
// 使用示例
data(){
    return {
    tableData: [],
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
    }
}
render() {
    return (
      <div>
        <eTable
          data={this.tableData}
          isIndex={false}
          isSelection={true}
          fields={this.columns}
          onSelectionChange = {this.selectionChange}
        >
        </eTable>
      </div>
    );
  }
```