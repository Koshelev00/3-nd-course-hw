import { initAddClickListeners, answerClickListeners } from './listener.js'
export const renderComment = (comments) => {
    const ul = document.getElementById('comments')
    ul.innerHTML = comments
        .map((comment, index) => {
            let classButton = comment.liked ? 'active-like' : 'like-button'
            return `    
     <li class="comment"  data-index="${index}">
          <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${comment.date})}</div>
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
