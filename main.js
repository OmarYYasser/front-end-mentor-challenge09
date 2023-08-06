let localStorageData = [];
let form = document.forms[0];
let input = document.forms[0][1];
let tasksFilter = document.getElementsByTagName("li");
let deleteComplete = document.getElementById("clear-complete");
let counter = document.getElementById("counter");
let todoList = document.getElementsByClassName("todo");
let darkMode = true;
let ImgBtn = document.querySelector("img");
let divs = document.querySelectorAll("div");

if (localStorage.getItem("darkMode")) {
  darkMode = JSON.parse(localStorage.getItem("darkMode"));
}
function darkModeFunction() {
  if (darkMode == true) {
    // console.log("i should be dark");
    let backgroundImg = document.querySelector("body");
    // console.log("me is higher than 720");

    ImgBtn.src = "./images/icon-sun.svg";
    let body = document.styleSheets[0].cssRules[0];
    let bodyElement = document.querySelector("body");
    let after = document.styleSheets[0].cssRules[12];
    let bottomBorder = document.styleSheets[0].cssRules[18];
    let filterHoverColor =
      document.styleSheets[0].cssRules[
        document.styleSheets[0].cssRules.length - 2
      ];
    let filterColor =
      document.styleSheets[0].cssRules[
        document.styleSheets[0].cssRules.length - 4
      ];
    let doneColor = document.styleSheets[0].cssRules[15];
    let list = document.querySelectorAll(".mode-colors");
    let main = document.querySelectorAll(".mode-colors");
    main[1].style.boxShadow = "none";
    main[0].style.boxShadow = "none";
    doneColor.style.color = "hsl(233, 14%, 35%)";
    filterColor.style.color = "hsl(233, 14%, 35%)";
    filterHoverColor.style.color = "hsl(236, 33%, 92%)";
    bottomBorder.style.border = "solid hsl(234, 11%, 52%)";
    bottomBorder.style.borderWidth = "0 0 1px 0";
    after.style.backgroundColor = "hsl(235, 24%, 19%)";
    list[0].style.backgroundColor = "hsl(235, 24%, 19%)";
    list[1].style.backgroundColor = "hsl(235, 24%, 19%)";
    list[1].style.color = "hsl(234, 39%, 85%)";
    body.style.backgroundColor = "hsl(235, 21%, 11%)";
    Number.parseInt(window.getComputedStyle(bodyElement).width) >= 720
      ? (bodyElement.style.backgroundImage =
          "url(./images/bg-desktop-dark.jpg)")
      : (bodyElement.style.backgroundImage =
          "url(./images/bg-mobile-dark.jpg)");
  } else if (darkMode == false) {
    // console.log("i should be light");
    let backgroundImg = document.querySelector("body");
    ImgBtn.src = "./images/icon-moon.svg";
    let body = document.styleSheets[0].cssRules[0];
    let bodyElement = document.querySelector("body");
    let after = document.styleSheets[0].cssRules[12];
    let bottomBorder = document.styleSheets[0].cssRules[18];
    let filterHoverColor =
      document.styleSheets[0].cssRules[
        document.styleSheets[0].cssRules.length - 2
      ];
    let filterColor =
      document.styleSheets[0].cssRules[
        document.styleSheets[0].cssRules.length - 4
      ];
    let doneColor = document.styleSheets[0].cssRules[15];
    let list = document.querySelectorAll(".mode-colors");
    let main = document.querySelectorAll(".mode-colors");
    main[0].style.boxShadow = "0px 0px 40px -23px gray"; //gray 0px 0px 52px -23px;
    main[1].style.boxShadow = "0px 0px 40px -23px gray"; //gray 0px 0px 52px -23px;
    doneColor.style.color = "hsl(233, 11%, 84%)";
    filterColor.style.color = "hsl(236, 9%, 61%)";
    filterHoverColor.style.color = "hsl(235, 19%, 35%)";
    bottomBorder.style.border = "solid hsl(233, 11%, 84%)";
    bottomBorder.style.borderWidth = "0 0 1px 0";
    after.style.backgroundColor = "hsl(0, 0%, 98%)";
    list[0].style.backgroundColor = "hsl(0, 0%, 98%)";
    list[1].style.backgroundColor = "hsl(0, 0%, 98%)";
    list[1].style.color = "hsl(235, 19%, 35%)";

    body.style.backgroundColor = "hsl(0, 0%, 98%)";
    Number.parseInt(window.getComputedStyle(bodyElement).width) >= 720
      ? (bodyElement.style.backgroundImage =
          "url(./images/bg-desktop-light.jpg)")
      : (bodyElement.style.backgroundImage =
          "url(./images/bg-mobile-light.jpg)");
  }
}
let body = document.querySelector("body");

body.onresize = (e) => {
  // console.log(window.getComputedStyle(body).width);
  if (Number.parseInt(window.getComputedStyle(body).width) >= 720) {
    // console.log("me is higher than 720");

    darkMode == true
      ? (body.style.backgroundImage = "url(./images/bg-desktop-dark.jpg)")
      : (body.style.backgroundImage = "url(./images/bg-desktop-light.jpg)");
  } else {
    // console.log("me is lower than 720");

    darkMode == true
      ? (body.style.backgroundImage = "url(./images/bg-mobile-dark.jpg)")
      : (body.style.backgroundImage = "url(./images/bg-mobile-light.jpg)");
  }
};
darkModeFunction();

ImgBtn.onclick = function () {
  darkMode == true ? (darkMode = false) : (darkMode = true);
  let data = darkMode;
  localStorage.setItem("darkMode", JSON.stringify(data));
  darkModeFunction();
};

if (localStorage.getItem("todoList")) {
  localStorageData = JSON.parse(localStorage.getItem("todoList"));
}

updateList(localStorageData);

form.onsubmit = function () {
  if (input.value !== "") {
    let date = new Date();
    let data = {
      title: input.value,
      id: date.getTime(),
      complete: false,
    };
    localStorageData.push(data);
    input.value = "";

    updateLocalStorage(localStorageData);
    updateList(localStorageData);
  }
  return false;
};

function updateLocalStorage(array) {
  data = localStorage.setItem("todoList", JSON.stringify(array));
}

function updateList(array) {
  let mainContainer = document.getElementById("i");
  mainContainer.innerHTML = "";
  array.forEach((e) => {
    let container = document.createElement("div");
    let leftSection = document.createElement("div");
    let h2 = document.createElement("h2");
    let checkbox = document.createElement("input");
    let deleteBtn = document.createElement("button");
    let deleteBtnImg = document.createElement("img");

    h2.classList.add("h2");
    checkbox.classList.add("checkbox");
    container.classList.add("todo");
    deleteBtn.classList.add("deleteBtn");
    leftSection.classList.add("left-Section");
    checkbox.setAttribute("type", "checkbox");
    deleteBtnImg.src = "./images/icon-cross.svg";
    container.setAttribute("data-id", e.id);
    deleteBtn.style.display = "none";
    checkbox.classList.add("disable-checkbox");

    if (e.complete == true) {
      checkbox.checked = true;
      container.classList.add("done");
      checkbox.classList.remove("disable-checkbox");
    }

    h2.innerHTML = e.title;
    leftSection.appendChild(checkbox);
    leftSection.appendChild(h2);
    container.appendChild(leftSection);
    deleteBtn.appendChild(deleteBtnImg);
    container.appendChild(deleteBtn);
    mainContainer.prepend(container);
  });
  x();
  deleteBtnShow();
  updateCounter();
}

function updateCounter() {
  counter.innerHTML = todoList.length + " items left";
}

function x() {
  let list = document.querySelectorAll(".todo");
  list.forEach(function (element) {
    element.addEventListener("click", function (e) {
      if (e.target.parentElement.classList.contains("deleteBtn")) {
        deletingElements(
          e.target.parentElement.parentElement.getAttribute("data-id")
        );
        e.target.parentElement.parentElement.remove();
        updateCounter();
      } else if (e.target.classList.contains("h2")) {
        e.target.parentElement.parentElement.classList.toggle("done");

        completeTask(
          e.target.parentElement.parentElement.getAttribute("data-id")
        );

        // console.log(e.target);
        // console.log(e.target.previousSibling);

        e.target.previousSibling.checked == true
          ? (e.target.previousSibling.checked = false)
          : (e.target.previousSibling.checked = true);

        e.target.previousSibling.classList.contains("disable-checkbox")
          ? e.target.previousSibling.classList.remove("disable-checkbox")
          : e.target.previousSibling.classList.add("disable-checkbox");
      } else if (e.target.classList.contains("checkbox")) {
        e.target.parentElement.parentElement.classList.toggle("done");
        completeTask(
          e.target.parentElement.parentElement.getAttribute("data-id")
        );

        e.target.classList.contains("disable-checkbox")
          ? e.target.classList.remove("disable-checkbox")
          : e.target.classList.add("disable-checkbox");
      }
    });
  });
}

function deleteBtnShow() {
  let list = document.querySelectorAll(".todo");
  list.forEach(function (element) {
    element.addEventListener("mouseenter", function (e) {
      // console.log(e.target);
      // console.log(e.target.childNodes[1]);
      e.target.childNodes[1].style.display = "block";
    });
    element.addEventListener("mouseleave", function (e) {
      // console.log(e.target);
      // console.log(e.target.childNodes[1]);
      e.target.childNodes[1].style.display = "none";
    });
  });
}

function completeTask(dataId) {
  for (let i = 0; i < localStorageData.length; i++) {
    if (dataId == localStorageData[i].id) {
      localStorageData[i].complete == false
        ? (localStorageData[i].complete = true)
        : (localStorageData[i].complete = false);
      updateLocalStorage(localStorageData);
    }
  }
}

function deletingElements(dataId) {
  localStorageData = localStorageData.filter((e) => e.id != dataId);
  updateLocalStorage(localStorageData);
}
MakeClickedBlue(tasksFilter[0]);
tasksFilter[0].onclick = () => {
  updateList(localStorageData);
  MakeClickedBlue(tasksFilter[0]);
  if (tasksFilter[1].classList.contains("selected")) {
    tasksFilter[1].classList.remove("selected");
    tasksFilter[1].classList.add("li-style");
  }
  if (tasksFilter[2].classList.contains("selected")) {
    tasksFilter[2].classList.remove("selected");
    tasksFilter[2].classList.add("li-style");
  }
};

tasksFilter[1].onclick = () => {
  dataFilter = localStorageData.filter((e) => e.complete == false);
  updateList(dataFilter);
  MakeClickedBlue(tasksFilter[1]);
  if (tasksFilter[0].classList.contains("selected")) {
    tasksFilter[0].classList.remove("selected");
    tasksFilter[0].classList.add("li-style");
  }
  if (tasksFilter[2].classList.contains("selected")) {
    tasksFilter[2].classList.remove("selected");
    tasksFilter[2].classList.add("li-style");
  }
};

tasksFilter[2].onclick = () => {
  dataFilter = localStorageData.filter((e) => e.complete == true);
  updateList(dataFilter);
  MakeClickedBlue(tasksFilter[2]);
  if (tasksFilter[1].classList.contains("selected")) {
    tasksFilter[1].classList.remove("selected");
    tasksFilter[1].classList.add("li-style");
  }
  if (tasksFilter[0].classList.contains("selected")) {
    tasksFilter[0].classList.remove("selected");
    tasksFilter[0].classList.add("li-style");
  }
};

function MakeClickedBlue(element) {
  element.classList.add("selected");
  element.classList.remove("li-style");
}

deleteComplete.onclick = () => {
  MakeClickedBlue(tasksFilter[0]);
  if (tasksFilter[1].classList.contains("selected")) {
    tasksFilter[1].classList.remove("selected");
    tasksFilter[1].classList.add("li-style");
  }
  if (tasksFilter[2].classList.contains("selected")) {
    tasksFilter[2].classList.remove("selected");
    tasksFilter[2].classList.add("li-style");
  }
  localStorageData = localStorageData.filter((e) => e.complete == false);
  updateList(localStorageData);
  updateLocalStorage(localStorageData);
};
