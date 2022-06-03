<template>
  <div class="table-wapper">
    <button @click="toImage">导出图片</button>
    <div class="vxe-table-box">
      <div class="table-box">
        <table width="100%">
          <tr>
            <th colspan="5">邯郸大健康精英俱乐部</th>
          </tr>
          <tr>
            <th rowspan="2">排名</th>
            <th rowspan="2">客户</th>
            <th rowspan="2">总积分</th>
            <th colspan="2">产品篇</th>
          </tr>
          <tr>
            <th v-for="(item, index) in tableData.category" :key="index">{{item}}</th>
          </tr>
          <tr v-for="(item2, index2) in tableData.data" :key="'m' + index2">
            <td>冠军</td>
            <td>
              <span @click="editFun('name' + index2, index2)" v-show="!item2['name']['editShow']">
                {{item2['name']['value']}}
              </span>
              <input :id="'name' + index2" @blur="item2['name']['editShow'] = false" v-show="item2['name']['editShow']" v-model="item2['name']['value']" type="text">
            </td>
            <td> 
              <span v-if="!item2['total']['editShow']">
                {{item2['total']['value']}}
              </span>
              <input v-else v-model="item2['total']['value']" type="text">
            </td>
            <td v-for="(i,n) in tableData.category" :key="'category' + n">{{item2['num' + (n+1)]['value']}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  import html2canvas from 'html2canvas'

  export default defineComponent({
    setup () {
      //  数据响应式：
    const tableData = {
      category: ['通脉灵', '天麻杜仲'],
      data: [{name: '赵江云',total: 0},{name: '韩洪波',total: 0}]
    }
    tableData['data'].forEach(item => {
      tableData['category'].forEach((i,n)=> {
        item['num' + (n+1)] = 5
      })
      for (let i in item) {
          item[i] = {
          value: item[i],
          editShow: false,
        }
      }
      
    });
    console.log(tableData, 'tableData');
   
    const data = reactive({
      tableData,
    })

      const editFun = (id,n) => {
        console.log('111');
        
        data.tableData['data'].forEach((item, index) => {
          console.log('222');
          if(index == n) {
            data.tableData['data'][index]['name']['editShow'] = true
            document.querySelector('#' + id).focus()
            console.log(document.querySelector('#' + id), '***');
          }
          
      
     });
        // document.querySelector('#' + data).focus()
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



      return {
        ...data,
        toImage,
        editFun,
      }
    }
  })
</script>

<style>
table td, table th{
  border: 1px solid #000;
  padding: 10px;
}
table td span {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
