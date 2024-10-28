import { defineStore } from "pinia"
import { ref, reactive, computed } from "vue"

export const usePageStore = defineStore('page', () => {
    const pageState = reactive({
        year: '',
        pageTitle: '',
    })

    function clearPage() {
        pageState.year = ''
        pageState.pageTitle = ''
    }

    function setPageYear(year) {
        pageState.year = year
    }

    function setPageTitle(title) {
        pageState.pageTitle = title
    }

    return { pageState, clearPage, setPageYear, setPageTitle }
  })