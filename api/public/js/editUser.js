const uid = window.location.pathname.substr(10);
const changed = [];
const emailRe = /\S+@\S+\.\S+/
const phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

function validate(){
  if(!(emailRe.test(document.getElementById('email').value))){
    swal({
      title: 'حدث خطأ ما',
      text: 'الرجاء التأكد من صحة الإيميل المدخل',
      icon: 'warning',
      buttons: 'حسنا',
      dangerMode: true,
    })
  }
  else if(!(phoneRe.test(document.getElementById('phone').value))){
    swal({
      title: 'حدث خطأ ما',
      text: 'الرجاء التأكد من صحة الرقم المدخل',
      icon: 'warning',
      buttons: 'حسنا',
      dangerMode: true,
    })
  }
  else if(+document.getElementById('wallet').value < 0){
    swal({
      title: 'حدث خطأ ما',
      text: 'الرجاء التأكد من صحة الرصيد المدخل',
      icon: 'warning',
      buttons: 'حسنا',
      dangerMode: true,
    })
  }
  else{
    saveChanges();
  }
}

function newUpdate(input) {
  console.log(changed);
  document.getElementById('saveBtn').disabled = false;
  document.getElementById('saveBtn').classList.remove("disabled");
  if(changed.indexOf(input.id)<0){
    changed.push(input.id);
  }
}

function saveChanges(){
  if (changed.length === 0)return
  var userData = firebase.firestore().collection('users::').doc(uid);
  changed.forEach((item)=>{
    console.log(item);
    userData.update({
      [item]:document.getElementById(item).type=='number'?+document.getElementById(item).value:document.getElementById(item).value
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
    swal({
      title: 'عذرا',
      text: 'حدث خطأ ما',
      icon: 'danger',
      buttons: 'حسنا',
      dangerMode: true,
    })
  })



  })
}

function deleteUser(){
  swal({
  title: "هل انت متأكد؟",
  text: "انت على وشك حذف جميع بيانات هذا المستخدم",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    firebase.firestore().collection("users::").doc(uid).delete().then(function() {
      window.location.pathname = '/users'

}).catch(function(error) {
  swal("عذرا حدث خطأ ما", {
    icon: "warning",
  });
});
  }
});
}

function displayImage(evt){
  var files = evt.target.files;
  var reader = new FileReader();

  reader.onload = function(frEvent) {
	 var file = frEvent.target.result;
   firebase.storage().ref().put(file).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
});
  }
  reader.readAsDataURL(files[0]);
}



window.onload = function(){


firebase.firestore().collection('users::').doc(uid).get().then((snapshot)=>{
  console.log(snapshot.docs);
  const info = snapshot.data();
  const keys = (Object.keys(info));
  keys.forEach(key=>{
    if(typeof info[key] === 'object' && info[key]!==null){
      const models = Object.keys(info[key]);
      models.forEach(k=>{
        if(document.getElementById(k)){
        document.getElementById(k).value = info[key][k]
      }
      })
    }
    else {
    if(document.getElementById(key)){
    document.getElementById(key).value = info[key]?info[key]:''
  }
  }
  });
document.getElementById('uid').textContent = document.getElementById('name').value;
document.getElementById('profilePic').src = document.getElementById('profilePicture').value?document.getElementById('profilePicture').value:'/img/default.jpg';
})

document.getElementById('userForm').addEventListener('submit', function(e){
  e.preventDefault();
  saveChanges();
})
document.getElementsByTagName('html')[0].style = "";
document.getElementsByTagName('body')[0].style = "";
}
