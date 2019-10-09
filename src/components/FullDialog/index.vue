<template>
  <el-dialog
    :fullscreen="data.isFull"
    :modal="false"
    :modal-append-to-body="false"
    :title="data.title"
    :visible.sync="data.dialogShow"
  >
    <div slot="title" class="header-title">
      <span class="title-name">{{ data.title }}</span>
      <span class="title-icon"><i :class="data.isFull?'el-icon-copy-document':'el-icon-full-screen'" @click="changeFull" /></span>
    </div>
    <slot name="content" />
    <div slot="footer" class="dialog-footer">
      <slot name="option" />
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      icon: 'el-icon-full-screen'
    }
  },
  methods: {
    changeFull() {
      this.data.isFull = !this.data.isFull
    }
  }
}
</script>
<style lang="scss">
.title-icon{
  float: right;
  margin-right: 25px;
  i{
    cursor: pointer;
  }
}
</style>
