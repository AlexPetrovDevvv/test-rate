<template>
    <div class="nominations-menu">
        <nominations-filter v-model:category="table.category" v-model:nomination="table.nomination" :categories="categoryList" :nominationsList="nominationList"/>
        <span class="nominations-menu__or">или</span>
        <input placeholder="Введите название канала" type="text" class="nominations-menu__search" v-model="search">
        <div class="nominations-meut__button-wrapper">
            <button class="nominations-menu__button" v-if="table.category === '' && table.nomination === '' && search !== '' " @click="searchParticipant">Найти канал</button>
            <button class="nominations-menu__button" v-if="search === '' && table.category !== '' && table.nomination !== ''" @click="requestNomination">Запросить номинацию</button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import NominationsFilter from '../../feauters/Nominations/NominationsFilter/NominationsFilter.vue';

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

const emit = defineEmits(['search', 'nomination'])

const table = ref({
    category: '',
    nomination: ''
})
const search = ref('')
let debounceTimer = null;

const searchParticipant = () => {
    emit('search', search.value)
}

const requestNomination = () => {
    emit('nomination', table.value)
}

watch(search, (newVal) => {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    // Устанавливаем новый таймер
    debounceTimer = setTimeout(() => {
        if(newVal !== '') {
            table.value.category = ''
            table.value.nomination = ''
        }
    }, 500); // Задержка в 500 мс
})

watch(() => table.value, () => {
    if(table.value.category !== '' && table.value.nomination !== '') {
        search.value = ''
    }
}, {deep: true})

</script>

<style lang="sass">

.nominations-menu
    display: flex
    align-items: center
    gap: 40px
    &__or
        color: var(--blue)
        font-size: 18px
        font-style: normal
        font-weight: 400
        line-height: 144%
    &__search
        display: block
        max-width: 300px
        width: 100%
        padding: 10px 15px
        font-size: 18px
        border-radius: 10px
        border: 2px solid var(--blue)
    &__button
        display: block
        padding: 10px 15px
        font-size: 18px
        border-radius: 10px
        border: 2px solid var(--blue)
        cursor: pointer
</style>