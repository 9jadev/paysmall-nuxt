export const state = () => ({
    business: [],
    contacts: []
})

export const getters = {
    contactlist: (state) => {
        let num = 1;
        let contact = [];
        let Scontact = state.contacts;
        Scontact.forEach(element => {
            element.did = num;
            contact.unshift(element);
            num++;
        });
      return Scontact;
    }
}
export const mutations = {
    SET_BUSINESS(state, business) {
        state.business = business
    },
    SET_CONTACT(state, contacts) {
        state.contacts = contacts
    },
    RESET_BUSINESS(state) {
        state.business = {}
    },
    UPDATE_BUSINESS(state, payload) {
        Object.assign(state.business, payload);
    },
    UPDATECON(state, payload){
        // console.log(payload)
        state.contacts.unshift(payload);
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
    },
    updateCon({commit}, payload){
        commit('UPDATECON',payload)
    }
}