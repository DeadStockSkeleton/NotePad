let count = 0;

$('.page-title-input').on('keyup', function(){
    $('.active').text($(this).val());
    if($('.active').text().length === 0) {
        $('.active').text('Tile of note...');
    }

})

$('.note-tab').on('click', function() {
    $(this).addClass('active');
})

$('.page-textarea').on('keyup', function(){
    if ($(this).val() === 0){
        $('.add-btn').disabled === true;
    }else{
        $('.add-btn').disabled === false;
    }
})

$('.add-btn').on('click', function(){
    if ($('.page-textarea').val() === '' && $('.page-container').css('display') === 'block') {
        return;
    }
    else {
     count++;
    let noteTab = $('<button>');
    $(noteTab).attr('class', 'note-tab');
    $(noteTab).attr('id', count)
    $('.saved-notes-container').append(noteTab);
    noteTab.text('Title of note...')  
    $('.page-container').css('display', 'block') 
    }
    
    
    

})




$('.trash-btn').on('click',function (){
    
    $('.active').remove();
    
})