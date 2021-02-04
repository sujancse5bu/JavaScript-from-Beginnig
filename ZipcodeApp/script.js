// Listen for Submit
document.getElementById('zipForm').addEventListener('submit', getLocationInfo);
document.body.addEventListener('click', deleteLocation);
function deleteLocation(e) {
    if (e.target.classList.contains('delete')) {
        document.querySelector('.message').remove();
        document.querySelector('.zip').value = '';
        document.querySelector('.icon-remove').style.display = "none";
        document.querySelector('.icon-check').style.display = "none";
    }
}

function getLocationInfo(e) {
    const zip = document.getElementById('inputZip').value;
    document.getElementById('output').innerHTML = `
        <article class="message is-info">
            <div class="message-body">
                Request Processing. <br> 
                Please wait.
            </div>
        </article>
    `;
    fetch(`https://api.zippopotam.us/BD/${zip}`)
        .then(response => {
            if (response.status != 200) {
                showIcon('remove');
                document.getElementById('output').innerHTML = `
                    <article class="message is-danger">
                        <div class="message-body">
                            Invalid Zipcode, please try again.
                        </div>
                    </article>
                `;
                throw Error(response.statusText);
            } else {
                showIcon('check');
                return response.json();
            }
        })
        .then(data => {
            let output = '';
            data.places.forEach(place => {
                output += `
                    <article class="message is-success">
                        <div class="message-header">
                            <p>Location Info</p>
                            <button class="delete"></button>
                        </div>
                        <div class="message-body">
                            <ul>
                                <li><strong>City: </strong>${place['place name']}</li>
                                <li><strong>State: </strong>${place['state']}</li>
                                <li><strong>Longitude: </strong>${place['longitude']}</li>
                                <li><strong>Latitude: </strong>${place['latitude']}</li>
                            </ul>
                        </div>
                    </article>
                `;
            });
            document.getElementById('output').innerHTML = output;
        }).catch(err => console.log(err));
    
    e.preventDefault();
}

function showIcon(icon) {
    document.querySelector('.icon-remove').style.display = "none";
    document.querySelector('.icon-check').style.display = "none";
    
    // Show the correct icon
    document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}