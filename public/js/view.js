$(document).ready(() => {
  const newActivityInput = $(".new-activity");
  const newTimeInput = $(".new-time");
  const activityContainer = $(".activity-container");

  $(document).on("click", "button.delete", deleteActivity);
  $(document).on("submit", "#activity-form", insertActivity);

  let activities = [];
  getActivities();

  function initializeRows() {
    activityContainer.empty();
    const rowsToAdd = [];
    for (let i = 0; i < activities.length; i++) {
      rowsToAdd.unshift(createNewRow(activities[i]));
    }
    activityContainer.prepend(rowsToAdd);

    const paper = $("#paper");
    const val = activities.length;

    if (val <= 24) {
      paper.attr("src", `../img/paper-${val}.svg`);
    } else {
      paper.attr("src", "../img/paper-24.svg");
    }
  }

  // This function grabs activities from the database and updates the view
  function getActivities() {
    $.get("/api/jar", data => {
      activities = data;
      initializeRows();
    });
  }

  $("#random-picker").on("submit", event => {
    event.preventDefault();
    let time = $(".random-time").val();
    if (!time) {
      return;
    }
    $.ajax({
      url: "/api/jar/" + time,
      method: "GET"
    }).then(response => {
      $(".random-container").attr("style", "display: block");
      $("#random-thing").text(response[0].ActivityName);
    });
  });

  // This function deletes a activity when the user clicks the delete button
  function deleteActivity(event) {
    event.stopPropagation();
    const id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/jar/" + id
    }).then(getActivities);
  }

  // Toggles complete status
  // function toggleComplete(event) {
  //   event.stopPropagation();
  //   let activity = $(this).parent().data("activity");
  //   activity.complete = !activity.complete;
  //   updateActivity(activity);
  // }

  // This function updates a activity in our database
  // function updateActivity(activity) {
  //   $.ajax({
  //     method: "PUT",
  //     url: "/api/jar",
  //     data: activity
  //   }).then(getActivities);
  // }

  // This function constructs a activity-item row
  function createNewRow(activity) {
    const newInputRow = $(
      [
        "<li class='activity-item'>",
        "<span>",
        activity.ActivityName,
        "</span>",
        "<span>",
        activity.Duration,
        "</span>",
        "<button class='delete btn btn-danger'>✓</button>",
        "</li>"
      ].join("")
    );

    newInputRow.find("button.delete").data("id", activity.id);
    newInputRow.find(".edit").css("display", "none");
    newInputRow.data("activity", activity);
    // if (activity.complete) {
    //   newInputRow.find("span").css("text-decoration", "line-through");
    // }
    return newInputRow;
  }

  // This function inserts a new activity into our database and then updates the view
  function insertActivity(event) {
    event.preventDefault();
    const activity = {
      ActivityName: newActivityInput.val().trim(),
      Duration: newTimeInput.val()
    };

    $.post("/api/jar", activity, getActivities);
    newActivityInput.val("");
  }

  let toggle = $("#toggle");
  let drawer = $("#drawer");

  toggle.on("click", () => {
    if (drawer.hasClass("closed")) {
      drawer.removeClass("closed");
      toggle.removeClass("closed");
      drawer.addClass("open");
      toggle.addClass("open");
    } else {
      drawer.removeClass("open");
      toggle.removeClass("open");
      drawer.addClass("closed");
      toggle.addClass("closed");
    }
  });

  $('#open-link').on("click", event => {
    event.preventDefault();
    if (drawer.hasClass("closed")) {
      drawer.removeClass("closed");
      toggle.removeClass("closed");
      drawer.addClass("open");
      toggle.addClass("open");
    } else {
      drawer.removeClass("open");
      toggle.removeClass("open");
      drawer.addClass("closed");
      toggle.addClass("closed");
    }
  });

});
