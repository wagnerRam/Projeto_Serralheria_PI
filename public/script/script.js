var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

btnSignin.addEventListener("click", function () {
  body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function () {
  body.className = "sign-up-js";
});

// Função para atualizar o campo de acordo com o tipo de cliente selecionado
function atualizarCampoDocumento() {
  const tipoCliente = document.getElementById("tipoCliente").value;
  const campoDocumento = document.getElementById("documento");

  if (tipoCliente === "PF") {
    // Se for CPF
    campoDocumento.placeholder = "Digite o CPF";
    campoDocumento.setAttribute("pattern", "\\d{11}"); // 11 dígitos para CPF
    campoDocumento.title = "CPF deve conter 11 dígitos numéricos";
  } else if (tipoCliente === "PJ") {
    // Se for CNPJ
    campoDocumento.placeholder = "Digite o CNPJ";
    campoDocumento.setAttribute("pattern", "\\d{14}"); // 14 dígitos para CNPJ
    campoDocumento.title = "CNPJ deve conter 14 dígitos numéricos";
  } else {
    // Se não for selecionado ou estiver vazio
    campoDocumento.placeholder = "Insira seu CPF ou CNPJ";
    campoDocumento.removeAttribute("pattern");
    campoDocumento.removeAttribute("title");
  }
}
