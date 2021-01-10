var count = 1;
window.onload = function(){
const ordersTable = document.querySelector('#ordersTable');

function renderDelivery(doc){
  let tr = document.createElement('tr');
  let address = document.createElement('td');
  let time = document.createElement('td');
  let number = document.createElement('td');
  let driver = document.createElement('td');
  let price = document.createElement('td');

  tr.setAttribute('id', doc.id);
  tr.setAttribute('onclick', 'details(this)');
  if(doc.data().address){address.innerHTML = count + '. <i class="fa fa-pencil" aria-hidden="true" title="تعديل"></i> ' + doc.data().address.addressName;}
  let seconds = +`${doc.data().createdAt}`.split('.')[0]
  let dateF = `${toDateTime(seconds)}`.split(' ');
  dateF.pop();
  dateF.pop();
  dateF.pop();
  dateF.pop();
  dateF.shift();
  time.textContent = dateF.join(' ');

  // time.textContent = doc.data().createdAt;
  number.textContent = doc.data().deliveryNumber;
  if(doc.data().driverId){
  firebase.firestore().collection('drivers::').doc(doc.data().driverId).get().then((snapshot)=>{
    driver.textContent =snapshot.data().modelUser.name
  })
  }
  else{
    driver.textContent = 'غير معروف'
  }
  price.textContent = doc.data().price;

  tr.appendChild(address);
  tr.appendChild(time);
  tr.appendChild(number);
  tr.appendChild(driver);
  tr.appendChild(price);
  ordersTable.appendChild(tr);
  count++;
}


firebase.firestore().collection('delivers::').get().then((snapshot)=>{
  snapshot.docs.forEach(doc => {
    renderDelivery(doc);
  })
}).then(()=>{
  $('#myTable').DataTable();
})

}
function details(item){
  window.location.pathname = `/editorder/${item.id}`;
}

function sort() {
  if(document.getElementById('sortRule').value === 'createdAt'){
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("ordersTable2");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

else{
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("ordersTable2");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[4];
      y = rows[i + 1].getElementsByTagName("TD")[4];
      //check if the two rows should switch place:
      if (+x.innerHTML > +y.innerHTML) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
}

function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}
