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

.nominations-filter
    display: flex
    gap: 20px
    & select
        display: block
        padding: 10px 15px
    & option
        padding: 10px 15px

</style>