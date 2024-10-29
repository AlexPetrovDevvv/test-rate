import { defineStore } from "pinia"
import { ref, reactive, shallowReactive } from "vue"
import { searchApi } from "@/components/Dynamic/api"


export const useSearchStore = defineStore('Search', () => {

    const searchState = reactive({
        search: '',
        list: [],
    })

    async function getSearch(search) {
        const data = await searchApi(search)
        searchState.list.splice(0, searchState.list.length, ...data)
    }

    return {
        searchState,
        getSearch
    }
})