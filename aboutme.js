document.addEventListener("DOMContentLoaded", () => {
  let hero = document.querySelector(".hero");

  async function homedata() {
    try {
      let response = await fetch("http://localhost:3000/aboutme");
      if (!response.ok) {
        throw new Error(`HTTP xatosi! Status: ${response.status}`);
      }

      let data = await response.json();

      hero.innerHTML = "";

      data.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add("hero1-aboutme");

        let tit_sub = document.createElement("div");
        tit_sub.classList.add("hero2-aboutme");

        let imgdiv = document.createElement("div");
        imgdiv.classList.add("imgdiv");

        let img = document.createElement("img");
        img.classList.add("aboutme-img");
        img.src = item.image;

        let itemTitle = document.createElement("h2");
        itemTitle.classList.add("aboutme-title");
        itemTitle.textContent = item.title;

        let itemSubtitle1 = document.createElement("p");
        itemSubtitle1.classList.add("aboutme-subtitle");
        itemSubtitle1.textContent = item.subtitle1;

        let itemSubtitle2 = document.createElement("p");
        itemSubtitle2.classList.add("aboutme-subtitle");
        itemSubtitle2.textContent = item.subtitle2;

        let editBtn = document.createElement("button");
        editBtn.classList.add("editBtn");
        editBtn.textContent = "edit";

        editBtn.addEventListener("click", () => {
          let newSubtitle1 = prompt(
            "Yangi subtitle1 kiriting:",
            item.subtitle1
          );
          let newTitle = prompt("Yangi title kiriting:", item.title);
          let newSubtitle2 = prompt(
            "Yangi subtitle2 kiriting:",
            item.subtitle2
          );

          if (newSubtitle1 && newTitle && newSubtitle2) {
            fetch(`http://localhost:3000/aboutme/${item.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                image: item.image,
                subtitle1: newSubtitle1,
                title: newTitle,
                subtitle2: newSubtitle2,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP xatosi! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((updatedItem) => {
                console.log("Yangilangan ma'lumot:", updatedItem);
                location.reload();
              })
              .catch((error) => {
                console.error("PUT so'rovida xato yuz berdi:", error);
              });
          } else {
            alert("Iltimos, barcha maydonlarni to'ldiring!");
          }
        });

        imgdiv.append(img);
        tit_sub.append(itemSubtitle1, itemTitle, itemSubtitle2, editBtn);
        div.append(imgdiv, tit_sub);
        hero.append(div);
      });
    } catch (error) {
      console.error("Ma'lumotlarni olishda xato yuz berdi:", error);
    }
  }

  homedata();
});
