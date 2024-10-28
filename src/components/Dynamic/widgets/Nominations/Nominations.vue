<template>
    <section class="nominations">
        <nominations-filter v-model:category="nominationsStore.NominationsFilterState.category" v-model:nomination="nominationsStore.NominationsFilterState.nomination " :categories="categoryList" :nominationsList="nominationList"/>
        <div class="nomination" v-if="nominationsStore.NominationsFilterState.category !== '' && nominationsStore.NominationsFilterState.nomination !== ''">
            <h3>Рейтинг каналов {{ nominationsStore.NominationsFilterState.category }}: {{ nominationsStore.NominationsFilterState.nomination }}</h3>
            <div class="nominations-description" v-if="nominationsStore.content !== ''" v-html="nominationsStore.content"></div>
            <nominations-table :title-list="titleList" :value-list="valueList" :title-value-list="titleValueList"/>
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

const titleList = toRef(nominationsStore.titleList )
const valueList = toRef(nominationsStore.valueList )
const titleValueList = toRef(nominationsStore.titleValueList )

watch(() => nominationsStore.NominationsFilterState.nomination, () => {
  console.log('Nomination changed in store:', nominationsStore.NominationsFilterState.nomination);
  nominationsStore.getNominations(nominationsStore.NominationsFilterState.nomination);
});

</script>

<style lang="sass">

</style>
