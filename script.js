// Calling a function like this with jQuery will wait for the page to render before executing code.
$(function () {
  let containerDiv = $("#block-div");
  let headerText = $("#currentDay");
  let init = false;
  let currentHour = dayjs().format("HH");
  grabDate();

  writeToPage();

  // Adding event listener to .saveBtn to set items to local storage.
  $(".saveBtn").on("click", function () {
    let taskStored = JSON.parse(localStorage.getItem("savedTasks"));
    let saveArr = [];

    for (let i = 0; i < 9; i++) {
      let textInput = containerDiv
        .children()
        .eq(i)
        .children()
        .eq(1)
        .val()
        .trim();
      saveArr.push(textInput);
    }

    localStorage.setItem("savedTasks", JSON.stringify(saveArr));

    writeToPage();
  });

  // Adding function to use in an interval to update the hour each second.
  function updateSeconds() {
    updateBackgrounds();
    return currentHour;
  }
  // Interval calls updateSeconds function every second
  setInterval(updateSeconds, 1000);

  // Remove classes we want to set, and then based on what is returned from updateSeconds, add the corrosponding class.
  function updateBackgrounds() {
    for (i = 0; i < 9; i++) {
      let blocks = containerDiv.children().eq(i);
      blocks.removeClass("present past future");

      if (currentHour == blocks.attr("id")) {
        blocks.addClass("present");
      } else if (currentHour < blocks.attr("id")) {
        blocks.addClass("future");
      } else if (currentHour > blocks.attr("id")) {
        blocks.addClass("past");
      }
    }
  }

  // Renders text content from local storage to each respective div
  function writeToPage() {
    let taskStored = JSON.parse(localStorage.getItem("savedTasks"));
    updateBackgrounds();
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

  // Grabbing today's date to render to the page in the header
  function grabDate() {
    let today = dayjs().format("dddd, MMMM DD, YYYY");
    headerText.text(today);
  }
});
