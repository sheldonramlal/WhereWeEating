import React from 'react'
import profile from '/profile.png'
import star from '/star.png'

const Reviews = ({reviews}) => {
    
  return (

    <div>
  {reviews ? (
    /* Opening and closing parentheses for map() function */
    reviews.map((review, index) => (
      <div key={index} className='drop-shadow-md rounded-md bg-gray-100 p-3 mt-2 font-poppins mb-5'>
        <div className='flex flex-row justify-between'>
            <div>
                <img src={profile} className="w-6 h-6 inline-block" />
                <p className='inline-block pl-2'>Anonymous</p>
            </div>

            <div className='flex items-center'>

            <img src={star}  fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-2  fill-black"
                                
            />
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