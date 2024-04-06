async function authorization() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await axios
    .post("http://localhost:3000/login/validiation", { email, password })
    .then(async (resonse) => {
      localStorage.setItem("token", resonse.data.token);

      if (resonse.data.success == true) {
        window.location.href = " /expense-page";
      }
    })
    .catch((errr) => {
      console.log(errr);
    });
}
