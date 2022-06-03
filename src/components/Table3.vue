<template>
  <div id="hello">
    <!-- 表格 -->
    <div class="vxe-table-box">
      <h2 style="margin: 0; text-align: center;padding-top: 20px;">邯郸大健康精英俱乐部</h2>
      <el-table
        :data="testDatas"
        border
        style="width: 100%; margin-top: 10px"
        @header-contextmenu="(column, event) => rightClick(null, column, event)"
        @row-contextmenu="rightClick"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          v-if="columnList.length > 0"
          type="index"
          label="排名"
          :width="80"
          align="center"
        >
          <template #default="scope">
            {{ numFun(scope.$index) }}
          </template>
        </el-table-column>
        <el-table-column label="客户">
          <template #default="scope">
            <p
              class="new-text"
              v-show="scope.row['name'].show"
              @dblclick="scope.row['name'].show = false"
            >
              {{ scope.row['name'].content }}
            </p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              v-show="!scope.row['name'].show"
              v-model="scope.row['name'].content"
              @blur="scope.row['name'].show = true"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="总积分" :sortable="true" :sort-method="sortMethod">
          <template #default="scope">
          {{scope.row.total_pints.content}}
            <!-- {{ totalNum(scope.$index) }} -->
          </template>
        </el-table-column>
        <el-table-column label="产品篇" align="center">
          <el-table-column
          v-for="(col, idx) in columnList" 
          :key="col.prop"
            :index="idx"
          >
            <!-- 自定义表头的内容 -->
            <template #header>
              <p class="new-text" v-show="col.show" @dblclick="col.show = false">
                {{ col.label }}
              </p>
              <el-input
                size="large"
                v-show="!col.show"
                v-model="col.label"
                @blur="col.show = true"
              >
              </el-input>
            </template>
            <!-- 自定义列的内容-->
            <template #default="scope">
              <p
                class="new-text"
                v-show="scope.row[col.prop].show"
                @dblclick="scope.row[col.prop].show = false"
              >
                {{ scope.row[col.prop].content }}
              </p>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-show="!scope.row[col.prop].show"
                v-model="scope.row[col.prop].content"
                @blur="scope.row[col.prop].show = true"
              >
              </el-input>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>

    <p style="text-align: left; color: #ccc">右键菜单，双击编辑</p>
    <el-button size="large" type="primary" @click="toImage"
        >导出图片</el-button
      >
    <!-- 表头右键菜单 -->
    <div v-show="showMenu" id="contextmenu">
      <el-icon class="hideContextMenu" @click="showMenu = false"
        ><CloseBold
      /></el-icon>
      <el-button size="large" type="primary" @click="addColumn()"
        >前方插入一列</el-button
      >
      <el-button size="large" type="primary" @click="addColumn(true)"
        >后方插入一列</el-button
      >
      <el-popconfirm title="确定删除该列吗？" @confirm="delColumn">
        <template #reference>
          <el-button type="primary" size="large">删除当前列</el-button>
        </template>
      </el-popconfirm>
      <div v-show="!curTarget.isHead">
        <hr />
        <el-button size="large" type="primary" @click="addRow()"
          >上方插入一行</el-button
        >
        <el-button size="large" type="primary" @click="addRow(true)"
          >下方插入一行</el-button
        >
        <el-popconfirm title="确定删除该行吗？" @confirm="delRow">
          <template #reference>
            <el-button type="primary" size="large">删除当前行</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>

  </div>
</template>

<script>
import { CloseBold } from "@element-plus/icons-vue";
import html2canvas from 'html2canvas'
export default {
  name: "demo",
  components: { CloseBold },
  data() {
    return {
      list: [
        { prop: "name", label: "张三", show: true },
        { prop: "total_pints", label: 0, show: true },
        { prop: "drug_1", label: "宝儿安", show: true },
        { prop: "drug_2", label: "宝儿安", show: true },
        { prop: "drug_3", label: "宝儿安", show: true },
      ],
      columnList: [
        { prop: "drug_1", label: "宝儿安", show: true },
        { prop: "drug_2", label: "宝儿安", show: true },
        { prop: "drug_3", label: "宝儿安", show: true },
      ],
      testDatas: [
        {
          name: { content: "张三", show: true },
          total_pints: { content: 0, show: true },
          drug_1: { content: 1, show: true },
          drug_2: { content: 1, show: true },
          drug_3: { content: 1, show: true },
        },
        {
          name: { content: "李四", show: true },
          total_pints: { content: 0, show: true },
          drug_1: { content: 2, show: true },
          drug_2: { content: 2, show: true },
          drug_3: { content: 2, show: true },
        },
      ],
      count_col: 3,
      showMenu: false,
      curTarget: {
        // 当前目标信息
        rowIdx: null, // 行下标
        colIdx: null, // 列下标
        isHead: undefined, // 当前目标是表头？
      },
    };
  },
  watch: {
    testDatas: {
      handler(newV,oldV){
        this.testDatas.forEach((item, index) =>{
          let num = 0
          for(let i in item) {
            if(i.includes('drug')) {
              
              num += Number(this.testDatas[index][i]['content'])
            }
          }
          this.testDatas[index]['total_pints']['content'] = num
          console.log(typeof this.testDatas[index]['total_pints']['content']);
        })
      },
      deep: true
    }
  },
  methods: {
    toImage() {
        html2canvas(document.querySelector('.vxe-table-box')).then((canvas) => {
          let dataURL = canvas.toDataURL('image/png')
          var a = document.createElement('a') // 生成一个a元素
          var event = new MouseEvent('click') // 创建一个单击事件
          a.download = 'photo' // 设置图片名称
          a.href = dataURL // 将生成的URL设置为a.href属性
          a.dispatchEvent(event) // 触发a的单击事件
        })
      },
    sortMethod(a, b){
    },
    rightClick(row, column, event) {
      // 阻止浏览器自带的右键菜单弹出
      event.preventDefault(); // window.event.returnValue = false
      if (column.index == null) return;
      // 定位菜单
      let ele = document.getElementById("contextmenu");
      ele.style.top = event.clientY - 25 + "px";
      ele.style.left = event.clientX - 25 + "px";
      if (window.innerWidth - 140 < event.clientX) {
        ele.style.left = "unset";
        ele.style.right = 0;
      }
      this.showMenu = true;
      // 当前目标
      this.curTarget = {
        rowIdx: row ? row.row_index : null,
        colIdx: column.index,
        isHead: !row,
      };
    },
    // 新增行
    addRow(later) {
      this.showMenu = false;
      if (this.curTarget.rowIdx === null) return;
      const idx = later ? this.curTarget.rowIdx + 1 : this.curTarget.rowIdx;
      let obj = {};
      this.list.forEach((p) => {
        console.log(p.prop, 'p.prop');
         obj[p.prop] = { content: '', show: true };
      });
      console.log(this.testDatas, 'this.testDatas22')
      this.testDatas.splice(idx, 0, obj);
    },
    // 删除行
    delRow() {
      this.showMenu = false;
      this.curTarget.rowIdx !== null &&
        this.testDatas.splice(this.curTarget.rowIdx, 1);
    },
    // 新增列
    addColumn(later) {
      this.showMenu = false;
      const idx = later ? this.curTarget.colIdx + 1 : this.curTarget.colIdx;
      let obj = { prop: "drug_" + ++this.count_col, label: "", show: true };
      this.columnList.splice(idx, 0, obj);
      this.list.splice(idx, 0, obj);
      this.testDatas.forEach((p) => {
        // vue3无需 this.$set(p, obj.col, { content: '', show: true }) // vue2中, 新增的对象无法被监听到
        p[obj.prop] = { content: 0, show: true };
      });
      console.log(this.testDatas, 'this.testDatas')
    },
    // 删除列
    delColumn() {
      this.showMenu = false;
      let colKey = this.columnList[this.curTarget.colIdx].prop;
      this.columnList.splice(this.curTarget.colIdx, 1);
      this.testDatas.forEach((p) => delete p[colKey]);
    },
    // 添加表格行下标
    tableRowClassName({ row, rowIndex }) {
      row.row_index = rowIndex;
    },
    numFun(index) {
      if (index == 0) {
        return "冠军";
      } else if (index == 1) {
        return "亚军";
      } else if (index == 2) {
        return "季军";
      } else {
        return "第" + (index + 1) + "名";
      }
    },
    totalNum(n) {
      let num = 0
      for(let k in this.testDatas[n]) {
        if(!['total_pints', 'name', 'row_index'].includes(k+'')) {
          num += Number(this.testDatas[n][k]['content'])
        }
      }
      return num
    },
  },
};
</script>
  
<style lang="less">
.el-textarea__inner {
  height: 40px !important;
  min-height: 40px !important;
}
.new-text {
  margin: 0;
  height: 40px;
  line-height: 40px;
}
#hello {
  position: relative;
}
#contextmenu {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  width: 120px;
  border-radius: 3px;
  border: 1px solid #999999;
  background-color: #f4f4f4;
  padding: 30px 10px 10px;
  z-index: 12;
  button {
    display: block;
    margin: 0 0 5px;
  }
}
.hideContextMenu {
  position: absolute !important;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
</style>