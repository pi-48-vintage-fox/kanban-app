const SERVER = 'http://localhost:3000'

ready();

function login(e) {
  e.preventDefault();
  const email = $('#login-email').val();
  const password = $('#login-password').val();
  $.ajax({
    method: 'POST',
    url: SERVER + '/login',
    data: {
      email, password
    }
  }).done(response => {
    localStorage.setItem("token", response.access_token)
    ready()
  }).fail(err => {
    Swal.fire(err.responseJSON.message)
  })
}

function ready() {
  $(document).ready(() => {
    const token = localStorage.getItem("token")
    if(token) {
      $('#home-page').show();
      $('#landing-page').hide();
    } else {
      $('#home-page').hide();
      $('#landing-page').show();
    }
  })
}

function logout() {
  localStorage.clear();
  ready();
}