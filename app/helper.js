function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
  }
  
  function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
  }


  function getName(type='policy',parentId,string) {
    var name = '';
    if(type=='policy'){
      name = 'enterprises/'+parentId+"/policies/"+string.replace(/\s+/g, '-');
    }
    return name;
  }

  module.exports = {
    getOffset,
    emptyOrRows,
    getName
  }