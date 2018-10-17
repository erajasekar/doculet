<template>
    <div class="about">

        <vue-headful
                :title="title"
                :description="description"
                :keywords="keywords"
                url="https://doculet.net/about"
        />

        <b-jumbotron id="about-container" header="About Doculet" fluid
                     lead="Doculet is my side project and my goal to create an app to easily share and embed code examples on any website.">

            <h2>
                Why am I building this project?
            </h2>

            <p>
                When I was writing technical in articles in Medium, I couldn't find best tool to embed code examples.
                Medium's code block doesn't support syntax highlighting and Github gists was the only other option.
                Gists are ok, but we can't customize syntax highlight theme. Also, I wasn't happy with using standard code comments to explain the code.
            </p>
            <p>   
                I was looking for something better and I found that AsciiDoc supports annotating code with callouts.

                I abolutely loved it. In fact, I used a screen shot of AsciiDoc output in one of
                <a href="https://medium.freecodecamp.org/better-exception-handling-in-java-8-streams-using-vavr-6eda31285ce9"> my article</a>.
            </p>
            <p>
                Meanwhile, I wanted to develop my front-end programming skills and I got excited about <a href="https://vuejs.org/">VueJs</a>.
                Voila! The idea for Doculet project was born.
            </p>
            <h2>
                Github Integration
            </h2>
            <p>
                As most people currently use Gists to embed code, I am making it to work easily with Github. 
                Gists can be imported and are automatically converted AsciiDoc format. 
                When you save they are also saved as new gist in AsciiDoc format. The original imported Gist will be untouched.
            </p>
            <hr/>
            <h2>
                FAQ
            </h2>
            <h4>
                Is Doculet free to Use?
            </h4>
            <p> 
                Yes. Doculet is free to use and also code is <a href="https://github.com/erajasekar/doculet">open sourced</a>. Your contributions are welcome. 
            </p>
            <h4>
                Why documents are saved as Gists?
            </h4>
            <p>
                Since It's free I want to reduce the hosting cost. So I am just using Github's free Gist support. 
            </p>
            <h4>
                Why do I need to grant write access to Gist?
            </h4>
            <p>
                Because when you save, application has to write documents as Gists. 
            </p>
            <h4>
                I don't have Github account. Can I still use Doculet?
            </h4>
            <p>
                No, currently Doculet works only with Github. So signup for free Github account to use Doculet. 
                If you really need support for other cloud sources like Dropbox or Google drive, contact me
                by submiting issue in <a href="https://github.com/erajasekar/doculet/issues"> Github project.</a> 
                I can think about adding support if there is enough interest.
            </p>
            <h4>
                Why not use standard Markdown instead of AsciiDoc ?
            </h4>
            <p>
                AsciiDoc supports comment callouts and syntax is very similar to Markdown. 
                So if you are already familar with Markdown, it's really easy to use AsciiDoc.
            </p>
            <h4>
                When will it be ready for use?
            </h4>
            <p>
                You can use it today, if you are able to use iframes in your website or blog. I am currently working to make 
                it embedable in Medium. I will also make it easily work with other popular blogging platforms. 
                Please subscribe to <a href="http://eepurl.com/dI-8Ur" target="_blank"> email list </a> to stay tuned.
            </p>
            <p>
                Also, the app is currently in beta, so if you find any bugs, please submit issue in 
                <a href="https://github.com/erajasekar/doculet/issues"> Github. </a>

            </p>
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
    @import '../assets/scss/view';
</style>
