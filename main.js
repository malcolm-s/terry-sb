// constants
var audioPath = "assets/audio/";

function main () {
	// easiest probably to skip templating step
	// can be future improvement...

	// what needs to happen in this function?
	// load sounds

	var soundboardItems = $('.soundboard-item');

	createjs.Sound.addEventListener("fileload", function (event) {
		console.log("Preloaded: " + event.id + " / " + event.src);
		createjs.Sound.play(event.src);
	});

	soundboardItems.each(function () {
		var sound = {
			id: $(this).attr("data-id"),
			src: audioPath + $(this).attr("data-source")
		};

		createjs.Sound.registerSound(sound);
	});


	// bind click to play sounds

	$(".soundboard-item").click(function (event) {
		var item = $(this);

		var file = item.attr("data-source");


	});
}