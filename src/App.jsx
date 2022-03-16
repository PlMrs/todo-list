import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './TodoList.jsx'
import Form from './Form.jsx'
import Loader from './Loader'
import { getTodos, postTodo } from './api'
import { myfilter } from './Filter'
function App() {
  const [allList, setList] = useState([]);
  const [defaultList, setDefaultList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    getTodos().then(res => {
      setDefaultList(res)
      setList(res)
    })
  }, []);
  const filterTodo = (filter) =>{
    const filtered = myfilter(filter, allList)
    console.log(filtered)
    filtered.length === 0 ? setList(currentList => defaultList) : setList(currentList =>  filtered)
  }
  const onTodoCreated = (newTodo) => {
    newTodo.statut = "en cours"
    newTodo.creationDate = new Date()
    postTodo(newTodo).then(res => res.status === 201? getTodos().then(res => setList(res)) : '' );  
  }
  
  setTimeout(()=>{
    setLoaded(true);
  }, 2000)
  return (
    <div>
      <h1 class="site-title">Ma todo</h1>
      <Loader loaded={loaded}></Loader>
      <TodoList  allList={allList} setList={setList} forReload={()=>{getTodos().then(res => setList(res))}} />
      <Form allList={allList} setList={setList} type="addForm" onSubmit={onTodoCreated} />
      <Form allList={allList} defaultList={defaultList} setList={setList} type="filter" onSubmit={filterTodo}/>
    </div>
  )
  
}


export default App
