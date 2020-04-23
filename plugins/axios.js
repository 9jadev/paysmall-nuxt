export default function ({ $axios, redirect }) {
    $axios.onError(error => {
      if(error.response.status === 422) {
        // redirect('/sorry')
        console.log('errrrrrrrrrrrrrrrrrrrrrr');
      }
    })
  }