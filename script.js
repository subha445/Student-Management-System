function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";
  } else {
    alert("Wrong login");
  }
}
