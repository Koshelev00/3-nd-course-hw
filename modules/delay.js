// import { renderComment } from './renderComment.js'
// import { comments, updateComments } from './comments.js'

export function delay(interval = 300) {
   return new Promise((resolve) => {
      setTimeout(() => {
      resolve();
      }, interval);
   });
}