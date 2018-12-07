<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move" mode="out-in"><router-view></router-view></transition>
    </div>
  </div>
</template>

<script>
import vHead from './Header'
import vSideba from './SideBar'
export default {
  name: 'Home',
  comments: {
    vHead, vSideba
  }
}
</script>

<style scoped>

</style>
