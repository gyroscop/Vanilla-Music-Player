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

allSongs.forEach((song) => {
	if (song.genre.toLowerCase() == "rock") {
		rockSongs.push(song);
	} else if (song.genre.toLowerCase() == "pop") {
		popSongs.push(song);
	} else if (song.genre.toLowerCase() == "jazz") {
		jazzSongs.push(song);
	} else if (song.genre.toLowerCase() == "hip-hop") {
		hiphopSongs.push(song);
	}
});

showSongs(allSongs);

genreSelect.addEventListener("change", (e) => {
	if (e.target.value.toLowerCase() == "pop") {
		showSongs(popSongs);
	} else if (e.target.value.toLowerCase() == "rock") {
		showSongs(rockSongs);
	} else if (e.target.value.toLowerCase() == "jazz") {
		showSongs(jazzSongs);
	} else if (e.target.value.toLowerCase() == "hip-hop") {
		showSongs(hiphopSongs);
	} else {
		showSongs(allSongs);
	}
});

function showSongs(genre) {
	songList.innerHTML = "";
	genre.forEach((song) => {
		const newSong = document.createElement("button");
		newSong.setAttribute("type", "button");
		newSong.innerText = `${song.name}-${song.artist}`;
		newSong.setAttribute("id", song.name.toLowerCase().replaceAll(" ", ""));
		songList.append(newSong);
	});
}
