$(document).ready(function(){
  $("#submitBut").click( function () {
    // console.log("Hi");
    var uname = $("#uname").val();
    var pass = $("#pwd").val();
    // console.log(uname)
    // var str = "Hello " + uname + " with pword " + pass;
    // alert(str);

    $.post("http://localhost:80/", {user: uname, pwrd: pass}, 
        function(data) {
          alert(data.headers.Host);
        }
    );
  });
});