const apiurl = "http://127.0.0.1:8000/";

async function sendPostRequest(url, body) {
  try {
    let header = {
      'Content-Type': 'application/json',
    };

    token = getToken("accesstoken");
    console.log(token)
    if(token == null){
      window.location = "/login"
    }
    if(token != null){
      header["Authorization"] = 'Bearer ' + token;
    }

    const response = await fetch(apiurl + url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(body), // Convert the data to JSON format
    });

    if(response.status == 401){
      refreshToken();
      sendPostRequest(url, body);
    }
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const responseData = await response.json(); // Parse response JSON
    return responseData;
  } catch (error) {
    console.error('Error:', error);
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

async function sendGetRequest(url, body = {}, header = {}) {
  try {
    const queryString = Object.keys(body)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
    .join('&');
    console.log(`${apiurl}${url}?${queryString}`)
    
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    token = getToken("accesstoken");
    if(token != null){
      headers.append('Authorization', 'Bearer ' + token);
      header["Authorization"] = 'Bearer ' + token;
    }

    const response = await fetch(`${apiurl}${url}?${queryString}`, {
      method: 'GET',
      headers: headers
    });
    
    if(response.status == 401){
      if(token == null){
        window.location = "/login"
      }
      else if(response.status == 401){
        refreshToken();
        sendPostRequest(url, body);
      }
    }

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
   

    const responseData = await response.json() 
    console.log("respo : " + responseData)
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

function storeRefreshToken(token){
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  document.cookie = `refreshtoken=${token}; expires=${expirationDate.toUTCString()}; path=/`;
}

function refreshToken(){
  console.log("refreshToken clikced")
  let refreshToken = getToken("refreshtoken");
  sendPostRequest("refreshtoken", {"refresh" : refreshToken}).then(responseData => {
    console.log(responseData);
    storeAccessToken(responseData.access)
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
  return null; // Return null if the cookie is not found
}

