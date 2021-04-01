class UsersList {
    constructor() {
        this.users = JSON.parse(localStorage.getItem("users"));
        this.loadUsers = this.loadUsers.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.loadUsers(this.users)
    }

    loadUsers(users) {
        let data = '';
        console.log(users)
        users.map((user, index) => {
            data += `
            <div id=user${index} class="users__card" key=${index}>
                <p>${user.name}</p>
                <p>${user.cpf}</p>
                <p>${user.email}</p>
                <p>${user.phone}</p>
                <div class="remove"><a onclick="page.removeUser(${index})" href="#">X</a></div>
            </div>
            `
        })

        document.querySelector('#container__users').innerHTML = data
    }

    removeUser(index) {
        console.log('remove o user:', index)
        this.users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(this.users));
        document.querySelector("#user"+index).classList.add('users__card--remove');
        setTimeout(() => {
            document.querySelector("#user"+index).style.display = 'none';
            this.loadUsers(this.users);
        }, 350);
    }

}

const page = new UsersList();
