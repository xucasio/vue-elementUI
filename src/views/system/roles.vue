<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="query.roleName" placeholder="角色名" class="filter-item" />
      <el-button v-waves type="primary" icon="el-icon-search" @click="onload()">搜索</el-button>
    </div>
    <div class="filter-container">
      <el-button v-waves type="primary" icon="el-icon-plus" @click="handleCreate({})">新增</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      size="medium"
      border
    >
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button class="filter-item" type="primary" icon="el-icon-edit-outline" @click="handleEdit(scope.row)" />
          <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名"
        sortable
        width="200"
      />
      <el-table-column
        prop="remark"
        label="备注"
      />
      <el-table-column
        prop="icon"
        width="200"
        label="权限"
      />
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="onload" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogShow">
      <el-form ref="dataForm" class="formView" :rules="rules" :model="temp" label-position="right" label-width="100px">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="temp.roleName" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.remark" />
        </el-form-item>
        <el-form-item label="菜单权限" prop="menuRole">
          <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[]"
            :default-checked-keys="[]"
            :props="defaultProps"
          />
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
import { getList, add, update, remove } from '@/api/system/roles'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  directives: { waves },
  components: { Pagination },
  data() {
    var validateMenuRole = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择权限菜单'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      treeData: [], // 弹出框的树json
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      loading: false,
      query: {
        roleName: '',
        offset: 0,
        limit: 10,
        order: 'asc'
      },
      total: 0, // 总记录数
      temp: {
        roleId: '',
        menuIds: '',
        roleName: '',
        remark: ''
      },
      dialogShow: false,
      dialogStatus: '',
      textMap: {
        edit: '编辑',
        create: '新增'
      },
      // type title url perms orderNum icon
      rules: {
        roleName: [{ required: true, message: '请选择菜单类型', trigger: 'change' }],
        menuRole: [{ required: true, message: '请输入菜单名称', trigger: 'blur', validator: validateMenuRole }]
      }
    }
  },
  created() {
    this.onload()
  },
  methods: {
    // 获取菜单列表
    onload() {
      this.loading = true
      getList(this.query).then((res) => {
        this.loading = false
        const arr = res.data || []
        this.tableData = res.data
        // this.total = 
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
            if (res.code === 0) {
              this.dialogShow = false
              this.$message({
                title: '提示信息',
                message: res.msg || '新增成功！',
                type: 'success',
                duration: 2000
              })
              this.onload()
            } else {
              this.$message({
                title: '提示信息',
                message: res.msg || '操作失败！',
                type: 'warning',
                duration: 2000
              })
            }
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
            if (res.code === 0) {
              this.dialogShow = false
              this.$message({
                title: '提示信息',
                message: res.msg || '编辑成功！',
                type: 'success',
                duration: 2000
              })
              this.onload()
            } else {
              this.$message({
                title: '提示信息',
                message: res.msg || '操作失败！',
                type: 'warning',
                duration: 2000
              })
            }
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
          if (res.code === 0) {
            this.dialogShow = false
            this.$message({
              title: '提示信息',
              message: res.msg || '删除成功！',
              type: 'success',
              duration: 2000
            })
            this.onload()
          } else {
            this.$message({
              title: '提示信息',
              message: res.msg || '操作失败！',
              type: 'warning',
              duration: 2000
            })
          }
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
