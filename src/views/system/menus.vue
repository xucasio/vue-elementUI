<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-input v-model="test" placeholder="标题" class="filter-item" style="width: 200px" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">
        搜索
      </el-button>
    </div> -->
    <div class="filter-container">
      <el-button v-waves type="primary" icon="el-icon-plus" @click="handleCreate({})">
        新增
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      row-key="menuId"
      size="medium"
      border
      :default-expand-all="false"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="menuId"
        label="编号"
        sortable
        width="180"
      />
      <el-table-column
        prop="parentId"
        label="父编码"
        sortable
        width="180"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="icon"
        label="图标"
      />
      <el-table-column
        prop="type"
        label="类型"
      />
      <el-table-column
        prop="url"
        label="地址"
      />
      <el-table-column
        prop="perms"
        label="权限标识"
      />
      <el-table-column
        label="操作"
        width="240"
      >
        <template slot-scope="scope">
          <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate(scope.row)" />
          <el-button class="filter-item" type="primary" icon="el-icon-edit-outline" @click="handleEdit(scope.row)" />
          <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogShow">
      <el-form ref="dataForm" class="formView" :rules="rules" :model="temp" label-position="right" label-width="100px">
        <el-form-item label="上级菜单">
          <el-input v-model="parentName" :disabled="true" />
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="temp.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="temp.url" />
        </el-form-item>
        <el-form-item label="权限标识" prop="perms">
          <el-input v-model="temp.perms" />
        </el-form-item>
        <el-form-item label="排序号">
          <el-input v-model="temp.orderNum" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="temp.icon" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():editData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import waves from '@/directive/waves' // waves directive
import { getList, add, update, remove } from '@/api/system/menus'
export default {
  directives: { waves },
  data() {
    return {
      tableData: [],
      sourceData: [],
      loading: false,
      temp: {
        id: '',
        parentId: '',
        type: 0,
        name: '',
        url: '',
        perms: '',
        orderNum: '',
        icon: ''
      },
      dialogShow: false,
      dialogStatus: '',
      textMap: {
        edit: '编辑',
        create: '新增'
      },
      // type title url perms orderNum icon
      rules: {
        type: [{ required: true, message: '请选择菜单类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入链接地址', trigger: 'blur' }],
        perms: [{ required: true, message: '请输入权限标识', trigger: 'blur' }]
        // orderNum: [{ required: true, message: '请输入排列序号', trigger: 'blur' }]
      }
    }
  },
  computed: {
    parentName: function() {
      console.log('触发computed')
      const _this = this
      let arr = []
      let name = '根目录'
      if (_this.temp.parentId) {
        if (_this.temp.parentId !== '') {
          arr = _this.sourceData.filter((item) => {
            return item.menuId === _this.temp.parentId
          })
          if (arr.length > 0) { // 后台奇葩数据限制
            console.log('此时的parentName', arr[0].name)
            name = arr[0].name
          }
        }
      }
      return name
    }
  },
  created() {
    this.onload()
  },
  methods: {
    // 转树形json
    changeTreeJson(arr, idStr, pidStr, chindrenStr) {
      var r = []
      const hash = {}
      const id = idStr
      const pid = pidStr
      const children = chindrenStr
      const len = arr.length
      for (let i = 0; i < len; i++) {
        hash[arr[i][id]] = arr[i]
      }
      for (let j = 0; j < len; j++) {
        const aVal = arr[j]
        const hashVP = hash[aVal[pid]]
        if (hashVP) {
          !hashVP[children] && (hashVP[children] = [])
          hashVP[children].push(aVal)
        } else {
          r.push(aVal)
        }
      }
      return r
    },
    // 获取菜单列表
    onload() {
      this.loading = true
      getList({ sort: 'order_num' }).then((res) => {
        this.loading = false
        const arr = res.data || []
        this.sourceData = res.data
        this.tableData = this.changeTreeJson(arr, 'menuId', 'parentId', 'children')
      })
    },
    handleCreate(obj) {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogShow = true
      if (Object.keys(obj).length !== 0) {
        console.log('非空新增，此时的menuId', obj.menuId)
        this.temp.parentId = obj.menuId
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          add(tempData).then((res) => {
            this.dialogShow = false
            this.$message({
              title: '提示信息',
              message: res.msg || '新增成功！',
              type: 'success',
              duration: 2000
            })
            this.onload()
          })
        }
      })
    },
    handleEdit(obj) {
      this.resetTemp()
      this.dialogStatus = 'edit'
      this.dialogShow = true
      this.temp = Object.assign({}, obj)
      console.log('编辑时行数据', obj)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          update(tempData).then((res) => {
            this.dialogShow = false
            this.$message({
              title: '提示信息',
              message: res.msg || '编辑成功！',
              type: 'success',
              duration: 2000
            })
            this.onload()
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('是否删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove({ id: row.menuId }).then((res) => {
          this.dialogShow = false
          this.$message({
            title: '提示信息',
            message: res.msg || '删除成功！',
            type: 'success',
            duration: 2000
          })
          this.onload()
        })
      }).catch(() => {
        this.loading = false
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    resetTemp() {
      this.temp = {
        id: '',
        parentId: '',
        type: 0,
        name: '',
        url: '',
        perms: '',
        orderNum: '',
        icon: ''
      }
    }
  }
}
</script>
<style scoped>
.formView{
  padding: 20px;
}
</style>
