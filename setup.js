document.addEventListener("DOMContentLoaded", () => {
  let hero = document.querySelector(".hero");

  async function portfolioData() {
    try {
      let response = await fetch("http://localhost:3000/setup");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();

      hero.innerHTML = "";

      let container = document.createElement("div");
      container.classList.add("flex", "gap-8", "justify-center", "flex-wrap");

      data.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add(
          "bg-gray-800",
          "text-white",
          "p-4",
          "rounded-lg",
          "shadow-md",
          "w-[300px]"
        );

        let names = document.createElement("h2");
        names.classList.add("text-yellow-400", "text-lg", "font-bold", "mb-2");
        names.textContent = item.names;

        let bio = document.createElement("p");
        bio.classList.add("mb-1");
        bio.textContent = `Processor: ${item.bio}`;

        let ram = document.createElement("p");
        ram.classList.add("mb-1");
        ram.textContent = `RAM: ${item.ram}`;

        let hdd = document.createElement("p");
        hdd.classList.add("mb-1");
        hdd.textContent = `Storage: ${item.hdd}`;

        let display = document.createElement("p");
        display.classList.add("mb-1");
        display.textContent = `Display: ${item.display}`;

        let gpu = document.createElement("p");
        gpu.classList.add("mb-1");
        gpu.textContent = `GPU: ${item.gpu}`;

        let editBtn = document.createElement("button");
        editBtn.classList.add("btneditsetup");
        editBtn.textContent = "Edit";

        div.append(names, bio, ram, hdd, display, gpu);
        container.append(div, editBtn);

        editBtn.addEventListener("click", () => {
          let newBio = prompt("Yangi bio kiriting:", item.bio);
          let newRam = prompt("Yangi RAM kiriting:", item.ram);
          let newHDD = prompt("Yangi HDD kiriting:", item.hdd);
          let newDisplay = prompt("Yangi Display kiriting:", item.display);
          let newGPU = prompt("Yangi GPU kiriting:", item.gpu);

          fetch(`http://localhost:3000/setup/${item.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: item.id,
              bio: newBio,
              ram: newRam,
              hdd: newHDD,
              display: newDisplay,
              gpu: newGPU,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP xatosi! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((updatedData) => {
              console.log("Yangilangan ma'lumot:", updatedData);
              location.reload();
            })
            .catch((error) => {
              console.error("PUT xatosi:", error);
            });
        });
      });

      hero.append(container);
    } catch (error) {
      console.error(error);
    }
  }

  portfolioData();
});
