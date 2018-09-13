<template>
    <nav id="menu">
        <b-list-group>
            <b-list-group-item href="#some-link">Awesome link</b-list-group-item>
            <b-list-group-item href="#" active>Link with active state</b-list-group-item>
            <b-list-group-item href="#">Action links are easy</b-list-group-item>
            <b-list-group-item href="#foobar" disabled>Disabled link</b-list-group-item>
        </b-list-group>
    </nav>
</template>

<script>
    export default {
        name: 'SideNav',
    };
</script>

<style scoped lang="stylus">

    #menu
        padding-top 100px //TODO remove border at right to page

</style>