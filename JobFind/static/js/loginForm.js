var login;

login = function(){
  $("div#submitGroup button#loginButton").click(function(){
    $("span.formtips").remove();
    var name = $("div#usernameGroup input#username").val();
    var passwd = $("div#passwordGroup input#password").val();

    if (name == '') {
      var message = 'username can not be empty';
      $("div#usernameGroup").append('<span class="formtips">'+message+'</span>');
    }else if(passwd == ''){
      var message = 'password can not be empty';
      $("div#passwordGroup").append('<span class="formtips">'+message+'</span>');
    }else{
      $.post('/login/',{username:name,password:passwd},function(data){
        if (data.status == '1') {
          //jump urls
        } else if (data.status == '0'&&data.errortype == 'username') {
          //append tips
          message = 'username cannot find';
          $("div#usernameGroup").append('<span class="formtips">'+message+'</span>');
        }else{
          //append tips
          message = 'password wrong';
          $("div#usernameGroup").append('<span class="formtips">'+message+'</span>');
        };
      });
    };
  });
}

$(document).ready(login);