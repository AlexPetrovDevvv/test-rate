import { defineStore } from "pinia"
import { ref, reactive, shallowReactive } from "vue"
import { topApi } from "@/components/Dynamic/api"

export const useNominationsStore = defineStore('Nominations', () => {
    const NominationsFilterState = reactive({
        category: '',
        nomination: '',
    })

    const valueList = reactive([]);
    const titleList = reactive([]);
    const titleValueList = reactive([]);
    const content = ref('')

    async function getNominations(params) {
        const data = await topApi(params)
        console.log(data)
        // Изменяем содержимое массивов
        titleList.splice(0, titleList.length, ...data.columns)
        valueList.splice(0, valueList.length, ...data.participants)
        titleValueList.splice(0, titleValueList.length, ...data.titleList)
        console.log('titleList:',titleList)
        console.log('valueList:',valueList)
        console.log('titleValueList:',titleValueList)
        // Обновляем content
        content.value = data.content
    }

    return {
        NominationsFilterState,
        valueList,
        titleList,
        titleValueList,
        content,
        getNominations
    }
})