const userInfoBar = document.querySelector(".userInfoBar")
const userInfoTable = document.querySelector('.userInfoTable')

let outputInfoBar = ''
let outputUserInfoTable = ''

const userInfoUrl = 'http://localhost:8080/api/showUser'

fetch(userInfoUrl)
    .then(response => response.json())
    .then(user => {
        let rolesList = '';

        for (let i = 0; i < user.roles.length; i++) {
            rolesList += user.roles[i].name + ' '
        }

        // User info bar
        outputInfoBar += `
            <div class="col text-nowrap text-light">
                ${user.username} with roles: ${rolesList}
            </div>
            <div class="col text-right">
                <a href="/logout" class="text-secondary">Logout</a>
            </div>
            `
        userInfoBar.innerHTML = outputInfoBar

        // User info table
        outputUserInfoTable += `
            <thead class="thead-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Age</th>
                                <th scope="col">Username</th>
                                <th scope="col">Roles</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>${user.id}</td>
                                <td>${user.name}</td>
                                <td>${user.surname}</td>
                                <td>${user.age}</td>
                                <td>${user.username}</td>
                                <td>${rolesList}</td>
                            </tr>
                            </tbody>
            `
        userInfoTable.innerHTML = outputUserInfoTable
    })
