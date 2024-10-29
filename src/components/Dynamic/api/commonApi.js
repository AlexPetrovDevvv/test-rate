const routes = {
    big: '/data/t50CommonChannelsBig.json',
    involved: '/data/t50CommonChannelsInvolved.json',
    cited: '/data/t50CommonChannelsCitited.json'
}


async function getCommonBigCannels() {
    const response = await fetch(routes.big)
    const data = await response.json()
    return data
}


async function getCommonInvolvedCannels() {
    const response = await fetch(routes.involved)
    const data = await response.json()
    return data
}


async function getCommonCitedCannels() {
    const response = await fetch(routes.cited)
    const data = await response.json()
    return data
}



export { getCommonBigCannels, getCommonInvolvedCannels, getCommonCitedCannels }