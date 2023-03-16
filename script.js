  'use strict';
  //call country firts step

  const btn = document.querySelector('.btn-country');
  const countriesContainer = document.querySelector('.countries');
  
  const renderCountry = function(data, className=""){
    const html= `
  
    <article class="country" ${className}>
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html)
  //countriesContainer.style.opacity = 1;
  }

  
  const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg)
  // countriesContainer.style.opacity = 1
  }

  /*
  ///////////////////////////////////////
  //PUBLIC APIS ON INTERNET
  //https://github.com/public-apis/public-apis


  const getCountryAndNeighbour= function(country){
  const request = new XMLHttpRequest()
  request.open('GET', `https://restcountries.com/v2/name/${country}`)
  request.send();
  //console.log(request.responseText)

  request.addEventListener('load', function(){
      const [data] = JSON.parse(this.responseText)
      console.log(data)

      const html= `
    
      <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
      
      
      `
  countriesContainer.insertAdjacentHTML('beforeend', html)
  countriesContainer.style.opacity = 1;

  })
  }
  getCountryData('portugal')
  getCountryData('usa')
  getCountryData('rwanda')
  */

  // const btn = document.querySelector('.btn-country');
  // const countriesContainer = document.querySelector('.countries');

  // ///////////////////////////////////////
  // //PUBLIC APIS ON INTERNET
  // //https://github.com/public-apis/public-apis



  // const getCountryAndNeighbour= function(country){

  //     //AJAX call country
  // const request = new XMLHttpRequest()
  // request.open('GET', `https://restcountries.com/v2/name/${country}`)
  // request.send();
  // //console.log(request.responseText)

  // request.addEventListener('load', function(){
  //     const [data] = JSON.parse(this.responseText)
  //     console.log(data)


  //     //render country
  // renderCountry(data)
  // //get neighbour country(2)
  // const [neighbour]= data.borders;
  // if(!neighbour) return

  //  //AJAX call country 2
  //  const request2 = new XMLHttpRequest()
  //  request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
  //  request2.send();
  // // alpha for country code no array required [] not accepted

  //  request2.addEventListener('load', function(){
  //     const data2= JSON.parse(this.responseText) 
  //     console.log(data2)

  //     renderCountry(data2, 'neighbour')
  //  })

  // })
  // }
  // getCountryAndNeighbour('canada')
  // //getCountryAndNeighbour('rwanda')

  // setTimeout(()=>{
  //     console.log('1 second passed')
  //     setTimeout(()=>{
  //         console.log('2 second passed')
  //         setTimeout(()=>{
  //             console.log('1 second passed')
  //             setTimeout(()=>{
  //                 console.log('1 second passed')
  //             }, 1000)
              
  //         }, 1000)
          
  //     }, 1000)
      
  // }, 1000)

  //promises


  //all the reserved values we use json to read them
  //to handle promise
  // const getCountryData = function(country){
  //   fetch(`https://restcountries.com/v2/name/${country}`)
  //   .then(function(response){
  //     console.log(response)
  //     return response.json()

  //   })
  //   .then(function(data){
  //     console.log(data)
  //     renderCountry(data[0])
      
  //   })
  // }
  // getCountryData('portugal')

  //simplifier the code

  //chaining promises

  // const getCountryData = function(country){
  //   fetch(`https://restcountries.com/v2/name/${country}`)
  //   .then(response=> response.json())
  //   .then(data => {
  //     renderCountry(data[0])
  //     const neighbour = data[0].borders[0]

  //     if(!neighbour) return
  // //country 2
  //     return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)

  //   })
  //   .then(response=> response.json())
  //   .then(data=>renderCountry(data, 'neighbour'))
  // };

  // btn.addEventListener('click', function(){
  //   getCountryData('portugal')
  // })

  //work wth a button and handle rejection 

//to work with one function combine all
const getCountryData= function(country){
  getJSON(`https://restcountries.com/v2/name/${country} Country not found` )
  
}
.then(data => {
        renderCountry(data[0])
        const neighbour = data[0].borders[0]
        console.log(neighbour)
    
        if(!neighbour) throw new Error ('No neighbour found')
    //country 2
        return getJSON(`https://restcountries.com/
        v2/alpha/${neighbour}`, 'Country not found'

);
      })
    
    
      .then(data=>renderCountry(data, 'neighbour'))
          .catch(err=>{
            console.error(`${err} fire`)
          renderError(`something went wrong ${err.message}. try again`)
    
          }) 
          .finally(()=>{
            countriesContainer.style.opacity = 1
          })
          getCountryData('Australia')
      
    
    





//Normal code
  // const getCountryData = function(country){
  //     fetch(`https://restcountries.com/v2/name/${country}`)
  //     .then(response=> {
  //       console.log(response)

  //       if(!response.ok)
  //       throw new Error(`Country not found (${response.status})`)
        
  //       return response.json()
  //     })
  //     .then(data => {
  //       renderCountry(data[0])
  //       const neighbour = data[0].borders[0]
    
  //       if(!neighbour) return
  //   //country 2
  //       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
    
  //     })
  //     .then(response=> response.json())
  //     .then(data=>renderCountry(data, 'neighbour'))
  //     .catch(err=>{
  //       console.error(`${err} fire`)
  //     renderError(`something went wrong ${err.message}. try again`)

  //     }) 
  //     .finally(()=>{
  //       countriesContainer.style.opacity = 1


  //     })
  //   }
    
  //   btn.addEventListener('click', function(){
  //     getCountryData('portugal')
  //   })


