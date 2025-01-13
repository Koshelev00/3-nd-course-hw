import { initAddClickListeners, answerClickListeners } from './listener.js'
import moment from '../node_modules/moment/dist/moment.js'

export const renderComment = (comments) => {
    const ul = document.getElementById('comments')
    ul.innerHTML = comments

        .map((comment, index) => {
            let classButton = comment.liked ? 'active-like' : 'like-button'
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
    initAddClickListeners()
    answerClickListeners()
}
