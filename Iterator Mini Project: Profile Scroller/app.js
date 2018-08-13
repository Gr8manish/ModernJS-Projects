const data = [
    {
      name: 'Manish Menaria',
      age: 24,
      gender: 'male',
      lookingfor: 'female',
      location: 'Udaipur, Rajasthan',
      image: 'https://randomuser.me/api/portraits/men/81.jpg'
    },
    {
      name: 'Himanshu Sharma',
      age: 21,
      gender: 'male',
      lookingfor: 'female',
      location: 'Pilani',
      image: 'https://randomuser.me/api/portraits/men/93.jpg'
    },
    {
      name: 'Nitin Chetwani',
      age: 23,
      gender: 'male',
      lookingfor: 'female',
      location: 'Jaipur',
      image: 'https://randomuser.me/api/portraits/men/42.jpg'
    }
  ];

const profiles = profileIterator(data);

nextProfile();

document.getElementById('next').addEventListener('click', nextProfile);

function nextProfile() {
    const currentProfile = profiles.next().value;

    if(currentProfile){
        document.getElementById('profileDisplay').innerHTML = `
        <ul class="list-group">
            <li class="list-group-item">Name: ${currentProfile.name}</li>
            <li class="list-group-item">Age: ${currentProfile.age}</li>
            <li class="list-group-item">Location: ${currentProfile.location}</li>
            <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingfor}</li>
        </ul>
        `;

        document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}">`;
    } else {
        window.location.reload();
    }
}

// Profile Interator
function profileIterator(profiles) {
    let nextIndex = 0;

    return {
        next: function() {
            return nextIndex < profiles.length ?
            {value : profiles[nextIndex++], done: false} :
            {done : true}
        }
    };
}