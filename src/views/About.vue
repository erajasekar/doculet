<template>
    <div class="about">

        <vue-headful
                :title="title"
                :description="description"
                :keywords="keywords"
        />

        <b-jumbotron id="about-block1" header="About Doculet" fluid
                     lead="I am working on Doculet as side project and my goal to make it easier share and embed code examples for any website.">

            <h2>
                Why am I building this project?
            </h2>

            <p>
                When I was writing technical in articles in Medium, I couldn't find good solution to embed code examples other than Github gists.
                Gists work fine, we can't customize syntax highlight theme. Also, I wasn't happy with using standard code comments to explain the code examples.
                I was searching for something better and I found that AsciiDoc supports annotating code with callouts

                I abolutely loved it. In fact, I used a screen shot of AsciiDoc output in one of
                <a href="https://medium.freecodecamp.org/better-exception-handling-in-java-8-streams-using-vavr-6eda31285ce9"> my blog post</a>.
            </p>
            <p>

                Meanwhile, I wanted to develop my front-end programming skills and got excited about <a href="https://vuejs.org/">VueJs</a>.
                So this idea of creating a VueJs App to easily embed code is born!
            </p>
            <h2>
                Github Integration
            </h2>

            <h2>
                FAQ
            </h2>
            <h4>
                Is Doculet free to Use?
            </h4>
            <h4>
                Where are my documents saved?
            </h4>
            <h4>
                Why do I need to grant write Gist permission?
            </h4>
            <h4>
                I don't have Github account. What should I do?
            </h4>
            <h4>
                Why not use standard markdown instead of AsciiDoc ?
            </h4>
            <h4>
                When will it be ready for use?
            </h4>
        </b-jumbotron>

        <bottom-footer></bottom-footer>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Constants from '../utils/constants';
    import BottomFooter from '@/components/BottomFooter.vue';

    @Component({
        components: {
            BottomFooter,
        },
    })
    export default class About extends Vue {

        private title = 'About Doculet';
        private description = Constants.DOCULET_DESCRIPTION;
        private keywords = Constants.DOCULET_SEO_KEYWORDS;
    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/about.scss';
</style>
