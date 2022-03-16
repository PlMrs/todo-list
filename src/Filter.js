export function myfilter(filter, allList){
    let filtered = []
    if(filter.titre){
      if(filtered.length === 0){
        filtered = allList.filter(list => list.titre.toLowerCase().includes(filter.titre.toLowerCase()))
      }else{
        filtered = filtered.filter(list => list.titre.toLowerCase().includes(filter.titre.toLowerCase()))
      }
    }
    if(filter.description){
      if(filtered.length === 0){
        filtered = allList.filter(list => list.description.toLowerCase().includes(filter.description.toLowerCase()))
      }else{
        filtered = filtered.filter(list => list.description.toLowerCase().includes(filter.description.toLowerCase()))
      }
    }
    if(filter.labelId){
      if(filtered.length === 0){
        filtered = allList.filter(list => list.labelId === parseInt(filter.labelId) )
      }else{
        filtered = filtered.filter(list => list.labelId === parseInt(filter.labelId) )
      }
    }
    if(filter.creationDate){
      if(filtered.length === 0){
        filtered = allList.filter(list => list.creationDate.split('T')[0] === filter.creationDate)
      }else{
        filtered = filtered.filter(list => list.creationDate.split('T')[0] === filter.creationDate)
      }
    }
    if(filter.dueDate){
      if(filtered.length === 0){
        filtered = allList.filter(list => list.dueDate.split('T')[0] === filter.dueDate)
      }else{
        filtered = filtered.filter(list => list.dueDate.split('T')[0] === filter.dueDate)
      }
    }
    return filtered
}