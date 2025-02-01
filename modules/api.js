import { createCommentObject } from './createCommentObject.js'
import { escapeHtml } from './escapeHtml.js'
import { fetchAndRenderComment } from './fetchAndRenderComment.js'
const host = ' https://wedev-api.sky.pro/api/v2/:alexey-koshelev'
const authHost = 'https://wedev-api.sky.pro/api/user'
export let token = ''
export const setToken = (newToken) => {
    token = newToken
}
export let name = ''
export const setName = (newName) => {
    name = newName
}

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => res.json())
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.data),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })
            return appComments
        })
}
let error500Flag = false

export const postComment = (text, name) => {
        text = escapeHtml(document.getElementById('comment-textarea').value)
        name = escapeHtml(document.getElementById('name-input').value)
    const newComment = createCommentObject(name, text)


    return fetch( 'https://wedev-api.sky.pro/api/v2/alexey-koshelev/comments', {
        
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name:newComment.name,
                text:newComment.text,
              
            }),
        })
    
        .then((response) => {
            if (response.status === 201) {
                document.getElementById('comment-textarea').value = ''
                document.getElementById('name-input').value = ''
                error500Flag = false
                document.querySelectorAll(
                    '.comments-discription',
                )[0].style.display = 'none'
                document.querySelectorAll('.add-form')[0].style.display =
                    'block'

                return response.json()
            } else {
                if (response.status === 400) {
                    throw new Error(
                        'Имя и комментарий должны быть не короче 3 символов',
                    )
                }
                if (response.status === 404) {
                    throw new Error('API не доступен')
                }
                if (response.status === 500) {
                    throw new Error('Сервер сломался, попробуй позже')
                }
                console.log(response.status)
                throw new Error('Ошибка при отправке комментария')
            }
        })
        .then(() => {
            return fetchAndRenderComment()
        })

        .catch((error) => {
            if (
                error.message === 'Сервер сломался, попробуй позже' &&
                error500Flag === true
            ) {
                return addComment()
            }
            if (
                error500Flag === false &&
                error.message === 'Сервер сломался, попробуй позже'
            ) {
                alert(error.message)
                console.error(error.message)
                error500Flag = true
                return addComment()
            } else if (error instanceof TypeError) {
                alert('Кажется, у вас сломался интернет, попробуйте позже')
            } else {
                alert(error.message)
            }

            document.querySelectorAll(
                '.comments-discription',
            )[0].style.display = 'none'
            document.querySelectorAll('.add-form')[0].style.display =
                'block'
        })
}

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',

        body: JSON.stringify({
            login,
            password,
        }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',

        body: JSON.stringify({
            name: name,
            login: login,
            password: password,
        }),
    })
}
