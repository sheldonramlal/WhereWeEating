import React from 'react'

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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-6 h-6 inline-block">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
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