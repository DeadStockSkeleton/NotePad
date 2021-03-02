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
    for (let i = 0; i < $('.note-tab').length; i++){
      $(addBtn).attr("id", i);
      $(".note-tab").removeClass("active");
      $("#" + i).addClass("active");
    }
    
    $("#note-title").val("");
    $("#note-text").val("");

    if ($(".page-container").css("display") === "none") {
      $(".page-container").fadeIn();
    }
  }
});

$("#note-title").on("keyup", function () {
  $(".active").text($(this).val());
  $(".active").attr("value", $(this).val());

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
  $(".page-container").fadeIn();
  $(".note-tab").removeClass("active");
  $(this).addClass("active");
  if ($(this).hasClass("active")) {
    let saved = $(".active").attr('id')
    
console.log(saved);
    $.get("http://localhost:3000/api/" + saved, function (data) {
     console.log(data);
     $("#note-title").val(data.title);
     $("#note-text").val(data.content);
        
      
    });

    if ($('.active[value="default"')) {
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
  if ($(".note-tab").length > 0) {
    $(".page-container").fadeIn();
  }

  if ($('note-tab').text().length){
    alert('helloo');
  }
  var notes = [];
  function init() {
    $(".notes-container").html("");
    $.getJSON("../../db/db.json").then(function (json) {
      for (let i = 0; i < json.length; i++) {
        let button = `<button id="${json[i].id}" class="note-tab">${json[i].title}</button>`;
        $(".notes-container").append(button);
      }
    });
  }
  init();

  $("#note-title").keyup(
    delay(
      function (e) {
        save();
      },
      1000,

    )
  );

  $("#note-text").keyup(
    delay(
      function (e) {
        save();
      },
      1000,

    )
  );
$(document).keyup(function(){
  $('.loader').css('display', 'block');
  $(".note-tab").addClass("disabled");
  $('button').disabled === true;
  $('.status-text').text(''); 
})
  function save() {
    var newNote = {
      title: $("#note-title").val(),
      id: $(".active").attr("id"),
      content: $("#note-text").val(),
    };


    
      $.post('http://localhost:3000/api/new/', newNote).then(function(data){
        console.log(data)
      })
      $('.loader').css('display', 'none');
      $(".note-tab").removeClass("disabled");
      $('.status-text').text('saved');
      $('button').disabled === false;
      setTimeout(function(){
        $('.status-text').text(''); 
      }, 4000)
  }

  $("#note-text").keyup(
    delay(function (e) {
      $(".loader").css("display", "none");
    }, 800)
  );
});
