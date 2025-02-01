const host = ' https://wedev-api.sky.pro/api/v2/:alexey-koshelev'
const authHost = 'https://wedev-api.sky.pro/api/user'
let token = ''
export const setToken = (newToken) => {
    token = newToken
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

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
            name,
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
            return fetchComments()
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
       .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Неправильный логин или пароль')
            }
        })
       .then((data) => {
            setToken(data.token)
            return fetchComments()
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