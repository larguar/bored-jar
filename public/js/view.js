$(document).ready(() => {
  const $newActivityInput = $("input.new-activity");
  const $newTimeInput = $("input.new-time");
  const $activityContainer = $(".activity-container");

  $(document).on("click", "button.delete", deleteActivity);
  // $(document).on("click", "button.complete", toggleComplete);
  $(document).on("submit", "#activity-form", insertActivity);

  let activities = [];
  getActivities();

  function initializeRows() {
    $activityContainer.empty();
    const rowsToAdd = [];
    for (let i = 0; i < activities.length; i++) {
      rowsToAdd.push(createNewRow(activities[i]));
    }
    $activityContainer.prepend(rowsToAdd);

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
    const $newInputRow = $(
      [
        "<li class='list-group-item activity-item'>",
        "<span>",
        activity.woooo,
        "</span>",
        "<input name='woooo' class='edit' style='display: none;'>",
        "<span>",
        activity.secondcol,
        "</span>",
        "<input name='secondcol' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", activity.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("activity", activity);
    // if (activity.complete) {
    //   $newInputRow.find("span").css("text-decoration", "line-through");
    // }
    return $newInputRow;
  }

  // This function inserts a new activity into our database and then updates the view
  function insertActivity(event) {
    event.preventDefault();
    const activity = {
      woooo: $newActivityInput.val().trim(),
      secondcol: $newTimeInput.val().trim()
    };

    $.post("/api/jar", activity, getActivities);
    $newActivityInput.val("");
    $newTimeInput.val("");
  }
});
