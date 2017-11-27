import $ from 'jquery';
const dialog=$('#dialog'),
	overlay=$('#overlay'),
	body=document.body;

$('#showDialog').on('click',show);
$('#dialog').find('button').on('click',hide);

function show(){
    dialog.css('display','block');
    overlay.css('display','block');
    body.className='modal-open';
    setTimeout(function() {
		dialog.addClass('in');
		overlay.addClass('in');
    }, 50);
}

function hide(){
	dialog.removeClass('in');
	overlay.removeClass('in');
    body.className='';
    setTimeout(function() {
        dialog[0].style.display='';
        overlay.css('display','none');
    }, 300);
}
