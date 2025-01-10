export const createCommentObject = (name, text, likes, liked) => {
    return {
        name: name,
        text: text,
        likes: likes || 0,
        liked: liked || false,
    }
}
