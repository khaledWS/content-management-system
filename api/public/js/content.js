const changed = [];
let keys = [];
function newUpdate(input) {
  console.log(changed);
  document.getElementById('saveBtn').disabled = false;
  document.getElementById('saveBtn').classList.remove("disabled");
  if(changed.indexOf(input.id)<0){
    changed.push(input.id);
  }
}

function saveChanges() {
  if (changed.length === 0) return;
  const body = keys.reduce((a, c) => {
    const data = document.getElementById(c) && document.getElementById(c).value;
    a[c] = +data || data;
    return a
  }, {});
  console.log(body);
  postData('/api/editStats', body)
  .then((data) => {
    console.log(data);
  }).then(function(){
    swal({
      title: 'تم',
      text: 'تم حفظ التغييرات بنجاح',
      icon: 'success',
      buttons: 'حسنا',
      dangerMode: false,
    })
  }
).catch(function(error){
  console.log(error);
})
};


window.onload = function(){
fetch('/api/getStats').then(d=>d.json()).then(snapshot =>{
  const info = snapshot[0];
  keys = (Object.keys(info));
  keys.forEach(key=>{
    if(document.getElementById(key)){
    document.getElementById(key).value = info[key]
  }
  });
})

}


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}