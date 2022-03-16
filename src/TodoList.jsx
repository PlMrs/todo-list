import { useEffect, useState } from "react";
import { deleteTodo, getLabels, updateTodo } from "./api";
import Form from './Form.jsx'
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

  function TodoList({allList,setList, forReload}){

    const [allLabels, setLabels] = useState([]);
    const [openId, setOpenId] = useState(null);
    useEffect(()=>{
      getLabels().then(res => setLabels(res))
    },[])

    function toggleStatut(todo){
      const todoUpdated = {...todo, statut: todo.statut == "terminé" ? "en cours" : "terminé" }
      updateTodo(todoUpdated).then(res => {

        if(res.status === 200){
          setList(currentList => [...currentList.map(list => list.id === res.data.result.id? list = res.data.result : list)])
        }
      })
    }  

    function getStyleTodo(list){
      if(list.statut === "en cours"){
        return "enCours";
      }else if(list.statut === "terminé"){
        return "terminé";
      }
    }
    function getLabel(labelId){
      const result = allLabels.filter(el => el.id === labelId)
      return result[0]
    }
    
    const removeList = (id) => {
      deleteTodo(id).then(res => {
        if(res.status === 204)
          setList(currentList => [...currentList.filter(el => el.id != id )])
      }) 
    }
    const getFormatedDate = (raw) => {
      const days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
      const monthNames = ["manvier", "mevrier", "mars", "avril", "mai", "juin","juillet", "août", "septembre", "octobre", "novembre", "decembre"];
      let date = new Date(raw)
      let formatedDate = `${days[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} à ${date.getHours()}h${date.getMinutes()}`
      return formatedDate
    }
    
    const modifTodo = (newTodo) => {
      updateTodo(newTodo).then(res => {
        if(res.status === 200)
          forReload(true)
      })
    }
    
      return <div className="todo-list">
        <ul>
         {Object.entries(allList).map(([id,todo]) => <li key={todo.id}>
           <ul>
             <li className="todoTitre"> {todo.titre}</li>
             <li className="todoCréation"><p>{getFormatedDate(todo.creationDate)}</p></li>
             <li className="todoCat">Catégorie : <span style={{color : getLabel(todo.labelId).color}}>{ getLabel(todo.labelId).titre }</span></li>
             <li className="todoDesc"><p>Description :</p><p>{todo.description}</p></li>
             <li className="todoDead">Deadline : {getFormatedDate(todo.dueDate)}</li>
           </ul>
           <ul>
              <li className="check"><p onClick={() => toggleStatut(todo)} className={getStyleTodo(todo)}>{todo.statut}</p></li>
              <li className="delete"><button onClick={() => removeList(todo.id)}>Supprimer</button></li>
              <li className="modifier">
                <Button  onClick={() => setOpenId(todo.id)}>Modifier</Button>
                
                  <Dialog open={openId === todo.id} onClose={() => setOpenId(null)}>
                    <DialogTitle>{"Modifier sa todo"}</DialogTitle>
                    <DialogContent>
                      <Form type="update" todo={todo} onSubmit={modifTodo}></Form>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpenId(null)} 
                              color="primary" autoFocus>
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                
              </li>
            </ul>
         </li> )}
      </ul>
      </div>
  }

  export default TodoList;