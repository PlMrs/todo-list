import axios from "axios";

//Todos
export async function getTodos(){
   const {data} = await axios.get('http://localhost:5000/api/todos/')
   return data;
}

export async function postTodo(todo){
  const response = await axios.post('http://localhost:5000/api/todos/', todo)
  return response
}

export async function deleteTodo(id: number){
    const response = await axios.delete(`http://localhost:5000/api/todos/${id}`)
    return response
}
export async function updateTodo(todo){
    const res = await axios.put(`http://localhost:5000/api/todos/${todo.id}`, todo)
    return res
}

//Labels
export async function getLabels(){
    const {data} = await axios.get('http://localhost:5000/api/labels/')
    return data;
}