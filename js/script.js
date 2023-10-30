let data = [];
let count = 0;
function Getbooks() {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://www.googleapis.com/books/v1/volumes?q=software+development"
  );
  xhr.send();

  xhr.addEventListener("readystatechange", function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      data = JSON.parse(xhr.response);
      insertData(data.items);
    }
  });
}
Getbooks();

let input = document.getElementById("input");
let searchList = [];

function search(keyword = "software") {
  console.log(keyword.toLowerCase().trim());
  var Http = new XMLHttpRequest();
  Http.open(
    "GET",
    `https://www.googleapis.com/books/v1/volumes?q=${keyword}+development`
  );
  Http.send();
  Http.addEventListener("readystatechange", function () {
    if (Http.status == 200 && Http.readyState == 4) {
      searchList = JSON.parse(Http.response);
      searchList = searchList.items;
      insertData(searchList);
      console.log(searchList);
    }
  });
}

function insertData(bookData) {
  let cartona = "";
  for (let i = 0; i < bookData.length; i++) {
    cartona += `
      <div class="cart">
                  <img src="${
                    bookData[i].volumeInfo.imageLinks.thumbnail
                  }" alt="">
                  <div class="imgfoter">
                      <h3> ${bookData[i].volumeInfo.title}
                      </h3>
                      <p> ${bookData[i].volumeInfo.description
                        .split("")
                        .slice(0, 60)
                        .join("")}  ..... </p>
                      <h5> ${bookData[i].volumeInfo.authors}</h5>
                      <div class="divBtn">
                      <a onclick="ViewDetails('${
                        bookData[i].id
                      }')" id="bookbtn" class="ViewDetails">View Details   <i class="fa-solid fa-arrow-right"></i></a>
                      <button  id="bookbtnadd" onclick="addedtocart()" class="addBtn">Add to cart</button>
                      </div>
                  </div>
  
              </div>
  
      `;
  }
  document.getElementById("container").innerHTML = cartona;
  let cart = document.querySelector("#container");

  cart.addEventListener("click", function (e) {
    if (e.target.classList.contains("ViewDetails")) {
      let parentTitle = e.target.parentNode.parentNode;
      let title = parentTitle.children[0].innerHTML;
      window.localStorage.setItem("title", title);
      window.location = "../book.html";
    }
  });
}

function ViewDetails(id) {
  localStorage.setItem("id", id); 
  console.log(id);// Store the book ID in local storage
  window.location = "../book.html";
}

function addedtocart() {
  let padge = document.getElementById("padge");
  padge.style.display = "block";
  count++;
  padge.innerHTML = count;
}
