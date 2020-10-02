const store = {
    key : null,
    value: null
}

const storeAccessor = {
    set: (key, value) => {store.key = key, store.value = value},
    get: key => {if (store.key === key) return store.value; else return null;},
    clear: () => { store.key = null; store.value = null;}
}

module.exports = storeAccessor;