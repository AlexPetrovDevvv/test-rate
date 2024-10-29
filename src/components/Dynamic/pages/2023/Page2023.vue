<template>
    <section class="year-sect">
        <h2 class="year-sect__title">{{ title }}</h2>
        <div class="nomination__wrapper" v-if="pageStore.pageState.year !== '' && pageStore.pageState.pageTitle === 'Номинации' ">
            <FeautersList/>
            <Nominations :categoryList="categoryList" :nominationList="nominationsList" v-if="pageStore.pageState.feauters === 'table'"/>
            <Search v-if="pageStore.pageState.feauters === 'search'"/>
        </div>
        <Survey v-if="pageStore.pageState.year !== '' && pageStore.pageState.pageTitle === 'Опрос' "/>
        <Research v-if="pageStore.pageState.year !== '' && pageStore.pageState.pageTitle === 'Исследование' "/>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import Nominations from '../../widgets/Nominations/Nominations.vue';
import Search from '../../widgets/Search/Search.vue';
import FeautersList from '../../entities/Feauters/FeautersList.vue';
import Survey from './layout/Survey.vue';
import Research from './layout/Research.vue';
import { usePageStore } from '../../store/page'
const title = ref('Номинации')

const pageStore = usePageStore()

const categoryList = ['Топ-100 каналов', 'Топ-50 корпоротивных каналов', 'Топ-50 личных каналов', 'Топ-50 общих каналов']
const nominationsList = [
    {
        title: 'Топ-100 каналов',
        value: ['Большие', 'Цитируемые', 'Вовлеченные']
    },
    {
        title: 'Топ-50 корпоротивных каналов',
        value: ['Большие', 'Цитируемые', 'Вовлеченные']
    },
    {
        title: 'Топ-50 личных каналов',
        value: ['Большие', 'Цитируемые', 'Вовлеченные']
    },
    {
        title: 'Топ-50 общих каналов',
        value: ['Большие', 'Цитируемые', 'Вовлеченные']
    }
]
</script>

<style lang="sass">

.year-sect
    margin-top: 50px
    &__title
        color: var(--blue)
        font-size: 36px

.title
    font-size: 24px
    font-style: normal
    font-weight: 600
    line-height: 130%
    color: var(--blue)

.text
    margin-top: 20px
    font-size: 18px
    color: var(--blue)
    line-height: 130%
    & p
        &:not(:first-child)
            margin-top: 20px


</style>