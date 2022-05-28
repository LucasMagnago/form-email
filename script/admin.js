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
const adm = "ADM"
//Variáveis
let pgLogin = document.getElementById('login-page');
let pgAdm = document.getElementById('adm-page');
let form = document.getElementById('form-container');
let user = document.getElementById('input-login');
let password = document.getElementById('input-senha');

form.addEventListener('submit', e => {
    e.preventDefault();

    verificaLogin();
});

async function verificaLogin(){
    let usuario = user.value;
    let senha = password.value;

    removeErros();
    
    let admSnapSt = db.collection(adm).doc(String(1));

    admSnapSt.get().then(doc => {
        let dados = doc.data();

        if(String(usuario) == String(dados.login) && String(senha) == String(dados.senha)){
            
            pgLogin.style.display = "none";
            pgAdm.style.display = "block";
            
            carregaBD();
        }
        else{
            criaErro(password, "Login e/ou senha incorretos");
            user.style.borderBottomColor = 'red';
            password.style.borderBottomColor = 'red';
            
            return false;
        }
    })

}

function carregaBD(){
    db.collection(sedu).get().then((snapShot) => {
        snapShot.forEach(doc =>{
            adicionaTabela(doc.data());
        })
    })
}

function adicionaTabela(obj){
    const tabela = document.querySelector('.tb');

    const dados = new Array;

    dados.push(formataData(obj.Horario));
    dados.push(obj.Nome);
    dados.push(obj.CPF);
    dados.push(formataData(obj.DataNascimento));
    dados.push(obj.Matricula1);
    dados.push(obj.Matricula2);
    dados.push(obj.Email); 

    const tr = criaTr();
    tr.classList.add("tr-data");

    dados.forEach(dado => {
        let td = criaTd(dado);
        tr.appendChild(td)
    })
    
    tabela.appendChild(tr);

}
function criaTr(){
    return tr = document.createElement('tr');
}
function criaTd(data){
    const td = document.createElement('td');

    //Verificando se a m2 é 0
    if(data == 0) return td;

    td.textContent = data;

    return td;
}
function formataData(dt){
    const data = new Date(dt);

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    return adicionaZero(dia) + '/' + adicionaZero(mes) + '/' + ano;
}
function adicionaZero(num){
    if(num < 10){
        return '0' + String(num);
    }
    else{
        return num;
    }
}

function criaErro(el, msg){
    let div = document.createElement('div');
    div.classList.add('error-msg');
    div.innerHTML = msg;
    el.insertAdjacentElement('afterend', div);
}

function removeErros(){
    for(let erro of form.querySelectorAll('.error-msg')){
        erro.remove();
    }
}