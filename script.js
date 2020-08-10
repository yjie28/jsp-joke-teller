/* To improve: 
    Repeat the joke.
    Customize it. 
*/

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const dialouge = document.getElementById('dialouge');

// Disable/Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing Joke to VoiceRSS API
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: 'fba6262255df48f680f0a781caf33b9d',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
};

const displayText = (joke) => {
  dialouge.textContent = joke;
};

/* for keeping track of last and current joke */
let currentJoke = '';
let lastJoke = '';

// Get Jokes from Joke API
const getJokes = async () => {
  const apiUrl =
    'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // for two-part jokes
    if (data.setup) {
      currentJoke = `${data.setup} ... ${data.delivery}`;
    } else {
      currentJoke = data.joke;
    }

    if (currentJoke === lastJoke && lastJoke) {
      getJokes();
    }

    // Text-to-Speech
    tellMe(currentJoke);
    displayText(currentJoke);
    lastJoke = currentJoke;

    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Errors Here
    console.log('Error: ', error);
  }
};

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
