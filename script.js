// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  let containerDiv = $("#block-div");
  let headerText = $("#currentDay");
  grabDate();

  writeToPage();
  $(".saveBtn").on("click", function () {
    let taskStored = JSON.parse(localStorage.getItem("savedTasks"));
    let saveArr = [];

    for (let i = 0; i < 9; i++) {
      let textInput = containerDiv.children().eq(i).children().eq(1).val();
      saveArr.push(textInput);
    }

    localStorage.setItem("savedTasks", JSON.stringify(saveArr));

    writeToPage();
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function checkHour() {
    let currentHour = dayjs().format(HH);
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function writeToPage() {
    let taskStored = JSON.parse(localStorage.getItem("savedTasks"));
    if (taskStored == null) {
      console.log("no data yet");
      return;
    } else {
      for (let i = 0; i < 9; i++) {
        let textInputFromStored = containerDiv
          .children()
          .eq(i)
          .children()
          .eq(1);

        textInputFromStored.text(taskStored[i]);
      }
    }
  }
  // TODO: Add code to display the current date in the header of the page.

  function grabDate() {
    let today = dayjs().format("dddd MMMM, DD");
    headerText.text(today);
  }
});
