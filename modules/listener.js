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

        document.getElementById('name-input').value = ''
        document.querySelectorAll('.add-form')[0].style.display = 'none'
        document.querySelectorAll('.comments-discription')[0].style.display =
            'block'

        fetch(
            'https://webdev-hw-api.vercel.app/api/v1/alexey-koshelev/comments/error',
            {
                method: 'POST',
                body: JSON.stringify(newComment),
            },
        )
            .then((response) => {
                if (response.status === 201) {
                    return response.json()
                } else {
                    if (response.status === 404) {
                        throw new Error('API не доступен')
                    }
                    if (response.status === 500) {
                        throw new Error('Сервер сломался, попробуй позже')
                    }
                    if (response.status === 400) {
                        throw new Error(
                            'Имя и комментарий должны быть не короче 3 символов',
                        )
                        
                        // Failed to fetch
                    } else {
                        throw new Error(
                            'Возникла какая-то ошибка',
                        )
                    }
                }
            })

            .then(() => {
                return fetchAndRenderComment()
            })

            .then(() => {})

            // delay(2000).then(() => {
            //     comments.likes = comments.isLiked
            //         ? comments.likes - 1
            //         : comments.likes + 1
            //     comments.isLiked = !comments.isLiked
            //     comments.isLikeLoading = false
            // })
            .catch((error) => {
                    
                if (error.message === 'Failed to fetch') {
                    alert('Ошибка подключения к интернету!');
                  } else {
                    alert(error.message);
                  }
            })
            .finally(() => {
                document.querySelectorAll('.add-form')[0].style.display =
                    'block'
                document.querySelectorAll(
                    '.comments-discription',
                )[0].style.display = 'none'

                document.getElementById('comment-textarea').value = ''
            })
    } else {
        alert('Все поля должны быть заполнены')
    }
}

addButton.addEventListener('click', addComment)
