// Configurações Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDyJxogMMVaO_fJK4L5MokMm13hd5D21qg",
    authDomain: "form-email-e279d.firebaseapp.com",
    projectId: "form-email-e279d",
    storageBucket: "form-email-e279d.appspot.com",
    messagingSenderId: "1030377432641",
    appId: "1:1030377432641:web:ceba60c44fcf0b6fc908c0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const sedu = "SEDU";

let body = document.getElementsByTagName("body")[0];
let nome = document.getElementById("nome");
let cpf = document.getElementById("cpf");
let data = document.getElementById("data-nascimento");
let qtd_matricula = document.getElementById("qtd-matricula");
let matricula1 = document.getElementById("matricula1");
let matricula2 = document.getElementById("matricula2");
let form_matricula2 = document.getElementById("form-matricula2");
let botao = document.getElementById("submit");
let telaForm = document.getElementById("tela-form");
let telaEnviado = document.getElementById("tela-enviado");
let erro = document.getElementsByClassName("erro-hidden")[0];
let textoErro = document.getElementById("texto-erro");

let imagem = document.getElementById("imagem");
let form = document.getElementById("form");

setInterval(()=>{
    setAlturaDiv();
}, 500);

function setAlturaDiv(){
    imagem.style.height = form.clientHeight + "px";
}

botao.addEventListener('click', function(e){
    if(!verificarVazio() && verificarNome() && verificarCPF() && verificaData() && verificarMatricula()){
        salvarBanco();
    }
})

qtd_matricula.addEventListener('change', function(e){
    if(qtd_matricula.value == 2){
        form_matricula2.classList.toggle('form-matricula2-hidden');
        setAlturaDiv();
    }
    else{
        form_matricula2.classList.toggle('form-matricula2-hidden');
        setAlturaDiv();
    }
})

function verificarVazio(){
    let n = nome.value;
    let c= String(cpf.value);
    let m1 = String(matricula1.value);

    if(n == '' || c == '' || m1 == ''){
        textoErro.innerHTML = "Os campos não podem ficar vazios";
        erro.classList.remove("erro-hidden");
        erro.classList.add("erro");
        return true;
    }
    if(qtd_matricula.value == 2){
        let m2 = String(matricula2.value);
        console.log("Campo da segunda matricula consta ativo no js");
        if(m2 == ''){
            textoErro.innerHTML = "Os campos não podem ficar vazios";
            erro.classList.remove("erro-hidden");
            erro.classList.add("erro");
            return true;
        }
    }

    erro.classList.remove("erro");
    erro.classList.add("erro-hidden");

    return false;
}
function verificarCPF(){
    let c = String(cpf.value);
    console.log(c);
    if(c.length != 11 || c.includes(".") || c.includes(",")){
        textoErro.innerHTML = "CPF inválido";
        erro.classList.remove("erro-hidden");
        erro.classList.add("erro");
        return false;
    }
    else{
        erro.classList.remove("erro");
        erro.classList.add("erro-hidden");
        return true;
    }
}
function verificaData(){
    if(data.value){
        return true;
    }
    else{
        textoErro.innerHTML = "Data de nascimento inválida";
        erro.classList.remove("erro-hidden");
        erro.classList.add("erro");
        return false;
    }
}
function verificarNome(){
    let n = nome.value;

    if(n.length < 7 || !n.includes(" ") || n.includes(".") || n.includes(",")){
        textoErro.innerHTML = "Nome inválido";
        erro.classList.remove("erro-hidden");
        erro.classList.add("erro");
        return false;
    }
    else{
        erro.classList.remove("erro");
        erro.classList.add("erro-hidden");
        return true;
    }
}
function verificarMatricula(){
    let m1 = matricula1.value;

    if(String(m1).length < 3 || String(m1).includes(".") || String(m1).includes(",")){
        textoErro.innerHTML = "Matrícula inválida";
        erro.classList.remove("erro-hidden");
        erro.classList.add("erro");
        return false;
    }
    
    if(qtd_matricula.value == 1) return true;

    let m2 = matricula2.value;

    if(String(m2).length < 3 || String(m2).includes(".") || String(m2).includes(",")){

        console.log("entendeu que o segundo campo de matricula esta habilitado");

        textoErro.innerHTML = "Matrícula inválida";
        erro.classList.remove("erro-hidden");
        erro.classList.add("erro");
        return false;
    }

    return true;
}
function salvarBanco(){
    let n = String(nome.value);
    let c = parseInt(cpf.value);
    let m1 = parseInt(matricula1.value);
    let data_nasc = data.value;

    if(qtd_matricula.value == 2){

        let m2 = parseInt(matricula2.value);
        let userRef = db.collection(sedu).doc(String(cpf.value));

        userRef.get().then((docSnapShot => {
            if(docSnapShot.exists){
                textoErro.innerHTML = "Solicitação já realizada para o CPF informado";
                erro.classList.remove("erro-hidden");
                erro.classList.add("erro");

                return false;
            }
            else{
                userRef.set({
                    Nome: n,
                    CPF: c,
                    DataNascimento: data_nasc,
                    Matricula1: m1,
                    Matricula2: m2,
                    Horario: Date.now(),
                }).then(()=>{
                    console.log("Alterações salvas no banco");
                    telaForm.style.display = "none";
                    telaEnviado.style.display = "flex";
                    telaEnviado.style.flexDirection = "row";
                    return true;
                }).catch(err=>console.log(err));
            }
        }));
    }
    else{
        let userRef = db.collection(sedu).doc(String(cpf.value));

        userRef.get().then((docSnapShot => {
            if(docSnapShot.exists){
                textoErro.innerHTML = "Solicitação já realizada para o CPF informado";
                erro.classList.remove("erro-hidden");
                erro.classList.add("erro");

                return false;
            }
            else{
                userRef.set({
                    Nome: n,
                    CPF: c,
                    DataNascimento: data_nasc,
                    Matricula1: m1,
                    Horario: Date.now(),
                }).then(()=>{
                    console.log("Alterações salvas no banco");
                    telaForm.style.display = "none";
                    telaEnviado.style.display = "flex";
                    telaEnviado.style.flexDirection = "row";
                    return true;
                }).catch(err=>console.log(err));
            }
        }));
        }
}
