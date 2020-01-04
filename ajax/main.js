getData = (url)=> {
  return  fetch(url).then(function(result){
    return result.json();
  });

}


search=()=>{
  let valSelect=document.getElementsByName('movie')[0].value;

  let valName=document.getElementsByClassName('form__name-film')[0].value;   

      getData('https://www.omdbapi.com/?s="'+valName+'"&type="'+valSelect+'"&page=1&apikey=c557ed72').then(function(result){
        console.log(result.totalResults);
        console.log(result);
        if(result.Response=='True'){
          let list= ``;             
          for (let el of result.Search){
            list+=`<div class="film" >`;
            list += `<div class="film__title " >${el.Title}</div>`;
            list += `<div class="film__year">(${el.Year})</div>`;
            list += `<div class="film__poster" style="background-image:url(${el.Poster})"></div>`;
            list += `<button class="btn " onclick='details(this)' value='${el.imdbID}'>DETAILS</button>`;
            list += `</div>`;
            
          }
        
          list += `<div class="film film--empty"></div>`;
           list += `<div class="film film--empty"></div>`;  
          if(result.totalResults>10){
            document.getElementById('film-page').innerHTML='';
            let newResult= result.totalResults/10+1;
            for(let i = 1; i < newResult; i++){
              let btnPage= ``;
              btnPage+=`<button class="btn btn--page" onclick='pg(this)' value='${i}' >${i}</button>`;
              document.getElementById('film-page').innerHTML += btnPage;
            }
          }
  
          document.getElementById('film-list').innerHTML = list;
        
        }else if(result.Response=='False'){
          alert('Movie not found!.');
        }
        
                        
     
      })

    }
    pg=(elem)=>{
      let valSelect=document.getElementsByName('movie')[0].value;
      let valName=document.getElementsByClassName('form__name-film')[0].value;   

      console.log(elem.value);
      getData('https://www.omdbapi.com/?s="'+valName+'"&type="'+valSelect+'"&page='+elem.value+'&apikey=c557ed72').then(function(result){
        
        if(result.Response=='True'){
          let list= ``;                
          for (let el of result.Search){
            list+=`<div class="film" >`;
            list += `<div class="film__title " >${el.Title}</div>`;
            list += `<div class="film__year">${el.Year}</div>`;
            if(el.Poster=='N/A'){
              // console.log('gfsdgfs');
              el.Poster='./no_img.png';
            }
            list += `<div class="film__poster" style="background-image:url(${el.Poster})"></div>`;
         
            list += `<button id="detail" class="btn" onclick='details(this)' value='${el.imdbID}'>DETAILS</button>`;
            list += `</div>`;
           
          }
          list += `<div class="film film--empty"></div>`;
          list += `<div class="film film--empty"></div>`; 
          document.getElementById('film-list').innerHTML = list;
          document.getElementById('film-list').scrollIntoView({block: "start", behavior: "smooth"});
         
        } 
     
      })
    }
        

details=(elem)=>{  
  console.log(elem.value);
  let info= elem.value;
  getData('https://www.omdbapi.com/?i='+info+'&apikey=c557ed72').then(function(result){
    let list= ``;
    console.log(result);
    list+= `<div class="info">Detail info`;
    list += `<div class="info__title">${result.Title}</div>`;
    list += `<div class="info__released">Released: ${result.Released}</div>`;
    list += `<div class="info__runtime">Runtime: ${result.Runtime}</div>`;
    list += `<div class="info__genre">Genre: ${result.Genre}</div>`;
    list += `<div class="info__director">Director: ${result.Director}</div>`;
    list += `<div class="info__actors">Actors: ${result.Actors}</div>`;
    list+=`</div>`;
    document.getElementById('film-info').innerHTML = list;
  })

 document.getElementById('film-info').scrollIntoView({block: "center", behavior: "smooth"});
}

