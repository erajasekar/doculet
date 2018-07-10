<template>

    <b-navbar toggleable="md" type="dark" variant="info" class="navbar-custom"> <!--TODO navbar-custom not used -->

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/"><b>DOCULET</b></b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav >

                <div>
                    <b-input-group prepend="Import" >
                       <!-- <b-input-group-prepend>
                            <b-btn  variant="light"><icon name="link"></icon></b-btn>
                        </b-input-group-prepend>-->

                        <b-form-input type="url" placeholder="GitHub Gist Id or URL" v-model="importUrl" @keyup.enter.native="importGist"></b-form-input>

                        <b-input-group-append>
                            <b-btn @click="importGist" v-b-tooltip.hover title="Import from GitHub"><icon name="link"></icon></b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </div>
            </b-navbar-nav>

            <b-navbar-nav>

                <b-btn to="/gist/bc5886868012a678eed572c4aa19a2b8" variant="info" v-b-tooltip.hover title="New Document"><icon name="file-alt"></icon></b-btn>

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
                 <b-btn @click="login" v-b-tooltip.hover title="Login">Login</b-btn>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import ghs from '../services/GitHubService';
    import firebase from 'firebase';

    @Component
    export default class NavHeader extends Vue {

        private importUrl: string = '';

        private importGist() {

            const gistId = ghs.parseUrl(this.importUrl);

            if (gistId != null) {
                this.$router.push('/gist/' + gistId);
            }

        }

        private login(){
            firebase.auth().createUserWithEmailAndPassword("raja@test.com", "test1234").then(
                (user) => {
                    console.log(user);
                    this.$router.replace('about');
                },
                (err) => {
                    alert('Oops. ' + err.message);
                }
            );
        }
    }
</script>

<style scoped>

</style>