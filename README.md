# todo-fancy

List of User routes:

|        ROUTE       | HTTP   | DESCRIPTION                 |
|:------------------:|--------|-----------------------------|
| /api/users/login-fb   | POST   | Login                       |
  
List of Todo routes:
  
| ROUTE              | HTTP   | DESCRIPTION    |
|--------------------|--------|----------------|
| /api/todos         | GET    | List all todos |         
| /api/todos         | POST   | Add a new todo |
| /api/todos/:todoId | GET    | Get a todo     |
| /api/todos/:todoId | PUT    | Edit a todo    |
| /api/todos/:todoId/changeStatus | PUT    | Change todo Status    |
| /api/todos/:todoId | DELETE | Delete a todo  |
  
Usage: 
```
server-side:
npm install
npm start

client-side:
live-server
```