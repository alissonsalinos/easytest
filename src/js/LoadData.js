export default class LoadData {

    constructor(){
        this.getData = this.getData.bind(this);
        this.createLocalStorage = this.createLocalStorage.bind(this);
        this.fullName = document.querySelector("#fullname");
        this.email = document.querySelector("#email");
        this.cpf = document.querySelector("#cpf");
        this.mobile = document.querySelector("#mobile");
        this.validateUserName = this.validateUserName.bind(this);
        this.fullName.addEventListener("keydown", this.validateUserName);
        this.validateEmail = this.validateEmail.bind(this)
        this.email.addEventListener("keydown", this.validateEmail);
        this.cpfMask = this.cpfMask.bind(this);
        this.cpf.addEventListener("keydown", this.cpfMask);
        this.mobileMask = this.mobileMask.bind(this);
        this.mobile.addEventListener("keydown", this.mobileMask);
        this.checkAllInputs = this.checkAllInputs.bind(this);
        this.mobile.addEventListener("blur", this.checkAllInputs);
        this.cpf.addEventListener("blur", this.checkAllInputs);
        this.email.addEventListener("blur", this.checkAllInputs);
        this.fullName.addEventListener("blur", this.checkAllInputs);
        this.button = document.querySelector("#buttonAdd");
        this.addUser = this.addUser.bind(this);
        this.button.addEventListener("click", this.addUser)
        this.clearForm = this.clearForm.bind(this);
        this.getData();
        this.checkAllInputs();
    }

    async getData() {
        await fetch('https://private-21e8de-rafaellucio.apiary-mock.com/users')
            .then(res => res.json())
            .then((data) => {
                this.loadData = data;
                this.createLocalStorage();
            })
            .catch(error => console.log('ERROR'));        
    }

    createLocalStorage() {
        if (localStorage.getItem("users") != null && JSON.parse(localStorage.getItem("users")).length != 0)
            return false;
        localStorage.setItem('users', JSON.stringify(this.loadData));
    }

    validateUserName() {
        const name = document.querySelector("#fullname").value;
        const element = document.getElementsByClassName("error__name")[0]
        const inputElement = document.querySelector("#fullname")
        if (name.length < 2){
            element.classList.add("show")
            inputElement.style.borderBottomColor = '#eb4a46'
        } else {
            element.classList.remove("show")
            inputElement.style.borderBottomColor = '#efeeed'
        }
    }

    validateEmail() {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const emailValue = document.querySelector('#email').value;
        const element = document.querySelector('#email')
        if (!emailValue.match(validRegex)) {
            element.style.borderBottomColor = '#eb4a46'
            element.focus();
            return false;
        }
        element.style.borderBottomColor = '#efeeed'
    }

    cpfMask() {
        const cpfValue = document.querySelector('#cpf').value;
        const element = document.querySelector('#cpf');
        if(isNaN(cpfValue[cpfValue.length-1])){
            element.value = cpfValue.substring(0, cpfValue.length-1);
            return;
        }
        element.setAttribute("maxlength", "14");
        if (cpfValue.length == 3 || cpfValue.length == 7) element.value += ".";
        if (cpfValue.length == 11) element.value += "-";

    }

    mobileMask() {
        const mobileValue = document.querySelector('#mobile').value;
        const element = document.querySelector('#mobile');
        if(isNaN(mobileValue[mobileValue.length-1])){
            element.value = mobileValue.substring(0, mobileValue.length-1);
            return;
        }
        if (mobileValue.length === 1) element.value = "(" + element.value;
        if (mobileValue.length === 3) element.value += ") ";
        if(mobileValue[5] == 9){
            element.setAttribute("maxlength", "15");
            if (mobileValue.length === 10) element.value += "-";
        }else{
            element.setAttribute("maxlength", "14");
            if (mobileValue.length === 9) element.value += "-";
        }
    }

    checkAllInputs() {
        const button = document.querySelector('#buttonAdd');
        const userValue = {
            "fullname": document.querySelector('#fullname').value,
            "email": document.querySelector('#email').value,
            "cpf": document.querySelector('#cpf').value,
            "mobile": document.querySelector('#mobile').value,
        }
        if(userValue.fullname && userValue.email && userValue.cpf && userValue.mobile) {
            button.removeAttribute("disabled");
            button.classList.remove("disabled"); 
        } else {
            if (!button.hasAttribute("disabled")) {
                button.classList.add("disabled");
                button.setAttribute("disabled", "disabled");
            }
        }
    }

    clearForm(){
        document.getElementById("fullname").value = "";
        document.getElementById("cpf").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("email").value = "";
    }

    addUser(e) {
        e.preventDefault();
        const loadSpinner = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        const addText = document.querySelector('#addText');
        const button = document.querySelector('#buttonAdd');
        addText.style.display = 'none';
        button.innerHTML = loadSpinner;
        const newUser =  {
            "name": document.querySelector('#fullname').value,
            "cpf": document.querySelector('#cpf').value.replace('.','').replace('.','').replace('-',''),
            "phone": document.querySelector('#mobile').value.replace('(','').replace(')','').replace('-','').replace(' ',''),
            "email": document.querySelector('#email').value,
        }
        const oldUsers = JSON.parse(localStorage.getItem('users')) || [];
        oldUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(oldUsers));
        this.clearForm();
        setTimeout(() => {
            window.location.href = "http://127.0.0.1:8080/listar.html";
        }, 900);
    }
}
new LoadData();
