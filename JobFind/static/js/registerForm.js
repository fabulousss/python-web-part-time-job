var register;

register = function(){
  $("input.required").each(function(){
      var $required = $("<strong class='high'> *</strong>");
      $(this).parent().append($required);
    });

    $("input.required").blur(function(){
      var $parent = $(this).parent();
      $parent.find("span.formtips").remove();

      if($(this).is("div#username input")){
        if (this.value == "") {
          var message = "username cannot be empty!";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else if(this.value.length < 6){
          var message = "username length must more than 6";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else if(this.value.length > 16){
          var message = "username length must less than 16";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else{
          //send username to server and return if it has already exsited in user table
          
          var username = $(this).val();
          $.post('/check/',{name:username},function(data){
            console.log(data);
            if (data == 'no') {
              var message = "username is already exsited!";
              $parent.append('<span class="formtips onError">'+message+'</span>');
            }else{
              $parent.find("strong.high").remove();
              $parent.attr("isValiable",username);
            };
          });
        };
      };

      if($(this).is("div#email input")){
        if (this.value == "") {
          var message = "email cannot be empty!";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else{
          var email = $(this).val();
          var reg = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
          if(!reg.test(email)){
            var message = "email is not valiable!"
            $parent.append('<span class="formtips onError">'+message+'</span>');
          }else{
            //send email to server and return if it has already exsited in user table
            
            var Email = $(this).val();
            $.post('/check/',{email:Email},function(data){
              console.log(data);
              if (data == 'no') {
                var message = "email is not valiable!";
                $parent.append('<span class="formtips onError">'+message+'</span>');
              }else{
                $parent.find("strong.high").remove();
                $parent.attr("isValiable",Email);
              };
            });
          };
        };
      };

      if ($(this).is("div#password input")) {
        var password = $(this).val();
        if (this.value == "") {
          var message = "password cannot be empty!";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else if(this.value.length < 6||this.value.length > 16){
          var message = "password length must between 6 with 8!";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else{
          //something else
          $parent.find("strong.high").remove();  
          $parent.attr("isValiable",password);
        };
      };

      if ($(this).is("div#employername input")) {
        var employername = $(this).val();
        if (this.value == "") {
          var message = "employername cannot be empty!";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else if(this.value.length > 50){
          var message = "employername length must less than 50!";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else{
          //something else
          $parent.find("strong.high").remove();
          
          $parent.attr("isValiable",employername);
        };
      };

      if ($(this).is("div#addresscontent input")) {
        var addresscontent = $(this).val();
        if (this.value == "") {
          var message = "addresscontent cannot be empty!";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else if(this.value.length > 100){
          var message = "addresscontent length must less than 100!";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else{
          //something else
          $parent.find("strong.high").remove();
          $parent.attr("isValiable",addresscontent);
        };
      };

      if ($(this).is("div#telephone1 input")) {
        if (this.value == "") {
          var message = "telephone1 cannot be empty!";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else if (this.value.length != 11) {
          var message = "telephone1 length must be 11!";
          $parent.append('<span class="formtips onError">'+message+'</span>');
        }else{
          var telephone1 = $(this).val()
          var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
          if (!reg.test(telephone1)) {
            var message = "telephone1 must be integer!";
            $parent.append('<span class="formtips onError">'+message+'</span>');
          }else{
            //something else
            $parent.find("strong.high").remove();
            $parent.attr("isValiable",telephone1);
          };
        };
      };
    });
    
    $("div#state select#city").change(function(){
      var $parent = $(this).parent();
      var city_id = $(this).children("option:selected").val();
      $.post('/city_find/',{city:city_id},function(data){
        $parent.children("select#statechoose").children("option#default").siblings().remove();
        $.each(data,function(i,item){
          $parent.children("select#statechoose").append('<option value='+item.pk+'>'+item.fields.name+'</option>');
        });
      });
      
    });

    $("div#state select#statechoose").change(function(){
        var state_id = $(this).children("option:selected").val();
        console.log(state_id);
        if (state != 'default') {
          $("div#state").attr("isValiable",state_id);
        };
      });
    

    $("div#submitButton button").click(function(){
      var $parent = $(this).parent();
      var usernameIs = $("div#username").attr("isValiable");
      var emailIs = $("div#email").attr("isValiable");
      var passwordIs = $("div#password").attr("isValiable");
      var employernameIs = $("div#employername").attr("isValiable");
      var stateIs = $("div#state").attr("isValiable");
      var addresscontentIs = $("div#addresscontent").attr("isValiable");
      var telephone1Is = $("div#telephone1").attr("isValiable");

      if (usernameIs == '0'|| emailIs == '0' || passwordIs == '0' || employernameIs == '0' || stateIs == '0' || addresscontentIs == '0' || telephone1 == '0') {
        //do something
        var message = "please make sure all input is valiable!";
        alert(message);
      }else{
        $.post('/register/',{username:usernameIs,email:emailIs,password:passwordIs,employername:employernameIs,state:stateIs,addresscontent:addresscontentIs,telephone1:telephone1Is},function(data){
            alert(data);
          });
      }; 
    });
}

$(document).ready(register);