import { useEffect, useState } from 'react'
import { getLabels} from './api';
function Form({todo,type, onSubmit}){
  const [newTodo, setNewTodo] = useState({
    "titre" : "",
    "description" : "",
    "dueDate" : "",
    "statut" : "",
    "labelId" : "",
    "creationDate" : ""
  })

  const [allLabels, setLabels] = useState([]);
  useEffect(()=>{
    getLabels().then(res => setLabels(res))
    if(type === "update")
      setNewTodo(todo)
  },[])
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    onSubmit(newTodo)
    // setNewTodo() vider la new todo
    setNewTodo({"titre" : "","description" : "","dueDate" : "","statut" : "","labelId" : "","creationDate" : "" })
  }
  const getTitle = ()=>{
    if(type === "filter"){
      return "Filtres"
    }else if(type === "addForm"){
      return "Créer"
    }else{
      return ""
    }
  }
      return   <div className="form"><form onSubmit={ handleSubmit }>
                    <p>{getTitle()}</p>
                    <div className="form-container">
                    <label htmlFor="title"> Titre</label>
                    <input type="text" name="title" placeholder="Titre" value={newTodo.titre} onChange={(e) => {setNewTodo({...newTodo, "titre" :  e.target.value }); }} />
                    <label htmlFor="label"> Catégories</label>
                    <select name="label" value={newTodo.labelId} onChange={(e) => {setNewTodo({...newTodo, "labelId" :  e.target.value });}}>
                        <option value="">Choisir</option>
                        {allLabels.map(label => <option value={label.id} style={{backgroundColor: label.color}}>{label.titre}</option>)}
                    </select>
                    <label htmlFor="desc">Description</label>
                    <textarea name="desc" placeholder="description" value={newTodo.description} onChange={(e) => {setNewTodo({...newTodo, "description" : e.target.value})}} />
                    { type === "filter" ?  <label htmlFor="creationDate">Date de création</label> : ""}
                    { type === "filter" ?  <input type="date" name="creationDate" value={newTodo.creationDate}  onChange={(e) => {setNewTodo({...newTodo, "creationDate" : e.target.value})}} /> : ""}
                    <label htmlFor="dueDate">Date de fin</label>
                    <input type={type === "filter" ? "date" : "datetime-local"} name="dueDate" value={newTodo.dueDate.replace('Z', '')}  onChange={(e) => {setNewTodo({...newTodo, "dueDate" : e.target.value})}} />
                    <button type="submit">Envoyer</button>
                    </div>
                  </form>
                </div>


          
}

  export default Form;