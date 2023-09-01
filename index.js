const handleCategory=async()=>{
    const res=await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data=await res.json()
    // console.log(data.data)
    const myData=data.data

    const categoryContainer=document.getElementById('category-container');
    myData.forEach(category => {
        //  console.log(category.category_id)
         const div=document.createElement('div')
         div.innerHTML=`
          <button onclick="loadInfo('${category.category_id}')" class="btn active-[bg-red] tab-active"><a class="tab 
          ">${category.category}</a></button> 
         `;
         categoryContainer.appendChild(div)
    });
}


const loadInfo=async(categoryId)=>{
const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
 const data=await res.json()
 console.log(data.data)
 const cardData=data.data;

 const cardContainer=document.getElementById('card-container')
 cardContainer.innerHTML='';
 if(cardData.length===0){
  const newDiv=document.createElement('div')
  newDiv.innerHTML=`
   <div class=" mt-20  w-full md:ml-[300px]  lg:ml-[470px]">
   <img class="ml-[80px] lg:ml-[70px] " src="image/icon.png">
   <h1 class="text-center  mt-[6px] font-bold text-[25px]">Oops!! Sorry, There is no  content here</h1>
   </div>
  `;
   cardContainer.appendChild(newDiv)
}

 
 cardData.forEach(card=>{
      // console.log(card)
      
      const div=document.createElement('div');
      div.innerHTML=`
      <div class="card w-72 ml-4 lg:ml-0 bg-base-100 shadow-xl relative">
      <figure><img class="h-[200px]" src="${card.thumbnail}" alt="Shoes" /></figure>
      <div class="card-body">
        <div class="flex gap-2">
        <img class="rounded-full w-8 h-8" src="${card.authors[0].profile_picture}">
        <h2 class="card-title">${card.title}</h2>
        </div>
         <div class="grid grid-cols-2 mt-2">
            <p class="">${card.authors[0].profile_name}</p>
            <img class="w-10 mr-5" src="${card.authors[0].verified?'varify.jpg':''}">
            
         </div>
         <p>${card.others.views}</p>

          <div>
         ${card.others.posted_date.length===0? '' : `<p class="text-[12px] bg-black text-white text-right p-2 w-[50%] absolute top-36 left-32  rounded-xl">${Math.floor((card.others.posted_date/60)/60)} hrs ${Math.floor((card.others.posted_date/60)%60)} min ago</p>`}
         
            </div>

         
       
         
      </div>
    </div>

   
 
      `;



      cardContainer.appendChild(div)
 })
}

document.getElementById('blog-btn').addEventListener('click',function(){
      window.location.href="blog.html"
})

 
handleCategory()
loadInfo('1000')
