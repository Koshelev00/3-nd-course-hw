import { comments, updateComments } from './comments.js'
import { renderComment } from './renderComment.js'
import { escapeHtml } from './escapeHtml.js'
import { createCommentObject } from './createCommentObject.js'
import { fetchAndRenderComment } from './fetchAndRenderComment.js'
import { delay } from './delay.js'
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

const addButton = document.getElementById('add-form-button')

export const addComment = () => {
    let text = escapeHtml(document.getElementById('comment-textarea').value)
    let name = document.getElementById('name-input').value

    if (text && name) {
        const newComment = createCommentObject(name, text)
        document.getElementById('comment-textarea').value = ''
        document.getElementById('name-input').value = ''
        document.querySelectorAll('.add-form')[0].style.display = 'none'
        document.querySelectorAll('.comments-discription')[0].style.display =
            'block'

        fetch(
            'https://webdev-hw-api.vercel.app/api/v1/alexey-koshelev/comments',
            {
                method: 'POST',
                body: JSON.stringify(newComment),
            },
        )
            .then(() => {
                return fetchAndRenderComment()
            })

            .then(() => {
                document.querySelectorAll(
                    '.comments-discription',
                )[0].style.display = 'none'
                document.querySelectorAll('.add-form')[0].style.display =
                    'block'
            })
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

addButton.addEventListener('click', addComment)
