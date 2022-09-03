let loadCeagoti = () => {
  let url = `https://openapi.programming-hero.com/api/news/categories`
  fetch(url)
  .then(res => res.json())
  .then(data => cetagoriName(data.data.news_category))
  
  
}


// cetagori name show
let cetagoriName = (cetagoris) => {
  // console.log(cetagoris)
   toggolSpiner(true);
  let cetagoriName = document.getElementById('cetagori')
  cetagoris.forEach(cetagori => {
  console.log(cetagori)
  let cetagoriLi = document.createElement('li')
  cetagoriLi .innerHTML = `
  <li onclick=(loadData('${cetagori.category_id}')) class="breadcrumb-item ms-4"><a href="#" class="text-decoration-none">${cetagori.category_name}</a></li>
  `;
  cetagoriName.appendChild(cetagoriLi)

  })
 

}




let loadData = (category_id) => {
  let url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
  console.log(url)
  fetch(url)
  .then(res => res.json())
  .then(data => newsDisplay(data.data))
}


let newsDisplay = newses => {
  // console.log(newses)
  // news total count
  
  let totalNews = document.getElementById('total-news-count')
  totalNews.value = '';
  if( newses.length === 0){
    totalNews.value = "news not found"
    toggolSpiner(true)
  }
  else{
    totalNews.value =   `${newses.length} news find this catagoris`
  }

  
  let newsContainer = document.getElementById('news-container')
  newsContainer.innerHTML = ``;
  newses.forEach( news => {
    console.log(news)
    let newsDiv = document.createElement('div')
    newsDiv.innerHTML = `
    
    
    <div   onclick="newsDetails('${news._id}')"  class="card mb-3" style="max-width: 100%;"  data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
    <div  class="row g-0">
      <div class="col-md-4 ">
        <img src="${news.thumbnail_url}" class="img-fluid rounded-start p-4" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">${news.details.slice(0, 400)+'...'}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          

          <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center" style:"">
              
              <img class="img-thumbnail img-fluid w-25 rounded-circle" src="${news.author.img}" alt="">
              
              
            <div class="p-2">
              <p >Name: ${news.author.name ? news.author.name : 'No Author name'}</p>
            <p> ${news.author.published_date ? news.author.published_date : 'No found date'}</p>
            </div>
            
          </div>
          <div class="d-flex ">
             <span class="me-2"><i class="fa-regular fa-eye"></i></span>
             <span>${news.total_view ? news.total_view : "No view"}</span>
          </div>
        
        </div>
        </div>
      </div>
    </div>
  </div>
   

    ` ;
 
    newsContainer.appendChild(newsDiv)
    

  });

  toggolSpiner(false)
}



let newsDetails = (_id) =>{
  let url = `https://openapi.programming-hero.com/api/news/${_id}`
  fetch(url)
  .then(res => res.json())
  .then(data => newsDetailsDisplay(data.data[0]))
  
}


 let newsDetailsDisplay = (modal) => {
  let newsDetails = document.getElementById('newsDetailsModalLabel');
  newsDetails.innerText = modal.title;

  let modalDetails = document.getElementById('modal-details-body')
  modalDetails.innerHTML = `
  <p>${modal.details}</p>
  <p><span><i class="fa-regular fa-eye"></i> ${modal.total_view ? modal.total_view : 'No view'}</span></p>
  `
  

 }


 let toggolSpiner = isLoading => {
  let toggleSpiner = document.getElementById('spinner');
  if(isLoading === true){
    toggleSpiner.classList.remove('d-none');
  }
  else{
    toggleSpiner.classList.add('d-none');
  }
 }




loadData('01');
loadCeagoti('');
 







// sobuj bahi item 

// const loadCatagory = async () => {
//   try {
//     const url = `https://openapi.programming-hero.com/api/news/categories`;
//     const res = await fetch(url);
//     const datas = await res.json();
//     catagoty(datas.data.news_category);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const catagoty = (data) => {
//   const navUl = document.getElementById("navbar-menu");

//   data.forEach((sData) => {
//     const creatElemet = document.createElement("li");
//     creatElemet.classList.add("nav-item");
//     creatElemet.innerHTML = `

//      <a href="#" onclick="loadNews('${sData.category_id}')">${sData.category_name}</a>

//     `;
//     navUl.appendChild(creatElemet);
//   });
// };

// loadCatagory();

// const loadNews = (category_id) => {
//   const url =` https://openapi.programming-hero.com/api/news/category/${category_id}`;
//   console.log(url);
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => showNews(data.data));
// };

// const showNews = (data) => {
//   const totlaNews = document.getElementById("total-news-item");
//   const lent = data.length;
//   if (lent === 0) {
//     totlaNews.innerText = "news not found";
//   } else {
//     totlaNews.innerText = `${lent}  news find this catagory`;
//   }
//   const cardParent = document.getElementById("card-parent");

//   data.forEach((news) => {
//     const cretcardDiv = document.createElement("div");
//     cretcardDiv.classList.add("card");
//     cretcardDiv.innerHTML = `

//       <div class="card mb-3 " data-bs-toggle="modal" data-bs-target="#card-ditails-modal"  onclick="cardDitails('${
//         news._id
//       }')">
//               <div class="row g-0">
//                 <div class="col-md-4">
//                   <img src="${
//                     news.thumbnail_url
//                   }" class="img-fluid rounded-start" alt="..." />
//                 </div>
//                 <div class="col-md-8">

//                   <div class="card-body">
//                     <h5 class="card-title">${news.title}</h5>
//                     <p class="card-text">
//                       ${news.details}
//                     </p>
//                   </div>
//                   <div class="card-footer d-flex">
//                     <div  class="author d-flex">
//                       <img id="author" src="${news.author.img} alt="" />
//                       <h4>name: ${
//                         news.author.name ? news.author.name : "no  name found"
//                       }</h4>
//                       <p>date${news.author.published_date}</p>
//                     </div>
//                     <div class="viw d-flex">
//                     <i class="fa-solid fa-eye"></i></span>${
//                       news.total_view
//                     }</div>
//                     <div class="ratting d-flex">
//                     <li> rating:${news.rating.number}</li>

//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//     `;

//     cardParent.appendChild(cretcardDiv);
//   });
// };

// const cardDitails = (news_id) => {
//   const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
//   console.log(url);

//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => showDitails(data.data[0]));
// };

// const showDitails = (data) => {
//   console.log(data);

//   const mdalparent = document.getElementById("modal-dilog");
//   mdalparent.innerHTML = `
//     <div class="modal-content">
//         <div class="modal-header">
//           <h5 class="modal-title" id="staticBackdropLabel">
//     ${data.title}
//           </h5>

       
//           <button
//             type="button"
//             class="btn-close"
//             data-bs-dismiss="modal"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div class="modal-body">
//          <p>${data.details}</p>
//          <span>Total-view: <i class="fa-solid fa-eye"> </i> ${data.total_view}</span>
        
//         </div>
        
//         <div class="modal-footer">

        
//           <button
//             type="button"
//             class="btn btn-secondary"
//             data-bs-dismiss="modal"
//           >
//             Close
//           </button>
//         </div>
//       </div>

//   `;
// };