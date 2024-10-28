<template>
    <header class="header">
        <div class="container">
            <span class="header__logo">veta</span>
            <span class="header__logo header__logo_big">РЮТ</span>
        </div>
    </header>
</template>

<script setup>

</script>

<style lang="sass">
    .header
        padding: 40px 0
        .container
            display: flex
            gap: 50px
        &__logo
            font-weight: 700
            font-size: 36px
            line-height: 32px
            color: #FFFFFF
            &_big
                text-transform: uppercase
</style>