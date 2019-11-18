"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      let searchGender = promptFor("Do you want to search by trait?", yesNo).toLocaleLowerCase();
      let foundSearch;
      switch (searchGender) {
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
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      displayPerson(person);
      // TODO: get person's info
      break;
    case "family":
      displayPeople(spouse(person, people));
      displayPeople(parents(person, people));
      displayPeople(siblings(person, people));
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      children(person, people);
      let answer = promptFor("Would you like to start a new search? Enter yes or no.", yesNo).toLocaleLowerCase();
      switch (answer) {
        case "yes":
          app(people);
          break;
        case "no":
          break;
      }
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

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  let lastName = promptFor("What is the person's last name?", chars).toLowerCase();
  let foundPerson = people.filter(function (person) {
    if (person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPerson[0];
}

// function searchByTrait(people) {
//   let gender = promptFor("What is his/her gender? Male or Female", boyGirl).toLocaleLowerCase();
//   let eyesCol = promptFor("what is the color of his/her eyes?", chars).toLocaleLowerCase();

//   let foundGender = people.filter(function (person) {
//     if (person.gender.toLocaleLowerCase() === gender || person.eyeColor.toLocaleLowerCase() === eyesCol) {
//       return true;
//     }
//     else {
//       return false;
//     }
//   })
//   return displayPeople(foundGender);
// }

function spouse(person, people) {
  let foundFam = people.filter(function (people) {
    if (people.currentSpouse === person.id) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundFam
}

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {

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
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}

function boyGirl(input) {
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}

function parents(person, people) {
  let foundFam2 = people.filter(function (people) {
     if (people.id === person.parents[0] || people.id === person.parents[1]) {
      return true;
    }
    else {
      return false;
    }
  })
  if( person.parents.length < 1){
    alert( person.firstName + " " + person.lastName + " has no parents.")
  } else{
  }
  return foundFam2
}

function siblings(person, people) {
  let foundFam3 = people.filter(function (people) {
    if( people.parents.length < 1){
    }
    else if (people.parents[0] === person.parents[0] ) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundFam3
}

function children(person, people) {
  let foundFam4 = people.filter(function (people) {
    if (person.id === people.parents[0] || person.id === people.parents[1]) {
      return true;
    }
    else {
      return false;
    }
  })
  if (foundFam4.length > 0) {
    alert(foundFam4.map(function (guy) {
      return " This is " + person.firstName + " " + person.lastName + "'s child:" + "\n" + guy.firstName + " " + guy.lastName;
    }).join("\n"));
  } else {
    alert(person.firstName + " " + person.lastName + " has no descendants.")
  }
  for (let i = 0; i < foundFam4.length; i++) {
    children(foundFam4[i], people)
  }
}

function searchByTrait(people) {
	let searchGender =  promptFor("Do you know the gender of the person?", yesNo).toLocaleLowerCase();
	
	if(searchGender === "yes"){
	  let gender = promptFor("What is his/her gender? Male or Female", boyGirl).toLocaleLowerCase();
	  let foundGender = people.filter(function (people) {
	    if (people.gender.toLocaleLowerCase() === gender) {
	      return true;
	    }
	    else {
	      return false;
	    }
	  })
	  // displayPeople(foundGender);
	  people = foundGender
	  eyeColor(people);
	}
	else if (searchGender === "no") {
		eyeColor(people); 
	}  
	
	function eyeColor(people){
	let searchEyeColor =  promptFor("Do you know the eye color of the person?", yesNo).toLocaleLowerCase();
	
	if(searchEyeColor === "yes"){
	  let eyesCol = promptFor("what is the color of his/her eyes?", chars).toLocaleLowerCase();
	   let foundEyeColor = people.filter(function (people) {
	    if (people.eyeColor.toLocaleLowerCase() === eyesCol) {
	      return true;
	    }
	    else {
	      return false;
	    }
	  })
	people = foundEyeColor
	height(people);
		
	 }
	else if (searchEyeColor === "no") {
	height(people);  
	}    
	
	}	  


	function height(people){
	let searchHeight =  promptFor("Do you know the person's height?", yesNo).toLocaleLowerCase();
	
	if(searchHeight === "yes"){
	  let peopleHeight = promptFor("What is his/her height?", chars).toLocaleLowerCase();
	   let foundHeight = people.filter(function (people) {
	    if (people.height === Number(peopleHeight)) {
	      return true;
	    }
	    else {
	      return false;
	    }
	  })
	people = foundHeight
 	weight(people);
	 }
	else if (searchHeight === "no") {
		weight(people); 
	}    
	
	}	

	function weight(people){
	let searchWeight =  promptFor("Do you know the person's weight?", yesNo).toLocaleLowerCase();
	
	if(searchWeight === "yes"){
	  let peopleWeight = promptFor("What is his/her height?", chars).toLocaleLowerCase();
	   let foundweight = people.filter(function (people) {
	    if (people.weight === Number(peopleWeight)) {
	      return true;
	    }
	    else {
	      return false;
	    }
	  })
	people = foundWeight
	occupation(people)
	 
	 }
	else if (searchWeight === "no") {
		occupation(people)  
	}    
	
	}
	function occupation(people){
	let searchOccupation =  promptFor("Do you know the person's occupation?", yesNo).toLocaleLowerCase();
	
	if(searchOccupation === "yes"){
	  let peopleOccupation = promptFor("What is his/her occupation?", chars).toLocaleLowerCase();
	   let foundOccupation = people.filter(function (people) {
	    if (people.occupation === peopleOccupation) {
	      return true;
	    }
	    else {
	      return false;
	    }
	  })
	people = foundOccupation
	displayPeople(people)
	alert("Start new search")
	 app();
	 }
	else if (searchOccupation === "no") {
		displayPeople(people)
		alert("Start new search")
		app();
	}    
	
	}  
}