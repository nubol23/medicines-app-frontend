import Swal from "sweetalert2";

const deleteDialog = (deleteFunction, title) => {
  Swal.fire({
    title: title,
    icon: 'warning',
    confirmButtonText: 'SI',
    showCancelButton: true,
    cancelButtonText: "NO",
    confirmButtonColor: "#20b2aa",
    cancelButtonColor: "#f6546a",
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor'
      });
      Swal.showLoading()

      deleteFunction()
    }
  })
}

export default deleteDialog;