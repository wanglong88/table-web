<template>
  <div class="table-box">
    <vxe-button @click="toImage">导出图片</vxe-button>
    <div class="vxe-table-box">
      <vxe-table
        border
        class="my-sort"
        ref="xTable"
        height="500"
        :data="tableData"
        :row-config="{isCurrent: true, isHover: true}"
        :column-config="{resizable: true}"
        :edit-config="{trigger: 'click', mode: 'cell'}"
        @header-cell-click="headerCellClickEvent"
        >
        <vxe-colgroup title="邯郸大健康精英俱乐部" align="center">
          <vxe-column type="seq" title="排名" width="60"></vxe-column>
          <vxe-column field="name" title="客户" :edit-render="{autofocus: '.vxe-input--inner'}">
            <template #edit="{ row }">
              <vxe-input v-model="row.name" type="text"></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="role" title="总产品积分" :edit-render="{autofocus: '.vxe-input--inner'}" sortable>
            <template #edit="{ row }">
              <vxe-input v-model="row.role" type="text"></vxe-input>
            </template>
          </vxe-column>
          <vxe-colgroup title="产品篇" align="center">
            <vxe-column field="sex" title="Sex" :edit-render="{autofocus: '.vxe-input--inner'}">
              <template #edit="{ row }">
                <vxe-input v-model="row.sex" type="text"></vxe-input>
              </template>
            </vxe-column>
            <vxe-column field="age" title="Age" :edit-render="{autofocus: '.vxe-input--inner'}">
              <template #edit="{ row }">
                <vxe-input v-model="row.age" type="text"></vxe-input>
              </template>
            </vxe-column>
          </vxe-colgroup>
        </vxe-colgroup>
      </vxe-table>
    </div>
  </div>
</template>



<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  import { VxeTableInstance, VxeTableEvents, VxeColumnPropTypes, VxeTablePropTypes } from 'vxe-table'
  import XEUtils from 'xe-utils'
  import html2canvas from 'html2canvas'

  export default defineComponent({
    setup () {
      //  数据响应式：
    const tableData = [
        { name: 'Test1', role: '2', sex: '0', age: 28, amount: 888, address: 'test abc' },
        { name: 'Test2', role: '4', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { name: 'Test3', role: '3', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
        { name: 'Test4', role: '5', sex: '0', age: 23, amount: 1000, address: 'test abc' },
        { name: 'Test5', role: '6', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
        { name: 'Test6', role: '7', sex: '0', age: 21, amount: 998, address: 'test abc' },
        { name: 'Test7', role: '1', sex: '1', age: 29, amount: 2000, address: 'test abc' },
      ]
    const tableSeq3 = ref({
              seqMethod ({ rowIndex }) {
                if(rowIndex == 0) {
                  return '冠军'
                } else if(rowIndex == 1) {
                  return '亚军'
                } else if(rowIndex == 2) {
                  return '季军'
                }else {
                  return `第${rowIndex + 1}名`
                }
              }
            } as VxeTablePropTypes.SeqConfig)
    const data = reactive({
      tableData,
      tableSeq3,
    })

      const xTable = ref({} as VxeTableInstance)

      const headerCellClickEvent: VxeTableEvents.HeaderCellClick = ({ column, triggerResizable, triggerSort, triggerFilter }) => {
        const $table = xTable.value
        // 如果触发了列的其他功能按钮
        console.log(triggerSort, 'triggerSort');
        
        if (column.sortable && !(triggerResizable || triggerSort || triggerFilter)) {
          if (column.order === 'desc') {
            $table.clearSort()
          } else if (column.order === 'asc') {
            $table.sort(column.property, 'desc')
          } else {
            $table.sort(column.property, 'asc')
          }
        }
      }

      const toImage = () => {
        html2canvas(document.querySelector('.vxe-table-box')).then((canvas) => {
          let dataURL = canvas.toDataURL('image/png')
          var a = document.createElement('a') // 生成一个a元素
          var event = new MouseEvent('click') // 创建一个单击事件
          a.download = 'photo' // 设置图片名称
          a.href = dataURL // 将生成的URL设置为a.href属性
          a.dispatchEvent(event) // 触发a的单击事件
        })
      }

      const formatAmount: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
        return XEUtils.commafy(XEUtils.toNumber(cellValue))
      }


      return {
        ...data,
        xTable,
        headerCellClickEvent,
        formatAmount,
        toImage,
      }
    }
  })
</script>

<style>
a {
  color: #42b983;
}
.my-sort .custom-sort {
  padding: 0 4px;
}
.my-sort .custom-sort.is-order {
  color: #409eff;
}
.vxe-header--column .vxe-cell--edit-icon {
  display: none;
}
</style>
