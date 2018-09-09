const base_url = 'http://localhost:3000'

const token = localStorage.getItem('token')

$(document).ready(function(){
  
    $(".navbar").load("header.html")

})

window.fbAsyncInit = function() {
  FB.init({
    appId            : '300152977430583',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.1'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

//CREATE Todo
function inputTodo() {
  let todoName = $("input[name='todoName']").val()
  let todoDesc = $("input[name='todoDesc']").val()
  let dueDate = $("input[name='dueDate']").val()
  
  $.ajax({
    type: 'POST',
    url : `${base_url}/api/todos`,
    headers: {
        "token": token
    },
    data: {
      name: todoName,
      description: todoDesc,
      dueDate: dueDate
    }
  })
    .then(() => {
      location.reload()
    })
    .catch(err => {
      $("#error").text("")
      $("#error").append(`
        <strong>Warning!</strong> ${err.responseText}
      `)
      $("#error").css("display", "block")
    })
}


//CHANGE todo status
function changeStatus() {
  let isTrue = confirm("Are you sure done this todo?")
  let target = event.target
  let todoId = event.target.parentNode.value || event.target.value

  if (isTrue == true) {
    $.ajax({
      type: 'PUT',
      url : `${base_url}/api/todos/${todoId}/changeStatus`,
      headers: {
          "token": token
      }
    })
      .then(() => {
        location.reload()
      })
      .catch(err => {
        console.log(err.responseText)
      })
  }
}


//DELETE todo
function deleteTodo() {
  let isTrue = confirm("Are you sure to delete this todo?")
  let id = event.target.parentNode.value || event.target.value

  if (isTrue == true) {
    $.ajax({
      type: 'DELETE',
      url : `${base_url}/api/todos/${id}`,
      headers: {
          "token": token
      }
    })
      .then(() => {
        location.reload()
      })
      .catch(err => {
        console.log(err.responseText);
      })
  }
}

//GET todo
function getTodo() {
  let id = event.target.parentNode.value || event.target.value
  
  $.ajax({
    type: 'GET',
    url : `${base_url}/api/todos/${id}`,
    headers: {
        "token": token
    }
  })
    .then(todo => {
      $("#todoName").val(todo.name)
      $("#todoDesc").val(todo.description)
      $("#updateBtn").val(todo._id)
    })
    .catch(err => {
      console.log(err.responseText);
    })
}

//EDIT Todo
function editTodo() {
  let id = $(".modal-footer > button[id='updateBtn']").val()
  let name = $("#updateTodo > input[id='todoName']").val()
  let desc = $("#updateTodo > input[id='todoDesc']").val()
  let dueDate = $("#updateTodo > input[id='dueDate']").val()
  
  $.ajax({
    type: 'PUT',
    url : `${base_url}/api/todos/${id}`,
    headers: {
        "token": token
    },
    data: {
      todoName: name,
      todoDesc: desc,
      dueDate: dueDate
    }
  })
    .then(() => {
      location.reload()
    })
    .catch(err => {
      $("#errorUpdate").text("")
      $("#errorUpdate").append(`
        <strong>Warning!</strong> ${err.responseText}
      `)
      $("#errorUpdate").css("display", "block")
    })
}