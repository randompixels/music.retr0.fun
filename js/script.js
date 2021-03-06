/*
function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'records.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
      allrecords = (JSON.parse(xobj.responseText))
    }
  };
  xobj.send(null);  
}
*/

document.addEventListener('DOMContentLoaded', function () {
	if (window.DatArchive) {
		URLprefix = '';
	} else {
		URLprefix = 'https://andrei.xyz/wp-content'
	}
});


jQuery(document).ready(function(){
	colors = ['#ca2c58', '#c5b861', '#FF6138', '#00A388', '#B361FF', '#FF6661', '#0AB1B3', '#8A603B', '#B34D64', '#008013', '#5A4DB3', '#512DB3', '#cc0000'];
	$('.random-colour').each(function(){
		$(this).css('color', colors[Math.floor(Math.random()*colors.length)]);
	});
	$(document).on({
		click: function(){
			$link = jQuery(this).attr('data-link');
		    $('.lightbox .lb-content img').attr('sizes', '');
		    $('.lightbox .lb-content img').attr('srcset', '');
		    $('.lightbox .lb-content img').attr('src', $link);
		    $('.lightbox').show('fast');
		},
		mouseenter: function(){
			$id = jQuery(this).attr('id');
			$id = $id.replace('switch', '#img');
		    $($id).show().removeClass('hidden');
		    $('.wp-post-image').hide();
		},
		mouseleave: function(){
			$id = jQuery(this).attr('id');
			$id = $id.replace('switch', '#img');
		    $($id).hide().addClass('hidden');
		    $('.wp-post-image').show();
		}
	}, 'a.switch-image');
	$(document).on({
		click: function(){
			$link = jQuery(this).attr('data-link');
			if($link == 'all') {
			    $('.random-colour').show();
		    } else {
			    $('.random-colour').hide();
			    $('.'+$link).show();
		    }
		}
	}, '.filter a');
	$(document).on({
		click: function(){
			$(this).hide('fast');
		}
	}, '.lightbox');
	var filters = ['incoming_item', 'collected_item', 'nope_item'];
	filters.forEach(function(filter) {
		jQuery('a[data-link='+filter+'] small').html( jQuery('.'+filter).length);
	});
});
