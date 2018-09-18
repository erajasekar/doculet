<template>

    <div id="app">
        <Slideout v-if="!isViewPage" :touch="true" :toggleSelectors="['.toggle-button']" @on-open="onSideMenuOpen" @on-close="onSideMenuClose">
            <side-nav></side-nav>
            <nav-header :isMenuOpen="isMenuOpen"></nav-header>
            <main id="panel">
                <router-view/>
            </main>
        </Slideout>
        <div v-else>
            <main id="panel">
                <router-view/>
            </main>
        </div>
    </div>
</template>
<script lang="ts">

    import NavHeader from '@/components/NavHeader.vue';
    import SideNav from '@/components/SideNav.vue';
    import {Component, Vue} from 'vue-property-decorator';
    import Slideout from 'vue-slideout';
    import {isViewPage} from './utils/auth';

    @Component({
        components: {
            NavHeader,
            Slideout,
            SideNav,
        },
    })
    export default class App extends Vue {
        private isMenuOpen: boolean = false;
        private onSideMenuOpen() {
            this.isMenuOpen = true;
        }
        private onSideMenuClose() {
            this.isMenuOpen = false;
        }

        get isViewPage() {
            return isViewPage(this.$route.path);
        }
    }
</script>

<style lang="scss">

    @import 'assets/scss/app.scss';
    @import 'assets/scss/sidenav.scss';

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

    html, body {
        height: 100%;
        width: 100%;
    }
</style>

