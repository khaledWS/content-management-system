const uid = window.location.pathname.substr(12);
const changed = [];
const nameRe = /\d+/g;
const emailRe = /\S+@\S+\.\S+/
const phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im


function newUpdate(input) {
  console.log(changed);
  document.getElementById('saveBtn').disabled = false;
  document.getElementById('saveBtn').classList.remove("disabled");
  if(changed.indexOf(input.id)<0){
    changed.push(input.id);
  }
}

function validate(){
  if((nameRe.test(document.getElementById('name').value))){
    console.log('wtf');
    swal({
      title: 'حدث خطأ ما',
      text: 'الرجاء التأكد من صحة الاسم المدخل',
      icon: 'warning',
      buttons: 'حسنا',
      dangerMode: true,
    })
  }
  else if(!(emailRe.test(document.getElementById('email').value))){
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
  else if(+document.getElementById('totalDeliversBalance').value < 0){
    swal({
      title: 'حدث خطأ ما',
      text: 'الرجاء التأكد من صحة الرصيد المدخل',
      icon: 'warning',
      buttons: 'حسنا',
      dangerMode: true,
    })
  }
  else if(+document.getElementById('countDisLike').value < 0){
    swal({
      title: 'حدث خطأ ما',
      text: 'الرجاء التأكد من صحة عدد الدسلايكات المدخلة',
      icon: 'warning',
      buttons: 'حسنا',
      dangerMode: true,
    })
  }
  else if(+document.getElementById('countLike').value < 0){
    swal({
      title: 'حدث خطأ ما',
      text: 'الرجاء التأكد من صحة عدد اللايكات المدخلة',
      icon: 'warning',
      buttons: 'حسنا',
      dangerMode: true,
    })
  }
  else{
    saveChanges();
  }
}




function saveChanges(){
  if (changed.length === 0)return
  var driverData = firebase.firestore().collection('drivers::').doc(uid);
  changed.forEach((item)=>{
    console.log(item);

    if(item==='email' || item==='name' || item==='phone' || item==='profilePicture' || item==='wallet' || item==='points'){
      driverData.update({
        'modelUser.email': document.getElementById('email').value,
        'modelUser.name': document.getElementById('name').value,
        'modelUser.phone': document.getElementById('phone').value,
        'modelUser.wallet': Number(document.getElementById('wallet').value),
        'modelUser.points': Number(document.getElementById('points').value),
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
    }
    else if(item==='status'){
      var status = document.getElementById('status').checked?1:0
      driverData.update({
        'status': status
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
    }
    else{
    driverData.update({
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
    console.log(error);
  })
}


  })
}

function deleteDriver(){
  swal({
  title: "هل انت متأكد؟",
  text: "انت على وشك حذف جميع بيانات هذا السائق",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    firebase.firestore().collection("drivers::").doc(uid).delete().then(function() {
      window.location.pathname = '/drivers'

}).catch(function(error) {
  swal("عذرا حدث خطأ ما", {
    icon: "warning",
  });
});
  }
});
}


window.onload = function(){

firebase.firestore().collection('drivers::').doc(uid).get().then((snapshot)=>{
  const info = snapshot.data();
  const keys = (Object.keys(info));
  keys.forEach(key=>{
    if(typeof info[key] === 'object' && info[key] !== null){
      console.log(info[key]);
      const models = Object.keys(info[key]);
      models.forEach(k=>{
        if(document.getElementById(k)){
        if(k.toLowerCase().includes('pic') || k.toLowerCase()==='license'){document.getElementById(k).src = info[key][k]}
        else{document.getElementById(k).value = info[key][k]}
      }
      })
    }
    else {
    if(document.getElementById(key)){
    if(key.toLowerCase().includes('pic') || key.toLowerCase()==='license'){document.getElementById(key).src = info[key];}
    else if(key === 'status'){document.getElementById(key).checked = info[key]===1}
    else{document.getElementById(key).value = info[key];}
  }
  }
  });
  document.getElementById('uid').textContent = document.getElementById('name').value + ' ';
  document.getElementById('pic').src = ''; // document.getElementById('profilePicture').src
})
document.getElementsByTagName('html')[0].style = "";
document.getElementsByTagName('body')[0].style = "";
}
