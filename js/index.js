const loadData=async()=>{
    const url=`https://openapi.programming-hero.com/api/news/categories`
    const res=await fetch(url);
    const data= await res.json();
    const object=data.data.news_category;
    addCategory(object);
    // loadNews(object);
}
loadData();

const addCategory=async(categories)=>{
    const categoryMenu=document.getElementById('category-menu');
    for(category of categories){
      const li=document.createElement('li');
      li.classList.add('nav-item');
      li.innerHTML=`
      <a class="nav-link active" onclick="loadNews('${category.category_id}')" aria-current="page" href="#">${category.category_name}</a>
      `
      categoryMenu.appendChild(li);
    }
}


const loadNews=async category_id=>{
  const sppiner=document.getElementById('sppiner');
  sppiner.classList.remove('d-none');
  
  const url=` https://openapi.programming-hero.com/api/news/category/${category_id}`
  const res=await fetch(url);
  const data= await res.json();
  
  addNews(data.data)
}
loadNews();

const addNews=async(newses)=>{
  
  const newsCount=document.getElementById('conunt-news');
  if(newses.length>0){
    newsCount.innerText=`${newses.length} News Here.`
  }else{
    newsCount.innerText=`No News Here.`
  }
  
  const cardContainer=document.getElementById('card-container');
  cardContainer.innerHTML='';
  for(news of newses){
  
  const div=document.createElement('div');
    div.classList.add('row');
    div.innerHTML=`
         <div class="card mb-3 col" onclick="openModal('${news._id}')"  data-bs-toggle="modal" data-bs-target="#Modal">
         <div class="row">
         <div class="col-md-3 ps-0">
         <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="">
       </div>
       <div class="col-md-8">
         <div class="card-body">
           <h5 class="card-title">${news.title}</h5>
           <p class="card-text">${news.details.length>300 ? news.details.slice(0,300)+'...' : news.details}</p>
          
           <div class="d-flex ">
             <img src="${news.author.img}" class="img-fluid rounded-circle  " alt="" style="height:50px; width:50px;">
             <p class="card-text ms-2 me-5 my-auto"><small class="text-muted ">${news.author.name ? news.author.name : 'No name here.'}</small></p>
             <p class="card-text my-auto"><i class="uil uil-eye"></i><small class="text-muted">${news.total_view ? news.total_view : 'No view' }</small></p>
           </div>
         </div>
         </div>
         </div>
         </div>`
     cardContainer.appendChild(div);
  }
   sppinerload(false);
    
}

const sppinerload=(loading)=>{
  const sppiner=document.getElementById('sppiner');
if(loading){
  sppiner.classList.remove("d-none");
}else{
  sppiner.classList.add("d-none");
}
}

  const openModal=async(_id)=>{
   
    const url=` https://openapi.programming-hero.com/api/news/${_id}`
    const res=await fetch(url);
    const data= await res.json();
    modalBody(data.data);
  }
   openModal();

const modalBody=async (alldetails) =>{
  const modalContainer=document.getElementById('Modal');
  modalContainer.innerHTML='';
  // for(detail of alldetails){
  //   console.log(detail.title)
  // }
  const div=document.createElement('div');
    div.classList.add('modal-dialog');
    div.innerHTML=`
    <div class="modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p></p>
      </div>
    </div>
  </div>
    `
    modalContainer.appendChild(div);
  
  
 
  
}


// const loadNews=async category_id=>{
    
//     const url=` https://openapi.programming-hero.com/api/news/category/${category_id}`
//     const res=await fetch(url);
//     const data= await res.json();
//    addNews(data.data)
// }
// loadNews();

// const addNews=async(newses)=>{
//     const cardContainer=document.getElementById('card-container');
//     cardContainer.innerHTML='';
//     for(news of newses){

//     const div=document.createElement('div');
//       div.classList.add('row');
//       div.innerHTML=`
//            <div class="card mb-3 col">
//            <div class="row">
//            <div class="col-md-3 ps-0">
//            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="">
//          </div>
//          <div class="col-md-8">
//            <div class="card-body">
//              <h5 class="card-title">${news.title}</h5>
//              <p class="card-text">${news.details.length>300 ? news.details.slice(0,300)+'...' : news.details}</p>
            
//              <div class="d-flex ">
//                <img src="${news.author.img}" class="img-fluid rounded-start  " alt="" style="height:50px; width:50px">
//                <p class="card-text"><small class="text-muted">${news.author.name}</small></p>
//                <p class="card-text"><i class="uil uil-eye"></i><small class="text-muted">${news.total_view}</small></p>
//              </div>
//            </div>
//            </div>
//            </div>
//            </div>`
//        cardContainer.appendChild(div);
//     }
// /
