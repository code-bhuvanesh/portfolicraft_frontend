const apiurl = "http://127.0.0.1:8000/";

async function sendPostRequest(url, body, formdata = false) {
  try {

    var headers = new Headers();
      headers.append("Content-Type", "application/json");

    token = getToken("accesstoken");
    console.log(token)
    if(token == null){
      // window.location = "/login"
    }
    if(token != null){
      headers.append("Authorization", 'Bearer ' + token);
    }

    const response = await fetch(apiurl + url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if(response.status == 401){
      refreshToken();
      sendPostRequest(url, body);
    }
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const responseData = await response.json(); // Parse response JSON
    console.log(responseData)
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}



async function SendSignUpRequest(url, body) {
  try {

    var headers = new Headers();
    headers.append("Content-Type", "application/json");


    const response = await fetch(apiurl + url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const responseData = await response.json(); // Parse response JSON
    console.log(responseData)
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


// Function to send form data including images to the server
async function sendFormData(url, formData) {
  try {
    var token = getToken("accesstoken");
    console.log(token);
    console.log("form data for project")
    console.log(formData.get("projectname"))
    console.log(formData.get("projectimages"))

    if (token == null) {
      window.location = "/login";
    }

    if (token != null) {
      // Create a new FormData object and append your form data, including images
    

      const response = await fetch(apiurl + url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send the FormData object
      });

      if (response.status === 401) {
        refreshToken();
        // Handle token refresh and retry the request if needed
      }

      if (response.ok) {
        const responseData = await response.json(); // Parse response JSON
        console.log(responseData);
        return responseData;
      } else {
        // Handle errors or other status codes here
        console.error("Request failed with status:", response.status);
        throw new Error(`Request failed with status: ${response.status}`);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

function objectToMap(obj) {
  const map = new Map();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      map.set(key, obj[key]);
    }
  }
  return map;
}

async function sendRefreshTokenRequest() {
  deleteAccessToken();
  let refreshToken = getToken("refreshtoken");
  body = new FormData()
  body.append("refresh" , refreshToken);
  
  sendFormData("refreshtoken", body)

}

function objectToMap(obj) {
  const map = new Map();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      map.set(key, obj[key]);
    }
  }
  return map;
}


async function logoutUser(){
  deleteAccessToken();
  
}

async function sendGetRequest(url, body = {}) {
  try {
    const queryString = Object.keys(body)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
    .join('&');
    console.log(`${apiurl}${url}?${queryString}`)
    
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    token = getToken("accesstoken");
    console.log("token : " + token )
    if(token != null){
      headers.append('Authorization', 'Bearer ' + token);
    }

    const response = await fetch(`${apiurl}${url}?${queryString}`, {
      method: 'GET',
      headers: headers
    });
    if(token == null){
      // window.location = "/login"
    }
    if(response.status == 401){
      sendRefreshTokenRequest();
      // sendPostRequest(url, body);
      // window.location = ""
    }

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
   

    const responseData = await response.json() 
    console.log(responseData)
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    
    return null;
  }
}

function storeAccessToken(token){
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    document.cookie = `accesstoken=${token}; expires=${expirationDate.toUTCString()}; path=/`;
}

function deleteAccessToken() {
  const expirationDate = new Date(0); // Set expiration date to a past date
  document.cookie = `accesstoken=; expires=${expirationDate.toUTCString()}; path=/`;
}



function storeRefreshToken(token){
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  document.cookie = `refreshtoken=${token}; expires=${expirationDate.toUTCString()}; path=/`;
}

function deleteRefreshToken() {
  const expirationDate = new Date(0); // Set expiration date to a past date
  document.cookie = `refreshtoken=; expires=${expirationDate.toUTCString()}; path=/`;
}

function refreshToken(){
  let refreshToken = getToken("refreshtoken");
  console.log("refresh token 1: " +refreshToken)
  sendPostRequest("refreshtoken", {"refresh" : refreshToken}).then(responseData => {
    console.log("access token : " + responseData);
    if(responseData.status == 200){
      // storeAccessToken(responseData.access)
    }
    // window.location = "/login"
  })
}



function getToken(tokenname) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('='); 
    if (name === tokenname) {
      return value;
    }
  }
  return null; 
}

