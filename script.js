alert('well done');


const inputSection = document.querySelector('#input-section');
const descSection = document.querySelector('#description-section');

const backIcon = document.querySelector('.back-icon');
const cityInput = inputSection.querySelector('.city-input');
const locationInput = inputSection.querySelector('.location-input');

const weatherIcon = descSection.querySelector('.weather-icon');
const descr = descSection.querySelector('.desc');
const temperature = descSection.querySelector('.temp');
const feelsLike = descSection.querySelector('.feels-like');
const cityTown = descSection.querySelector('.city-town'); 
const humid = descSection.querySelector('.humidity');
const inf = document.querySelector('.info');


cityInput.addEventListener('keypress', (e) => {
	if(e.key == 'Enter')
	{
		const city =e.target.value;
			const apikey = 'f468e19ef61b2f60697acbec5c05c4a1'
		let api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
			getWeatherInfo(api);
			}
		})

backIcon.addEventListener('click',()=>{
	descSection.classList.add('hidden');
	inputSection.classList.remove('hidden');
})
		locationInput.addEventListener('click', ()=>{
			if(navigator.geolocation){
					navigator.geolocation.getCurrentPosition(
							(position)=>{
							  	const apikey = 'f468e19ef61b2f60697acbec5c05c4a1'
								let api =`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apikey}`;
							     getWeatherInfo(api);
							},
							(error)=>{
								inf.innerHTML = error.message;
								inf.classList.add('text-red-500');
								console.log(error.message)
							}
						);
			}else{
				inf.innerHTML = 'your navigator doesnot support geolacation';
			    inf.classList.add('text-red-500');
				
			}
		})

		const getWeatherInfo = (api)=>{
			inf.classList.remove('hidden');
			inf.innerHTML = 'searching..';
			inf.classList.add('text-sky-700');

		fetch(api)
		   .then(response => response.json())
		   .then(data => {
		   	 console.log(data)
		   	 inf.innerHTML = ' ';
		   	 inf.parentNode.classList.add('hidden');
			   	const {feels_like,temp,humidity} = data.main;
		   		const {description,id} = data.weather[0];
		   		const country = data.sys.country;
		   		const city =data.name;
		   		changeWeather(id);

		   		temperature.innerHTML = `${temp}<sup>o</sup>c`;
		   		cityTown.innerHTML = `${city},${country}`;
		   		descr.innerHTML =description;
		   		feelsLike.innerHTML =`${feels_like}<sup>o</sup>`;
		   		humid.innerHTML = `${humidity}%`;

		   		cityInput.value = '';
		   		descSection.classList.remove('hidden');
		   		inputSection.classList.add('hidden');
		   		backIcon.classList.remove('back-icon');

		   	})
		   .catch(error =>{
		   	inf.innerHTML = error.message;
			inf.classList.add('text-red-500');
		   	console.log(error)});
	}

const changeWeather = (id)=>{
	if(id==800){
		weatherIcon.src = 'images/weather-img.jfif';
	}else if(id >= 200 && id <=700){
		weatherIcon.src = 'images/weather-img2.png';
	}
}