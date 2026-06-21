// Create an array to store all the songs. Each song is represented as an object with id, name, artist, img, genre, and source as its properties.

const allSongs = [
	{
		id: 1,
		name: "Ejak Borokhune",
		artist: "Zubeen Garg",
		genre: "Rock",
		source: `<iframe
				data-testid="embed-iframe"
				style="border-radius:12px"
				src="https://open.spotify.com/embed/track/2Gq7DRyKUyI4E2w4hIDNpx?utm_source=generator&si=143f50095fb44b05"
				width="100%"
				height="352"
				frameBorder="0"
				allowfullscreen=""
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
			></iframe>`,
	},

	{
		id: 2,
		name: "Soku Meli Sawte",
		artist: "Zubeen Garg",
		genre: "Rock",
		source: `<iframe
				data-testid="embed-iframe"
				style="border-radius:12px"
				src="https://open.spotify.com/embed/track/3RctWPd3MeYE9a6ydjbRgG?utm_source=generator&si=4c4c51be74c44aee"
				width="100%"
				height="352"
				frameBorder="0"
				allowfullscreen=""
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
			></iframe>`,
	},

	{
		id: 3,
		name: "Bohona",
		artist: "Abhi Saikia",
		genre: "pop",
		source: `<iframe
				data-testid="embed-iframe"
				style="border-radius:12px"
				src="https://open.spotify.com/embed/track/3zRDabg08kazCi4w6sLuGy?utm_source=generator&si=2464361d83ed4b96"
				width="100%"
				height="352"
				frameBorder="0"
				allowfullscreen=""
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
			></iframe>`,
	},

	{
		id: 4,
		name: "Gamkharu Thuria",
		artist: "Pinky Medhi",
		genre: "Hip-Hop",
		source: `<iframe
				data-testid="embed-iframe"
				style="border-radius:12px"
				src="https://open.spotify.com/embed/track/4O68b68FoWt5w159RvvLQy?utm_source=generator&si=48a63bbe90a549ce"
				width="100%"
				height="352"
				frameBorder="0"
				allowfullscreen=""
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
			></iframe>`,
	},

	{
		id: 5,
		name: "Roi Roi Binale",
		artist: "Zubeen Garg",
		genre: "Jazz",
		source: `<iframe
				data-testid="embed-iframe"
				style="border-radius:12px"
				src="https://open.spotify.com/embed/track/1ZVdPkrBuirjOhLvuy5YbE?utm_source=generator&si=2792ea2973fb4b18"
				width="100%"
				height="352"
				frameBorder="0"
				allowfullscreen=""
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
			></iframe>`,
	},
];

//  For the songs section, create a function showSongs to render the list of songs depending on the currently selected genre. If no genre is selected, it should render all the songs.
const rockSongs = [];
const popSongs = [];
const jazzSongs = [];
const hiphopSongs = [];
const songList = document.querySelector(".song-list");
const genreSelect = document.getElementById("genre-select");
const coverImage = document.querySelector(".cover-image");
const trackTitle = document.querySelector(".track-title");
const trackArtist = document.querySelector(".track-artist");
const addToPlaylistButton = document.querySelector(".playlist-btn");
const playlistModal = document.getElementById("playlistModal");
const playlistOptions = document.querySelector(".playlist-options");
const playlistMessage = document.querySelector(".playlist-message");
const modalClose = document.querySelector(".modal-close");
const modalOverlay = document.querySelector(".playlist-modal__overlay");
const playlistNameInput = document.getElementById("playlistNameInput");
const createPlaylistButton = document.getElementById("createPlaylistBtn");
const playlistListContainer = document.querySelector(".playlist-list");
const playlistButtons = document.querySelectorAll(".playlist-list button");
const currentPlaylistLabel = document.querySelector(".current-playlist");
const prevButton = document.getElementById("prevBtn");
const playButton = document.getElementById("playBtn");
const nextButton = document.getElementById("nextBtn");

let currentVisibleSongs = allSongs;

const playlists = [
	{ id: "chill-vibes", name: "Chill Vibes", items: [] },
	{ id: "workout", name: "Workout", items: [] },
	{ id: "favorites", name: "Favorites", items: [] },
];

let currentSong = null;

allSongs.forEach((song) => {
	const genre = song.genre.toLowerCase();
	if (genre === "rock") rockSongs.push(song);
	else if (genre === "pop") popSongs.push(song);
	else if (genre === "jazz") jazzSongs.push(song);
	else if (genre === "hip-hop") hiphopSongs.push(song);
});

renderSongs(allSongs);
setupListeners();

function setupListeners() {
	genreSelect.addEventListener("change", (e) => {
		const value = e.target.value.toLowerCase();
		if (value === "pop") renderSongs(popSongs);
		else if (value === "rock") renderSongs(rockSongs);
		else if (value === "jazz") renderSongs(jazzSongs);
		else if (value === "hip-hop") renderSongs(hiphopSongs);
		else renderSongs(allSongs);
	});

	addToPlaylistButton.addEventListener("click", openPlaylistModal);
	createPlaylistButton.addEventListener("click", createPlaylist);
	modalClose.addEventListener("click", closePlaylistModal);
	modalOverlay.addEventListener("click", closePlaylistModal);

	prevButton.addEventListener("click", onPrev);
	playButton.addEventListener("click", onPlay);
	nextButton.addEventListener("click", onNext);

	playlistButtons.forEach((button) => {
		const playlistId = button.dataset.playlist;
		const selected = playlists.find((item) => item.id === playlistId);
		if (selected) attachPlaylistButton(button, selected);
	});
}

function renderSongs(genre) {
	currentVisibleSongs = genre;
	songList.innerHTML = "";
	genre.forEach((song) => {
		const newSong = document.createElement("button");
		newSong.type = "button";
		newSong.innerText = `${song.name} - ${song.artist}`;
		newSong.id = song.name.toLowerCase().replaceAll(" ", "");
		newSong.addEventListener("click", () => selectSong(song));
		songList.append(newSong);
	});
}

function onPrev() {
	if (!currentVisibleSongs.length) return;
	if (!currentSong) {
		selectSong(currentVisibleSongs[0]);
		return;
	}

	const currentIndex = currentVisibleSongs.findIndex(
		(song) => song.id === currentSong.id,
	);
	const prevIndex =
		currentIndex > 0 ? currentIndex - 1 : currentVisibleSongs.length - 1;
	selectSong(currentVisibleSongs[prevIndex]);
}

function onNext() {
	if (!currentVisibleSongs.length) return;
	if (!currentSong) {
		selectSong(currentVisibleSongs[0]);
		return;
	}

	const currentIndex = currentVisibleSongs.findIndex(
		(song) => song.id === currentSong.id,
	);
	const nextIndex =
		currentIndex >= 0 && currentIndex < currentVisibleSongs.length - 1 ?
			currentIndex + 1
		:	0;
	selectSong(currentVisibleSongs[nextIndex]);
}

function onPlay() {
	if (!currentSong) {
		if (currentVisibleSongs.length) selectSong(currentVisibleSongs[0]);
		return;
	}

	selectSong(currentSong);
}

function selectSong(song) {
	currentSong = song;
	coverImage.innerHTML = song.source;
	trackTitle.innerText = song.name;
	trackArtist.innerText = song.artist;
}

function attachPlaylistButton(button, playlist) {
	button.addEventListener("click", () => {
		renderSongs(playlist.items);
		updateCurrentPlaylistLabel(playlist.name, playlist.items);
	});
}

function createPlaylist() {
	const name = playlistNameInput.value.trim();
	if (!name) {
		playlistMessage.innerText = "Enter a playlist name first.";
		playlistNameInput.focus();
		return;
	}

	const id = name
		.toLowerCase()
		.replace(/[^a-z0-9]+/gi, "-")
		.replace(/^-+|-+$/g, "");
	if (!id) {
		playlistMessage.innerText =
			"Please use letters or numbers for the playlist name.";
		return;
	}

	if (playlists.some((playlist) => playlist.id === id)) {
		playlistMessage.innerText = `Playlist "${name}" already exists.`;
		return;
	}

	const newPlaylist = { id, name, items: [] };
	playlists.push(newPlaylist);

	const newButton = document.createElement("button");
	newButton.type = "button";
	newButton.dataset.playlist = id;
	newButton.textContent = name;
	playlistListContainer.append(newButton);
	attachPlaylistButton(newButton, newPlaylist);

	playlistNameInput.value = "";
	playlistMessage.innerText = `Created playlist "${name}".`;
}

function updateCurrentPlaylistLabel(name, items) {
	if (!currentPlaylistLabel) return;
	if (!items.length) {
		currentPlaylistLabel.innerHTML = `<p>${name} is empty.</p>`;
	} else {
		currentPlaylistLabel.innerHTML = `<p>${items.length} song${items.length === 1 ? "" : "s"} in ${name}</p>`;
	}
}

function openPlaylistModal() {
	if (!currentSong) {
		playlistMessage.innerText =
			"Select a song first, then add it to a playlist.";
		renderPlaylistOptions();
		playlistModal.classList.remove("hidden");
		return;
	}

	playlistMessage.innerText = `Add "${currentSong.name}" to:`;
	renderPlaylistOptions();
	playlistModal.classList.remove("hidden");
}

function closePlaylistModal() {
	playlistModal.classList.add("hidden");
}

function renderPlaylistOptions() {
	playlistOptions.innerHTML = "";
	playlists.forEach((playlist) => {
		const option = document.createElement("button");
		option.type = "button";
		option.className = "playlist-option";
		option.textContent = playlist.name;
		option.addEventListener("click", () => addCurrentSongToPlaylist(playlist));
		playlistOptions.append(option);
	});
}

function addCurrentSongToPlaylist(playlist) {
	if (!currentSong) return;

	const alreadyAdded = playlist.items.some(
		(item) => item.id === currentSong.id,
	);
	if (!alreadyAdded) {
		playlist.items.push(currentSong);
		playlistMessage.innerText = `Added "${currentSong.name}" to ${playlist.name}.`;
	} else {
		playlistMessage.innerText = `"${currentSong.name}" is already in ${playlist.name}.`;
	}

	setTimeout(closePlaylistModal, 900);
}
