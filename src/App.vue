<template>

    <div id="app">
        <!--<div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>-->
        <b-navbar toggleable="md" type="dark" variant="info" class="navbar-custom"> <!--TODO navbar-custom not used -->

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand href="#"><b>DOCULET</b></b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav >

                    <b-dropdown variant="info">
                        <template slot="button-content">
                            <icon name="folder-open"></icon>
                        </template>
                        <b-dropdown-item to="/"><icon name="file-alt"></icon> New Document </b-dropdown-item> <!-- TODO: Active links get white background -->
                        <b-dropdown-item href="#"><icon name="brands/github-square"></icon> Import From Github</b-dropdown-item>
                    </b-dropdown>

                </b-navbar-nav>

                <b-navbar-nav >

                    <b-dropdown variant="info">
                        <template slot="button-content">
                            <icon name="save"></icon>
                        </template>
                        <b-dropdown-item href="#"><icon name="brands/github-square"></icon> Save to Github</b-dropdown-item>
                    </b-dropdown>

                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item right><router-link to="/about">About</router-link></b-nav-item>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
        <router-view/>
    </div>
</template>

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
