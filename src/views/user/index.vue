<template>
  <div class="lists">
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色"
        width="120">
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="120">
        <template scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column
        label="mobile"
        width="120">
        <template scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="table-footer">
      <el-button @click="addUser">新增</el-button>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      size="large"
      :before-close="handleClose">
      <el-form :model="user">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="user.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="user.role" placeholder="请选择用户角色">
            <el-option v-for="(role, idx) in roleOptions" :key="idx" v-bind:label="role" :value="role"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import userApi from 'api/user'
export default {
  data () {
    return {
      tableData: [],
      total: 1000,
      currentPage: 0,
      pageSize: 15,
      dialogVisible: false,
      dialogTitle: '',
      user: {},
      formLabelWidth: '90px',
      roleOptions: ['amdin', 'normalUser', 'guestUser']
    }
  },
  methods: {
    handleSelectionChange () {
    },
    getUserlist () {
      userApi.getUserlist().then(response => {
        if (response.ret === 200) {
          this.tableData = response.data
          this.total = response.data.length * 100
        }
        console.log(response.data)
      }).catch(error => {
        this.$message(error.msg)
      })
    },
    addUser () {
      this.user = {}
      this.dialogTitle = 'create'
      this.dialogVisible = true
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.user = { ...row }
      this.dialogTitle = 'upadte'
      this.dialogVisible = true
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleCurrentChange (val) {
      console.log(`当前页：${val}`)
      this.currentPage = val
      this.getUserlist()
    },
    handleSizeChange (val) {
      console.log(`page size: ${val}`)
      this.pageSize = val
      // this.getUserlist()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleUser () {
      if (this.dialogTitle === 'upadte') {
        console.log(`upadte : ${this.user}`)
      } else if (this.dialogTitle === 'create') {
        console.log(`create: ${this.user}`)
      }
      console.log(this.user)
      this.dialogVisible = false
    }
  },
  created () {
    this.getUserlist()
  }
}
</script>
<style lang="css" scoped>
.table-footer {
  margin-top: 20px;
  margin-bottom: 30px;
}
.el-pagination {
  width: 70%;
  float: right;
}
.demonstration {
  line-height: 44px;
}
</style>
