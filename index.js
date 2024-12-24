import { comments } from './modules/comments.js'
import { renderComment } from './modules/renderComment.js'

import { addComment } from './modules/listener.js'
renderComment(comments)

const addButton = document.getElementById('add-form-button')

addButton.addEventListener('click', addComment)
