(function ($) {
  $(document).ready(function () {
    console.log("Document ready");

    // Variable pour éviter de lancer plusieurs fois les confettis
    let confettiLaunched = false;

    // Pour l'éditeur classique
    $("#publish, #save-post").on("click", function () {
      console.log("Bouton 'Update' ou 'Publish' classique cliqué");
      localStorage.setItem("PendingConfettis", "true");
    });

    // Pour Gutenberg
    if (typeof wp !== "undefined" && typeof wp.data !== "undefined") {
      console.log("Gutenberg détecté");

      wp.data.subscribe(function () {
        const isSavingPost = wp.data.select("core/editor").isSavingPost();
        const isAutosavingPost = wp.data.select("core/editor").isAutosavingPost();
        const isPublished = wp.data.select("core/editor").didPostSaveRequestSucceed();

        // console.log("isSavingPost:", isSavingPost);
        // console.log("isAutosavingPost:", isAutosavingPost);
        // console.log("isPublished:", isPublished);

        // Lance les confettis seulement si le post est sauvegardé avec succès et que ce n'est pas déjà fait
        if (isSavingPost && !isAutosavingPost && isPublished && !confettiLaunched) {
          console.log("Post enregistré avec succès dans Gutenberg");
          localStorage.setItem("PendingConfettis", "true");

          // Lance les confettis
          launchConfetti();

          // Réinitialiser le localStorage après l'animation
          localStorage.removeItem("PendingConfettis");
          console.log("Confettis lancés immédiatement après la sauvegarde dans Gutenberg");

          // Marquer que les confettis ont déjà été lancés
          confettiLaunched = true;
        }
      });
    } else {
      console.log("Gutenberg non détecté");
    }

    // Fonction pour lancer les confettis
    function launchConfetti() {
      console.log("Lancement des confettis");
      confetti({
        particleCount: 250,
        startVelocity: 50,
        spread: 100,
        origin: {
          x: Math.random(),
          // since they fall down, start a bit higher than random
          y: Math.random() - 0.1,
        },
      });
      setTimeout(function () {
        confetti({
          particleCount: 250,
          startVelocity: 50,
          spread: 100,
          origin: {
            x: Math.random(),
            // since they fall down, start a bit higher than random
            y: Math.random() - 0.1,
          },
        });

        setTimeout(function () {
          confetti({
            particleCount: 250,
            startVelocity: 50,
            spread: 100,
            origin: {
              x: Math.random(),
              // since they fall down, start a bit higher than random
              y: Math.random() - 0.1,
            },
          });
          setTimeout(function () {
            confetti({
              particleCount: 250,
              startVelocity: 50,
              spread: 100,
              origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.1,
              },
            });
          }, 250);
        }, 250);
      }, 250);
    }

    // Vérifie le local storage lors du chargement de la page
    const pendingConfettisOnLoad = localStorage.getItem("PendingConfettis");
    console.log("Vérification du local storage au chargement : PendingConfettis =", pendingConfettisOnLoad);

    if (pendingConfettisOnLoad === "true") {
      launchConfetti();
      localStorage.removeItem("PendingConfettis");
      console.log("Confettis lancés au chargement et PendingConfettis réinitialisé");
    }
  });
})(jQuery);
