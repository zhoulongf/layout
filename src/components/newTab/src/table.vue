<!--
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/newTab/src/table.vue
 * @Date: 2021-12-13 15:33:52
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-14 16:24:00
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
    isPagination: false,
    indexAlign: String,
    isIndex: Boolean,
    indexLabel: String,
    indexWidth: {
      type: [String, Number],
      default: 60,
    },
    indexFixed: {
      type: String,
    },
    isExpand: {
      type: Boolean,
      default: false,
    },
    expandWidth: {
      type: [String, Number],
      default: 60,
    },
    expandLabel: String,
    expandFixed: String,
    expandAlign: String,
    slotExpand: Boolean,
    selectionLabel: String,
    selectionWidth: {
      type: [String, Number],
      default: 60,
    },
    selectionFixed: String,
    selectionAlign: String,
    selectable: Object,
    //是否多选
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
    showHeader: {
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
      config: {
        indexWidth: 50,
        expandWidth: 50,
        selectionWidth: 50,
      },
      currentSelection: [], // 当前选择的
      isCanChange: false, // 是否选择时可以改变了
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
    /*Table Events*/
    tableEvents(name, val) {
      if (!name) return;
      this.$emit(name, val);
    },
    //当选择项发生变化时会触发该事件
    selectionChange(ev) {
      console.log("selectionChange", ev);
      let endSelectData = ev;
      if (this.option.selectionKey) {
        // 只要在存在key的情况下才梳理
        if (!this.isCanChange) return;
        this.data.map((res) => {
          const $in = ev.find(
            (x) => x[this.option.selectionKey] === res[this.option.selectionKey]
          );
          //是否存在被选中
          const $selectionIndex = this.currentSelection.findIndex(
            (x) => x[this.option.selectionKey] === res[this.option.selectionKey]
          );
          if ($in) {
            //当前选中
            if ($selectionIndex < 0) {
              //不存在
              this.currentSelection.push(res);
            }
          } else {
            //取消
            if ($selectionIndex >= 0) {
              //存在
              this.currentSelection.splice($selectionIndex, 1);
            }
          }
        });
        endSelectData = this.currentSelection;
      }
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
      this.tableMethods('doLayout');
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
      this.$emit('filterMethod', {value, row, column});
    },
  },
  render(h) {
    const tabPorps = {
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
      },
    };
    const renderEmpty = () => {
        console.log(this.$slots.empty)
      return (
        <div>
          <slot name="empty" if={this.$slots.empty}>asas</slot>
          <div else>{this.emptyText || "默认暂无数据"}</div>
        </div>
      );
    };
    //  序号区域
    const renderTableColumn = () => {
      return (
        <el-table-column
          type="index"
          label={this.indexLabel}
          width={this.indexWidth || this.config.indexWidth}
          fixed={this.indexFixed}
          align={this.indexAlign}
        ></el-table-column>
      );
    };
    // 可展开区域
    const renderExpand = () => {
      const scope = this.$slots.scope;
      return (
        <el-table-column
          type="expand"
          label={this.expandLabel}
          width={this.expandWidth || this.config.expandWidth}
          fixed={this.expandFixed}
          align={this.expandAlign}
        >
          <template scopedSlots="scope">
            <slot
              if={this.slotExpand}
              data={scope.row}
              index={scope.$index}
              name={scope.slotExpand}
            ></slot>
          </template>
        </el-table-column>
      );
    };
    //可选区域
    const renderIsSelection = () => {
      return (
        <el-table-column
          type="selection"
          label={this.selectionLabel}
          width={this.selectionWidth || this.config.selectionWidth}
          fixed={this.selectionFixed}
          align={this.selectionAlign}
          selectable={this.selectable}
        ></el-table-column>
      );
    };
    //头部
    const renderHeaderColumn = (item) => {
      return (
        <template slot="header">
          <slot v-if="item.slotHeader" name={item.slotHeader}></slot>
        </template>
      );
    };
    //插槽模式
    const renderSlotColumn = (item) => {
      const scope = this.$slots.scope;
      // console.log(scopedSlots)
      return (
        <template slot-scope={item}>
          <slot if={item.slotName} data={item} name={item.slotName}></slot>
          <span else>
            {(item.prop && String(item.prop)) || propEmptyDefault || "-"}
          </span>
        </template>
      );
    };
    //具体的每一项
    const renderTableColumns = () => {
      let tableColumn = [];
      this.fields.forEach((item, index) => {
        let props = {
          props: {
            key: index,
            label: item.label,
            prop:item.prop,
            type: item.colType,
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
            selectable: item.selectable,
            "reserve-selection": item.reserveSelection || false,
            filters: item.filters || null,
            "filter-placement": item.filterPlacement,
            "filter-multiple": item.filterMultiple,
            "filter-method": item.filters ? this.filterMethod : null,
            "filtered-value": item.filteredValue,
          }
        };
        let column = (
          <el-table-column {...props}>
            {item.slotHeader && renderHeaderColumn(item)}
            {renderSlotColumn(item)}
          </el-table-column>
        );
        tableColumn.push(column);
      });
      return tableColumn;
    };
    const renderTab = () => {
      return (
        <el-table
          v-loading={this.isLoading}
          {...tabPorps}
          data={this.data}
          ref="eVueTable"
        >
          {renderEmpty()}
          {this.isIndex && renderTableColumn()}
          {this.isExpand && renderExpand()}
          {this.isSelection && renderIsSelection()}
          {renderTableColumns()}
        </el-table>
      );
    };
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
        <div class="e-vue-pagination" if={this.isPagination}>
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
      <div class="e-vue-table">
        {renderTab()}
        {renderPagination()}
      </div>
    );
  },
};
</script>
<style lang="scss" scoped>
.e-vue-table {
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