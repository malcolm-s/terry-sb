var $ = require("jquery");

function main () {
	// handler to verify load
	//	createjs.Sound.addEventListener("fileload", function (event) {
	//		console.log("Preloaded: " + event.id + " / " + event.src);
	//	});

	// load sounds
	preloadSoundboardSounds();

	// bind click to play sounds
	bindSoundboardItemClicks();


};

function preloadSoundboardSounds () {
	$('.soundboard-item a').each(function () {
		var sound = {
			id: $(this).attr("data-id"),
			src: $(this).attr("data-src")
		};

		createjs.Sound.registerSound(sound);
	});
}

function bindSoundboardItemClicks () {
	$(".soundboard-item a").click(function (event) {
		var item = $(this);

		createjs.Sound.play(item.attr("data-id"));
	});
}

$(main)
