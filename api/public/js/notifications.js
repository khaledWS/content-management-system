var count = 1;
window.onload = function(){
const ordersTable = document.querySelector('#notificationsTable');

function renderDelivery(doc){
  let tr = document.createElement('tr');
  let user = document.createElement('td');
  let title = document.createElement('td');
  let details = document.createElement('td');
  let notificationScreen = document.createElement('td');

  tr.setAttribute('id', doc.id);
  // tr.setAttribute('onclick', 'details(this)');
  title.textContent = doc.data().title;
  details.textContent = doc.data().details;
  if(doc.data().userId){
  firebase.firestore().collection('users::').doc(doc.data().userId).get().then((snapshot)=>{
    user.textContent = snapshot.data()?snapshot.data().name:'غير معروف'
  })
  }
  else{
    user.textContent = 'غير معروف'
  }
  notificationScreen.textContent = doc.data().whereToGo;

  tr.appendChild(user);
  tr.appendChild(title);
  tr.appendChild(details);
  tr.appendChild(notificationScreen);
  ordersTable.appendChild(tr);
  count++;
}


firebase.firestore().collection('notifications::').get().then((snapshot)=>{
  snapshot.docs.forEach(doc => {
    renderDelivery(doc);
  })
}).then(()=>{
  $('#myTable').DataTable();
})

}
