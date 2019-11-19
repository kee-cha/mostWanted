"use strict"
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let searchGender = promptFor("Do you want to search by trait?", yesNo).toLocaleLowerCase();
      let foundSearch;
      switch (searchGender) {
        case "yes":
          foundSearch = searchByTrait(people);
          break;
        case "no":
          alert("Restart search")
          app(people)
          break;
        default:
          break;
      }
      app(people)
      break;
    default:
      app(people);
      break;
  }
  mainMenu(searchResults, people);
}

function mainMenu(person, people) {
  if (!person) {
    alert("Could not find that individual.");
    return app(people);
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      displayPerson(person);
      let continueSearch = promptFor("Would you like to start a new search? Enter yes or no.", yesNo).toLocaleLowerCase();
      switch (continueSearch) {
        case "yes":
          app(people);
          break;
        case "no":
          break;
      }
      break;
    case "family":
      spouse(person, people);
      parents(person, people);
      siblings(person, people);
      let newSearch = promptFor("Would you like to start a new search? Enter yes or no.", yesNo).toLocaleLowerCase();
      switch (newSearch) {
        case "yes":
          app(people);
          break;
        case "no":
          break;
      }
      break;
    case "descendants":
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
      app(people);
      break;
    case "quit":
      return;
    default:
      return mainMenu(person, people);
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  let lastName = promptFor("What is the person's last name?", chars).toLowerCase();
  let foundPerson = people.filter(function (person) {
    if (person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName) {
      return true;
    } else {
      return false;
    }
  })
  return foundPerson[0];
}

function spouse(person, people) {
  let foundFam = people.filter(function (people) {
    if (people.currentSpouse === person.id) {
      return true;
    } else {
      return false;
    }
  })
  if (person.currentSpouse > 0) {
    alert(foundFam.map(function (people) {
      return " This is " + person.firstName + " " + person.lastName + "'s current spouse:" + "\n" + people.firstName + " " + people.lastName;
    }).join("\n"));
  } else {
    alert(person.firstName + " " + person.lastName + " has no current spouse.");
  }
  return foundFam;
}

function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "ID Number: " + person.id + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input) {
  return true;
}

function boyGirl(input) {
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}

function parents(person, people) {
  let foundFam2 = people.filter(function (people) {
    if (people.id === person.parents[0] || people.id === person.parents[1]) {
      return true;
    } else {
      return false;
    }
  })
  if (person.parents.length > 0) {
    alert(foundFam2.map(function (people) {
      return " This is " + person.firstName + " " + person.lastName + "'s parents:" + "\n" + people.firstName + " " + people.lastName;
    }).join("\n"));
  } else {
    alert(person.firstName + " " + person.lastName + " has no parents.");
  }
  return foundFam2;
}

function siblings(person, people) {
  let foundFam3 = people.filter(function (people) {
    if (people.parents.length < 1) {
    } else if (people.parents[0] === person.parents[0]) {
      if (person.id === people.id) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  })
  if (foundFam3.length > 0) {
    alert(foundFam3.map(function (people) {
      return " This is " + person.firstName + " " + person.lastName + "'s siblings:" + "\n" + people.firstName + " " + people.lastName;
    }).join("\n"));
  }
  return foundFam3
}

function children(person, people) {
  let foundFam4 = people.filter(function (people) {
    if (person.id === people.parents[0] || person.id === people.parents[1]) {
      return true;
    } else {
      return false;
    }
  })
  if (foundFam4.length > 0) {
    alert(foundFam4.map(function (guy) {
      return " This is " + person.firstName + " " + person.lastName + "'s child:" + "\n" + guy.firstName + " " + guy.lastName;
    }).join("\n"));
  } else {
    alert(person.firstName + " " + person.lastName + " has no descendants.");
  }
  for (let i = 0; i < foundFam4.length; i++) {
    children(foundFam4[i], people);
  }
}

function searchByTrait(people) {
  let searchGender = promptFor("Do you know the gender of the person?", yesNo).toLocaleLowerCase();
  if (searchGender === "yes") {
    let gender = promptFor("What is his/her gender? Male or Female", boyGirl).toLocaleLowerCase();
    let foundGender = people.filter(function (people) {
      if (people.gender.toLocaleLowerCase() === gender) {
        return true;
      } else {
        return false;
      }
    })
    people = foundGender
    eyeColor(people);
  } else if (searchGender === "no") {
    eyeColor(people);
  }
}

function eyeColor(people) {
  let searchEyeColor = promptFor("Do you know the eye color of the person?", yesNo).toLocaleLowerCase();
  if (searchEyeColor === "yes") {
    let eyesCol = promptFor("what is the color of his/her eyes? Please choose between brown, black, blue, hazel, green.", colorEye).toLocaleLowerCase();
    let foundEyeColor = people.filter(function (people) {
      if (people.eyeColor.toLocaleLowerCase() === eyesCol) {
        return true;
      } else {
        return false;
      }
    })
    people = foundEyeColor
    height(people);
  } else if (searchEyeColor === "no") {
    height(people);
  }
}

function height(people) {
  if (people.firstName == undefined) {
    let searchHeight = promptFor("Do you know the person's height?", yesNo).toLocaleLowerCase();
    if (searchHeight === "yes") {
      let peopleHeight = promptFor("What is his/her height in inches?", chars);
      if (isNaN(Number(peopleHeight))) {
        alert("Invalid input")
        height(people)
      }
      let foundHeight = people.filter(function (people) {
        if (people.height === Number(peopleHeight)) {
          return true;
        } else {
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
  else if (people.firstName == people.firstName && people.lastName == people.lastName) {
    alert(people.firstName + " " + people.lastName)
  }
}

function weight(people) {
  if (people.firstName == undefined) {
    let searchWeight = promptFor("Do you know the person's weight?", yesNo).toLocaleLowerCase();
    if (searchWeight === "yes") {
      let peopleWeight = promptFor("What is his/her weight in pounds?", chars);
      if (isNaN(Number(peopleWeight))) {
        alert("Invalid input")
        weight(people)
      }
      let foundWeight = people.filter(function (people) {
        if (people.weight === Number(peopleWeight)) {
          occupation(people)
        } else {
          return false;
        }
      })
      people = foundWeight
    } else if (searchWeight === "no") {
      occupation(people)
    }
  }
  else if (people.firstName == people.firstName && people.lastName == people.lastName) {
    alert(people.firstName + " " + people.lastName)
  }
}

function occupation(people) {
  if (people.firstName == undefined) {
    let searchOccupation = promptFor("Do you know the person's occupation?", yesNo).toLocaleLowerCase();
    if (searchOccupation === "yes") {
      let peopleOccupation = promptFor("What is his/her occupation?", job).toLocaleLowerCase();
      let foundOccupation = people.filter(function (people) {
        if (people.occupation === peopleOccupation) {
          return true;
        } else {
          return false;
        }
      })
      people = foundOccupation
      displayPeople(people)
    } else if (searchOccupation === "no") {
      displayPeople(people)
      alert("Start new search")
    }
  }
  else if (people.firstName == people.firstName && people.lastName == people.lastName) {
    alert(people.firstName + " " + people.lastName)
  }
}

function job(input) {
  let choice = input
  switch (choice) {
    case "programmer":
      return true;
      break;
    case "assistant":
      return true;
      break;
    case 'doctor':
      return true;
      break;
    case "landscaper":
      return true;
      break;
    case "nurse":
      return true;
      break;
    case "student":
      return true;
      break;
    case "politician":
      return true;
      break;
    case "architect":
      return true;
      break;
    default:
      alert("Sorry person not found")
      break;
  }
}

function colorEye(input){
  let colorChoice = input
  switch (colorChoice) {
    case "brown":
      return true;
      break;
    case "black":
      return true;
      break;
    case 'blue':
      return true;
      break;
    case "green":
      return true;
      break;
    case "hazel":
      return true;
      break;
    default:
      alert("Sorry, there was no one in the database found with that eye color")
      break;
  } 
}