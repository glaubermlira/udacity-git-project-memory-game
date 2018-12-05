function dd(obj, string = 'Your target', mode = 'l') {
  switch (mode) {
    case 'l':
      var out = '';
      for(var i in obj){
        out += i + ' : ' + obj[i] + '\n';
      }
      alert(string + ' : ' + out);
      break;
    case 'c':
      console.log(string);
      console.log(obj);
      break;
  }
}

//-------------------------------------------------------------
function sweetAlert(titleToBind, bodyToBind, typeToBind) {
  const swalWithBootstrapButtons = swal.mixin({
  confirmButtonClass: 'btn btn-success',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
})

swalWithBootstrapButtons({
  title: titleToBind,
  text: bodyToBind,
  type: typeToBind,
  showCancelButton: true,
  confirmButtonText: 'Play Again',
  cancelButtonText: 'No Stay!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    swalWithBootstrapButtons(
      'Reloading!',
      'Have Fun',
      'success'
    )
  } else if (
    // Read more about handling dismissals
    result.dismiss === swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons(
      'Pause',
      'Refresh the page if you want to play again!',
      'error'
    )
  }
})
}
