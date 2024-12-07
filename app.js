document.addEventListener("DOMContentLoaded", () => {
  let title = document.querySelector(".text-h1");
  let subtitle = document.querySelector(".text-p");
  let editBtn = document.querySelector(".editBtn");
  let patchBtn = document.querySelector(".patchBtn");
  let homeImg = document.querySelector(".home-img");

  async function homedata() {
    try {
      let response = await fetch("http://localhost:3000/home");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();

      title.textContent = data[0].title;
      subtitle.textContent = data[0].subtitle;
      homeImg.src = data[0].heroImage;


      patchBtn.addEventListener("click", async () => {
        try {
          let fieldToUpdate = prompt(
            "Qaysi ma'lumotni o'zgartirmoqchisiz? 'title' yoki 'subtitle' deb yozing:"
          ).toLowerCase();
      
          if (fieldToUpdate !== "title" && fieldToUpdate !== "subtitle") {
            alert("Iltimos, faqat 'title' yoki 'subtitle' deb yozing!");
            return;
          }
      
          let newValue = prompt(
            `Yangi ${fieldToUpdate} qiymatini kiriting:`,
            data[0][fieldToUpdate]
          );
      
          if (!newValue) {
            alert("Iltimos, to'g'ri qiymat kiriting!");
            return;
          }
      
          let updatedData = {
            [fieldToUpdate]: newValue,
          };
      
          let updateResponse = await fetch(
            `http://localhost:3000/home/${data[0].id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            }
          );
      
          if (updateResponse.ok) {
            let updatedResponse = await fetch("http://localhost:3000/home");
            let updatedData = await updatedResponse.json();
      
            title.textContent = updatedData[0].title;
            subtitle.textContent = updatedData[0].subtitle;
      
            alert(`"${fieldToUpdate}" muvaffaqiyatli yangilandi: ${newValue}`);
          } else {
            throw new Error("Malumotni yangilashda xatolik yuz berdi!");
          }
        } catch (error) {
          console.error("Error updating data:", error);
        }
      });
      

      editBtn.addEventListener("click", async () => {
        try {
          let newTitle = prompt("Yangi sarlavhani kiriting:", data[0].title);
          let newSubtitle = prompt(
            "Yangi subtitleni kiriting:",
            data[0].subtitle
          );

          if (!newTitle || !newSubtitle) {
            alert("Iltimos, to'g'ri ma'lumot kiriting!");
            return;
          }

          let updatedData = {
            id: data[0].id,
            title: newTitle,
            subtitle: newSubtitle,
            heroImage: data[0].heroImage,
          };

          let updateResponse = await fetch(
            `http://localhost:3000/home/${data[0].id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            }
          );

          if (updateResponse.ok) {
            let updatedResponse = await fetch("http://localhost:3000/home");
            let updatedData = await updatedResponse.json();

            title.textContent = updatedData[0].title;
            subtitle.textContent = updatedData[0].subtitle;
          } else {
            alert("Malumotni yangilashda xatolik yuz berdi!");
          }
        } catch (error) {
          console.error("Error updating data:", error);
        }
      });

      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  homedata();
});
