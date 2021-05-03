$(document).ready(function(){
$("#en").click(function(){
    var pwd = $('#password_input').val()
    var cont = $('#content_input').val()
    ajax_info_en(password=pwd,content=cont)
});

$('#de').click(function(){
    var pwd = $('#password_input').val()
    var cont = $('#content_input').val()
    ajax_info_de(password=pwd,content=cont)

});
});    