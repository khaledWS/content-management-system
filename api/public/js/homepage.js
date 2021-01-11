window.onload = function(){
  fetch('/api/getAllUsers').then(d=>d.json()).then(d => {
    document.getElementById('numOfUsers').textContent = +localStorage.users? d.length - +localStorage.users:d.length
    localStorage.users = d.length;
  })
}
