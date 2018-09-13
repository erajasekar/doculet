<template>

    <div id="app">
        <Slideout :touch="true" :toggleSelectors="['.toggle-button']" @on-open="onSideMenuOpen">
            <side-nav></side-nav>
            <nav-header></nav-header>
            <main id="panel">
                <router-view/>
            </main>
        </Slideout>

    </div>
</template>
<script lang="ts">

    import NavHeader from '@/components/NavHeader.vue';
    import SideNav from '@/components/SideNav.vue';
    import {Component, Vue} from 'vue-property-decorator';
    import Slideout from 'vue-slideout';

    @Component({
        components: {
            NavHeader,
            Slideout,
            SideNav,
        },
    })
    export default class App extends Vue {
        private onSideMenuOpen() {
            // console.log("open event");
        }
    }
</script>

<style lang="scss">

    @import 'assets/scss/app.scss';
    @import 'assets/css/slideout.css';

    //  @import '~bootstrap/dist/css/bootstrap.css'
    //  @import '~bootstrap-vue/dist/bootstrap-vue.css'

    #app {
        height: 100%;
        > div {
            height: 100%;
            width: 100%;
        }
    }

    #panel {
        height: 100%;
        width: 100%;
    }

    #menu {
        padding-top: 100px;
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

