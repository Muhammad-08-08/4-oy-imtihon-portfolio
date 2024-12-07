document.addEventListener("DOMContentLoaded", () => {
  let hero = document.querySelector(".hero");

  async function portfolioData() {
    try {
      let response = await fetch("http://localhost:3000/portfolio");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();
      console.log(data);

      hero.innerHTML = "";

      data.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add("hero1");

        let tit_sub = document.createElement("div");
        tit_sub.classList.add("hero2");

        let itemTitle = document.createElement("h2");
        itemTitle.className = "portfolio-title";
        itemTitle.textContent = item.title;
        itemTitle.classList.add("title");

        let itemSubtitle = document.createElement("p");
        itemSubtitle.className = "portfolio-subtitle";
        itemSubtitle.textContent = item.description;
        itemSubtitle.classList.add("description");

        console.log(item);

        let itemImg = document.createElement("img");
        itemImg.className = "portfolio-img w-[700px]";
        itemImg.src = item.image;

        let edit_del = document.createElement("div");
        edit_del.classList.add("edit-del");

        let editBtn = document.createElement("button");
        editBtn.textContent = "edit";
        editBtn.classList.add("editBtn");

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.classList.add("deleteBtn");

        edit_del.append(editBtn, deleteBtn);
        div.append(itemImg, tit_sub);
        tit_sub.append(itemTitle, itemSubtitle, edit_del);
        hero.append(div);

        deleteBtn.addEventListener("click", async () => {
          try {
            let response = await fetch(
              `http://localhost:3000/portfolio/${item.id}`,
              {
                method: "DELETE",
              }
            );
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            location.reload();
          } catch (error) {
            console.error(error);
          }
        });

        editBtn.addEventListener("click", () => {
          let newTitle = prompt("Yangi title kiriting:", item.title);
          let newDescription = prompt(
            "Yangi description kiriting:",
            item.description
          );
          let newImage = prompt("Yangi image kiriting:", item.image);
          fetch(`http://localhost:3000/portfolio/${item.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: newTitle,
              description: newDescription,
              image: newImage,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              location.reload();
            })
            .catch((error) => {
              console.error(error);
            });
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
  portfolioData();
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("ishladi");

    let image = event.target.image.value;
    let title = event.target.title.value;
    let description = event.target.description.value;

    await fetch("http://localhost:3000/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        title,
        description,
      }),
    });

    const response = await fetch("http://localhost:3000/portfolio");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    container.innerHTML = "";
    console.log(data, "data");

    data.forEach((item) => {
      console.log(item, "item");

      let div = document.createElement("div");
      div.classList.add("hero1");

      let tit_sub = document.createElement("div");
      tit_sub.classList.add("hero2");

      let itemTitle = document.createElement("h2");
      itemTitle.className = "portfolio-title";
      itemTitle.textContent = item.title;

      let itemSubtitle = document.createElement("p");
      itemSubtitle.textContent = item.description;

      let itemImg = document.createElement("img");
      itemImg.src = item.image;

      let edit_del = document.createElement("div");
      edit_del.classList.add("edit-del");

      let editBtn = document.createElement("button");
      editBtn.textContent = "edit";
      editBtn.classList.add("editBtn");

      tit_sub.appendChild(itemTitle);
      tit_sub.appendChild(itemSubtitle);
      div.appendChild(tit_sub);
      div.appendChild(itemImg);
      div.appendChild(edit_del);
      edit_del.appendChild(editBtn);

      container.appendChild(div);
    });
  });
});
