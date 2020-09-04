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

  function getActivities() {
    $.get("/api/jar", data => {
      activities = data;
      initializeRows();
    });
  }

  $("#random-picker").on("submit", event => {
    event.preventDefault();
    const time = $(".random-time").val();
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

  function deleteActivity(event) {
    event.stopPropagation();
    const id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/jar/" + id
    }).then(getActivities);
  }

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

    return newInputRow;
  }

  function insertActivity(event) {
    event.preventDefault();
    const activity = {
      ActivityName: newActivityInput.val().trim(),
      Duration: newTimeInput.val()
    };

    $.post("/api/jar", activity, getActivities);
    newActivityInput.val("");
  }

  const toggle = $("#toggle");
  const drawer = $("#drawer");

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

  $("#open-link").on("click", event => {
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
