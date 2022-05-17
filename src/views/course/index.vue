<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">课程名</label>
        <el-input v-model="query.courseName" clearable placeholder="课程名" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">课程代码</label>
        <el-input v-model="query.courseCode" clearable placeholder="课程代码" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">课程类别</label>
        <el-input v-model="query.courseType" clearable placeholder="课程类别" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">课程性质(必修,选修等)</label>
        <el-input v-model="query.courseNature" clearable placeholder="课程性质(必修,选修等)" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">学分</label>
        <el-input v-model="query.credit" clearable placeholder="学分" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">总学时数</label>
        <el-input v-model="query.totalHours" clearable placeholder="总学时数" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">开课学院</label>
        <el-input v-model="query.academy" clearable placeholder="开课学院" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">开课基层教学组织</label>
        <el-input v-model="query.teachingGroup" clearable placeholder="开课基层教学组织" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">面向专业</label>
        <el-input v-model="query.forProfessional" clearable placeholder="面向专业" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">开课学期</label>
        <el-input v-model="query.semester" clearable placeholder="开课学期" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
<!--        <label class="el-form-item-label">用户昵称</label>-->
<!--        <el-input v-model="query.nickName" clearable placeholder="用户昵称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">用户名</label>-->
<!--        <el-input v-model="query.userName" clearable placeholder="用户名" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">用户角色</label>-->
<!--        <el-input v-model="query.rolesName" clearable placeholder="用户角色" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="课程名">
            <el-input v-model="form.courseName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="课程代码">
            <el-input v-model="form.courseCode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="课程类别">
            <el-input v-model="form.courseType" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="课程性质">
            <el-input v-model="form.courseNature" style="width: 400px;" />
          </el-form-item>
          <el-form-item label="学分">
            <el-input v-model="form.credit" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="总学时数">
            <el-input v-model="form.totalHours" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="开课学院">
            <el-input v-model="form.academy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="开课基层教学组织">
            <el-input v-model="form.teachingGroup" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="面向专业">
            <el-input v-model="form.forProfessional" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="开课学期">
            <el-input v-model="form.semester" style="width: 370px;" />
          </el-form-item>
<!--          <span style="padding-left:25px;">当前用户id：{{userId}}</span>-->
<!--          <el-form-item label="用户id">-->
<!--            <el-input v-model="form.user.id" />-->
<!--          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
<!--      思政元素-->
      <el-dialog title="查看思政元素" :close-on-click-modal="false" :visible.sync="isEdit" width="500px">
        <div v-for="(ideo) in currentIdeo" class="ideo-content">
          <div style="font-weight: bold;">{{ideo.knowledgePoint}}</div>
          <div style="margin: 5px 0;">{{ideo.content}}</div>
          <div>创建时间：{{ideo.createTime}}</div>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="courseName" label="课程名" />
        <el-table-column prop="courseCode" label="课程代码" />
        <el-table-column prop="courseType" label="课程类别" />
        <el-table-column prop="courseNature" label="课程性质(必修,选修等)" />
        <el-table-column prop="credit" label="学分" />
        <el-table-column prop="totalHours" label="总学时数" />
        <el-table-column prop="academy" label="开课学院" />
        <el-table-column prop="teachingGroup" label="开课基层教学组织" />
        <el-table-column prop="forProfessional" label="面向专业" />
        <el-table-column prop="semester" label="开课学期" />
        <el-table-column prop="user.nickName" label="用户昵称" />
        <el-table-column prop="user.username" label="用户名称" />
        <el-table-column prop="user.roles[0].name" label="用户角色" />
        <el-table-column prop="ideos" label="思政元素">
          <template slot-scope="scope">
            <div class="details" @click="showDetails(scope.row)">
              查看详情
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPer(['admin','course:edit','course:del'])" label="操作" width="150px" align="center">
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
import crudCourse from '@/api/course'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import axios from 'axios'
import { getToken } from '../../utils/auth'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, createTime: null, courseName: null, courseCode: null, courseType: null, courseNature: null, credit: null, totalHours: null, academy: null, teachingGroup: null, forProfessional: null, semester: null, user: { id: null }}
export default {
  name: 'Course',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '课程管理', url: 'api/course', idField: 'id', sort: 'id,desc', crudMethod: { ...crudCourse }})
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
        add: ['admin', 'course:add'],
        edit: ['admin', 'course:edit'],
        del: ['admin', 'course:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'courseName', display_name: '课程名' },
        { key: 'courseCode', display_name: '课程代码' },
        { key: 'courseType', display_name: '课程类别' },
        { key: 'courseNature', display_name: '课程性质(必修,选修等)' },
        { key: 'credit', display_name: '学分' },
        { key: 'totalHours', display_name: '总学时数' },
        { key: 'academy', display_name: '开课学院' },
        { key: 'teachingGroup', display_name: '开课基层教学组织' },
        { key: 'forProfessional', display_name: '面向专业' },
        { key: 'semester', display_name: '开课学期' },
        { key: 'user.nickName', display_name: '用户昵称' },
        { key: 'user.username', display_name: '用户名' },
        { key: 'user.roles[0].name', display_name: '用户角色' }
      ],
      isEdit: false,
      currentIdeo: {},
      userId: ''
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    showDetails(arg) {
      this.currentIdeo = arg.ideos
      this.isEdit = true
    }
  }
}
</script>
<style scoped>
  .details {
    color: #3A71A8;
  }
  .details:hover {
    cursor: pointer;
  }
  .ideo-content {
    margin: 10px 0;
  }
  .btn-ideo {
    display: flex;
  }
</style>
