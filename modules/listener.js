import { comments, updateComments } from './comments.js'
import { renderComment } from './renderComment.js'
import { escapeHtml } from './escapeHtml.js'
import { createCommentObject } from './createCommentObject.js'
import { fetchAndRenderComment } from './fetchAndRenderComment.js'
export const initAddClickListeners = () => {
    let likeButtonsElements = document.querySelectorAll('#Button')
    for (const likeButtonElements of likeButtonsElements) {
        likeButtonElements.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = event.target.dataset.index
            let comment = comments[index]
            if (comment.liked) {
                if (comment.likes > 0) {
                    comment.likes--
                    comment.liked = false
                }
            } else {
                comment.likes++
                comment.liked = true
            }
            renderComment(comments)
        })
    }
}

export const answerClickListeners = () => {
    let answerComments = document.querySelectorAll('.comment')
    for (const answerComment of answerComments) {
        answerComment.addEventListener('click', (event) => {
            const index = event.currentTarget.dataset.index
            const comment = comments[index]
            document.getElementById('comment-textarea').value =
                `> ${comment.author.name} ${comment.text} < \n`
            document.getElementById('comment-textarea').focus()

            renderComment(comments)
        })
    }
}

const addButton = document.getElementById('add-form-button')



export const addComment = () => {
    let text = escapeHtml(document.getElementById('comment-textarea').value)
    let name = document.getElementById('name-input').value

    if (text && name) {
        const newComment = createCommentObject(name, text)
        document.getElementById('comment-textarea').value = ''
        document.getElementById('name-input').value = ''
        addButton.disabled=true
        addButton.textContent = "Отправка..."
        fetch('https://webdev-hw-api.vercel.app/api/v1/alexey-koshelev/comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
        })
            .then(() => {
                return  fetchAndRenderComment()
            })              
            .then(() => {
                addButton.disabled=false
                addButton.textContent = "Написать"
            }) 
}else {
        alert('Все поля должны быть заполнены')
    }
}

addButton.addEventListener('click', addComment)