let emailTextBox = document.getElementById("emailTextBox")
let coffeeNameTextBox = document.getElementById("coffeeNameTextBox")
let emailPostTextBox = document.getElementById("emailPostTextBox")
let searchOrderButton = document.getElementById("searchOrderButton")
let placeOrderButton = document.getElementById("placeOrderButton")
let coffeeListUL = document.getElementById("coffeeListUL")
let searchResult = document.getElementById("searchResult")


function delFunction(id, email){
    let element = document.getElementById(id)
    coffeeListUL.removeChild(element)
    let url = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders/' + email
    let requestDel = new XMLHttpRequest()
    requestDel.open('DELETE', url)
    requestDel.send()
}

function loadAllOrders() {
    let request = new XMLHttpRequest() 
    request.open('GET','https://dc-coffeerun.herokuapp.com/api/coffeeorders/')

    request.onload = function() {
        let ordersList = JSON.parse(this.responseText)
        let orders = Object.keys(ordersList)
        for (i = 0; i < orders.length; i++){
            let order = ordersList[orders[i]]
            let orderInfo = `<li class="list-group-item" id=${order._id}>
            <h3>${order.emailAddress}</h3>
            <h3>${order.coffee}</h3>
            <button onclick="delFunction('${order._id}', '${order.emailAddress}')">Delete</button>
            </li>`
            coffeeListUL.insertAdjacentHTML('beforeend', orderInfo)
        }
        
    }

    request.send() 

}

searchOrderButton.addEventListener('click', () =>{
    searchResult.innerHTML = ""
    let email = emailTextBox.value
    let url = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders/' + email
    let requestSearch = new XMLHttpRequest()
    requestSearch.open('GET', url)
    
    requestSearch.onload = function(){
        let order = JSON.parse(this.responseText)
        let orderInfo = `<h2>${order.emailAddress}</h2>
        <h2>${order.coffee}</h2>`
        searchResult.insertAdjacentHTML('beforeend', orderInfo)

    }
    
    
    requestSearch.send()

})


placeOrderButton.addEventListener('click',() => {

    let email = emailPostTextBox.value 
    let coffeeName = coffeeNameTextBox.value 

    let requestObject = {
        emailAddress: email, 
        coffee: coffeeName  
    }

    let request = new XMLHttpRequest()
    request.open('POST', 'https://dc-coffeerun.herokuapp.com/api/coffeeorders/')
    request.setRequestHeader('Content-Type','application/json')

    request.send(JSON.stringify(requestObject))

})

loadAllOrders() 