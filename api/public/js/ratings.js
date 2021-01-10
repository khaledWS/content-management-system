window.onload = function(){
const ratingsTable = document.querySelector('#ratingsTable');

function renderRating(doc){
  let tr = document.createElement('tr');
  let deliveryNumber = document.createElement('td');
  let driverId = document.createElement('td');
  let liked = document.createElement('td');
  let userId = document.createElement('td');
  let comment = document.createElement('td');

  tr.setAttribute('id', doc.id);
  tr.setAttribute('onclick', 'details(this)');
  if(doc.data().deliveryId){
  firebase.firestore().collection('delivers::').doc(doc.data().deliveryId).get().then((snapshot)=>{
    deliveryNumber.textContent = snapshot.data()?snapshot.data().deliveryNumber:'غير معروف'
  })
  }

  if(doc.data().driverId){
  firebase.firestore().collection('drivers::').doc(doc.data().driverId).get().then((snapshot)=>{
    driverId.textContent =snapshot.data().modelUser.name
  })
  }

  else{
    driverId.textContent = 'غير معروف'
  }

  liked.innerHTML = (`${doc.data().liked}`=='true')?'<span style="font-size:30px;">👍</span>':'<span style="font-size:30px;">👎</span>'
  if(doc.data().driverId){
  firebase.firestore().collection('users::').doc(doc.data().userId).get().then((snapshot)=>{
    userId.textContent = snapshot.data().name
  })
  }
  else{
    userId.textContent = 'غير معروف'
  }
  comment.textContent = doc.data().comment;

  tr.appendChild(deliveryNumber);
  tr.appendChild(driverId);
  tr.appendChild(liked);
  tr.appendChild(userId);
  tr.appendChild(comment);
  ratingsTable.appendChild(tr);
}


firebase.firestore().collection('clientsComments').get().then((snapshot)=>{
  snapshot.docs.forEach(doc => {
    renderRating(doc);
  })
}).then(()=>{
  $('#myTable').DataTable();
})

}
function details(item){
  window.location.pathname = `/editrating/${item.id}`;
}
