export const state = () => ({
    business: {}
})

export const mutations = {
    SET_BUSINESS(state, business) {
        state.business = business
    },
    RESET_BUSINESS(state) {
        state.business = {}
    },
    UPDATE_BUSINESS(state, payload) {
        Object.assign(state.business, payload);
    }
}

export const  actions = {
    updateBusness({ commit }, payload){
        commit('UPDATE_BUSINESS', payload)
        // this.$axios.setHeader('Accept', 'application/json') 
        // this.$axios.put(`/businesses/${payload.id}`, payload).then((res)=> {
        // //    console.log(res.data.business)
        //     // this.dialog = true
        // }).catch((error) => {
        //     console.log(error.response.data);
        //     this.errors = error.response.data
        //     this.errorsnackbar = true
        //     this.errormess = error.response.data.message
        //     this.loading = false
        // })  
        console.log("i just commited")
    }
}