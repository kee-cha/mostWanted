"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':

       let searchCriteria = promptFor("Is the person male or female?", boyGirl).toLowerCase()
      // TODO: search by traits
     
      searchResults = searchByTrait(people);

      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
<<<<<<< HEAD
=======
  
  console.log(person.firstName);
>>>>>>> 36b62baaee94558882d82195167054660e634734

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
<<<<<<< HEAD
      alert("First Name: " + person.firstName + "\n" + "Last Name: " + "\n" + "ID Number: " + person.id + "\n" + "Gender: " + person.gender + "\n" + "Date of Birth: " + person.dob + "\n" + "Height: " + person.height + "\n" + "Weight: " + person.weight + "\n" + "Eye Color: " + person.eyeColor + "\n" + "Occupation: " + person.Occupation )
    // TODO: get person's info
    break;
=======
    // TODO: get person's info
    alert( bold("First Name: "+person.firstName+ " Last Name: "+ person.lastName);
>>>>>>> 36b62baaee94558882d82195167054660e634734
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
<<<<<<< HEAD
    // TODO: get person's descendants
=======
    
>>>>>>> 36b62baaee94558882d82195167054660e634734
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  let lastName = promptFor("What is the person's last name?", chars).toLowerCase();

<<<<<<< HEAD
=======

>>>>>>> 36b62baaee94558882d82195167054660e634734
  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName){
      return true;
    }
    else{
      return false;
    }
  })
<<<<<<< HEAD
  return foundPerson[0];
}

function searchByTrait(people){
  let gender = promptFor("What is his/her gender?", chars);
  
  let foundGender = people.filter(function(person){
  if(person.gender === gender){
    return true;
  }
  else{
    return false;
  }
})
return foundGender
}
=======
  // TODO: find the person using the name they entered
  // alert(foundPerson.firstName);
  return foundPerson[0];
}

>>>>>>> 36b62baaee94558882d82195167054660e634734
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

<<<<<<< HEAD
function boyGirl(input){
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}
=======
>>>>>>> 36b62baaee94558882d82195167054660e634734
