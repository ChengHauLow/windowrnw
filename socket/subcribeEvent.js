import socketManager from "./hub.js";
let allSubscribers = {};
export const subEvent = (eventName, callback) => {
    socketManager.subscribe(eventName, callback)
    if (!allSubscribers[eventName]) {
        allSubscribers[eventName] = []
    }
    allSubscribers[eventName].push(callback)
}

export const subManyEvents = (listEvents=[]) => {
    listEvents.forEach(event => {
        subEvent(event.name, event.callback)
    })
}

export const unSubEvent = (eventName, type='single') => {
    if(allSubscribers != {} && allSubscribers[eventName]){
        allSubscribers[eventName].forEach(callback => {
            socketManager.unsubscribe(eventName, callback)
        })
        if(type=='single'){
            delete allSubscribers[eventName]
        }
    }
}
export const unSubManyEvent = (eventNameLists, type='single') => {
    if(eventNameLists.length > 0){
        eventNameLists.forEach(eventName => {
            unSubEvent(eventName, type)
        })
    }
}

export const unSubAllEvent = () => {
    for (let i = 0; i < Object.keys(allSubscribers).length; i++) {
        unSubEvent(Object.keys(allSubscribers)[i], 'single')
    }
}