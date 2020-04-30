<template>
  <div class="main-box">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <!-- <Footer /> -->
  </div>
</template>

<script>
// import Footer from "./public/Footer";
import Header from "./header/index.vue";
export default {
  name: "mains",
  components: {
    // Footer,
    Header
  }
};
</script>

