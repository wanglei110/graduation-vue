<template>
  <div class="course">
    <div class="course-cover">
      <div class="course-img">
        <img :src="imagePath" />
      </div>
      <div class="university">
        <span>{{value.academy}}</span>
      </div>
    </div>
    <div class="course-info">
      <span class="course-name">{{value.courseName}}</span>
      <div class="course-teacher">
        <span>教学小组：</span><span>{{value.teachingGroup}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  created() {
    if (this.$props.value.imagePath !== undefined) {
      this.imagePath = this.$props.value.imagePath
    } else {
      this.imagePath = require('@/assets/images/background.jpeg')
    }
  },
  data() {
    return {
      imagePath: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.course {
  width: 325px;
  height: 250px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .course-cover {
    position: relative;
    height: 70%;

    .course-img {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .university {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0 ,0, 50%);

      span {
        display: flex;
        margin-left: 15px;
        color: white;
      }
    }
  }

  .course-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 30%;
    margin-left: 15px;

    .course-name {
      margin-top: 10px;
      font-size: 20px;
      font-weight: bold;
    }
    .course-teacher {
      margin-top: 5px;
      font-size: 14px;
      color: darkgray;
    }
  }
}
.course:hover {
  cursor: pointer;
}
</style>
