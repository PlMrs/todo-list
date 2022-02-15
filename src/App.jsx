import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoList from './TodoList.jsx'
import Form from './Form.jsx'
import baseList from './todo-list.json'
import Filter from './Filter.jsx'

function App() {
  const [allList, setList] = useState(baseList);
  useEffect(()=>{
    if(localStorage.getItem('data')){
      setList(JSON.parse(localStorage.getItem('data')))
    }
  }, []);
  useEffect(()=>{
    localStorage.setItem('data', JSON.stringify(allList));
  }, [allList]);

  return (
    <div>
      <TodoList  allList={allList} setList={setList} />
      <Form allList={allList} setList={setList} type="addForm" />
      <Form allList={allList} setList={setList} type="filter" />
    </div>
  )
  
}


export default App
