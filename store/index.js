export const state = () => ({
    business: {}
})

export const mutations = {
    SET_BUSINESS(state, business) {
        state.business = business
    },
    RESET_BUSINESS(state) {
        state.business = {}
    }
}

export const  actions = {
    
}