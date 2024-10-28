<template>
    <section class="year-sect">
        <h2>{{ title }}</h2>
        <Nominations :categoryList="categoryList" :nominationList="nominationsList"/>
    </section>
</template>

<script setup>
import { ref, shallowReactive } from 'vue';
import Nominations from '../../widgets/Nominations/Nominations.vue';

const title = ref('Номинации')

const categoryList = ['Топ-100']

const nominationsList = [
    {
        title: 'Топ-100',
        value: ['Большие каналы', 'Цитируемые каналы', 'Вовлеченные каналы']
    }
]
</script>

<style lang="sass">

</style>