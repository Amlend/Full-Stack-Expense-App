async function authorization() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let success = false;

  await axios
    .post(`http://51.20.55.186:3000/login/validiation`, { email, password })
    .then(async (resonse) => {
      localStorage.setItem("token", resonse.data.token);
      window.location.href = "expense-page";

      success = true;
    })
    .catch((errr) => {
      console.log(errr);
    });
}
