<template>
    <nav id="menu">
        <div>
            <h4>Documents</h4>
        </div>
        <ul>
            <li><a href="#" class="active">Getting Started.adoc</a></li>
            <li><a href="#">Getting Started2.adoc</a></li>
            <li><a href="#">Getting Started3.adoc</a></li>
        </ul>
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