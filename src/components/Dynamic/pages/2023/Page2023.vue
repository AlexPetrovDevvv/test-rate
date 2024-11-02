<template>
    <section class="year-sect">
        <h2 class="year-sect__title">{{ title }}</h2>
        <div class="nomination__wrapper" v-if="pageStore.pageState.year !== '' && pageStore.pageState.pageTitle === 'Номинации' ">
            <nominations-menu :categoryList="categoryList" :nominationList="nominationsList" @nomination="requestNomination" @search="requestSearch"/>
            <Nominations :categoryList="categoryList" :nominationList="nominationsList" v-if="table"/>
            <Search v-if="search"/>
        </div>
        <Survey v-if="pageStore.pageState.year !== '' && pageStore.pageState.pageTitle === 'Опрос' "/>
        <Research v-if="pageStore.pageState.year !== '' && pageStore.pageState.pageTitle === 'Исследование' "/>
    </section>
</template>

<script setup>
import { ref , onMounted } from 'vue';
import Nominations from '../../widgets/Nominations/Nominations.vue';
import Search from '../../widgets/Search/Search.vue';
import FeautersList from '../../entities/Feauters/FeautersList.vue';
import Survey from './layout/Survey.vue';
import Research from './layout/Research.vue';
import { usePageStore } from '../../store/page'
import NominationsMenu from '../../widgets/NominationsMenu/NominationsMenu.vue';
import { useNominationsStore } from '../../widgets/Nominations/store/Nominations';
import { useSearchStore } from '../../widgets/Search/store/Search';

const nominationsStore = useNominationsStore()
const searchStore = useSearchStore()

const title = ref('Номинации')
const search = ref(false)
const table = ref(false)

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

function requestNomination(data) {
    nominationsStore.NominationsFilterState.category = data.category
    nominationsStore.NominationsFilterState.nomination = data.nomination
    nominationsStore.getNominations()
    table.value = true
    search.value = false
}

function requestSearch(data) {
    searchStore.getSearch(data)
    search.value = true
    table.value = false
}

onMounted(() => {
    nominationsStore.NominationsFilterState.category = 'Топ-100 каналов'
    nominationsStore.NominationsFilterState.nomination = 'Большие'
    nominationsStore.getNominations()
    table.value = true
})


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