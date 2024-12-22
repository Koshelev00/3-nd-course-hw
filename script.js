function escapeHtml(unsafe) {
  if (typeof unsafe !== "string") {
    return "";
  }
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const comments = [
  {
    name: "Глеб Фокин",
    text: "Это будет первый комментарий на этой странице",
    likes: 3,
    liked: false,
    dates: "12.02.22 12:18",
  },
  {
    name: "Варвара Н.",
    text: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    liked: false,
    dates: "13.02.22 19:22",
  },
];

const initAddClickListeners = () => {
  let likeButtonsElements = document.querySelectorAll("#Button");
  for (const likeButtonElements of likeButtonsElements) {
    likeButtonElements.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = event.target.dataset.index;
      let comment = comments[index];
      if (comment.liked) {
        if (comment.likes > 0) {
          comment.likes--;
          comment.liked = false;
        }
      } else {
        comment.likes++;
        comment.liked = true;
      }
      renderComment(comments);
    });
  }
};

function createCommentObject(name, text, likes, liked) {
  let now = moment().format("D.MM.YY HH:mm");
  return {
    name: name,
    text: text,
    likes: likes || 0,
    liked: liked || false,
    dates: now,
  };
}

document
  .getElementById("add-form-button")
  .addEventListener("click", function () {
    let commentText = escapeHtml(
      document.getElementById("comment-textarea").value
    );
    let nameText = document.getElementById("name-input").value;

    if (commentText && nameText) {
      const newComment = createCommentObject(nameText, commentText);
      commentText = "";
      document.getElementById("comment-textarea").value = "";
      nameText = "";
      document.getElementById("name-input").value = "";
      comments.push(newComment);
      renderComment(comments);
    } else {
      alert("Все поля должны быть заполнены");
    }
  });

const answerClickListeners = () => {
  let answerComments = document.querySelectorAll(".comment");
  for (const answerComment of answerComments) {
    answerComment.addEventListener("click", (event) => {
      const index = event.currentTarget.dataset.index;
      const comment = comments[index];
      document.getElementById(
        "comment-textarea"
      ).value = `> ${comment.name} ${comment.text} < \n`;
      document.getElementById("comment-textarea").focus();

      renderComment(comments);
    });
  }
};

function renderComment(comments) {
  const ul = document.getElementById("comments");
  ul.innerHTML = comments
    .map((comment, index) => {
      let classButton = comment.liked ? "active-like" : "like-button";
      return `    
 <li class="comment"  data-index="${index}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.dates}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="" id="number-like-${index}">${comment.likes}</span>
          <button class='${classButton}' id="Button" data-index="${index}"></button>
        </div>
      </div>
    </li>  
`;
    })
    .join("");
  initAddClickListeners();
  answerClickListeners();
}

renderComment(comments);
console.log("It works!");
/* <img src="." onerror="alert('ваши данные украдены');"> */
