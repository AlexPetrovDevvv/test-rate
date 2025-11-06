<template>
  <section class="dynamic-template" :class="{'dynamic-template_paw': magnifer}">
    <div class="container">
      <header class="dynamic-template__header">
        <Button v-if="pageStore.pageState.year !== ''" @click="pageStore.clearPage" text="< Вернуться к годам" />
        <Button v-if="pageStore.pageState.year !== ''" @click="toggleMagnifier" text="Мини-игра" />
        <section-navigation v-if="pageStore.pageState.year !== ''"/>
        <year-list v-if="pageStore.pageState.year === ''"/>
      </header>
      <Page2023 v-if="pageStore.pageState.year === '2023'" :magnifer="magnifer"/>
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
import { ref } from 'vue'

const emit = defineEmits(['magnifer'])
const magnifer = ref(false)

const toggleMagnifier = () => {
  magnifer.value = !magnifer.value
  emit('magnifer', magnifer.value)
}
</script>

<style lang="sass">
.mini-game
  margin-top: 20px
  &__wrap
    position: relative
    display: inline-block
  &__img
    display: block
    max-width: min(720px, 90vw)
    height: auto
    border-radius: 12px
    box-shadow: 0 8px 24px rgba(0,0,0,.12)
  &__hint
    margin-top: 10px
    font-size: 14px
    color: #5A6A85

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
