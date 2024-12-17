console.log('Client side javascript file');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = search.value;

    if (!location) {
        return console.log('Location is required');
    }

    console.log(`http://localhost:3000/weather?address=${{ location }}`);

    fetch(`http://localhost:3000/weather?address=` + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                console.log(data);
                messageOne.textContent = data.address;
                messageTwo.textContent = data.weather_descriptions;
            }

        });
    });
});