    const scriptURL = "https://script.google.com/macros/s/AKfycbxt62pUN0SSipbcRErFKLb-M3pkkrSUlyGcbGVwf5ylb_ndjxVcyPBxrihoF2UfsL7o/exec";

    const form = document.getElementById("donForm");
    const messageBox = document.getElementById("formMessage");
    const submitBtn = document.getElementById("submitBtn");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      messageBox.className = "message";
      messageBox.textContent = "";
      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi en cours...";

      const formData = {
        typeDon: document.getElementById("typeDon").value,
        description: document.getElementById("description").value,
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
      };

      try {
        const response = await fetch(scriptURL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
          messageBox.textContent = "Merci, votre proposition de don a bien été envoyée.";
          messageBox.className = "message success";
          form.reset();
        } else {
          throw new Error(result.message || "Erreur lors de l'envoi.");
        }
      } catch (error) {
        messageBox.textContent = "Une erreur est survenue. Merci de réessayer.";
        messageBox.className = "message error";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Envoyer";
      }
    });