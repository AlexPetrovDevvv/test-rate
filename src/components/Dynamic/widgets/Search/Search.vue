<template>
    <section class="search">
        <div class="search__input-box">
            <input type="text" class="search__input" v-model="search">
            <button class="search__button" @click="searchParticipant">Поиск</button>
        </div>
        <ul class="search__list" v-if="searchStore.searchState.list.length !== 0">
            <li class="search__item" v-for="(item, index) in searchStore.searchState.list" :key="index">
                    <h3 class="search__item-title">{{ item.title }}</h3>
                    <nominations-table :title-list="item.columns" :value-list="item.participant" :title-value-list="item.titleList"/>
            </li>
        </ul>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    import NominationsTable from '../../entities/Nominations/NominationsTable/nominationsTable.vue';
    import { useSearchStore } from './store/Search';

    const searchStore = useSearchStore()
    const search = ref('')

    function searchParticipant() {
        searchStore.getSearch(search.value)
    }

</script>

<style lang="sass">

.search
    margin-top: 20px
    &__input
        display: block
        max-width: 200px
        width: 100%
        padding: 10px 15px
        font-size: 18px
        border-radius: 10px
        border: 2px solid var(--blue)
        &-box
            display: flex
            align-items: center
            gap: 10px
    &__button
        display: block
        padding: 10px 15px
        font-size: 18px
        border-radius: 10px
        border: 2px solid var(--blue)
        cursor: pointer
    &__item
        margin-top: 50px
        &-title
            color: var(--blue)
            font-size: 18px
            font-style: normal
            font-weight: 600
</style>