// <tr>
//   <td>أبو كمال</td>
//   <td>متوفر</td>
//   <td>120</td>
//   <td>0</td>
//   <td>mohammed_mor@windowslive.com</td>
// </tr>
var count = 1;
window.onload = function(){
const driversTable = document.querySelector('#driversTable');

function renderDriver(doc){
  let tr = document.createElement('tr');
  let title = document.createElement('td');
  let date = document.createElement('td');
  let photo = document.createElement('img');

  tr.setAttribute('id', doc.id);
  // tr.setAttribute('onclick', 'details(this)');
  title.textContent = doc.title
  date.textContent = doc.date;
  photo.src = doc.photo;
  photo.width = 60;

  tr.appendChild(title);
  tr.appendChild(date);
  tr.append(photo);
  driversTable.appendChild(tr);
  count++
}


fetch('/api/getNews').then(d => d.json()).then(news => {
  news.forEach(e => renderDriver(e));
})
  .then(() => {
    $('#myTable').DataTable();
  })
}

