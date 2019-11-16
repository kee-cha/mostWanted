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
      // TODO: search by traits
      let searchGender = promptFor("Do you know the gender and eye color?", yesNo).toLocaleLowerCase();
      let foundSearch;
      switch(searchGender){
        case "yes":
          foundSearch = searchByTrait(people);
          break;
        case "no":
          break;
        default:
          break;
      }
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

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":

      displayPerson(person);

    // TODO: get person's info
    break;
    case "family":
      displayPeople(spouse(person,people));
      displayPeople(parents(person, people));
      displayPeople(siblings(person, people));

    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
      displayPeople(children(person,people))
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
  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson[0];
}

function searchByTrait(people){
  let gender = promptFor("What is his/her gender? Male or Female", boyGirl).toLocaleLowerCase();
  let eyesCol = promptFor("what is the color of his/her eyes?", chars).toLocaleLowerCase();
  let foundGender = people.filter(function(person){
  if(person.gender.toLocaleLowerCase() === gender && person.eyeColor.toLocaleLowerCase() === eyesCol){
    return true;
  }
  else{
    return false;
  }
})
 return displayPeople(foundGender);
}

function spouse(person, people){
  let foundFam = people.filter(function(people){
  if(people.currentSpouse === person.id){
    return true;
  }
  else{
    return false;
  }
})
return foundFam
}

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
  personInfo += "ID Number: " + person.id + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
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

function boyGirl(input){
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}

function parents(person, people){
  let foundFam2 = people.filter(function(people){
  if( people.id === person.parents[0] || people.id === person.parents[1]){
    return true;
  }
  else{
    return false;
  }
})
return foundFam2
}

function siblings(person, people){
  let foundFam3 = people.filter(function(people){
  if( people.parents[0] === person.parents[0] || people.parents[1] === person.parents[1]){
    return true;
  }
  else{
    return false;
  }
})
return foundFam3
}
function children(person, people){
  let foundFam4 = people.filter(function(people){
  if(person.id === people.parents[0] || person.id === people.parents [1]){
    return true;
  }
  else{
    return false;
  }
})
return foundFam4
}
