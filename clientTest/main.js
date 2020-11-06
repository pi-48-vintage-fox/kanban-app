const SERVER = "http://localhost:3000"

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
  
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  
  $.ajax({
      method: "POST",
      url: SERVER + "/googleLogin",
      data: {
        google_access_token: id_token
      }
  })
  .done(response => {
    console.log(response);
  })
  .fail(err => {
      console.log(err);
  })
}

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    pageName: "row-content",
    user: {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      
      axios({
        method: "POST",
        url
      })
    }
  }


})