import { comments } from './comments.js'
import { renderComment } from './renderComment.js'
import { escapeHtml } from './escapeHtml.js'
import { createCommentObject } from './createCommentObject.js'
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
                `> ${comment.name} ${comment.text} < \n`
            document.getElementById('comment-textarea').focus()

            renderComment(comments)
        })
    }
}

export const addComment = () => {
    let commentText = escapeHtml(
        document.getElementById('comment-textarea').value,
    )
    let nameText = document.getElementById('name-input').value

    if (commentText && nameText) {
        const newComment = createCommentObject(nameText, commentText)
        document.getElementById('comment-textarea').value = ''
        document.getElementById('name-input').value = ''
        comments.push(newComment)
        renderComment(comments)
    } else {
        alert('Все поля должны быть заполнены')
    }
}
