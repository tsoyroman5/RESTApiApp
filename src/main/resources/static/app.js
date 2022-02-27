let outputUserInfoBar = ''
let outputUsersInfoTable = ''
let outputRolesList = ''


function editUserModal(id) {
    fetch('http://localhost:8080/api/findUserById/' + id)
        .then(response => response.json())
        .then(user => {

            document.querySelector('.editIdForm').innerHTML = `
                <label for="editId">Enter Id: </label>
                <input class="form-control" readonly
                    style="width: 30vw; height: 4vh" type="text"
                    value="${user.id}" id="editId" name="id">`

            document.querySelector('.editNameForm').innerHTML = `
                <label for="editName">Enter name: </label>
                <input class="form-control" required
                    style="width: 30vw; height: 4vh" type="text"
                    value="${user.name}" name="name" id="editName">`

            document.querySelector('.editSurnameForm').innerHTML = `
                <label for="editSurname">Enter surname: </label>
                <input class="form-control" required
                    style="width: 30vw; height: 4vh" type="text"
                    value="${user.surname}" name="surname" id="editSurname"/>`

            document.querySelector('.editAgeForm').innerHTML = `
                <label class="form-label" for="editAge">Age</label>
                <input class="form-control" step="1" min="1"
                    max="120" style="width: 30vw; height: 4vh"
                    value="${user.age}" name="age" type="number" id="editAge"/>`

            document.querySelector('.editUsernameForm').innerHTML = `
                <label for="editUsername">Enter username: </label>
                <input class="form-control" required
                    style="width: 30vw; height: 4vh" type="text"
                    value="${user.username}" name="username" id="editUsername">`

            document.querySelector('.editPasswordForm').innerHTML = `
                <label for="editPassword">Enter password: </label>
                <input class=" form-control" required
                    style="width: 30vw; height: 4vh" type="password"
                    value="${user.password}" name="password" id="editPassword">`
        })
}

function deleteUserModal(id) {
    fetch('http://localhost:8080/api/findUserById/' + id)
        .then(response => response.json())
        .then(user => {

            let outputDeleteRoles = ''

            for (let i = 0; i < user.roles.length; i++) {
                outputDeleteRoles += `<option>${user.roles[i].name}</option>`
            }

            document.querySelector('.deleteIdForm').innerHTML = `
                <label for="deleteId">Enter Id: </label>
                <input class="form-control" readonly
                    style="width: 30vw; height: 4vh" type="text"
                    value="${user.id}" id="deleteId" name="id">`

            document.querySelector('.deleteNameForm').innerHTML = `
                <label for="deleteName">Enter name: </label>
                <input class="form-control" readonly
                    style="width: 30vw; height: 4vh" type="text"
                    value="${user.name}" name="name" id="deleteName">`

            document.querySelector('.deleteSurnameForm').innerHTML = `
                <label for="deleteSurname">Enter surname: </label>
                <input class="form-control" readonly
                    style="width: 30vw; height: 4vh" type="text"
                    value="${user.surname}" name="surname" id="deleteSurname"/>`

            document.querySelector('.deleteAgeForm').innerHTML = `
                <label class="form-label" for="deleteAge">Age</label>
                <input class="form-control" step="1" min="1" max="110" 
                style="width: 30vw; height: 4vh" type="number" readonly
                value="${user.age}" name="age" id="deleteAge"/>`

            document.querySelector('.deleteUsernameForm').innerHTML = `
                <label for="deleteUsername">Enter username: </label>
                <input class="form-control" readonly
                    style="width: 30vw; height: 4vh" type="text"
                    value="${user.username}" name="username" id="deleteUsername">`

            document.querySelector('.deletePasswordForm').innerHTML = `
                <label for="deletePassword">Enter password: </label>
                <input class="form-control" readonly
                style="width: 30vw; height: 4vh" type="password"
                value="${user.password}" name="password" id="deletePassword">`

            document.querySelector('.deleteRolesForm').innerHTML = outputDeleteRoles

        })
}

function showUsers(users) {

    users.forEach(user => {
        let rolesList = ''
        for (let i = 0; i < user.roles.length; i++) {
            rolesList += user.roles[i].name + ' '
        }

        outputUsersInfoTable += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.surname}</td>
                        <td>${user.age}</td>
                        <td>${user.username}</td>
                        <td>${rolesList}</td>
                        <td>
                            <button type="button" data-target="#editModal" class="btn btn-info" data-toggle="modal"
                                onclick="editUserModal(${user.id})">
                                    Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" data-target="#deleteModal" class="btn btn-danger" data-toggle="modal"
                                onclick="deleteUserModal(${user.id})">
                                    Delete
                            </button>
                        </td>
                    </tr>
            `
    })
    document.querySelector('.usersInfoTable').innerHTML = outputUsersInfoTable
}


// InfoBar
fetch('http://localhost:8080/api/showUser')
    .then(response => response.json())
    .then(user => {
        let rolesList = '';

        for (let i = 0; i < user.roles.length; i++) {
            rolesList += user.roles[i].name + ' '
        }

        outputUserInfoBar += `
            <div class="col text-nowrap text-light">
                ${user.username} with roles: ${rolesList}
            </div>
            <div class="col text-right">
                <a href="/logout" class="text-secondary">Logout</a>
            </div>
            `
        document.querySelector('.userInfoBar').innerHTML = outputUserInfoBar
    })


// Users table
fetch('http://localhost:8080/api/allUsers')
    .then(response => response.json())
    .then(users => {
        outputUsersInfoTable = ''
        showUsers(users)
    })


//All roles
fetch('http://localhost:8080/api/allRoles')
    .then(response => response.json())
    .then(roles => {
        roles.forEach(role => {
            outputRolesList += `
                    <option>
                        ${role.name}
                    </option>
                `
            document.querySelector('.rolesList').innerHTML = outputRolesList
            document.querySelector('.editUserRoles').innerHTML = outputRolesList
        })
    })


// New user
document.querySelector('.newUserForm').addEventListener('submit', (e) => {
    e.preventDefault()

    let userRoles = []

    let array = Array.from(document.getElementById('newUserRoleSelect').options)

    for (let i = 0; i < array.length; i++) {
        if (array[i].selected) {
            let role = {
                id: i + 1,
                name: array[i].value
            }
            userRoles.push(role)
        }
    }

    let user = {
        'name': document.getElementById('newUserName').value,
        'surname': document.getElementById('newUserSurname').value,
        'age': document.getElementById('newUserAge').value,
        'username': document.getElementById('newUserUsername').value,
        'password': document.getElementById('newUserPassword').value,
        'roles': userRoles
    }

    fetch('http://localhost:8080/api/newUser', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(users => {
            outputUsersInfoTable = ''
            showUsers(users)
        })
    location.replace("http://localhost:8080/admin")
})

// Edit user
document.querySelector('.editUserForm').addEventListener('submit', (e) => {
    e.preventDefault()

    let userRoles = []

    let array = Array.from(document.getElementById('editUserRoleSelect').options)

    for (let i = 0; i < array.length; i++) {
        if (array[i].selected) {
            let role = {
                id: i + 1,
                name: array[i].value
            }
            userRoles.push(role)
        }
    }

    let user = {
        'name': document.getElementById('editName').value,
        'surname': document.getElementById('editSurname').value,
        'age': document.getElementById('editAge').value,
        'username': document.getElementById('editUsername').value,
        'password': document.getElementById('editPassword').value,
        'roles': userRoles
    }

    fetch('http://localhost:8080/api/updateUser/' + document.getElementById('editId').value, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(users => {
            outputUsersInfoTable = ''
            showUsers(users)
            $('#editModal').modal('hide')
        })
})

// Delete user
document.querySelector('.deleteUserForm').addEventListener('submit', (e) => {

    e.preventDefault()

    fetch('http://localhost:8080/api/deleteUser/' + document.getElementById('deleteId').value, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(users => {
            outputUsersInfoTable = ''
            showUsers(users)
            $('#deleteModal').modal('hide')
        })
})

