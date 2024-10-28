const routes = {
    big: '/data/top100BigChannels.json',
    involved: '/data/top100ChannelsInvolved.json',
    cited: '/data/top100CitedChannels.json'
}


async function getBigCannels() {
    const response = await fetch(routes.big)
    const data = await response.json()
    return data
}


async function getInvolvedCannels() {
    const response = await fetch(routes.involved)
    const data = await response.json()
    return data
}


async function getCitedCannels() {
    const response = await fetch(routes.cited)
    const data = await response.json()
    return data
}



export { getBigCannels, getInvolvedCannels, getCitedCannels }