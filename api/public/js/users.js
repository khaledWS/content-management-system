var count = 1;
window.onload = function () {
  const usersTable = document.querySelector('#usersTable');

  function renderUser(doc) {
    console.log(doc)
    let tr = document.createElement('tr');
    let email = document.createElement('td');

    tr.setAttribute('id', doc.id);
    tr.setAttribute('onclick', 'details(this)');
    email.textContent = doc.email;


    tr.appendChild(email);
    
    usersTable.appendChild(tr);
    count++;
  }



  fetch('/api/getAllUsers').then(d => d.json()).then(users => {
    users.forEach(user => renderUser(user));
  })
    .then(() => {
      $('#myTable').DataTable();
    })
}

function details(item) {
  window.location.pathname = `/edituser/${item.id}`;
}
