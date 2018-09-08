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

//Get Todo
$.ajax({
  type: 'GET',
  url : `${base_url}/api/todos`,
  headers: {
      "token": token
  }
})
  .then(todos => {
    if (todos.length === 0) {
      $("table").hide()
      $("#listTodos").append(`
        <h2 class="section-heading text-dark">Relax! you don't have anything to-do</h2>
      `)
    } else {
      todos.forEach(todo => {   
        if (todo.completed == true) {
          todo.completed = 'Done'
        } else {
          todo.completed = 'Undone'
        }
             
        $("#todo").append(`
          <tr>
            <td>${todo.name}</td>
            <td>${todo.description}</td>
            <td>${new Date(todo.dueDate).toDateString()}</td>
            <td id="completed">
              ${todo.completed}
            </td>
            <td id="action">
              <button id="status" onclick="changeStatus()" value="${todo._id}">
                <i class="fas fa-check" value="${todo._id}"></i>
              </button>
            
              <button id="edit" onclick="editTodo()" title="Edit" data-toggle="tooltip" value="${todo._id}">
                  <i class="fas fa-edit" value="${todo._id}"></i>
              </button>
              
              <button id="delete" onclick="deleteTodo()" title="Delete" data-toggle="tooltip" value="${todo._id}">
                  <i class="fas fa-trash-alt" value="${todo._id}"></i>
              </button>
            </td>
          </tr>
        `)
      })
    }
  })
  .catch(err => {
    console.log(err);
  })

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
      console.log(err);
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
      url : `${base_url}/api/todos/${todoId}`,
      headers: {
          "token": token
      }
    })
      .then(() => {
        location.reload()
      })
      .catch(err => {
        console.log(err)
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
        console.log(err);
      })
  }
}