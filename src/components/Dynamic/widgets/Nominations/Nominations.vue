<template>
    <section class="nominations">
        <nominations-filter v-model:category="nominationsStore.NominationsFilterState.category" v-model:nomination="nominationsStore.NominationsFilterState.nomination " :categories="categoryList" :nominationsList="nominationList"/>
        <div class="nomination" v-if="nominationsStore.NominationsFilterState.category !== '' && nominationsStore.NominationsFilterState.nomination !== ''">
            <h3 class="nomination__title">{{ nominationsStore.NominationsFilterState.category }}: {{ nominationsStore.NominationsFilterState.nomination }}</h3>
            <div class="nominations__description-wrapper" v-if="nominationsStore.content !== ''" v-html="nominationsStore.content"></div>
            <nominations-table :title-list="nominationsStore.titleList" :value-list="nominationsStore.valueList" :title-value-list="nominationsStore.titleValueList"/>

            <button class="nomination__button" @click="nominationsStore.loadMoreItems" v-if="nominationsStore.hasMore">Загрузить еще</button>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, watch, toRef } from 'vue';
import NominationsTable from '../../entities/Nominations/NominationsTable/nominationsTable.vue';
import NominationsFilter from '../../feauters/Nominations/NominationsFilter/NominationsFilter.vue';
import { useNominationsStore } from './store/Nominations.js';

const props = defineProps({
    categoryList: {
        type: Array,
        required: true
    },
    nominationList: {
        type: Array,
        required: true
    }
})

const nominationsStore = useNominationsStore()

watch(() => nominationsStore.NominationsFilterState, () => {
  console.log('Nomination changed in store:', nominationsStore.NominationsFilterState.nomination);
  nominationsStore.getNominations();
}, {deep: true});

</script>

<style lang="sass">

.nominations
    margin-top: 20px
    &__description
        color: var(--blue)
        font-size: 18px
        font-style: normal
        font-weight: 600
        line-height: 130%
        &-wrapper
            margin-top: 20px
            display: grid
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
            gap: 50px
        & p
            max-width: 600px
            &:not(:first-child)
                margin-top: 20px

.curator-section
    display: block
    & img
        display: block
        width: 160px
        height: 160px
        object-fit: cover

.curator-name
    margin-top: 20px
    color: var(--blue)
    font-size: 24px
    font-style: normal
    font-weight: 400
    line-height: 130%
    margin-top: 20px
    span
        font-weight: 600

.nomination
    margin-top: 20px
    &__title
        color: var(--blue)
        font-size: 24px
        font-style: normal
        font-weight: 600
        line-height: 130%
    &__button
        margin: 0px auto
        display: block
        margin-top: 20px
        width: fit-content
        border: none
        background: none
        color: var(--blue)
        border: 1px solid var(--blue)
        padding: 15px 20px
        border-radius: 6px
        font-size: 18px
        font-weight: 500
        cursor: pointer

</style>
