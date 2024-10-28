<template>
    <section class="dynamic-template">
        <div class="container">
            <header class="dynamic-template__header">
                <Button v-if="pageStore.pageState.year !== ''" @click="pageStore.clearPage" text="< Вернуться к годам" />
                <section-navigation v-if="pageStore.pageState.year !== ''"/>
                <year-list v-if="pageStore.pageState.year === ''"/>
            </header>
            <Page2023 v-if="pageStore.pageState.year === '2023'"/>
        </div>
    </section>
</template>

<script setup>
import YearList from './entities/Year/YearList.vue';
import SectionNavigation from './entities/Sections/SectionsNavigation/SectionsNavigation.vue';
import Button from './shared/Button/Button.vue';
import { usePageStore } from './store/page.js';
const pageStore = usePageStore()
import Page2023 from './pages/2023/Page2023.vue';
</script>

<style lang="sass">

.dynamic-template
    margin-top: 100px
    .container
        background-color: #EDEFF7
        padding: 100px 20px
        border-radius: 20px
    &__header
        display: flex
        flex-direction: column
        gap: 20px
</style>