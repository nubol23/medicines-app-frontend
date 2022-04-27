import Swal from "sweetalert2";

const responseDialog = ({ state, msg }: { state: boolean; msg: string }) => {
  Swal.fire({
    title: state ? "Todo correcto" : "Error",
    text: msg,
    icon: state ? "success" : "error",
    confirmButtonText: "OK",
    confirmButtonColor: "#20b2aa",
  });
};

export default responseDialog;
