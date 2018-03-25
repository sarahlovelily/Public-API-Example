$(document).ready(function(){

  var randomuserAPI =  'https://randomuser.me/api/?results=12&nat=us';

  function createUser(data){

      var displayHTML = '';
      $.each(data.results,function(i,user){
        displayHTML += '<div class="user index--'+i+'"><div class="user-block1"><img src="'+user.picture.large+'"  class="user-photo"></div>';
        displayHTML += '<div class="user-block2"><p class="user-name"><strong>'+user.name.first+' '+user.name.last+'</strong></p>';
        displayHTML += '<p class="user-email">'+user.email+'</p>';
        displayHTML += '<p class="user-location">'+user.location.city+'</p></div></div>';
      });

      $(".user-container").html(displayHTML);

      var displayHTML = '';
      $.each(data.results,function(i,user){
          displayHTML += '<div class="modal-user modal-index--'+i+'">';
          displayHTML += '<img src="'+user.picture.large+'"  class="modal-user-photo">';
          displayHTML += '<p class="modal-user-name"><strong>'+user.name.first+' '+user.name.last+'</strong></p>';
          displayHTML += '<p class="modal-user-email">'+user.email+'</p>';
          displayHTML += '<p class="modal-user-location">'+user.location.city+'</p>';
          displayHTML += '<p class="modal-user-cell">'+user.cell+'</p>';
          displayHTML += '<p class="modal-user-adress">'+user.location.street+',&nbsp; '+
                          getInitials(user.location.state)+'&nbsp;'+user.location.postcode+'</p>';


          displayHTML += '<p class="modal-user-dob"> BIRTHDAY: '+getTime(user.dob)+'</p></div>';
     });

        $(".overlay").html(displayHTML);
   }

   /***************helper funtions******************
   *************************************************/

     function getInitials(valStr) {//GET THE STATE initials
         var words = valStr.split(" "),
             initials = "";
             words.forEach(function(word) {initials += word.charAt(0);
             });
             return initials.toUpperCase();
     }

     function getTime(date){//GET DATE FORMAT
         var  dateobj = new Date(date);
         function pad(n) {return n < 10 ? "0"+n : n;}
         return result = pad(dateobj.getDate())+"/"+pad(dateobj.getMonth()+1)+"/"+dateobj.getFullYear();
     }

 /***************getJSON******************
 *************************************************/

  $.getJSON(randomuserAPI,createUser);

/***************MODAL******************
*************************************************/

  const $overlay = $('.overlay');
  const $userContainer = $('.user-container');

  $('.user-container').on('click','.user',function(){
    let $index=$(this).attr('class').split(' ')[1];
    let $modalWindow = $('.modal-'+$index);


    $overlay.toggleClass('open');//OPEN INFO
    $userContainer.toggleClass('blur-it');//BLUR BACKGROUND
    $modalWindow.toggleClass('modal-open');



  });

  $('.overlay').on('click',function(){

    $overlay.toggleClass('open');
    $userContainer.toggleClass('blur-it');

    $('.modal-user').each(function(){
      if($(this).hasClass('modal-open')){
        $(this).removeClass('modal-open')
      }
    });

  });



});

//
