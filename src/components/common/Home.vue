<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-side-bar></v-side-bar>
    <div class="content">
      <transition name="move" mode="out-in"><router-view></router-view></transition>
    </div>
  </div>
</template>

<script>
import vHead from './Header'
import vSideBar from './SideBar'
export default {
  name: 'Home',
  components: {
    vHead, vSideBar
  }
}
</script>

<style scoped>

</style>
