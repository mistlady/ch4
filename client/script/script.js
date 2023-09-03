const submit = document.querySelector("#submit");
const userData = document.querySelectorAll(".UserData");
const userDataPost = userData[0];
const POST = document.querySelector("#POST");
const deleteTasks = document.querySelector("#delete");

const createTicketDomP = (id, img, comment) => {
  const ticket = document.createElement("div");
  ticket.classList.add("ticket");
  ticket.id = id;
  ticket.innerHTML = `<img src="${img}" id> <p>${comment}</p> <img src="./images/befJM.png" style="width: 30px; height: 40px;"> <img src="./images/comment.png" style="width: 30px; height: 40px;"><br> <input type="text" id="commentaire" placeholder="Enter comment"> <button >Submit</button> `;
  return ticket;
};

// http://localhost:3003/api/posts

let PD = [];
(async function () {
  try {
    const postdata = await fetch("http://localhost:3003/api/posts");
    PD = await postdata.json();

    PD.data.forEach((task) => {
      userDataPost.appendChild(
        createTicketDomP(task.id, task.img, task.comment)
      );
    });
  } catch (err) {
    console.error(err.message);
  }
})(PD, createTicketDomP);

submit.addEventListener("click", async () => {
  const data = POST.querySelector("input").value;

  const response = await fetch("http://localhost:3003/api/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ img: data }),
  });
});

deleteTasks.addEventListener("click", async () => {
  await fetch("http://localhost:3003/api/posts/all", {
    method: "DELETE",
  });

  location.reload();
});
