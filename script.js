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

let nome = document.getElementById("nome");
let cpf = document.getElementById("cpf");
let matricula = document.getElementById("matricula")
let botao = document.getElementById("submit");


botao.addEventListener('click', function(e){
    if(!verificarVazio() && verificarNome() && verificarCPF() && verificarMatricula() && !jaCadastrado()){
        // salvarBanco();
    }
})

async function espera(){
    let cadastro = await db.collection(sedu).where("CPF", "==", "16721298775").get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            return doc.data();
        })
})
}

let esperar = espera();

console.log(esperar);

// function verificarVazio(){
//     let n = nome.value;
//     let c= String(cpf.value);

//     if(n == '' || c == ''){
//         alert("Os campos não podem ficar vazios");
//         return true;
//     }
//     else{
//         return false;
//     }
// }
// function verificarCPF(){
//     let c = String(cpf.value);

//     if(c.length != 11){
//         alert("CPF inválido");

//         return false;
//     }
//     else{
//         return true;
//     }
// }
// function verificarNome(){
//     let n = nome.value;

//     if(n.length < 7 || !n.includes(" ")){
//         alert("Nome inválido");

//         return false;
//     }
//     else{
//         return true;
//     }
// }
// function verificarMatricula(){
//     let m = matricula.value;

//     if(String(m).length < 3){
//         alert("Matrícula inválida")
//         return false;
//     }
//     else{
//         return true;
//     }
// }
// async function jaCadastrado(){
//     let c = parseInt(cpf.value);

//     let cadastros = new Array();

//     let consultaBanco = new Promise(function(resolve, reject){
//         db.collection(sedu).get().then((snapshot)=>{
//             snapshot.forEach((doc)=>{
//                 if(parseInt(doc.id) == cpf){
//                     resolve(true);
//                 }
//             })});
//     });

//     console.log("antes do await");

//     let temCadastro = await consultaBanco;
//     console.log(temCadastro);
//     console.log("após do await");

//     if(temCadastro){
//         alert("O CPF informado já realizou a solicitação do e-mail");
//         console.log(temCadastro);
//         return true;
//     }
//     else{
//         console.log(temCadastro);
//         return false;
//     }
// }
// function salvarBanco(){
//     let n = String(nome.value);
//     let c = parseInt(cpf.value);
//     let m = parseInt(matricula.value);

//     db.collection(sedu).doc(String(c)).set({
//         Nome: n,
//         CPF: c,
//         Matricula: m
//     }).then(()=>console.log("Alterações salvas no banco")).catch(err=>console.log(err));
// }