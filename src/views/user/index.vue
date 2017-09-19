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
        label="id"
        width="120">
        <template scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import userApi from 'api/user'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    handleSelectionChange () {
    },
    getUserlist () {
      userApi.getUserlist().then(response => {
        if (response.ret === 200) {
          this.tableData = response.data
        }
        console.log(response.data)
      }).catch(error => {
        this.$message(error.msg)
      })
    }
  },
  created () {
    this.getUserlist()
  }
}
</script>
<style lang="css" scoped>
</style>