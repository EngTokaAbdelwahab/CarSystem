var ModelName=document.getElementById("ModelName");
var CarPrice=document.getElementById("CarPrice");
var CarColor=document.getElementById("CarColor");

var mainBtn=document.getElementById("mainBtn");
var inputUrl=document.getElementById("inputUrl");
var Update
var inCase = 'create';
var ProductList=[]

if (localStorage.getItem("Product")!=null) {
    ProductList=JSON.parse(localStorage.getItem("Product"));
    displayProduct();
}else{
    ProductList=[]
}

// Function addProduct
function addProduct(){
   if ( validateModelName() == true ) {
    var Product={
        name:ModelName.value,
        price:CarPrice.value,
        CarColor:CarColor.value,
        url:inputUrl.value,
    };
    clearProduct();

if (inCase === 'create'){
ProductList.push(Product);
displayProduct();
localStorage.setItem("Product",JSON.stringify(ProductList))

}
else{
ProductList[Update]=Product
displayProduct();
inCase = 'create'
mainBtn.innerText='Add Product'
localStorage.setItem("Product",JSON.stringify(ProductList))

}
   }else{
    alert("Invaild ")
   }
            
}

// Function displayProduct
function displayProduct() {
    cartoona=``;
    for (var i = 0; i < ProductList.length; i++) {
        cartoona+=` <tr>
                <td>${i+1}</td>
                <td>${ProductList[i].name}</td>
                <td>${ProductList[i].price}</td>
                 <td>${ProductList[i].CarColor}</td>
                <td ><button class="btn btn-outline-success" onclick="visitProduct(${i})" >Visit</button></td>
                <td><button onclick="UpdateProduct(${i})" class=" btn btn-outline-warning">Edit</button></td>
                <td><button onclick="deleteProduct(${i})" class=" btn btn-outline-danger">Delete</button></td>

            </tr>`
    }
    document.getElementById("Tbody").innerHTML=cartoona;
}

// Function clearProduct
function clearProduct() {
    ModelName.value="";
    CarPrice.value="";
    CarColor.value="";
    inputUrl.value='';
}

// Function deleteProduct
function deleteProduct(index) {
    ProductList.splice(index,1);
    displayProduct();
    localStorage.setItem("Product",JSON.stringify(ProductList))

}

// Function UpdateProduct
function UpdateProduct(index) {
    ModelName.value=ProductList[index].name;
    CarPrice.value= ProductList[index].price;
    CarColor.value=ProductList[index].CarColor ;
    inputUrl.value=ProductList[index].url;

    mainBtn.innerText="UpdateProduct";
    Update=index;
    inCase = 'update'


}
// Function Search
function search(trem){
    cartoona=``;
    for (var i = 0; i < ProductList.length; i++) {
        if (ProductList[i].name.toLowerCase().includes(trem.toLowerCase())==true) {
            ProductList[i].newName=ProductList[i].name.replace(trem,`<span class=" text-danger fw-bolder">${trem}</span>`)
            cartoona+=` <tr>
            <td>${i+1}</td>
            <td>${ProductList[i].newName?ProductList[i].newName:ProductList[i].name}</td>
            <td>${ProductList[i].price}</td>
            <td>${ProductList[i].CarColor}</td>
               <td><button  class=" btn btn-outline-primary">vist</button></td>
            <td><button  class=" btn btn-outline-warning">Edit</button></td>
            <td><button onclick="deleteProduct(${i})" class=" btn btn-outline-danger">Delete</button></td>
        </tr>`
        }
        
    }
    document.getElementById("Tbody").innerHTML=cartoona;

}
function visitProduct(index) {
    window.open(ProductList[index].url);
}

// Function validateModelName
function validateModelName() {
    var regex = /^[A-Za-z]{2,8}$/;

    if (regex.test(ModelName.value) == true) {
                document.getElementById("name-validation").classList.replace("d-block", "d-none");

    return true
    } else {
        document.getElementById("name-validation").classList.replace("d-none","d-block")
     return false
    }
}

//Function validtionCarPrice
function validtionCarPrice() {
    var regex=/^[0-9]{4,9}$/;     

    if (regex.test( CarPrice.value)==true) {
        document.getElementById("errorPrice").classList.add("d-none");
        
    return true
    } else {
        document.getElementById("errorPrice").classList.remove("d-none");
    return false
    }
}
