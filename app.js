const form = document.getElementById('registrar'); //get the form from the html elements 
const input = form.querySelector('input'); //getting the input when adding the name 
const mainDiv = document.querySelector('.main'); //getting access to the main div from the html file 
const ul = document.getElementById('invitedList'); //get the unordered list and assign it to ul variable 


const div = document.createElement('div'); //create div for filter the users
const filterLabel = document.createElement('label'); //create label 
const filterCheckbox = document.createElement('input'); //create input 

filterLabel.textContent = "Hide those who haven't responded"; //change the text on the label
filterCheckbox.type = 'checkbox'; //change the type of the input to checkbox
div.appendChild(filterLabel); //append the label to the div
div.appendChild(filterCheckbox); //append the checkbox to the div
mainDiv.insertBefore(div, ul); // insert the div before the unorder list 

//creating event to the check box
filterCheckbox.addEventListener('change', (e) => {
const isChecked = e.target.checked; //check if the checkbox is checked or not assign it to ischecked
const lis = ul.children; // getting all the list items was added by children property 

if (isChecked){ //if checkbox is true then 
for (let i = 0; i <lis.length; i+=1) { //loop through the all list
        let li = lis[i]; 
        if (li.className === 'responded') { //if the element in the list is checked already 
            li.style.display = ''; //display to empty string
        } else {
            li.style.display = 'none'; //if not checked then hide them 
        }

}
} else { //if checked box is false then show all list item  
    for (let i = 0; i <lis.length; i+=1) {
        let li = lis[i]; 
        li.style.display = ''; 

    }

}
});


//creatting the element from the user
function createLI(text){
const li = document.createElement('li'); //create list item 
const span = document.createElement('span'); //creating span element to change the text to the html element 
span.textContent = text; //assign the span element to the input text 
li.appendChild(span); //append the span element to the list 
const label = document.createElement('label'); //create label to added to the name 
label.textContent = 'confirmed'; // text on it its confirmed
const checkBox = document.createElement('input'); //create checkbox element 
checkBox.type = 'checkbox'; //set the type of the checkbox
label.appendChild(checkBox); //append the checkbox to the label parent
li.appendChild(label); //append the whole label to the li item created before

const editButton = document.createElement('button'); //create element name editbutton 
editButton.textContent = 'edit'; //set the text on the editbutton to edit
li.appendChild(editButton); //append the editbutton to the li element created before



const removeButton = document.createElement('button'); //create element name removebutton 
removeButton.textContent = 'remove'; //set the text on the removebutton to remove
li.appendChild(removeButton); //append the removebutton to the li element created before
return li; //returning the list item was created through the function 
}


//adding the event to the submit button to submit the form 
form.addEventListener('submit', (e) => {
e.preventDefault(); //to prevent any other update when press submit
const text = input.value; //assign input value to text variable
input.value = ''; //clear out the input to empty string 
const li = createLI(text); //calling the function to create the element and assign it to li var 
ul.appendChild(li); //append the whole created elemnt to the ul (the parent)
});


//change the box decoration when checkbox is clicked 
ul.addEventListener('change', (e) => {
const checkbox = event.target; //refrence to the checkbox itself
const checked = checkbox.checked; //store the value of checked or un checked to the var checked
const listItem = checkbox.parentNode.parentNode; //calling the grantparent of the label parent node to label and 2nd one to the ul element

//checking if the checkbox clicked or no 
if(checked){
    listItem.className = 'responded'; //change the class name so will get the decoration 
} else {
    listItem.className = '';
}

});

//add the event to remove button
ul.addEventListener('click', (e) => {
if (e.target.tagName === 'BUTTON'){ //check if the target clicked is button
    const button = e.target; //assign the target to button var
    const li = button.parentNode; //refrence to the list from the button parent item
    const ul = li.parentNode; //getting the list parent node 
    if ( button.textContent === 'remove') { //if the button text content is remove
    ul.removeChild(li); // remove the whole list item 
    } else if (button.textContent === 'edit') { //check if the button textcontent is edit 
        const span = li.firstElementChild; //select the span to the first element child
        const input = document.createElement('input'); //create input to replace the span with
        input.type = 'text'; //configure it to text type
        input.value = span.textContent; //set the input value to the text span text 
        li.insertBefore(input, span);  //place the input into the dom by using insert before method so input before the span 
        li.removeChild(span); //remove the text
        button.textContent = 'save'; //change the button name to save 
    } else if (button.textContent === 'save') { //check if the button clicked is the save 
        const input = li.firstElementChild;  //first child element is input
        const span = document.createElement('span'); //create new span 
        span.textContent = input.value ; //span text to the input from the user 
        li.insertBefore(span, input); //append the span before the input
        li.removeChild(input); //remove the input 
        button.textContent = 'edit'; //change the button to edit instead of save 


    }
}
});