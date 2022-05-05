<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">id</label>
        <el-input v-model="query.id" clearable placeholder="id" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">创建时间</label>
        <el-input v-model="query.createTime" clearable placeholder="创建时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">知识点</label>
        <el-input v-model="query.knowledgePoint" clearable placeholder="知识点" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">内容</label>
        <el-input v-model="query.content" clearable placeholder="内容" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">用户id</label>
        <el-input v-model="query.userId" clearable placeholder="用户id" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">用户名</label>
        <el-input v-model="query.username" clearable placeholder="用户名" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">用户昵称</label>
        <el-input v-model="query.nickName" clearable placeholder="用户昵称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">用户性别</label>
        <el-input v-model="query.gender" clearable placeholder="用户性别" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">角色名</label>
        <el-input v-model="query.userRoles" clearable placeholder="角色名" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="知识点">
            <el-input v-model="form.knowledgePoint" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="form.content" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <span style="padding-left:25px;">当前用户id：{{userId}}</span>
          <el-form-item label="用户id">
            <el-input v-model="form.user.id" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="knowledgePoint" label="知识点" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="user.id" label="用户id" />
        <el-table-column prop="user.username" label="用户名" />
        <el-table-column prop="user.nickName" label="用户昵称" />
        <el-table-column prop="user.gender" label="用户性别" />
        <el-table-column prop="user.roles[0].name" label="角色名" />
        <el-table-column v-if="checkPer(['admin','ideo:edit','ideo:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudIdeo from '@/api/ideo'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import axios from 'axios'
import { getToken } from '../../utils/auth'

const defaultForm = { id: null, createTime: null, knowledgePoint: null, content: null, user: { id: null }}
export default {
  name: 'Ideo',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '思政元素管理', url: 'api/ideo', idField: 'id', sort: 'id,desc', crudMethod: { ...crudIdeo }})
  },
  created() {
    // axios.get('http://graduation.free.idcfengye.com/api/users/query_id',
    axios.get('http://localhost:8000/api/users/query_id',
      {
        headers: {
          'Authorization': getToken()
        }
      }).then(res => {
      this.userId = res.data
    })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'ideo:add'],
        edit: ['admin', 'ideo:edit'],
        del: ['admin', 'ideo:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'id', display_name: 'id' },
        { key: 'createTime', display_name: '创建时间' },
        { key: 'knowledgePoint', display_name: '知识点' },
        { key: 'content', display_name: '内容' },
        { key: 'userId', display_name: '用户id' },
        { key: 'userName', display_name: '用户名' },
        { key: 'nickName', display_name: '用户昵称' },
        { key: 'gender', display_name: '用户性别' },
        { key: 'userRoles', display_name: '角色名' }
      ],
      userId: ''
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
