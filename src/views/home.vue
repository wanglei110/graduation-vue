<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
<!--      <github-corner class="github-corner" />-->
      <div class="course-part">
        <div class="courses" v-for="(value) in courseinfo" @click="showDetails(value)">
          <Course :value="value"></Course>
        </div>
      </div>
<!--      <panel-group @handleSetLineChartData="handleSetLineChartData" />-->

<!--      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
<!--        <line-chart :chart-data="lineChartData" />-->
<!--      </el-row>-->
<!--      <el-row :gutter="32">-->
<!--        <el-col :xs="24" :sm="24" :lg="8">-->
<!--          <div class="chart-wrapper">-->
<!--            <radar-chart />-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :xs="24" :sm="24" :lg="8">-->
<!--          <div class="chart-wrapper">-->
<!--            <pie-chart />-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :xs="24" :sm="24" :lg="8">-->
<!--          <div class="chart-wrapper">-->
<!--            <bar-chart />-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </div>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './dashboard/PanelGroup'
// import LineChart from './dashboard/LineChart'
// import RadarChart from '@/components/Echarts/RadarChart'
// import PieChart from '@/components/Echarts/PieChart'
// import BarChart from '@/components/Echarts/BarChart'
import { getCourse } from '../api/course'
import Course from './course/Course'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Dashboard',
  components: {
    // GithubCorner,
    // PanelGroup,
    // LineChart,
    // RadarChart,
    // PieChart,
    // BarChart,
    Course
  },
  created() {
    getCourse().then(res => {
      this.courseinfo = res.content
      // console.log(res.content)
    })
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      arr: [
        {
          'content': [
            {
              'academy': '网络空间安全学院',
              'courseCode': 'A270706s',
              'courseName': '计算机网络(甲)',
              'courseNature': '必修',
              'courseType': '学科基础课',
              'createTime': '2022-03-16 18:10:12',
              'credit': 4.0,
              'forProfessional': '网络工程',
              'videoPath': '/',
              'imagePath': '/',
              'id': 1,
              'ideos': [
                {
                  'content': '在介绍网络安全的时候开展一个网络道德的主题讨论，通过以学生为中心的自我学习加强学生网络道德观的培养。', //思政元素内容
                  'createTime': '2022-03-16 18:12:28',
                  'id': 2,
                  'knowledgePoint': '网络道德',
                  'user': {
                    'gender': '男',
                    'id': 1,
                    'nickName': '管理员',
                    'roles': [
                      {
                        'id': 1,
                        'name': '超级管理员'
                      }
                    ],
                    'username': 'admin'
                  }
                },
                {
                  'content': '在介绍网络安全的时候开展一个网络道德的主题讨论，通过以学生为中心的自我学习加强学生网络道德观的培养。',
                  'createTime': '2022-03-16 18:12:28',
                  'id': 1,
                  'knowledgePoint': '网络道德',
                  'user': {
                    'gender': '男',
                    'id': 1,
                    'nickName': '管理员',
                    'roles': [
                      {
                        'id': 1,
                        'name': '超级管理员'
                      }
                    ],
                    'username': 'admin'
                  }
                }
              ],
              'semester': 4,
              'teachingGroup': '计算机网络课程组',
              'totalHours': 64,
              'user': {
                'gender': '男',
                'id': 1,
                'nickName': '管理员',
                'roles': [
                  {
                    'id': 1,
                    'name': '超级管理员'
                  }
                ],
                'username': 'admin'
              }
            }
          ],
          'totalElements': 4
        }
      ],
      courseinfo: {}
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    showDetails(arg) {
      this.$router.push({
        path: '/CourseDetails',
        query: {
          values: arg
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .course-part {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .course {
        margin-top: 25px;
      }
    }
    .github-corner {
      position: absolute;
      top: 0;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
