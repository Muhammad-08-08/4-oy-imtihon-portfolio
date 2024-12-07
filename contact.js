document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/contact";
  const contactsContainer = document.getElementById("contacts");
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  const fetchContacts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Xato: ${response.status}`);
      const data = await response.json();
      displayContacts(data);
    } catch (error) {
      console.error("Kontaktlarni olishda xato:", error);
      contactsContainer.innerHTML = `<p class="text-gray-600">Hozircha hech qanday kontakt mavjud emas.</p>`;
    }
  };

  const displayContacts = (data) => {
    contactsContainer.innerHTML = "";
    if (data.length === 0) {
      contactsContainer.innerHTML = `<p class="text-gray-600">Hozircha hech qanday kontakt mavjud emas.</p>`;
    } else {
      data.forEach((item) => {
        const contactCard = document.createElement("div");
        contactCard.classList.add(
          "bg-white",
          "p-4",
          "rounded-md",
          "shadow-md",
          "flex",
          "justify-between",
          "items-start"
        );

        const contactContent = document.createElement("div");
        contactContent.innerHTML = `
                  <h3 class="text-lg font-bold text-gray-800">${
                    item.name || "Ism yo'q"
                  }</h3>
                  <p class="text-gray-600"><strong>Email:</strong> ${
                    item.email
                  }</p>
                  <p class="text-gray-600"><strong>Telefon:</strong> ${
                    item.phone
                  }</p>
                  <p class="text-gray-600"><strong>Manzil:</strong> ${
                    item.address
                  }</p>
                  <p class="text-gray-600 mt-2"><strong>Map Link:</strong> <a href="${
                    item.mapLink
                  }" target="_blank">${item.mapLink}</a></p>
                `;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("flex", "gap-2");

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
        editButton.addEventListener("click", () => editContact(item));

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
        deleteButton.addEventListener("click", () => deleteContact(item.id));

        buttonContainer.append(editButton, deleteButton);
        contactCard.append(contactContent, buttonContainer);
        contactsContainer.appendChild(contactCard);
      });
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    if (name && email && phone && message) {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address: "123 Developer Lane",
            mapLink: "https://maps.google.com",
          }),
        });

        if (!response.ok) throw new Error(`Xato: ${response.status}`);
        fetchContacts();
        form.reset();
      } catch (error) {
        console.error("Kontakt qo'shishda xato:", error);
      }
    } else {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
    }
  });

  const editContact = async (item) => {
    const newName = prompt("Yangi ismni kiriting:", item.name);
    const newEmail = prompt("Yangi emailni kiriting:", item.email);
    const newPhone = prompt("Yangi telefonni kiriting:", item.phone);
    const newMessage = prompt("Yangi xabarni kiriting:", item.message);

    if (newName && newEmail && newPhone && newMessage) {
      try {
        const response = await fetch(`${API_URL}/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            email: newEmail,
            phone: newPhone,
            message: newMessage,
          }),
        });

        if (!response.ok) throw new Error(`Xato: ${response.status}`);
        fetchContacts();
      } catch (error) {
        console.error("Kontaktni o'zgartirishda xato:", error);
      }
    }
  };

  const deleteContact = async (id) => {
    if (confirm("Kontaktni o'chirishga ishonchingiz komilmi?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`Xato: ${response.status}`);
        fetchContacts();
      } catch (error) {
        console.error("Kontaktni o'chirishda xato:", error);
      }
    }
  };

  fetchContacts();
});
