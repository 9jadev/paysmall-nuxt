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
    updateContacts(state, payload) {
        for (var i in state.contacts) {
            if (state.contacts[i].id == payload.id) {
                state.contacts[i].name = payload.name
                state.contacts[i].email = payload.email
                state.contacts[i].phone = payload.phone
               break; 
            }
        }
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
    updateContacts({ commit }, payload) {
        console.log('actionpayload: ', payload);
        commit('updateContacts', payload);
    },
    updateBusness({ commit }, payload){
        commit('UPDATE_BUSINESS', payload)
        console.log("i just commited")
    },
    updateCon({commit}, payload){
        commit('UPDATECON',payload)
    }
}