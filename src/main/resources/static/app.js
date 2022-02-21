const userInfoBar = document.querySelector('.userInfoBar')
const userInfoTable = document.querySelector('.userInfoTable')
const newUserForm = document.querySelector('.newUserForm')
const rolesList = document.querySelector('.rolesList')


let outputUserInfoBar = ''
let outputUserInfoTable = ''
let outputRolesList = ''


const userInfoUrl = 'http://localhost:8080/api/showUser'
const allUsersUrl = 'http://localhost:8080/api/allUsers'
const newUserUrl = 'http://localhost:8080/api/newUser'
const allRolesUrl = 'http://localhost:8080/api/allRoles'


// InfoBar
fetch(userInfoUrl)
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
        userInfoBar.innerHTML = outputUserInfoBar


    })


// Users table
fetch(allUsersUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            let rolesList = ''

            for (let i = 0; i < user.roles.length; i++) {
                rolesList += user.roles[i].name + ' '
            }

            outputUserInfoTable += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.surname}</td>
                        <td>${user.age}</td>
                        <td>${user.username}</td>
                        <td>${rolesList}</td>
                        <td>
                            <button type="button" data-target="#edit" class="btn btn-info" data-toggle="modal">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" data-target="#delete" class="btn btn-danger" data-toggle="modal">
                                Delete
                            </button>
                        </td>
                    </tr>
            `
            userInfoTable.innerHTML = outputUserInfoTable
        })
    })


//All roles
fetch(allRolesUrl)
    .then(response => response.json())
    .then(roles => {
        roles.forEach(role => {
            outputRolesList += `
                    <option>
                        ${role.name}
                    </option>
                `
            rolesList.innerHTML = outputRolesList
        })
    })


// New user form
newUserForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(newUserUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            name: document.getElementById('newUserName').value,
            surname: document.getElementById('newUserSurname').value,
            age: document.getElementById('newUserAge').value,
            username: document.getElementById('newUserUsername').value,
            password: document.getElementById('newUserPassword').value,
            roles: [
                {
                    id: (document.getElementById('roleSelect').value === "ADMIN") ? 1 : 2,
                    name: document.getElementById('roleSelect').value
                }
            ]
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(onmessageerror => console.log(onmessageerror))
})
