 

import VuexPersistence from 'vuex-persist' 
export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
    /* your options */
      reducer: state => ({
        business: state.business,
        contacts: state.contacts   
      })
    }).plugin(store);
  });
}