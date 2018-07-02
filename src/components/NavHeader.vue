<template>

    <b-navbar toggleable="md" type="dark" variant="info" class="navbar-custom"> <!--TODO navbar-custom not used -->

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#"><b>DOCULET</b></b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav >

                <b-dropdown variant="info">
                    <template slot="button-content">
                        <icon name="folder-open"></icon>
                    </template>
                    <b-dropdown-item to="/gist/096f94513f6201d3f308ccdf295b9557"><icon name="file-alt"></icon> New Document </b-dropdown-item> <!-- TODO: Active links get white background -->
                    <b-dropdown-item @click="importGist"><icon name="brands/github-square"></icon> Import From Github</b-dropdown-item>
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

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class NavHeader extends Vue {
        private importGist() {

            this.$router.push('/gist/b2e7c4bdedf6e9da27fef0faa3efad0e');
        }
    }
</script>

<style scoped>

</style>