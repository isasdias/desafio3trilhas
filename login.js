function validarLogin(event) {
  event.preventDefault();

  const utilizador = document.getElementById("utilizador").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // Simula credenciais já registadas
  const dados = JSON.parse(localStorage.getItem("utilizador")) || {
    id: "admin@gmail.com",
    senha: "12345",
  };

  if (utilizador === dados.id && senha === dados.senha) {
    alert("Login feito com sucesso!");
    window.location.href = "index.html";
  } else {
    alert("Credenciais inválidas.");
  }
}

