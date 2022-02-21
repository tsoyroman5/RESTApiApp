
const userInfoBar = document.querySelector(".userInfoBar")
let output = ''

const userInfoUrl = 'http://localhost:8080/api/showUser'

fetch(userInfoUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            output += `
            <div class="col text-nowrap text-light">
                ${user.username} with roles: ${user.role}
            </div>
            <div class="col text-right">
                <a href="/logout" class="text-secondary">Logout</a>
            </div>
            `
        })
        userInfoBar.innerHTML = output
    })
