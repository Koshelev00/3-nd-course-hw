import { comments, updateComments } from './comments.js'
import { renderComment } from './renderComment.js'

export let initionFetchAndRenderComment = () => {
    return fetch(
        'https://wedev-api.sky.pro/api/v2/alexey-koshelev/comments',
    )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            document.querySelectorAll(".preloader__description")[0].style.display = "none";
            updateComments(data.comments)
            renderComment(comments)
        })
}
