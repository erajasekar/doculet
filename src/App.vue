<template>

    <div id="app">
        <!--<div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>-->
        <b-navbar toggleable="md" type="dark" variant="primary">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand href="#">DOCULET</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
        <router-view/>
    </div>
</template>

<style lang="stylus">
    //@import 'assets/scss/app.scss';
    @import '~bootstrap/dist/css/bootstrap.css'
    @import '~bootstrap-vue/dist/bootstrap-vue.css'

    #app
    /*    font-family 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        color #2c3e50*/
        height 100%

    html, body
        height: 100%
        width: 100%;

</style>
