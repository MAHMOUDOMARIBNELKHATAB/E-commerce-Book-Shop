let data = [];
let count = 0
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

function insertData(bookData) {
    let cartona = "";
        cartona += `
        <div class="bookcart">
        <img src="${bookData.volumeInfo.imageLinks.thumbnail}" alt="">
        <div class="imgright">
            <h3> ${bookData.volumeInfo.title}
            </h3>
            <p>${bookData.volumeInfo.description}
            </p>
            <button class="button" id="cartBtn" onclick="addedtocart()" >Add to cart</button>

        </div>

    </div>
    <h2>
        Authors :
    </h2>

    <ul class="padding">
        <a href="#"><i class="fa-regular fa-circle"></i>  ${bookData.volumeInfo.authors}</a>

    </ul>


    <div class="publish">

        <h3>Publisher : <span> ${bookData.volumeInfo.publisher}</span></h3> 
        <h3>Published Date :  <span> ${bookData.volumeInfo.publishedDate}</span></h3>
    </div>
        `;
    

 
    document.getElementById("container").innerHTML = cartona;

  }


function addedtocart() {
  let padge = document.getElementById("padge");
  padge.style.display = "block";
  count++;
  padge.innerHTML = count;
}
function displayDetail() {
  var id = localStorage.getItem("id");
  let itemCount;
  console.log(id);
  ShowDetails(id);
}
displayDetail();
function ShowDetails(id) {
  var Http = new XMLHttpRequest();
  Http.open("GET", `https://www.googleapis.com/books/v1/volumes/${id}`);
  Http.send();

  Http.addEventListener("readystatechange", function () {
    if (Http.status == 200 && Http.readyState == 4) {
      let bookData = JSON.parse(Http.response);
      console.log(bookData);
      insertData(bookData);
    }
  });
}