

//Putting the utilities in the global scope so that you can acess them later
//by the way we are using camel case

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const filterItems = document.getElementById('filter');
const clearBtn = document.getElementById('clear');


//Adding Items to the list - DOM only
function OnSubmit(e) //OnSubmit function is desinged to handle the submit event(btw, the submit is a type of event)  by the way e means event function
{
  //Validate Input
  e.preventDefault() //prevents default behavior of form submission. normally, submitting a form would reload the page, but this line of code prevents it from happening
  

  const newItem = itemInput.value;
  if (newItem ==="")
  {
    alert('Please enter a valid item'); //this is a simple if statement
    return;
  }


  //Add New Item to the list
  addItemToDom(newItem)



  //Clear the input field after submitting
  itemInput.value = "";

    

  //Preventing Duplicate Items
  if(containsduplicates(newItem))
    {
      alert('This item already exists!');
      return;
    }
  
  
  
    //checking if item includes duplicates function
    function containsduplicates(item)
    {
      const items = getItemsFromLocalStorage;
      return items.includes(item);
    }





}
//creating the list and adding it to the DOM
function addItemToDom(newItem)
{
  //creating a new 'list item' element
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem)); //text node is a method of document that creates a text node.. 


  itemList.appendChild(li) //this method appends the created text node as a child of the specified parent element


  


  //Appending the remove button element to the newly created list item
  const removeBtn = document.createElement('remove-item');
 //removeBtn.textContent = 'fa-solid fa-xmark';


  removeBtn.className="fa-solid fa-xmark";
  removeBtn.style.color="#333"; //changes the style color from blue to black

  li.appendChild(removeBtn);



  //Save to Local Storage
  addToLocalSotrage(newItem)



  //Defining the handler function
  function removeClick()
  {
    if(confirm('Are you sure?'))
    {
      itemList.removeChild(li); //removes child element from list item
      removeFromLocalStorage(newItem);
    }
    
  }


  //Adding the Event Listener
  removeBtn.addEventListener('click', removeClick)




}




//Removing Items
  


function OnRemove(e)
{
 
    if (e.target.classList.contains('fa-xmark')) {
      const li = e.target.parentElement;
      if (confirm('Are you sure?')) {
        itemList.removeChild(li);
      }
    }
  
  //const removeBtnn = itemList.li;

  //itemForm.li = ''
  
}



//Filtering Items
function OnFilter(e) 
{
   //e.preventDefault();

   const text = e.target.value.toLowerCase(); //we are targeting the value that the user inputs in the filter section using the 'e'
   const items = itemList.getElementsByTagName('li'); // we want to filter the items with a tag name of 'li'. becuase that is where the list items would be found


   Array.from(items).forEach(function(item) // converts items from HTML collection(an array-like object) into a true array. This allows you to use array methods like 'forEach'.

   //'items' is expected to be a collection of <'li'> elements, typically obtained using 'itemList.getElementsByTageName('li').
  {
    const itemName = item.firstChild.textContent.toLowerCase(); //accesses the first child node of the <li> element. typically a text node containing the text item
    if(itemName.indexOf(text) != -1) //indexOf(text)' checks if the text is found within itemName
    //if text is found within itemName, indexOf returns the index of the first occurence of the specified value

    {
      item.style.display = 'flex'; //sets the CSS display property of the item to flex. that is if text is found
    }
    else
    {
      item.style.display = "none"; //if text is not found within itemName,this block of code sets the CSS display property of the item to none(effectively hiding those items)
    }
  });

}


//Loading items from local storage
document.addEventListener('DOMContentLoaded', loadItemsFromLocalStorage);
//Load items from Local Storage 

function loadItemsFromLocalStorage() //responsible for loading items from local storage & adding them to the list
{
  const items = getItemsFromLocalStorage() //calls the 'getItemsFromStorage' function to retrieve the list of items currently stored in local storage. Returned array of items is stored in the constant 'items'
  {
    items.forEach(item=> addItemToDom(item)) //uses the forEach method to iterate over each item in the items array
  }
}


//Local Storage Utility functions

function addToLocalSotrage (item) //responsible for adding a new item to local storage
{
  let items = getItemsFromLocalStorage(); //calls getItemsFromStorage function to retrieve the current list of items from local storage. returned list is stored in the variable items


  items.push(item); //adds the new item to the items array

  localStorage.setItem('items', JSON.stringify(items)); //converts updated items array into a JSON string using JSON.stringify and then saves it to local storage

}


function getItemsFromLocalStorage() //responsible for retrieving a list of items from local storage

{
  let items = localStorage.getItem('items'); // retrieves value associated with key  'items' local storage and then stores it in the variable 'items'. The retrieved value is a JSON string

  return items ? JSON.parse(items) : []; //checks if items is not null. If items is not null, it parses the JSON string into a JavaScript array using JSON.parse and returns it. If items is null, it returns the array


}


function removeFromLocalStorage(item) //responsible for removing an item from local storage

{
  let items = getItemsFromLocalStorage(); //calls the getItemsFromLocalStorage function to retrieve the current list of items from the local storage


  items = items.filter(i => i !== item); //uses the filter method to create a new array that contains all items except the one to be removed('item'). updated list is stored back in the 'items' variable


  localStorage.setItem('items', JSON.stringify(items)); //converts updated items array into a JSON string using a JSON.stringify and saves it to local storage under the key 'items'
}


function clearLocalStorage() //responsible for clearing all items from local storage


{
  localStorage.removeItem('items'); // removes the key 'item' and its associated value from the local storage
}



//Clearing Items
function OnClear(e)
{
  e.preventDefault()//prevents behavorial function of the function

 // This method will work itemList.innerHTML = "";

 //But this method is needed--trying to work with it
 while(itemList.firstChild)
 {
  itemList.removeChild(itemList.firstChild)
 }
  //This loop continues to execute as long as itemList has a first child
  //First child property returns the first child node of specified element

  //Clear Local Storage
  clearLocalStorage();
}




//Adding Local Storage
//Demo for local storage

localStorage.setItem('Name','Kwame')
console.log(localStorage.getItem('Name'));


//Utility functions--or EventListeners
itemForm.addEventListener('submit', OnSubmit); //OnSubmit is the function that will be called when this event listener is fired off, like when the submit is invoked
clearBtn.addEventListener('click', OnClear);


//Adding X buttons to existing items through event listeners
itemList.addEventListener('click', OnRemove);

//Filtering Items
filterItems.addEventListener('input', OnFilter );


