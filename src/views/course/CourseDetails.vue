<template>
  <div class="course">
    <div class="course-cover">
      <div class="course-img">
        <img style="width: 90%;margin: 15px 0;" :src="imagePath" />
      </div>
      <div class="course-info1">
        <div class="course-name">{{courseinfo.courseName}}</div>
        <div class="course-school">
          <span>学院：{{courseinfo.academy}}</span>
        </div>
        <div class="course-teacher">
          <span style="color: darkorange">授课小组</span>
          <span style="color: darkgray">&nbsp;&nbsp;&nbsp;&nbsp;{{courseinfo.teachingGroup}}</span>
          <!--          <span style="color: darkgray">&nbsp;&nbsp;&nbsp;&nbsp;教授</span>-->
        </div>
        <div class="course-info2">
          <span>课程性质：{{courseinfo.courseNature}}</span>
          <span>课程类型：{{courseinfo.courseType}}</span>
          <span>课程学分：{{courseinfo.credit}}</span>
          <span>课程代码：{{courseinfo.courseCode}}</span>
          <span>面向专业：{{courseinfo.forProfessional}}</span>
          <span>课程创建者：{{courseinfo.user.nickName}}</span>
          <span>课程创建者：{{courseinfo.user.nickName}}</span>
<!--          <div style="margin-bottom:15px;">-->
<!--            <div style="color:#2c3e50">创建者：</div>-->
<!--            <div style="margin-left:25px;color:darkgray;">{{courseinfo.user.id}}&nbsp;{{courseinfo.user.nickName}}&nbsp;{{courseinfo.user.username}}&nbsp;{{courseinfo.user.roles[0].name}}</div>-->
<!--          </div>-->
          <el-button icon="el-icon-download" @click="download(courseinfo.downloadLink)">下载课程资料</el-button>
        </div>
      </div>
    </div>
    <div class="course-video">
      <span>课程视频：</span>
      <video :src="videoPath" style="height:700px;" controls>
      </video>
    </div>
    <div class="course-ideos">
      <span>思政元素:</span>
      <div v-for="(value) in courseinfo.ideos" class="ideos-content">
        <div style="padding-left:50px;text-align:left;font-weight:bold;">思政融入点:</div>
        <div style="padding-left:80px;text-align:left;">{{value.knowledgePoint}}</div>
        <div style="padding-left:50px;text-align:left;font-weight:bold;">思政内容:</div>
        <div style="padding-left:80px;text-align:left;">{{value.content}}</div>
        <div style="text-align:right;color:darkgray;">创建时间:{{value.createTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.courseinfo = this.$route.query.values
    if (this.$route.query.values.imagePath !== undefined) {
      this.imagePath = this.$route.query.values.imagePath
    } else {
      this.imagePath = require('@/assets/images/background.jpeg')
    }
    if (this.$route.query.values.videoPath !== undefined) {
      // this.videoPath = this.$route.query.values.videoPath
    } else {
      this.videoPath = require('@/assets/test.mp4')
    }
    if (this.$route.query.values.downloadLink !== undefined) {
      this.downloadLink = this.$route.query.values.downloadLink
    }
  },
  data() {
    return {
      courseinfo: {},
      imagePath: '',
      videoPath: '',
      downloadLink: ''
    }
  },
  methods: {
    download(arg) {
      window.open(arg)
    }
  }
}

</script>

<style lang="scss" scoped>
.course {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  width: 100%;
  height: 350px;

  .course-cover {
    display: flex;
    width: 80%;
    border: 1px solid darkgray;
    border-radius: 10px;

    > div {
      width: 100%;
      height: 100%;
    }
    .course-img {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .course-info1 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .course-name {
        width: 95%;
        margin-top: 20px;
        margin-left: 10px;
        border-bottom: 1px solid darkgray;
        text-align: left;
        font-size: 25px;
        font-weight: bold;
      }
      .course-school {
        margin: 10px 0 10px 10px;
      }
      .course-teacher {
        display: flex;
        flex-direction: column;
        width: 95%;
        padding-left: 10px;
        text-align: left;
        background-color: #f1f1f1;
      }
      .course-info2 {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        padding-left: 10px;
        padding-bottom: 15px;

        span {
          margin-bottom: 15px;
          text-align: left;
          color: #2c3e50;
        }
        .download {
          margin-bottom: 20px;
          text-align: left;
          text-decoration: none;
          color: blue;
        }
        .download:visited {
          color: blue;
        }
      }
    }
  }
  .course-video {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-top: 50px;
    padding-bottom: 20px;
    border: 1px solid darkgray;
    border-radius: 10px;

    span {
      margin: 15px 0 15px 15px;
      text-align: left;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .course-ideos {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 100px 0;
    padding-bottom: 250px;

    span {
      margin: 15px 0 15px 15px;
      text-align: left;
      font-size: 20px;
      font-weight: bold;
    }
  }
}

</style>
