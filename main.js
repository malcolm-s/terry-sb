// constants
var audioPath = "assets/audio/";

function main () {
	// easiest probably to skip templating step
	// can be future improvement...
	
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
	$('.soundboard-item').each(function () {
		var sound = {
			id: $(this).attr("data-id"),
			src: audioPath + $(this).attr("data-source")
		};

		createjs.Sound.registerSound(sound);
	});
}

function bindSoundboardItemClicks () {
	$(".soundboard-item").click(function (event) {
		var item = $(this);

		createjs.Sound.play(item.attr("data-id"));
	});
}