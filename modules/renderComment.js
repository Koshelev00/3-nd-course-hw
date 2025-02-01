import { initAddClickListeners, answerClickListeners } from './listener.js'
import moment from '../node_modules/moment/dist/moment.js'
import { comments } from './comments.js'
import { renderLogin } from './renderLogin.js'
import { name, token } from './api.js'
import { addComment } from './listener.js'
// import { userToken } from './renderLogin.js'


export let userToken = localStorage.getItem('token')
    console.log(userToken)
    console.log(localStorage.getItem('token'))
export const renderComment = () => {
    const container = document.getElementById('container')
    const commentsHtml = comments

        .map((comment, index) => {
            let classButton = comment.isLiked ? 'active-like' : 'like-button'
            const dateString = comment.date
            let dateObj = new Date(dateString)
            let momentObj = moment(dateObj)
            let date = momentObj.format('D.MM.YY HH:mm')
            return `    
     <li class="comment"  data-index="${index}">
          <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="" id="number-like-${index}">${comment.likes}</span>
              <button class='${classButton}' id="Button" data-index="${index}"></button>
            </div>
          </div>
        </li>  
`
        })
        .join('')
    let userName = localStorage.getItem('name')
    
    const addCommentsHtml = `
            <p class="comments-discription">Комментарий добавляется...</p>
            
            <div class="add-form">
            
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    readonly
                    value="${userName}"
                    id="name-input"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"

                    placeholder="Введите ваш коментарий"
                    rows="4"
                    id="comment-textarea"
                ></textarea>
                <div class="add-form-row">
                <button class= "add-form-button logOut" id="logOut">Выйти</button>
                    <button class="add-form-button" id="add-form-button">
                        Написать
                    </button>
                </div>
            </div>`
    const linkToLoginText = `<p> Чтобы оправить комментарий, <span class="link-login" id= "link-login">войдите</span></p>`

    
    const baseHtml = `<ul id="comments" class="comments">${commentsHtml}</ul>
    
    
${userToken ? addCommentsHtml : linkToLoginText}`

    container.innerHTML = baseHtml
    const logOut = document.getElementById('logOut')
    
    if (userToken) {
        initAddClickListeners()
        answerClickListeners()

        const addButton = document.getElementById('add-form-button')
        addButton.addEventListener('click', addComment)

        logOut.addEventListener('click', () => {
            localStorage.clear()
            renderComment()
        })
    } else {
        const linkToLogin = document.getElementById('link-login')
        if (linkToLogin) {
            linkToLogin.addEventListener('click', () => {
                renderLogin()
            })
        }
    }
}