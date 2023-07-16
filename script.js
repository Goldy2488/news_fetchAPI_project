window.addEventListener("load",()=>fetchNews("ipl"));

async function fetchNews(query){
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=a5aa3f8a3379485d9600373c1586fdaa`);
    const data = await response.json();
    cloneData(data.articles);
    // console.log(data);
}
      
function cloneData(articles){
    const parentContainer=document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("news-template");

    parentContainer.innerHTML="";

    articles.forEach((article)=>{
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        changeData(cardClone, article)
        parentContainer.appendChild(cardClone);
    })
}


function changeData(cardClone, article){
    const newsTitle = cardClone.querySelector("#newsTitle");
    const newsSource = cardClone.querySelector("#newsSource");
    const newsDesc = cardClone.querySelector("#newsPera");
    const newsImg = cardClone.querySelector("#card-img");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-US",{
        timeZone:"Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} .  ${date}`;

    // clicking pic
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })  
    
}
 
let curSelectedNav=null;
function onNavItmClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
} 


// 

const searchBtn=document.getElementById('searchBtn');
const searchBar=document.getElementById('searchNews');

searchBtn.addEventListener("click",()=>{
    const query=searchBar.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
})