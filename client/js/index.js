const base_url = 'http://localhost:3000'

const token = localStorage.getItem('token')

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

$(document).ready(function(){
  
    $(".navbar").load("header.html")
    
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
            $("tbody").append(`
              <tr>
                <td>${todo.name}</td>
                <td>${todo.description}</td>
                <td>${new Date(todo.dueDate).toDateString()}</td>
                <td class="status">${todo.completed}</td>
                <td>
                  <button id="edit" onclick="editTodo()" title="Edit" data-toggle="tooltip" value="${todo._id}">
                      <i class="fas fa-edit"></i>
                  </button>
                  
                  <button id="delete" onclick="deleteTodo()" title="Delete" data-toggle="tooltip" value="${todo._id}">
                      <i class="fas fa-trash-alt"></i>
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
  
})

function deleteTodo() {
  let isTrue = confirm("Are you sure to delete this todo?")
  let id = $("#delete").val()
  
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