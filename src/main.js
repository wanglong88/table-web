import { createApp } from 'vue'
import App from './App.vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vxe-table/lib/style.css'
import ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(VXETable).use(ElementPlus).mount('#app')


export default app