(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
	$('.soundboard-item').each(function () {
		var sound = {
			id: $(this).attr("data-id"),
			src: $(this).attr("data-src")
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

$(main)
},{}]},{},[1]);
