<template>
    <footer class="footer">My footer</footer>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class BottomFooter extends Vue {

    }
</script>

<style scoped lang="stylus">

    footer
        height 30px
        width 100%
        background-color #0A2A66
        color white
        display block

</style>