import { useEffect, useState } from 'react'
import baseLabels from './label.json'
function Form({allList,setList,type}){
  const [newTodo, setNewTodo] = useState({
    "id" : "",
    "titre" : "",
    "description" : "",
    "dueDate" : "",
    "statut" : "",
    "labelId" : "",
    "creationdate" : ""
  })
      const onTodoCreated = (newTodo) => {
        newTodo.dueDate = newTodo.dueDate.replace('T', ' ').replace(':','h')
        newTodo.statut = "En cours"
        const d = new Date()
        newTodo.creationdate = `${d.getFullYear()}-${d.getMonth() + 1 }-${d.getDate()} ${d.getHours()}h${d.getMinutes()}`
        let last = parseInt(Object.keys(allList).reduce((a, b) => allList[a] > allList[b] ? a : b)) + 1;
        newTodo.id = last;
        if(type === "addForm"){
          setList(currentList => ({...currentList, [last] : newTodo}));
        }else if(type === "filter"){
        }
      }
      const handleSubmit = (e) =>{
        e.preventDefault();
        onTodoCreated(newTodo);
        // setNewTodo() vider la new todo
        setNewTodo({"id": "","titre" : "","description" : "","dueDate" : "","statut" : "","labelId" : "","creationdate" : "" })
      }
          return   <div className="form"><form onSubmit={ handleSubmit }>
                        { type === "filter" ? <h2>Filtres</h2> : <h2>Créer</h2>}
                        <div className="form-container">
                        <label htmlFor="title"> Titre</label>
                        <input type="text" name="title" placeholder="Titre" value={newTodo.titre} onChange={(e) => {setNewTodo({...newTodo, "titre" :  e.target.value }); }} />
                        <label htmlFor="label"> Catégories</label>
                        <select name="label" value={newTodo.labelId} onChange={(e) => {setNewTodo({...newTodo, "labelId" :  e.target.value });}}>
                            <option value="">Choisir</option>
                            {baseLabels.map(label => <option value={label.id} style={{backgroundColor: label.color}}>{label.titre}</option>)}
                        </select>
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" placeholder="description" value={newTodo.description} onChange={(e) => {setNewTodo({...newTodo, "description" : e.target.value})}} />
                        { type === "filter" ?  <label htmlFor="creationdate">Date de création</label> : ""}
                        { type === "filter" ?  <input type="datetime-local" name="creationdate" value={newTodo.creationdate}  onChange={(e) => {setNewTodo({...newTodo, "creationdate" : e.target.value})}} /> : ""}
                        <label htmlFor="dueDate">Date de fin</label>
                        <input type="datetime-local" name="dueDate" value={newTodo.dueDate}  onChange={(e) => {setNewTodo({...newTodo, "dueDate" : e.target.value})}} />
                        <button type="submit">Envoyer</button>
                        </div>
                      </form>
                    </div>


          
}

  export default Form;