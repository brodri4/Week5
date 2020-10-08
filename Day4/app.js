let storesListUL = document.getElementById("storesListUL")
let storeNameTextField = document.getElementById("storeNameTextField")
let storeAddressTextField = document.getElementById("storeAddressTextField")
let addStoreButton = document.getElementById("addStoreButton")


addStoreButton.addEventListener('click',() => {
    let name = storeNameTextField.value 
    let address = storeAddressTextField.value

    saveDataToFirebase(name, address)     
})



function saveDataToFirebase(name, address) {
    db.collection("stores").add({
        name: name,
        address: address,
        items: []
    }).then(function (docRef) {
        getAllStores() 
    }).catch(function (error) {
        console.log(error)
    })
}

function deleteStore(documentId) {
    db.collection("stores").doc(documentId).delete()
    .then(function() {
       getAllStores() 
    }).catch(function(error) {

    })
}

function getAllStores() {

    storesListUL.innerHTML = ""

    db.collection("stores").get().then(snapshot => {
        snapshot.forEach((doc) => {
            let data = doc.data() 
            let storeItems = `<li class="list-group-item list">
            <h4><p><b>${data.name} - ${data.address}</b></p></h4>
            <input type="text" id=${doc.id} placeholder="Grocery Item"/>
            <button onclick="addItemToList('${doc.id}')">Add Item</button>
            <p></p>
            <p>${data.items}</p>
            <button onclick="deleteStore('${doc.id}')">Delete</button>
            </li>`
            storesListUL.insertAdjacentHTML('beforeend',storeItems)
        })
    })

}



function addItemToList(storeId) {
    storeItemTextBox = document.getElementById(storeId)
    item = storeItemTextBox.value
    db.collection("stores").doc(storeId)
        .update({
            items: firebase.firestore.FieldValue.arrayUnion(` ${item}`) 
        })


}

getAllStores() 