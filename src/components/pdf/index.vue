<template>
  <div>
    <button type="primary" size="small" @click="downloadWord">导出</button>
    <div ref="word">
      <template v-for="array of params">
        <div>
          <span class="header-icon"></span>
          <span class="header">
            {{array.header}}
          </span>
        </div>
        <div class="row" >
          <div class="col" :class="(item.type === 'image' ? 'image' : '')" v-for="item in array.content">
            <span v-if="item.type === 'text'">{{item.name}}</span>
            <select v-else-if="item.type === 'select'">
              <option v-for="option of item.options" :value="option">{{option}}</option>
            </select>
            <template v-else-if="(item.type === 'image')">
              <img :src="imgs[item.index]" alt="选择图片">
              <input type="file" :data-index="item.index" @change="getFileObject" accept="image/*">
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { get, post } from '@/preset/request.js'
import css from './css'
export default {
  data () {
    return {
      index: 0,
      imgs: [],
      params: [
        {
          header: 'Basic Information',
          content: [
            {
              name: 'Part Name',
              type: 'text'
            },
            {
              index: 0,
              type: 'image'
            },
            {
              name: 'Test Date',
              type: 'text'
            },
            {
              name: '2018/9/13',
              type: 'text'
            },
            {
              name: 'Test Times',
              type: 'text'
            },
            {
              name: 'FOT',
              type: 'text'
            }
          ]
        },
        {
          header: 'Material',
          content: [
            {
              name: 'C1 Name and colour',
              type: 'text'
            },
            {
              name: '编号和名称做搜索，颜色重点搞清楚',
              type: 'text'
            },
            {
              name: 'Dry process',
              type: 'text'
            },
            {
              name: '90℃',
              type: 'select',
              options: ['10℃','20℃','30℃','40℃','50℃','60℃']
            },
            {
              name: '4H',
              type: 'text'
            },
            {
              name: 'Vacuum',
              type: 'text'
            }
          ]
        }
      ]
    }
  },
  mounted () {

  },
  methods: {
    /**
     * [downloadWord 下载word流]
     * @return {[type]} [description]
     */
    downloadWord () {
      const html = this.getCanvasHTML()
      const promise = this.$store.dispatch('HTMLTOWORD', {
        html: this.getCanvasHTML()
      })
      promise.then(res => {
        console.log('res')
      })
    },
    /**
     * [getFileObject 获取上传的文件]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    getFileObject (e) {
      // console.log('获取上传的文件',e.target.getAttribute('data-index'), e.target.files)
      const index = e.target.getAttribute('data-index')
      const file = e.target.files[0]
      this.insertImage(index, file)
    },
    /**
     * [insertImage 插入图片]
     * @return {[type]} [description]
     */
    insertImage (index, file) {
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        console.log('file', file)
        reader.onload = (e) => {
          this.imgs.splice(index, 1, e.target.result)
        }
      }
    },
    /**
     * [getCanvasHTML 获取该vue组件的html]
     * @return {[type]} [description]
     */
    getCanvasHTML () {
      const html = `<!DOCTYPE html>
        <head>
          <meta charset="utf-8">
          <title></title>
          <style>
          ${css}
          </style>
        </head>
        <body>
          ${this.$refs.word.innerHTML}
        </body>
      </html>`
      return html
    },
    /**
     * [createURL 下载html文件]
     * @return {[type]} [description]
     */
    createURL () {
      const a = document.createElement('a')
      const data = this.getCanvasHTML()
      const blob = new Blob([data], {
        type:"text/plain;charset='utf-8'"
      })
      const url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = 'word.html'
      a.click()
      window.URL.revokeObjectURL(url)
    },
    /**
     * 网络图像文件转Base64
     */
     getBase64Image (img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL;
    },
    /**
     * [exportWord 后端获取word文档流， 转换成 word文件]
     * @return {[type]} [description]
     */
    exportWord () {
      // const promise = get({
      //   url: '',
      //   responseType: 'arraybuffer'
      // })
      // promise.then(res => {
      //   const { stauts,data } = res
      //   if (stauts === 200) {
        const a = document.createElement('a')
        const data = this.getCanvasHTML()
        console.log('data', data)
          let blob = new Blob([data], {
            type: 'application/msword' // /word文档为msword,pdf文档为pdf，msexcel 为excel
          })
          let fileUrl = URL.createObjectURL(blob)
          let link = document.createElement('a')
          let name = 'word.docx'
          link.href = fileUrl
          link.setAttribute('download', name)
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(fileUrl)
      //   } else {
      //   }
      // }).catch(err => {
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.css'
</style>
