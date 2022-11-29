function updateLikes(e) {
    e.preventDefault(); 
    id = $('.likeicon').attr('userId');
    $.post('/post/' + id, function (response) {
        $('.like').text(response.likeCount); //your counter on a page
        //and update likes counter with response
    })
}