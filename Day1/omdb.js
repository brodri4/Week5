let omdbListUL = document.getElementById("omdbListUL")
let request = new XMLHttpRequest()



request.addEventListener("load", function () {
    let result = JSON.parse(this.responseText)
    let movieList = result.Search.map((fact) => {
        return `<div>
        <li class="list-group-item">
        <img src=${fact.Poster} />
        <a class="btn btn-link" data-toggle="collapse" onclick="loadFunction('${fact.imdbID}', 'http://www.omdbapi.com/?i=${fact.imdbID}&apikey=a0a0af5a')" href="#${fact.imdbID}" role="button" aria-expanded="false" aria-controls="collapseExample">
        ${fact.Title}</a>
        <ul class="list-group collapse" id="${fact.imdbID}"></ul>
        </li>
        </div>
        `
    })
    omdbListUL.insertAdjacentHTML('beforeend', movieList.join(" "))
})

    function loadFunction(id, url) {
        subListUL = document.getElementById(id)
        if (subListUL){
            while (subListUL.firstChild){

                subListUL.removeChild(subListUL.firstChild)
            }
        }
        let requestInfo = new XMLHttpRequest()
        requestInfo.open('GET', url)
        requestInfo.addEventListener("load", function () {
            let newResult = JSON.parse(this.responseText)
            let movie= `<li class="list-group-item borderless">
                <p><b>Title: ${newResult.Title}</b></p>
                <p><b>Rated: ${newResult.Rated}</b></p>
            <p><b>Date: ${newResult.Released}</b></p>
            <p><b>Director: ${newResult.Director}</b></p>`
            subListUL.insertAdjacentHTML('beforeend', movie)
        })
        
        requestInfo.send()
    }



    // 
    // let div = omdbListUL.getElementsByTagName("div")
    // for (let i = 0; i < div.length; i++ ){
    //     let ul = div[i].getElementsByTagName("ul")
    //     let elementID = ul[0].id
    //     let movieIDList = document.getElementById(elementID)
    //     let URL = `http://www.omdbapi.com/?i=${elementID}&apikey=a0a0af5a`
    //     console.log(URL)
    //     //requestInfo.open('GET', URL)


//     requestInfo.addEventListener("load", function () {
//         let newResult = JSON.parse(this.responseText)
//         console.log(newResult)
//         let movieByID = `<li class="list-group-item borderless">
//             <p><b>Title: ${newResult.Title}</b></p>
//             <p><b>Rated: ${newResult.Rated}</b></p>
//             <p><b>Date: ${newResult.Released}</b></p>
//             <p><b>Director: ${newResult.Director}</b></p>
//             `

//         movieIDList.insertAdjacentHTML('beforeend', movieByID)

//         //requestInfo.send()  
//     })
// }
// )



request.open('GET', 'http://www.omdbapi.com/?s=batman&apikey=a0a0af5a')
request.send()