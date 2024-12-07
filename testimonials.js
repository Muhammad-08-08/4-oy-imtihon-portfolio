document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/testimonials";
  const testimonialsContainer = document.getElementById("testimonials");
  const form = document.getElementById("testimonial-form");
  const nameInput = document.getElementById("name");
  const roleInput = document.getElementById("role");
  const messageInput = document.getElementById("message");
  const imageInput = document.getElementById("image");

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Xato: ${response.status}`);
      const data = await response.json();
      displayTestimonials(data);
    } catch (error) {
      console.error("Testimoniyalarni olishda xato:", error);
    }
  };

  const displayTestimonials = (data) => {
    testimonialsContainer.innerHTML = "";
    data.forEach((item) => {
      const testimonialCard = document.createElement("div");
      testimonialCard.classList.add(
        "bg-white",
        "p-4",
        "rounded-md",
        "shadow-md",
        "flex",
        "justify-between",
        "items-start",
        "gap-4"
      );

      const testimonialContent = document.createElement("div");
      testimonialContent.classList.add("w-3/4");
      testimonialContent.innerHTML = `
          <h3 class="text-lg font-bold text-gray-800">${item.name}</h3>
          <p class="text-gray-600 mt-2 font-semibold">${item.role}</p>
          <p class="text-gray-600 mt-2">${item.message}</p>
          <img src="${item.image}" alt="Rasm yuklanmagan" class="mt-4 rounded-md max-w-full">
        `;

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("flex", "flex-col", "gap-2");

      const editButton = document.createElement("button");
      editButton.textContent = "O'zgartirish";
      editButton.classList.add(
        "bg-yellow-500",
        "text-white",
        "px-4",
        "py-2",
        "rounded-md",
        "hover:bg-yellow-600"
      );
      editButton.addEventListener("click", () => editTestimonial(item));

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "O'chirish";
      deleteButton.classList.add(
        "bg-red-500",
        "text-white",
        "px-4",
        "py-2",
        "rounded-md",
        "hover:bg-red-600"
      );
      deleteButton.addEventListener("click", () => deleteTestimonial(item.id));

      buttonContainer.append(editButton, deleteButton);
      testimonialCard.append(testimonialContent, buttonContainer);
      testimonialsContainer.appendChild(testimonialCard);
    });
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const role = roleInput.value.trim();
    const message = messageInput.value.trim();
    const image = imageInput.value.trim();

    if (name && role && message && image) {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, role, message, image }),
        });
        if (!response.ok) throw new Error(`Xato: ${response.status}`);
        fetchTestimonials();
        form.reset();
      } catch (error) {
        console.error("Testimonial qo'shishda xato:", error);
      }
    } else {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
    }
  });

  const editTestimonial = async (item) => {
    const newName = prompt("Yangi ismni kiriting:", item.name);
    const newRole = prompt("Yangi rolni kiriting:", item.role);
    const newMessage = prompt("Yangi fikrni kiriting:", item.message);
    const newImage = prompt("Yangi rasm URL manzilini kiriting:", item.image);

    if (newName && newRole && newMessage && newImage) {
      try {
        const response = await fetch(`${API_URL}/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            role: newRole,
            message: newMessage,
            image: newImage,
          }),
        });
        if (!response.ok) throw new Error(`Xato: ${response.status}`);
        fetchTestimonials();
      } catch (error) {
        console.error("Testimonialni o'zgartirishda xato:", error);
      }
    }
  };

  const deleteTestimonial = async (id) => {
    if (confirm("Testimonialni o'chirishga ishonchingiz komilmi?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`Xato: ${response.status}`);
        fetchTestimonials();
      } catch (error) {
        console.error("Testimonialni o'chirishda xato:", error);
      }
    }
  };

  fetchTestimonials();
});
