import {getBigCannels, getInvolvedCannels, getCitedCannels} from './topApi'

async function topApi(params) {
    switch (params) {
        case 'Большие каналы':
            return await getBigCannels()
        case 'Цитируемые каналы':
            return await getCitedCannels()
        case 'Вовлеченные каналы':
            return await getInvolvedCannels()
    }
}

export {topApi}