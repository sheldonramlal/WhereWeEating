import React from 'react'
import 'profileImg' from './profile.png'

const Reviews = ({reviews}) => {
    console.log(reviews);
  return (

    <div>
  {reviews ? (
    /* Opening and closing parentheses for map() function */
    reviews.map((review, index) => (
      <div key={index} className='drop-shadow-md rounded-md bg-gray-100 p-3 mt-2 font-poppins mb-5'>
        <div className='flex flex-row justify-between'>
            <div>
                <img src={profileImg} className="w-6 h-6 inline-block" 
                    
                />
                <p className='inline-block pl-2'>Anonymous</p>
            </div>

            <div className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-2 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <p className='inline-block  pl-1'>{review.rating}</p>
            </div>
        </div>
        <p className='pt-3'>{review.content}</p>
      </div>
    ))

   
  ) : (
    <div>
      <p className='font-poppins'>There are no reviews</p>
    </div>
  )}
</div>
)
}

export default Reviews