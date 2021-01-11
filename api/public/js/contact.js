window.onload = function(){
const messagesTable = document.querySelector('#messagesTable');

function renderMessage(doc){
  let tr = document.createElement('tr');
  let email = document.createElement('td');
  let amount = document.createElement('td');

  tr.setAttribute('id', doc.id);

  email.textContent = doc.email;
  amount.textContent = doc.amount;

  tr.appendChild(email);
  tr.appendChild(amount);
  messagesTable.appendChild(tr);
}


fetch('/api/getDonors').then(d => d.json()).then(news => {
  news.forEach(e => renderMessage(e));
})
  .then(() => {
    $('#myTable').DataTable();
  })
}

