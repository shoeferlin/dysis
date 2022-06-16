console.log('content.js');

// For webpages that use dynamic JavaScript (e.g., using React) this listener
// waits until a page has been fully loaded
window.addEventListener('load', update)
window.addEventListener('scroll', update)
window.addEventListener('popstate', update)
window.addEventListener('click', update)
// As fallback the extension will try to update every interval step (in ms)
// setInterval(update, 1000)

async function update() {
  // Add all functions that should be executed after the webpage has finished loading
  removeUserInformation()
  appendUserInformation()
  logActivity('Updated information')  
}

function getRelevantUsernameElements() {
  // Create empty Array
  let userElements = []
  // Find all anchor tags ('a' HTML elements) and push them into userElements array
  const anchorTags = document.getElementsByTagName('a');
  for (const anchorTag of anchorTags) {
    userElements.push(anchorTag)
  }
  // Filter anchor elements based on them including the user path pattern as link
  userElements = userElements.filter(element => element.href.match('\/user\/.+'))
  // Filter anchor elements based on them including user name as text in their inner content
  userElements = userElements.filter(element => {
    // Extract username from href of element
    const extractedUsername = getUsernameParamFromPath(element.href)
    // Filter for the element if the said username has been found in the inner HTML of the element, else not
    return (element.innerHTML.includes(extractedUsername))
  })
  // Return found and filtered elements
  return userElements
}

function appendUserInformationToElement(element) {
  let enrichment = document.createElement('span')
  enrichment.className = 'dysis';
  enrichment.setAttribute('style', 'font_weight: bold !important; color: red !important');
  enrichment.innerText = `  DYSIS info for '${getUsernameParamFromPath(element.href)}' `
  element.appendChild(enrichment)
}

function appendUserInformation() {
  for (const element of getRelevantUsernameElements()) {
    appendUserInformationToElement(element)
  }
}

function removeUserInformation() {
  const appendedElements = document.querySelectorAll('.dysis');
  for (const appendedElement of appendedElements) {
    appendedElement.remove();
  }
}

function getUsernameParamFromPath(path) {
  if (!path.match('\/user\/.+')) {
    throw Error('Path must be user path with username param ')
  }
  let username = path.replace('https://www.reddit.com/user/', '').slice(0, -1)
  return username;
}

async function getInformationForIdentifier(identifier) {
  const response = await request('GET', `reddit?identifier=${identifier}`)
  if (response.status === 200) { 
    return json(response.data)
  } else if (response.status === 404) {
    return 'none'
  } else {
    throw new Error(response.status) 
  }
}

async function request(method, path) {
  const API_PROD = 'https://dysis-server.herokuapp.com/api/';
  const API_DEV = 'http://localhost:8080/api/';
  const API = DEBUG ? API_DEV : API_PROD;
  const request = [
    API + path,
    {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: body
    }
  ]
  console.log(request);
  try {
    let response = await fetch(...request)
    if (response.status !== 500) {
      return response;
    } else {
      throw new Error(response.status)
    }
  } catch (e) {
    throw new Error(e)
  }
}

// DEBUG FUNCTIONS BELOW
const DEBUG = true;

function markArrayOfElementsForDebugging(elements) {
  for (const element of elements) {
    const marker = document.createElement('span')
    marker.innerText = 'Debug Marker'
    marker.className = 'dysis'
    marker.setAttribute('style', 'color: orange !important')
    element.appendChild(marker)
  }
}
function logActivity(activity) {
  console.log(`DYSIS (${new Date().toLocaleTimeString('de-DE')}): ${activity.toString()}`);
}

function logElements(userElements) {
  for (const userElement of userElements) {
    console.log(userElement.innerHTML);
  }
}

