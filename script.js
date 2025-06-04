/* insere api do viacep */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cep').addEventListener('blur', function () {
        var cep = this.value.replace(/\D/g, '');

        if (cep !== "") {
            var validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            document.getElementById('rua').value = data.logradouro;
                            document.getElementById('bairro').value = data.bairro;
                            document.getElementById('cidade').value = data.localidade;
                            document.getElementById('estado').value = data.uf;
                        } else {
                            alert("CEP não encontrado.");
                            limparFormulario();
                        }
                    })
                    .catch(error => {
                        alert("Erro ao buscar o CEP.");
                        limparFormulario();
                    });
            } else {
                alert("Formato de CEP inválido.");
                limparFormulario();
            }
        } else {
            limparFormulario();
        }
    });

    function limparFormulario() {
        document.getElementById('rua').value = "";
        document.getElementById('bairro').value = "";
        document.getElementById('cidade').value = "";
        document.getElementById('estado').value = "";
    }
});

//* retira  números do nome e sobrenome
document.addEventListener('DOMContentLoaded', function() {
    var nomeInput = document.getElementById('nome');
    var sobrenomeInput = document.getElementById('sobrenome');

    nomeInput.addEventListener('input', function(event) {
        var inputValue = event.target.value;
        event.target.value = inputValue.replace(/[0-9]/g, ''); 
    });

    sobrenomeInput.addEventListener('input', function(event) {
        var inputValue = event.target.value;
        event.target.value = inputValue.replace(/[0-9]/g, ''); 
    });
});

//* confirmando senhas
document.addEventListener('DOMContentLoaded', function() {
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirm-password');

    passwordInput.addEventListener('input', function() {
        checkPasswordsMatch();
    });

    confirmPasswordInput.addEventListener('input', function() {
        checkPasswordsMatch();
    });

    function checkPasswordsMatch() {
        var password = passwordInput.value;
        var confirmPassword = confirmPasswordInput.value;

        if (password === confirmPassword) {
            confirmPasswordInput.setCustomValidity('');
        } else {
            confirmPasswordInput.setCustomValidity('As senhas não coincidem');
        }
    }
});



  /* Função para cadastro do usuário no localStorage */
function cadastrarUsuarioLocalStorage(nome, sobrenome, cep, rua, bairro, cidade, estado, email, password) {
    const usuario = {
        nome: nome,
        sobrenome: sobrenome,
        cep: cep,
        rua: rua,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        email: email,
        password: password
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
}

  /* Função para cadastro do usuário */
function cadastrarUsuario(event) {
    event.preventDefault();

    
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const cep = document.getElementById('cep').value;
    const rua = document.getElementById('rua').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    cadastrarUsuarioLocalStorage(nome, sobrenome, cep, rua, bairro, cidade, estado, email, password);

    
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {

    const formularioCadastro = document.querySelector('form');
    
   
    formularioCadastro.addEventListener('submit', cadastrarUsuario);
});

// Função para login do usuário
function logarUsuario(event) {
    event.preventDefault(); 

    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        if (usuario.email === email && usuario.password === password) {
        
            window.location.href = 'logado.html';
            return;
        }
    }

    alert('Usuário ou senha incorretos.');
}

/* Recupera o nome do usuário do localStorage */
function obterNomeUsuario() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        return usuario.nome;
    }
    return null;
}

/* Atualiza o texto do elemento com o nome do usuário */
function atualizarNomeUsuario() {
    const nomeUsuarioElement = document.getElementById('nomeUsuario');
    const nomeUsuario = obterNomeUsuario();
    if (nomeUsuario) {
        nomeUsuarioElement.innerHTML = `Seja bem vindo ao nosso site <span style="text-decoration: underline">${nomeUsuario}</span>`;
    }
}


/* Chama a função para atualizar o nome do usuário quando a página é carregada */
document.addEventListener('DOMContentLoaded', function() {
    atualizarNomeUsuario();
});
