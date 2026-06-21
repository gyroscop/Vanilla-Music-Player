//  To change the theme of the app, create a toggleTheme function, which should set the data-theme attribute to dark or light, depending on its previous value.
(() => {
	const toggle = document.querySelector(".theme-toggle");
	if (!toggle) return;

	const root = document.documentElement;
	const textEl = toggle.querySelector(".toggle-text");

	const setTheme = (theme) => {
		root.dataset.theme = theme;
		if (theme === "dark") toggle.classList.add("active");
		else toggle.classList.remove("active");
		if (textEl) textEl.textContent = theme === "dark" ? "Dark" : "Light";
		try {
			localStorage.setItem("theme", theme);
		} catch (e) {
			console.error(e);
		}
	};

	// initialize from saved value (or from attribute)
	const saved = (function () {
		try {
			return localStorage.getItem("theme");
		} catch (e) {
			return null;
		}
	})();

	const initial = saved || root.dataset.theme || "light";
	setTheme(initial);

	toggle.addEventListener("click", () => {
		const next = root.dataset.theme === "dark" ? "light" : "dark";
		setTheme(next);
	});
})();
