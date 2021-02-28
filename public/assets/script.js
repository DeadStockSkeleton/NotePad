let count = 0;

$(".add-btn").on("click", function () {
  count++;

  let addBtn = $("<button>");
  $(addBtn).attr("class", "note-tab");
  $(addBtn).text("Note Title...");
  $(addBtn).attr("id", count);
  $(addBtn).attr("value", "default");
  $(".add-btn").addClass("disabled");

  if (
    $(".active").attr("value") === "default" ||
    $('button[value="default"]').length > 0
  ) {
    return 0;
  } else {
    $(".notes-container").append(addBtn);
    $(".note-tab").removeClass("active");
    $("#" + count).addClass("active");
    $("#note-title").val("");
    $("#note-text").val("");
    

    if ($(".page-container").css("display") === "none") {
      $(".page-container").fadeIn();
    }
  }
});



$("#note-title").on("keyup", function () {
  $("#status").fadeOut();
  $(".active").text($(this).val());
  $(".active").attr("value", $(this).val());
  $("#status").fadeOut();
  
  if ($(this).val().length > 0 && $('button[value="default"]').length === 0) {
    $(".add-btn").removeClass("disabled");
  }
  if ($(this).val() === "") {
    $(".add-btn").addClass("disabled");
    $(".active").text("Note Title...");
    $(".active").attr("value", "default");
  } else {
  }
});

$(".notes-container").on("click", "button", function () {
  $(".note-tab").removeClass("active");
  $(this).addClass("active");
  if ($(this).hasClass("active")) {
    let save = $('.active').val();
    saved = save.replace(/\s+/g, "").toLowerCase();

    // $.get("http://localhost:3000/api/" + saved, function (data) {
    //     for (let i = 0; i < data.length; i++) {
    //       if (saved === data[i].title) {
    //     $("#note-title").val(data[i].original);
    //     $(".active").text(data[i].original);
    //     $("#note-text").val(data[i].content);
    //     console.log(data[i]);
    //   }
    //   console.log(data);  
    //     }
      
    // });

    if ($('.active[value="default"')){
        $("#note-title").val("");
    $("#note-text").val("");
    }
  }
});


function delay(callback, ms) {
  var timer = 0;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

$(document).ready(function () {

  if ($('.note-tab').length > 0){
    $(".page-container").fadeIn();
  }
  var notes = [];
  function init(){
    $('.notes-container').html('');
    $.getJSON('../../db/db.json').then(function (json) {
    for (let i = 0; i < json.length; i++) {
      let button = `<button class="note-tab">${json[i].title}</button>`
      $(".notes-container").append(button);
    }
  });
  }
  init();

  $("#note-title").keyup(
    delay(function (e) {
      save();
    }, 1000, function(){
      
    })
  );

  function save(){
    
    saved = [
      {
        "title": `"${$("#note-title").val()}"`,
        "id": `"${$('.active').attr('id')}"`,
        "text": `"${$("#note-text").val()}"`,
      }
    ]
$.getJSON('../../db/db.json').then(function (json) {
       notes = [];
      notes.push(json);
      notes.push(saved);
      $.ajax({
      url: '../../db/db.json'
    , method: 'POST'
    , contentType: 'application/json'
    , dataType: 'json'
    , data: JSON.stringify(notes)
    , success: function (data){
      console.log(data);
    }
    //, processData: false //Doesn't help
    });
    });

    
    
    
    

  }

  $("#note-text").keyup(
    delay(function (e) {
      $('.loader').css('display', 'none');
    }, 800)
  );
});
