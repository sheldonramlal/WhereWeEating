import React, {useEffect, useState} from 'react'
import restaurantsData from '../restaurants.json'

import AllDistances from './AllDistances'
import Reviews from './Reviews'
import Distance from './Distance'



const Display = () => {

    const [restaurants, setRestaurants] = useState({})
    const [previouslyShownRestaurants, setPreviouslyShownRestaurants] = useState([]);
    const [previouslyShownNearRestaurants, setPreviouslyShownNearRestaurants] = useState([]);
    const [showInfo, setShowInfo] = useState(false)
    const [isChecked, setIsCheck] = useState(false)
    const [coord, setCoord] = useState('')
    const [nearMe , setNearMe] = useState({})
    

    const resData = restaurantsData.Restaurants

    

  
    const handleToggleBtn = () => {
        setIsCheck(prevState => !prevState)

    }
    
   
   

    const toggleInfo = () => {
        setShowInfo(!showInfo)
      }



      function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
      }
    

    const generateNewRandom = () => {
            let newRandom = Math.floor(Math.random() * resData.length);
            while (previouslyShownRestaurants.includes(newRandom)) {
                newRandom = Math.floor(Math.random() * resData.length);
            }
           
            return newRandom;
    };

    const generateNewRandomSorted = (array) => {
        let newRandom = Math.floor(Math.random() * array.length);
        while (previouslyShownRestaurants.includes(newRandom)) {
            newRandom = Math.floor(Math.random() * array.length);
        }
       
        return newRandom;
};

    const myFunction = (restaurant) => {
        const restaurantsWithin15km = []
        restaurant.forEach(rest => {
            rest.coordinates.forEach(c => {
            {/*console.log(`${rest.name}, lat: ${c.lat}, lon: ${c.lon}`);
            console.log(`user lat: ${coord.userLatitude}, user lon: ${coord.userLongitude}`) */}
                let d = calculateDistance(coord.userLatitude, coord.userLongitude, c.lat, c.lon)
                if(d < 15){
                    console.log(`rest: ${rest.name} distance ${d}`)
                restaurantsWithin15km.push(rest)
                
                }
            });
            })
        
        return restaurantsWithin15km
   
}

    const arr = myFunction(resData)

    if(isChecked){
        if(previouslyShownRestaurants.length === arr.length){
            setPreviouslyShownRestaurants([])
        }
    }else{
            if(previouslyShownRestaurants.length === resData.length){
                setPreviouslyShownRestaurants([])
            }
        }
    
      

     
 
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
      }
   
      

      
      useEffect(() => {
          
          if (isChecked) {
            
         
        const newRandom = generateNewRandomSorted(arr)
          setPreviouslyShownRestaurants([])

          setPreviouslyShownRestaurants([...previouslyShownRestaurants, newRandom])

        
          setRestaurants(arr[newRandom])
        }else{
            const newRandom = generateNewRandom()
            setPreviouslyShownRestaurants([])
            setPreviouslyShownRestaurants([...previouslyShownRestaurants, newRandom])
            setRestaurants(resData[newRandom])
        }
      }, [isChecked, resData]);

      

    useEffect( () => {

    
       {/*}  const newRandom = generateNewRandom()
         setPreviouslyShownRestaurants([...previouslyShownRestaurants, newRandom])
    setRestaurants(resData[newRandom]) */}
        

         if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;

                setCoord({userLatitude, userLongitude})
                // Now you have userLatitude and userLongitude
                
                
                // Use these coordinates as needed in your application
              },
              (error) => {
                console.error('Error getting user location:', error);
                // Handle errors related to fetching user location here
              }
            );
          } else {
            console.log('Geolocation is not supported.');
            // Handle scenarios where geolocation is not supported by the browser
          }

          

        }, [])

    
        
        
        
    

 
    const scrollDiv = document.getElementById('card')

    const handleClick = () => {
       


        const genRand = generateNewRandom()
        const sortedRandom = generateNewRandomSorted(arr)
        /////
        if(isChecked){
            setPreviouslyShownRestaurants([...previouslyShownRestaurants, sortedRandom])
            setRestaurants(arr[sortedRandom])
        }else{
            setPreviouslyShownRestaurants([...previouslyShownRestaurants, genRand])

            setRestaurants(resData[genRand])
        }
        
        
       if(scrollDiv){
        scrollDiv.scrollTop = 0
       }
    }


{/*}
    console.log(restaurants.reviews);
    console.log(previouslyShownRestaurants.length);
    console.log(resData.length);
*/}
  return (
    <div className=' flex flex-col  justify-between items-center' style={{height:"85vh"}}> 

        <div className='pt-4 flex items-center'>  
            <span class="ms-3 text-md font-medium text-gray-900 pr-4">Restaurants near me</span>
            <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" id='togglebtn' onChange={handleToggleBtn}/>
            <div class="w-11 h-6 bg-gray-200  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
        </div> 

        <div id='card' className='border w-11/12 h-3/4 bg-white mt-5 rounded-lg shadow-[#444444aa] shadow-lg overflow-y-scroll md:w-2/4 '>  {/* card */}
            
            <div className='w-full h-3/5 flex items-center justify-center '>
                 <div className='w-full h-full  overflow-hidden'>  {/* image */}
                  <img className=' object-fill h-full w-full' src={`/${restaurants.image}`} />
                 </div>
            </div>
            
            <div className='p-5 '>
                <h2 className='font-poppins text-2xl font-medium '>{restaurants.name}</h2>

                <div className='flex flex-row justify-between pt-3'>
                   
                        <div className='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-2 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            <p className='inline-block'>{restaurants.rating}</p>

                            <div className='ml-5'>
                                 <p className='text-green-600 font-medium'>{restaurants.price}</p>
                            </div>
                            
                            
                            
                        </div>
                        <Distance coordinates={restaurants.coordinates}/>
                            {/* 
                            <div>
                                <a href={`${restaurants.menu}`} target="_blank">
                                    <button  className='bg-red-600 text-white font-poppins p-2 rounded-lg'>Menu</button>
                                </a>
                            </div>
                            */}
                </div>
                {
                    restaurants.onlineOrder && (
                        <a href={restaurants.orderhref} target='_blank'>
                         <button className='border-2 w-full border-black p-2 mt-6 bg-black text-white font-poppins font-medium tracking-widest'> ORDER ONLINE</button>
                        </a>
                    )
                }
                {
                    restaurants.showmenu && (
                        <a href={restaurants.menu} target='_blank'>
                         <button className='border-2 w-full border-black p-2 mt-6 bg-white text-black font-poppins font-medium tracking-widest'> VIEW MENU</button>
                        </a>
                    )
                }

                    
                <div className='pt-6 relative '>
                   <div className='flex flex-row items-center  pb-2'>
                        <p className='font-poppins text-xl inline-block'>Reviews</p>

                        <p onClick={toggleInfo} className='cursor-pointer pl-2 inline-block' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        </p>
                
                     </div>
                    {
                        showInfo && (
                            <div className='mb-7 -mt-3'>
                            <p className='text-sm text-black text-left pt-4 -mb-3 '>All reviews featured here are randomly sourced from Google reviews </p>
                            </div>
                            )
                    }
                
                   {
                    <Reviews reviews={restaurants.reviews} />
                   }
                
                  
                  {/* 
                  {restaurants.reviews && (

                    <div className='flex justify-center mt-7'>
                        <button className='border border-black text-black font-poppins p-2 rounded-lg'>More Reviews</button>
                  </div> */}
                </div>
                    
            </div>
        </div>


        {/* BUTTON */}
        <div className=''>
            <button onClick={handleClick} className=' p-4 rounded-md font-poppins text-3xl bg-red-500 text-white font-medium mb-5'>Next Restaurant</button>
        </div>

    </div>
  )
}

export default Display