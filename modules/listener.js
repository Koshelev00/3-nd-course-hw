import { comments } from './comments.js'
import { renderComment } from './renderComment.js'
import { escapeHtml } from './escapeHtml.js'
import { delay } from './delay.js'
import { postComment } from './api.js'

export const initAddClickListeners = () => {
    let likeButtonsElements = document.querySelectorAll('#Button')

    for (const likeButtonElements of likeButtonsElements) {
        likeButtonElements.addEventListener('click', (event) => {
            event.stopPropagation()
            likeButtonElements.className += ' loading-like'
            const index = event.target.dataset.index
            let comment = comments[index]
            delay(2000).then(() => {
                comment.likes = comment.isLiked
                    ? comment.likes - 1
                    : comment.likes + 1
                comment.isLiked = !comment.isLiked
                comment.isLikeLoading = false
                renderComment(comments)
            })
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

export const addComment = () => {
    let text = escapeHtml(document.getElementById('comment-textarea').value)
    let name = escapeHtml(document.getElementById('name-input').value)

    if (text && name) {
        document.querySelectorAll('.add-form')[0].style.display = 'none'
        document.querySelectorAll('.comments-discription')[0].style.display =
            'block'

        postComment()

        delay(2000).then(() => {
            comments.likes = comments.isLiked
                ? comments.likes - 1
                : comments.likes + 1
            comments.isLiked = !comments.isLiked
            comments.isLikeLoading = false
        })
    } else {
        alert('Все поля должны быть заполнены')
    }
}
