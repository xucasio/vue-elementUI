<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-tree
          ref="tree"
          class="treeArea"
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-checked-keys="checkedTree"
          :props="defaultProps"
        />
      </el-col>
      <el-col :span="20">
        <div class="filter-container">
          <el-input v-model="query.name" placeholder="用户名" class="filter-item" />
          <el-button v-waves type="primary" icon="el-icon-search" @click="onload()">搜索</el-button>
        </div>
        <div class="filter-container">
          <el-button v-waves type="primary" icon="el-icon-plus" @click="handleCreate({})">新增</el-button>
        </div>
        <el-table v-loading="loading" :data="tableData" size="medium" border>
          <el-table-column align="center" label="序号" width="80">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                class="filter-item"
                type="primary"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.row)"
              />
              <el-button
                class="filter-item"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" sortable width="200" />
          <el-table-column prop="name" label="用户名" sortable width="200" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="status" width="200">
            <template slot-scope="scope">
              <el-button :type="scope.row.status===1?'primary':'info'">{{ scope.row.status | statusFilter([{label: '正常', key: 1}, {label: '禁用', key: 0}]) }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="query.offset"
          :limit.sync="query.limit"
          @pagination="onload"
        />
      </el-col>
    </el-row>
    <full-dialog :data="dialog">
      <div slot="content">
        <el-form
          ref="dataForm"
          class="formView"
          :rules="rules"
          :model="temp"
          label-position="right"
          label-width="100px"
        >
          <el-form-item label="姓名" prop="username">
            <el-input v-model="temp.username" />
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="temp.email" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="temp.status" placeholder="请选择">
              <el-option
                v-for="item in [{label: '正常', value: 1}, {label: '禁用', value: 0}]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="option">
        <el-button @click="dialog.dialogShow = false">取消</el-button>
        <el-button type="primary" @click="dialog.dialogStatus==='create'?createData():editData()">确定</el-button>
      </div>
    </full-dialog>
  </div>
</template>
<script>
import waves from '@/directive/waves' // waves directive
import { getList, add, update, remove, menuTree } from '@/api/system/users'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import FullDialog from '@/components/FullDialog'
export default {
  directives: { waves },
  components: { Pagination, FullDialog },
  filters: {
    statusFilter(val, obj) {
      return obj[val]
    }
  },
  data() {
    return {
      tableData: [],
      treeData: [], // 弹出框的树json
      checkedTree: [], // 选中树的id
      defaultProps: {
        label: 'text'
      },
      loading: false,
      query: {
        name: '',
        limit: 10,
        offset: 1
      },
      total: 0, // 总记录数
      temp: {
        username: '',
        name: '',
        email: '',
        status: ''
      },
      dialogShow: false,
      dialogStatus: '',
      textMap: {
        edit: '编辑',
        create: '新增'
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      dialog: {
        isFull: false,
        dialogShow: false,
        title: ''
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
      getList(this.query).then(res => {
        this.loading = false
        if (res.data) {
          this.tableData = res.data || []
          this.total = res.total
        }
      })
    },
    handleCreate() {
      this.dialog = {
        isFull: false,
        dialogShow: true,
        title: '新增',
        dialogStatus: 'create'
      }
      const _this = this
      this.resetTemp()
      menuTree('').then(res => {
        if (res.data) {
          _this.treeData = res.data.children
        }
      })
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.$refs.tree.setCheckedKeys([])
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          const arr = this.$refs.tree.getCheckedKeys() || []
          tempData.menuIds = arr
          add(tempData).then(res => {
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
      const _this = this
      this.resetTemp()
      this.dialog = {
        isFull: true,
        dialogShow: true,
        title: '编辑',
        dialogStatus: 'edit'
      }
      this.temp = Object.assign({}, obj)
      menuTree('/' + obj.roleId).then(res => {
        if (res.data) {
          _this.treeData = res.data.children
          _this.checkedTree = _this.getCheckedIds(_this.treeData) || []
          _this.$refs.tree.setCheckedKeys(_this.checkedTree)
          _this.temp.menuIds = _this.checkedTree
        }
      })
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.menuIds = this.$refs.tree.getCheckedKeys()
          update(tempData).then(res => {
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
      this.$confirm('是否删除 ' + row.name + ' 该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          remove({ id: row.roleId }).then(res => {
            this.dialogShow = false
            this.$message({
              title: '提示信息',
              message: res.msg || '删除成功！',
              type: 'success',
              duration: 2000
            })
            this.onload()
          })
        })
        .catch(() => {
          this.loading = false
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    resetTemp() {
      this.temp = {
        username: '',
        name: '',
        email: '',
        status: ''
      }
      this.checkedTree = []
    },
    getCheckedIds(arr) {
      // 遍历获取叶子节点id
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].hasChildren) {
          this.getCheckedIds(arr[i].children)
        } else {
          if (arr[i].state.selected) {
            this.checkedTree.push(arr[i].id)
          }
        }
      }
      return this.checkedTree
    }
  }
}
</script>
<style lang="scss">
.app-container {
  position: relative;
}
.treeArea {
  max-height: 300px;
  overflow-y: scroll;
}
.el-dialog__wrapper {
  position: absolute;
}
</style>
