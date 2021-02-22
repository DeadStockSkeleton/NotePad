let count = 0;

$('.page-title-input').on('keyup', function(){
    $('.active').text($(this).val());
    if($('.active').text().length === 0) {
        $('.active').text('Tile of note...');
    }

})

$('.note-tab').on('click', function() {
    $('.note-tab').removeClass('active');
    $(this).addClass('active');
})

$('.add-btn').on('click', function(){
    count++;
    let noteTab = $('<button>');
    $(noteTab).attr('class', 'note-tab');
    $(noteTab).attr('id', count)
    $('.saved-notes-container').append(noteTab);
    noteTab.text('Title of note...')
    if ($('.page-title-input').attr('placeholder') === 'Title of note...') {
        return;
    }
})

$('.trash-btn').on('click',function (){
    $('.active').remove();
})