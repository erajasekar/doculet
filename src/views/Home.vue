<template>
    <div class="home" >
        <b-jumbotron id="home-block1" fluid lead=" Easily share and embed code examples in your blog, medium articles or any website.">

            <template slot="header">
                <b-img  width="300" height="100" class="logo" src="https://www.dropbox.com/s/ynub19s42d400a9/Screen%20Shot%202018-09-24%20at%2011.05.46%20PM.png?raw=1" fluid alt="Doculet logo"></b-img>
            </template>

            <b-btn @click="openGettingStarted" variant="success" v-b-tooltip.hover
                   title="Get Started">Get Started</b-btn>
        </b-jumbotron>

        <b-jumbotron id="home-block2" header="What is Doculet?" fluid>

            <p>
                Doculet is a free open source project to easily create, share and embed code examples in your blog, medium articles or any of your website.
            </p>
            <p>
                It’s beautiful  alternative to GitHub Gist to embed code in any website.
            </p>
        </b-jumbotron>


    </div>


</template>

<script lang="ts">
    // TODO remove this if not needed
    import {Component, Vue} from 'vue-property-decorator';
    import Constants from '../utils/constants';

    @Component
    export default class Home extends Vue {
        private openGettingStarted() {
            this.$router.push(`/edit/${Constants.GETTING_STARTED_DOC_GIST_ID}`);
        }
    }
</script>

<style scoped lang="scss">

    @import '../assets/scss/home.scss';

</style>
