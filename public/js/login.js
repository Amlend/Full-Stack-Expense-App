async function authorization() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  axios
    .post("http://localhost:3000/login/validiation", { email, password })
    .then((resonse) => {
      localStorage.setItem("token", resonse.data.token);
      window.location.href = "/expense-page";
    })
    .catch((errr) => {
      console.log(errr);
    });
}
