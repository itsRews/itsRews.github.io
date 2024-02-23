async function waitForAllInit() {
    return new Promise(resolve => {
        const intervalId = setInterval(() => {
            if (typeof Engine !== 'undefined' && typeof Engine.hero !== 'undefined') {
                if (Engine.allInit === true) {
                    clearInterval(intervalId);
                    resolve();
                }
            }
            else {
                if (g.init === 5) {
                    setInterval(() => {
                        clearInterval(intervalId);
                        resolve();
                    }, 100);
                }
            }
        }, 100);
    });
}

(async () => {
    await waitForAllInit();
    if (typeof Engine !== 'undefined' && typeof Engine.hero !== 'undefined') {
      if (window.dad.config.get("lootlog")) {
        window.dad.config.set("lootlog", false)
        mAlert(`Automatycznie wyłączono zapisywanie lootów w Dodatku Globalnym. Chcesz odświeżyć grę teraz, czy  później?`, [{
                txt: "Teraz",
                callback: function() {
                    location.reload();
                }
            }, {
                txt: "Później",
                callback: function() {
                    return !0
                }
            }])
      }
    }
})();
