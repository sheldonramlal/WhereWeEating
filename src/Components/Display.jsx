import React, {useEffect, useState} from 'react'
import restaurantsData from '../restaurants.json'

import Reviews from './Reviews'


const Display = () => {
    const [restaurants, setRestaurants] = useState({})
    const [previouslyShownRestaurants, setPreviouslyShownRestaurants] = useState([]);
    const [showInfo, setShowInfo] = useState(false)

    const resData = restaurantsData.Restaurants

    const toggleInfo = () => {
        setShowInfo(!showInfo)
      }


    const generateNewRandom = () => {
            let newRandom = Math.floor(Math.random() * resData.length);
            while (previouslyShownRestaurants.includes(newRandom)) {
                newRandom = Math.floor(Math.random() * resData.length);
            }
           
            return newRandom;
    };
    
    if(previouslyShownRestaurants.length === resData.length){
            setPreviouslyShownRestaurants([])
        }
    

    useEffect( () => {
         const newRandom = generateNewRandom()
         setPreviouslyShownRestaurants([...previouslyShownRestaurants, newRandom])
         setRestaurants(resData[newRandom])
    }, [])


    const handleClick = () => {
        const genRand = generateNewRandom()
        setPreviouslyShownRestaurants([...previouslyShownRestaurants, genRand])
        setRestaurants(resData[genRand])
    }



    console.log(restaurants.reviews);
    console.log(previouslyShownRestaurants.length);
    console.log(resData.length);
    
  return (
    <div className=' flex flex-col  justify-between items-center' style={{height:"90vh"}}> 

        <div className='border w-11/12 h-3/4 bg-white mt-7 rounded-lg drop-shadow-md overflow-y-scroll'>  {/* card */}
            
            <div className='w-full h-3/5 flex items-center justify-center '>
                 <div className='w-full h-full bg-gray-300 overflow-hidden'>  {/* image */}
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
                    </div>
                   )} */}
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