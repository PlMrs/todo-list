import { useEffect, useState } from 'react'
function Filter(allList,setList){
    const doFilter = (e)=>{
        e.preventDefault();
        
    }
    return <div className="filter" onSubmit={doFilter}>
                <h2>Filtres : </h2>
                <form action="">
                    <label htmlFor="creationDate">Date de création</label>
                    <input type="datetime-local" name="creationDate" />
                    <label htmlFor="dueDate">Date d'échéance</label>
                    <input type="datetime-local" name="dueDate" />
                    <label htmlFor="label">Catégorie</label>
                    <select name="label" value="">
                        <option value="">Choisir</option>
                    </select>
                    <label htmlFor="title"></label>
                    <input type="text" name="title" placeholder="Titre" />
                    <label htmlFor="desc">Description</label>
                    <input type="textarea" name="desc" placeholder="Description" />
                    <label htmlFor="status">Statut</label>
                    <select name="status" value="">
                        <option value="">Choisir</option>
                    </select>
                </form>
           </div>
}
export default Filter;