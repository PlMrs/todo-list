import { useEffect, useState } from "react";
import label from './label.json'

  function TodoList({allList,setList}){
    function toggleStatut(id,todo){
      const statut = todo.statut === "En cours" ? 'Terminé' : 'En cours'
      setList(todos => ({...todos, [id]: {...todo, statut }}))
    }  
    function getStyleTodo(list){
      if(list.statut === "En cours"){
        return "enCours";
      }else if(list.statut === "Terminé"){
        return "terminé";
      }
    }
    const removeList = (listToRemove) => {
      setList(Object.values(allList).filter(list => list.creationdate !== listToRemove.creationdate))
    }
      return <div className="todo-list">
        <ul>
         {Object.entries(allList).map(([id,todo]) => <li key={todo.creationdate}>
           <ul>
             <li className="row-color"><p><span>Date de création : </span>{todo.creationdate}</p></li>
             <li className="row-color2">Titre : {todo.titre}</li>
             <li className="row-color">Catégorie : {label[todo.labelId].titre}</li>
             <li className="row-color2">Description : <br/>{todo.description}</li>
             <li className="row-color">Deadline : {todo.dueDate}</li>
           </ul>
           <ul>
              <li className="check"><p onClick={() => toggleStatut(id,todo)} className={getStyleTodo(todo)}>{todo.statut}</p></li>
              <li className="delete"><p onClick={() => removeList(todo)}>Supprimer</p></li>
            </ul>
         </li> )}
      </ul>
      </div>
  }

  export default TodoList;