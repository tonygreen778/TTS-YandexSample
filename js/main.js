// Validation
(function() {
	'use strict';
	window.addEventListener('load', function() {
    
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    
	// Get all form-groups in need of validation
    var validateGroup = document.getElementsByClassName('validate-me');

    var validation = Array.prototype.filter.call(forms, function(form) {
    	form.addEventListener('submit', function(event) {
    		if (form.checkValidity() === false) {
    			event.preventDefault();
    			event.stopPropagation();
    		}

            //Added validation class to all form-groups in need of validation
            for (var i = 0; i < validateGroup.length; i++) {
                validateGroup[i].classList.add('was-validated');
            }

    	}, false);
    });
}, false);
})();

$(function(){

	// Draw Slider - not best solution, temporary diabled
	/*
	$('#ex1').slider({
		formatter: function(value) {
			return 'Current value: ' + value;
		}
	});
	*/

	// Autoextend textarea
	jQuery.fn.extend({
		autoHeight: function () {
			function autoHeight_(element) {
				return jQuery(element).css({
					'height': 'auto',
					'overflow-y': 'hidden'
				}).height(element.scrollHeight);
			}
			return this.each(function () {
				autoHeight_(this).on('input', function () {
					autoHeight_(this);
				});
			});
		}
	});

	$('#textarea1').autoHeight();	

	// Default Emotion 
	$('.selectEmotion').val('neutral');
	$('.selectEmotion').attr('disabled', true);

	// Change Voice
	$('.selectVoice').on('change', function(){
		var selectedVoice = $(this).val();
		var selEmotion = $('.selectEmotion');

		if (selectedVoice == 'jane' || selectedVoice == 'omazh'){

			selEmotion.attr('disabled', false);

		}
		else{
			selEmotion.val('neutral');
			selEmotion.attr('disabled', true);
			$('.selectEmotionPicker').selectpicker('refresh')			
		}
	});

	// Button Listen
	$('.speak-now').on('click', function(){
		const btn = $(this);
		var selectedVoice = $('.selectVoice').val();
		var text = $("#textarea1").val()

		if (text) {
		 	var url = 'https://tts.voicetech.yandex.net/generate?'+
		 		'key=a60faf24-c48c-42d5-ab34-89a2b97ee032'+
		 		'&text='+encodeURI(text)+ 
		 		'&format=mp3'+ 
				'&lang=ru-Ru'+
				'&speaker=' + selectedVoice;
				

			if (selectedVoice == 'jane' || selectedVoice == 'omazh'){
				url += '&emotion=' + $('.selectEmotion').val();
			}

			//var speed = $("#ex1").slider('getValue');			
			//url += '&speed=' + speed;

			var audio = new Audio(url);
			audio.play();
		}
	});
});

