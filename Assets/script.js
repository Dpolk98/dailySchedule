// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var today = dayjs();
var currentTime = today.format("H");

$(document).ready(function () {

  var currentDay = $("#currentDay").text(
    today.format(" dddd MMMM D YYYY" + " " + "hh:mm A")
  );

 function timeColor() {
    $(".time-block").each(function () {
      var hour = parseInt(this.id);
      $(this).toggleClass("past", hour < currentTime);
      $(this).toggleClass("present", hour == currentTime);
      $(this).toggleClass("future", hour > currentTime);
      console.log(this.id)
    });
  };

  timeColor();

  $(".saveBtn").on('click', function () {
    var event = $(this).siblings(".description").val();
    var time = $(this).parent(".time-block").attr("id");
    localStorage.setItem(time, event);
  });

});

$(".description").each(function () {
  var hour = $(this).parent(".time-block").attr("id");
  var savedData = localStorage.getItem(hour);
  if (savedData) {
    $(this).val(savedData);
  }
});