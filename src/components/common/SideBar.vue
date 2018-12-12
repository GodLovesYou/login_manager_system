<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
        <el-submenu index="userCenter">
          <template slot="title"><i class="el-icon-setting"></i>设置</template>
          <el-menu-item v-for="(subItem,i) in items" :key="i" :index="subItem.index">{{subItem.title}}</el-menu-item>
        </el-submenu>
        <el-menu-item index="readme">
          <i class="el-icon-setting"></i>简介
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'v-sidebar',
  data () {
    return {
      items: [
        {
          index: 'upload',
          title: '文件上传'
        },
        {
          index: 'modifyUser',
          title: '修改用户'
        },
        {
          index: 'modifyPassword',
          title: '修改密码'
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style scoped>
  .sidebar{
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom:0;
    background: #2E363F;
  }
  .sidebar > ul {
    height:100%;
  }
</style>
