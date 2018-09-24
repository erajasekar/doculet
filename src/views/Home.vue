<template>
    <div class="home" >
        <b-jumbotron header="DOCULET" fluid lead="Easily share beautiful code snippets in your blog, medium articles or in any website" bg-variant="light">

            <b-btn @click="openGettingStarted" variant="success" v-b-tooltip.hover
                   title="Get Started">Get Started</b-btn>
        </b-jumbotron>

        <b-jumbotron header="DOCULET" fluid lead="Easily share beautiful code snippets in your blog, medium articles or in any website" bg-variant="warning">

            <b-btn @click="openGettingStarted" variant="success" v-b-tooltip.hover
                   title="Get Started">Get Started</b-btn>
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
