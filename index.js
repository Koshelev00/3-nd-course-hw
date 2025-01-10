import {comments, updateComments } from './modules/comments.js'
import { renderComment } from './modules/renderComment.js'
// import { addComment } from './modules/listener.js'


fetch('https://webdev-hw-api.vercel.app/api/v1/alexey-koshelev/comments')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        updateComments(data.comments)
        renderComment(comments)
    })
