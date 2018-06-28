<template>

    <div id="app">
        <!--<div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>-->
        <nav-header></nav-header>
        <router-view/>
    </div>
</template>

<script lang="ts">

    import NavHeader from '@/components/NavHeader.vue'; // @ is an alias to /src

    export default {
        name: 'app',
        components: {
            NavHeader,
        },
    };
</script>

<style lang="scss">
    @import 'assets/scss/app.scss';

  //  @import '~bootstrap/dist/css/bootstrap.css'
  //  @import '~bootstrap-vue/dist/bootstrap-vue.css'

    #app {
        height :100%;
    }
    /*    font-family 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        color #2c3e50*/


    html, body {
        height: 100%;
        width: 100%;
    }

</style>
