<!--
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/newTab/src/table.vue
 * @Date: 2021-12-13 15:33:52
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-16 16:13:21
 * @Description: 
-->
<script>
export default {
  name: "zTable",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    paginationCurrent: {
      type: [String, Number],
      default: 1,
    },
    paginationSize: {
      //每页显示条目个数
      type: Number,
      default: 10,
    },
    paginationTotal: {
      //全部数据
      type: Number,
      default: 100,
    },
    paginationPageSizes: {
      //每页显示个数选择器的选项设置
      default: () => {
        return [10, 20, 30, 40];
      },
    },
    isPagination: {//是否显示分页
      type:Boolean,
      default:false
    },
    indexAlign: String,//序号的排列
    isIndex: Boolean,//是否需要序号
    indexLabel: {
      type: String,
      default: "序号",
    },
    indexWidth: {
      type: [String, Number],
      default: 60,
    },
    indexFixed: {
      type: String,
    },
    expandWidth: {//展开项的宽
      type: [String, Number],
      default: 60,
    },
    expandLabel: String,
    expandFixed: String,
    expandAlign: String,
    slotExpand: Boolean,
    selectionWidth: {//多选的宽
      type: [String, Number],
      default: 60,
    },
    selectionFixed: {
      type:String,
      default:'left'
    },
    selectionAlign: {
      type:String,
      default:'left'
    },
    selectable: {//多选，每一项默认都可选
      type:Function,
      default: (row,index) =>{
        return  true
      }
    },
    //多选值
    selectionKey: {
      type: [String, Number],
      default: "",
    },
    fields: {
      //所有数据结构
      type: Array,
      default: () => {
        return [];
      },
    },
    data: {
      //数据
      type: Array,
      default: () => [],
    },
    formObj: {
      //数据默认的值
      type: Object,
      default: () => {
        return {};
      },
    },
    height: {
      type: [String, Number],
      default: 250,
    },
    maxHeight: {
      type: [String, Number],
      default: 250,
    },
    stripe: Boolean,
    border: Boolean,
    size: {
      //每页显示条目个数
      type: [Number, String],
      default: "10",
    },
    fit: {
      type: Boolean,
      default: true,
    },
    showHeader: {//控制头部显示隐藏
      type: Boolean,
      default: true,
    },
    //是否多选
    isSelection: {
      type: Boolean,
      default: false,
    },
    highlightCurrentRow: Boolean,
    propEmptyDefault: String,
    currentRowKey: [String, Number],
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerCellClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellStyle: [Object, Function],
    rowKey: [String, Function],
    emptyText: String,
    defaultExpandAll: Boolean,
    expandRowKeys: Array,
    defaultSort: Object,
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    spanMethod: Function,
    selectOnIndeterminate: {
      type: Boolean,
      default: true,
    },
    indent: {
      type: Number,
      default: 16,
    },
    lazy: Boolean,
    load: Function,
    treeProps: Object,
  },
  model: {
    prop: "formObj",
  },
  data() {
    return {
      currentSelection: [], // 当前选择的
      isCanChange: false, // 是否选择时可以改变了
      emptyImg:require('./img/vscode.png')
    };
  },
  watch: {
    data: {
      deep: true,
      handler(list) {
        /** selectionKey 选择模式翻页时选择唯一key  选择模式翻页时是否不清空之前选择的*/
        this.isCanChange = false;
        if (this.currentSelection.length && this.selectionKey) {
          this.$nextTick(() => {
            this.currentSelection.map((li, ind) => {
              const $index = list.findIndex(
                (x) => x[this.selectionKey] === li[this.selectionKey]
              );
              if ($index >= 0) {
                this.$refs.eVueTable.toggleRowSelection(
                  this.$refs.eVueTable.data[$index],
                  true
                );
              }
              if (ind === this.currentSelection.length - 1) {
                this.isCanChange = true;
              }
            });
          });
        } else {
          this.isCanChange = true;
        }
      },
    },
  },
  methods: {
    //将vnode转为dom
    cloneVNode(h, vnode) {
      if (!vnode) return null;
      return h(vnode.tag, vnode.data, vnode.children);
    },
    // 插槽再render中的使用
    formatTooltip(h, item) {
      if(item.type == 'expand'){
         item.scopedSlots = item.scopedSlots || {
           default: (() =>{//如果设置展开项，但是未加数据的默认
            return h('div',[`暂无展开项数据`])
          })
         }
      }else{
        item.scopedSlots = item.scopedSlots || {
          default:item.scopedSlots?.default || (({ row, column, $index }) => {//默认插槽
            return h("span", [
              column && column.formatter
                ? column.formatter(row, column, row[item.prop], $index)
                : this._v(row[item.prop] || this.emptyText || "--"),
            ]);
          }),
          header: item.scopedSlots?.header || (({column,$index}) =>{//头部样式默认插槽，插槽和renderHeader同时存在时候renderHeader优先级更高
            return h('div',{class:'cell'},[column.label])
          })
        };
      }
      return item
    },
    //当选择项发生变化时会触发该事件
    selectionChange(ev) {
      this.currentSelection = ev;
      this.$emit("selectionChange", endSelectData);
    },
    //当用户手动勾选数据行的 Checkbox 时触发的事件
    select(ev) {
      this.$emit("select", ev);
    },
    //当用户手动勾选全选 Checkbox 时触发的事件
    selectAll(ev) {
      this.$emit("selectAll", ev);
    },
    //当表格的排序条件发生变化的时候会触发该事件
    sortChange(ev) {
      this.$emit("sortChange", ev);
    },
    //当某一行被点击时会触发该事件
    rowClick(ev) {
      this.$emit("rowClick", ev);
    },
    //当某个单元格被双击击时会触发该事件
    rowDblclick(ev) {
      this.$emit("rowDblclick", ev);
    },
    //当单元格 hover 进入时会触发该事件
    cellMouseEnter(ev) {
      this.$emit("cellMouseEnter", ev);
    },
    //当单元格 hover 退出时会触发该事件
    cellMouseLeave(ev) {
      this.$emit("cellMouseLeave", ev);
    },
    //当某个单元格被点击时会触发该事件
    cellClick(ev) {
      this.$emit("cellClick", ev);
    },
    //当某个单元格被双击击时会触发该事件
    cellDblclick(ev) {
      this.$emit("cellDblclick", ev);
    },
    //当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
    currentRowChange(ev) {
      this.$emit("currentRowChange", ev);
    },
    //当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）
    expandChange(ev) {
      this.$emit("expandChange", ev);
    },
    //当某一行被鼠标右键点击时会触发该事件
    rowContextmenu(ev) {
      this.$emit("rowContextmenu", ev);
    },
    //当某一列的表头被点击时会触发该事件
    headerClick(ev) {
      this.$emit("headerClick", ev);
    },
    //当拖动表头改变了列的宽度的时候会触发该事件
    headerDragend(ev) {
      this.$emit("headerDragend", ev);
    },
    /**Table Methods*/
    tableMethods(fun) {
      if (!fun) return;
      this.$refs.eVueTable[fun]();
    },
    //用于多选表格，清空用户的选择
    clearSelection() {
      this.tableMethods("clearSelection");
    },
    //用于多选表格，切换所有行的选中状态
    toggleAllSelection() {
      this.tableMethods("toggleAllSelection");
    },
    //用于清空排序条件，数据会恢复成未排序的状态
    clearSort() {
      this.tableMethods("clearSort");
    },
    //对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
    doLayout() {
      this.tableMethods("doLayout");
    },
    //用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
    toggleRowSelection(row, selected) {
      this.$refs.eVueTable.toggleRowSelection(row, selected);
    },
    //用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
    toggleRowExpansion(row, expanded) {
      this.$refs.eVueTable.toggleRowExpansion(row, expanded);
    },
    //用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。
    setCurrentRow(row) {
      this.$refs.eVueTable.setCurrentRow(row);
    },
    //不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件
    clearFilter(columnKey) {
      this.$refs.eVueTable.clearFilter(columnKey);
    },
    //不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件
    sort(prop, order) {
      this.$refs.eVueTable.sort(prop, order);
    },
    /**table-column的方法*/
    filterMethod(value, row, column) {
      this.$emit("filterMethod", { value, row, column });
    },
  },
  render(h) {
    //table
    const renderTab = () => {
      //table的属性设置
      const tableProps = {
        props: {
          ...this.$props,
        },
        on: {
          "selection-change": this.selectionChange,
          select: this.select,
          "select-all": this.selectAll,
          "sort-change": this.sortChange,
          "row-click": this.rowClick,
          "row-dblclick": this.rowDblclick,
          "cell-mouse-enter": this.cellMouseEnter,
          "cell-mouse-leave": this.cellMouseLeave,
          "cell-click": this.cellClick,
          "cell-dblclick": this.cellDblclick,
          "current-change": this.currentRowChange,
          "expand-change": this.expandChange,
          "row-contextmenu": this.rowContextmenu,
          "header-click": this.headerClick,
          "header-dragend": this.headerDragend,
          'show-header': this.showHeader 
        },
      };
      const columns = this.fields.map(this.formatTooltip.bind(this, h));
      return h(
        "el-table",
        {
          ref: "eVueTable",
          ...tableProps,
        },
        [
          renderEmpty(h),
          this.isIndex && renderTableColumn(h),
          this.isSelection && renderIsSelection(),
          renderTableColumns(h, columns),
        ]
      );
    };
    //el-table-column具体的每一项
    const renderTableColumns = (h, columns) => {
      let tableColumn = [];
      //初始化的时候给column设置scopeSlots
      columns.forEach((item, index) => {
        let props = {
          scopedSlots: item.scopedSlots,//可以自定义插槽可以再次定义或者其他
          props: {
            key: index,
            label: item.label,
            prop: item.prop,
            type: item.type,
            index:
              item.colType === "index" && item.indexMethod
                ? item.indexMethod
                : () => {},
            "column-key": item.columnKey,
            width: item.width,
            "min-width": item.minWidth,
            fixed: item.fixed,
            "render-header": item.renderHeader,
            "sort-orders": item.sortOrders,
            resizable: item.resizable,
            formatter: item.formatter,
            "show-overflow-tooltip": item.showOverflowTooltip || false,
            align: item.align,
            "class-name": item.className,
            "label-class-name": item.labelClassName,
            "reserve-selection": item.reserveSelection || false,
            filters: item.filters || null,
            "filter-placement": item.filterPlacement,
            "filter-multiple": item.filterMultiple,
            "filter-method": item.filters ? this.filterMethod : null,
            "filtered-value": item.filteredValue,
          },
          key: item.label,
        };
        let column = h(
          "el-table-column",
          {
            ...props,
          },
          []
        );
        tableColumn.push(column);
      });
      return tableColumn;
    };
    //数据为空的时候的默认展示
    const renderEmpty = (h) => {
      const vnode = this.$slots.empty ? this.$slots.empty.map(this.cloneVNode.bind(this, h)) : null
      return (
        <div slot="empty">
          {vnode || (
            <div class='empty'><img class='empty-img' src={this.emptyImg}/> 暂无数据...</div>
          )}
        </div>
      );
    };
    //序号区域
    const renderTableColumn = (h) => {
      return h("el-table-column", {
        props: {
          type: "index",
          label: this.indexLabel,
          width: this.indexWidth ,
          fixed: this.indexFixed,
          align: this.indexAlign,
        },
      });
    };
    //多选区域
    const renderIsSelection = () => {
      return (
        <el-table-column
          type="selection"
          width={this.selectionWidth}
          fixed={this.selectionFixed}
          align={this.selectionAlign}
          selectable={this.selectable}
        ></el-table-column>
      );
    };
    //分页组件
    const renderPagination = () => {
      const props = {
        props: {
          current: this.paginationCurrent,
          size: this.paginationSize,
          total: this.paginationTotal,
          pageSizes: this.paginationPageSizes,
        },
        on: {
          paginationChance: (val) => {
            this.$emit("paginationChance", val);
          },
        },
      };
      return (
        <div class="e-vue-pagination">
          <div class="e-vue-pagination-left">
            <slot name="slotPagination"></slot>
          </div>
          <div class="e-vue-pagination-right">
            <Pagination {...props} />
          </div>
        </div>
      );
    };
    return (
      <div class="e-vue-table" v-loading={this.isLoading}>
        {renderTab()}
        {this.isPagination && renderPagination()}
      </div>
    );
  },
};
</script>
<style lang="scss" scoped>
.e-vue-table {
  .empty{
    display: flex;
    font-size: 24px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    &-img{
      width: 100px;
      height: 100%;
      object-fit: contain;
      margin-right: 10px;
    }
  }
  .e-vue-pagination {
    margin-top: 15px;
    display: flex;
  }

  .e-vue-pagination-left {
  }

  .e-vue-pagination-right {
    flex: 1;
    text-align: right;
  }
}
</style>