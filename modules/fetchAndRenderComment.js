import { comments, updateComments } from './comments.js'
import { renderComment } from './renderComment.js'

export let fetchAndRenderComment = () => {
    return fetch(
        'https://webdev-hw-api.vercel.app/api/v1/alexey-koshelev/comments',
    )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComment(comments)
        })
}
