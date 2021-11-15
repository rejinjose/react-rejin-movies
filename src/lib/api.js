
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const BASE_URL = process.env.REACT_APP_FIREBASE_BASE_URL
const FIREBASE_DOMAIN = 'https://api.themoviedb.org/3/movie/550?api_key=8da7128367e6630f2335fe9fba397ff9';



export async function SignUpFetch(formData) {
  const response = await fetch(`${BASE_URL}signUp?key=${API_KEY}`, {
    method: 'POST',
    body: JSON.stringify({
      email: `${formData.username}`,
      password: `${formData.password}`,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();


  if (!response.ok) {
    throw new Error(data.error.message || 'Could not create quote.');
  }
  
  return data;
}


export async function LoginFetch(formData) {
  const response = await fetch(`${BASE_URL}signInWithPassword?key=${API_KEY}`, {
    method: 'POST',
    body: JSON.stringify({
      email: `${formData.username}`,
      password: `${formData.password}`,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();


  if (!response.ok) {
    throw new Error(data.error.message || 'Could not create quote.');
  }
  
  return data;
}

export async function ResetPasswordFetch(formData) {
  const response = await fetch(`${BASE_URL}update?key=${API_KEY}`, {
    method: 'POST',
    body: JSON.stringify({
      idToken: `${formData.idToken}`,
      password: `${formData.password}`,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();


  if (!response.ok) {
    throw new Error(data.error.message || 'Could not create quote.');
  }
  
  return data;
}



export async function getAllQuote() {

  const response = await fetch(`${FIREBASE_DOMAIN}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  return data;
}


export async function getSingleQuote(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
}

export async function addQuote(quoteData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
    method: 'POST',
    body: JSON.stringify(requestData.commentData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
