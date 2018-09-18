<template>
    <div >
        <div class="view-pane" v-highlightjs="compiledHtml"/>
    </div>
</template>

<script lang="ts">
    // TODO clean up unused dependencies
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {AsciiDoc} from '../asciidoc';
    import ghs from '../services/GitHubService';
    import {
        Getter,
        Action,
    } from 'vuex-class';
    import {DoculetDoc} from '../store/modules/doculet';
    import {FireStoreService} from '../services/FireStoreService';
    import * as User from '../store/modules/user';
    import {logWarn, logInfo} from '../utils/logger';
    import Constants from '@/utils/constants';

    @Component({
        props: {
            gistId: String,
        },
    })
    export default class DocView extends Vue {

        get compiledHtml() {
            return '<h1>Hello World</h1>';
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

    @import "../assets/css/highlightjs/idea.css"
    @import "../assets/css/colony.css"
   
    .view-pane
        height 100%
        width 100%
        
</style>
