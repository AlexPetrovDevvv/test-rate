<template>
    <div class="nominations-filter">
        <select name="category" v-model="category">
            <option value="" selected disabled>Выберите категорию</option>
            <option v-for="(item, index) in categories" :key="index" :value="item">{{ item }}</option>
        </select>
        <select v-if="nominations.length !== 0" name="nomination" v-model="nomination">
            <option value="" selected disabled>Выберите номинацию</option>
            <option v-for="(item, index) in nominations" :key="index" :value="item">{{ item }}</option>
        </select>
    </div>
</template>

<script setup>
import { computed, defineModel} from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  nominationsList: {
    type: Array,
    required: true
  }
})

const category = defineModel('category')
const nomination = defineModel('nomination')

const nominations = computed(() => {
  const categoryData = props.nominationsList.find(item => item.title === category.value)
  return categoryData ? categoryData.value : []
})

</script>

<style lang="sass">


.paw-btn
  display: inline-flex
  align-items: center
  justify-content: center
  width: 40px
  height: 40px
  font-size: 30px
  border: none
  border-radius: 8px

  background: transparent
  color: transparent
  opacity: 0
  transition: opacity .2s ease, background-color .2s ease, color .2s ease

.dynamic-template_paw .paw-btn
    &::after
        content: ''
    &:hover, &:focus-visible
        opacity: 1
        background: inherit
        color: #fff
    &:hover::after, &:focus-visible::after
        content: ''



.nominations-filter
    display: flex
    gap: 20px
    & select
        display: block
        padding: 10px 15px
    & option
        padding: 10px 15px

</style>