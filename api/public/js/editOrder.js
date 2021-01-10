const uid = window.location.pathname.substr(11);
const changed = [];
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
  if(+document.getElementById('doneStoreCount').value<0){
    swal({
      title: 'حدث خطأ ما',
      text: 'الرجاء التأكد من صحة عدد المتاجر المكتملة المدخل',
      icon: 'warning',
      buttons: 'حسنا',
      dangerMode: true,
    })
  }

  else if(+document.getElementById('orderCount').value<0){
    swal({
      title: 'حدث خطأ ما',
      text: 'الرجاء التأكد من صحة عدد الطلبات المدخل',
      icon: 'warning',
      buttons: 'حسنا',
      dangerMode: true,
    })
  }

  else if(+document.getElementById('price').value<0){
    swal({
      title: 'حدث خطأ ما',
      text: 'الرجاء التأكد من صحة السعر الكلي المدخل',
      icon: 'warning',
      buttons: 'حسنا',
      dangerMode: true,
    })
  }


  else{
    var driverData = firebase.firestore().collection('delivers::').doc(uid);
    changed.forEach((item)=>{
      console.log(item);

      if(item==='addressDetails' || item==='addressName' || item==='latitude' || item==='longitude'){
        driverData.update({
          'address.addressDetails': document.getElementById('addressDetails').value,
          'address.addressName': document.getElementById('addressName').value,
          'address.latitude': document.getElementById('latitude').value,
          'address.longitude': document.getElementById('longitude').value
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
    else if(item==='driverId2'){
      driverData.update({
        'driverId':document.getElementById('driverId2').value
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
}

function deleteOrder(){
  swal({
  title: "هل انت متأكد؟",
  text: "انت على وشك حذف جميع بيانات هذا الطلب",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    firebase.firestore().collection("delivers::").doc(uid).delete().then(function() {
      window.location.pathname = '/orders'

}).catch(function(error) {
  swal("عذرا حدث خطأ ما", {
    icon: "warning",
  });
});
  }
});
}


window.onload = function(){
document.getElementById('uid').textContent = uid;

firebase.firestore().collection('delivers::').doc(uid).get().then((snapshot)=>{
  const info = snapshot.data();
  const keys = (Object.keys(info));
  keys.forEach(key=>{
    if(key==='liked'){document.getElementById('likeStatus').value=info[key]}
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
    document.getElementById(key).value = info[key]
  }
  }
  });
  firebase.firestore().collection('drivers::').get().then((snapshot)=>{
    var x = document.getElementById("driverId2");
    snapshot.docs.forEach(doc => {
      var option = document.createElement("option");
      option.text = doc.data().modelUser.name;
      option.value = doc.data().uId;
      x.add(option);
    })
    for(let i = 0; i<x.length; i++){
      if(x[i].value === document.getElementById('driverId').value){
        x.selectedIndex = i;
        break;
      }
      x.selectedIndex=-1;
    }
  })
  document.getElementById('liked').value=document.getElementById('likeStatus').value
})
firebase.firestore().collection('delivers::').doc(uid)
.collection('stores::').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
    let store = document.createElement('tr');
    let name = document.createElement('td');
    let numOfOrders = document.createElement('td');
    let distance = document.createElement('td');

    name.textContent = doc.data().title;
    numOfOrders.textContent = doc.data().orderChild.length;
    distance.textContent = doc.data().distance;

    store.appendChild(distance);
    store.appendChild(numOfOrders);
    store.appendChild(name);

    document.getElementById('stores').appendChild(store)
    document.getElementById('uid').textContent = document.getElementById('deliveryNumber').value;

		// console.log(doc.data());
})
document.getElementById('deliveryTime').value = msToTime(Number(document.getElementById('deliveryTime').value));
// document.getElementById('updatedAt').value = msToTime(Number(document.getElementById('updatedAt').value));
})
document.getElementsByTagName('html')[0].style = "";
document.getElementsByTagName('body')[0].style = "";

}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes;
}
