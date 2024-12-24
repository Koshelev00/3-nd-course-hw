import moment from 'moment'
export const createCommentObject = (name, text, likes, liked) => {
    let now = moment().format('D.MM.YY HH:mm')
    return {
        name: name,
        text: text,
        likes: likes || 0,
        liked: liked || false,
        dates: now,
    }
}
