const superSenha = document.getElementById("supersenha");
const telaLogin =  document.getElementById("telaLogin");
const telaBlocos = document.getElementById("telaBlocos");
const tema = document.getElementById("tema");
const body = document.body;
const senhaInvalida = document.getElementById("senhaInvalida");
const informa =  document.getElementById("informa");
const information =  document.getElementById("telaInformation");
const newPost = document.getElementById("newPost");
const inputTitulo = document.getElementById("titulo");
const textArea = document.getElementById("texto");

superSenha.addEventListener('keypress', function(event){
    if(event.key === "Enter"){
        verificarSenha();
    }
})
function verificarSenha(){ //Criar um senha baseado no dia e no mes
    const date = new Date()
    const dia = date.getDate() + 20
    const mes = date.getMonth() + 12
    const senhaSecreta = dia.toString() + mes.toString()

    if(superSenha.value === senhaSecreta){ //confere se esta certo e libera a outra tela
        console.log("Login Realizando com sucesso")
        telaLogin.style.display = "none";
        telaBlocos.style.display = "flex";
    }else {
        senhaInvalida.textContent = "Senha Invalida!"
        superSenha.value = "";
        console.log("Acesso Negando!")
    }
}

informa.addEventListener("click", () =>{ //Aqui ele abre a tela de informaçoes
    telaLogin.style.display = "none";
    information.style.display = "flex";
})

document.addEventListener('keydown', function(event) { //Usamos o 'Esc' para fechar as telas
    if(event.key === 'Escape'){
        fechar();
    }
})

function fechar(){ //Função para fecha as telas
    if(telaBlocos.style.display === "flex"){
        telaBlocos.style.display = "none";
        telaLogin.style.display = "flex";
        console.log("Fechou a telaBloco")
    }else if(information.style.display === "flex"){
        information.style.display = "none";
        telaLogin.style.display = "flex";
    }
    superSenha.value = "";
    senhaInvalida.textContent = ""
}
tema.addEventListener("click", () =>{ //Aqui a gente conseguir manipular o tema do site
    body.classList.toggle("darkMode");
    body.classList.toggle("lightMode");
})

newPost.addEventListener('click', () =>{//Aqui ele vai limpar os inputs
    inputTitulo.value = "";
    textArea.value = "";
})

function btnSave(){
    if(inputTitulo.value.trim() === "" || textArea.value.trim() === "") return;
    let nota = JSON.parse(localStorage.getItem("nota")) || [];
    nota.push({
        titulo: inputTitulo.value,
        texto: textArea.value,
    });
    localStorage.setItem("nota",  JSON.stringify(nota));
    carregarNotas();
}

function carregarNotas(){
    const listaNotas = document.getElementById("listaNotas");
    listaNotas.innerHTML = "";
    const notas = JSON.parse(localStorage.getItem("nota")) || [];
    notas.forEach((nota, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="bi bi-justify-left"></i>${nota.titulo}`;
        li.addEventListener("click", () => {
            inputTitulo.value = nota.titulo;
            textArea.value = nota.texto;
        })
        listaNotas.appendChild(li);
    })
}

window.onload = function(){
    carregarNotas();
}

