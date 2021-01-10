const uid = window.location.pathname.substr(12);
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
  var driverData = firebase.firestore().collection('clientsComments').doc(uid);
  changed.forEach((item)=>{
    console.log(item);

    if(item==='driverId2'){
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

    else if(item==='userId2'){
      driverData.update({
        'userId':document.getElementById('userId2').value
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

function deleteRating(){
  swal({
  title: "هل انت متأكد؟",
  text: "انت على وشك حذف جميع بيانات هذا التقييم",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    firebase.firestore().collection("clientsComments").doc(uid).delete().then(function() {
      window.location.pathname = '/ratings'

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

firebase.firestore().collection('clientsComments').doc(uid).get().then((snapshot)=>{
  const info = snapshot.data();
  const keys = (Object.keys(info));
  keys.forEach(key=>{
    if(document.getElementById(key)){
      if(key==='liked'){document.getElementById('likeStatus').value=info[key]}
    document.getElementById(key).value = info[key]
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
  firebase.firestore().collection('users::').get().then((snapshot)=>{
    var x = document.getElementById("userId2");
    snapshot.docs.forEach(doc => {
      var option = document.createElement("option");
      option.text = doc.data().name;
      option.value = doc.id;
      x.add(option);
    })
    for(let i = 0; i<x.length; i++){
      if(x[i].value === document.getElementById('userId').value){
        x.selectedIndex = i;
        break;
      }
      x.selectedIndex=-1;
    }
  })


  document.getElementById('liked').value=document.getElementById('likeStatus').value
}

)
document.getElementsByTagName('html')[0].style = "";
document.getElementsByTagName('body')[0].style = "";

}
