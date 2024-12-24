import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CardReturnData } from '../../shared/types';

const Card: React.FC = () => {
    const { userID } = useParams<{ userID: string }>();
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [cardData, setCardData] = useState<CardReturnData>({
        cardType: '', 
        name: '', 
        message: '', 
        quote: '',
        _id: '',
      });

    // Function to fetch card data from the API
    const fetchCardData = async () => {
        try {
        const response = await fetch(`https://profound-api.onrender.com/api/card/${userID}`);
        if (response.ok) {
            const data = await response.json();
            setCardData(data); // Set the card data in state
        } else {
            console.error('Card not found or error fetching data');
        }
        } catch (error) {
        console.error('Error fetching card data:', error);
        }
    };

    // Fetch card data on component mount
    useEffect(() => {
        fetchCardData();
    }, [userID]);

    const handleCardClick = () => {
        setIsCardOpen(true);
    };

    return (
    <section
        id="home"
        className="bg-[#b7cfc9] gap-16 p-10 h-[800px] w-full md:pb-0 text-[#112621] items-center justify-center"
    >
   {!isCardOpen && (
    <div 
        className="bg-[#335F55] mt-10 p-10 h-5/6 w-4/6 mx-16 lg:w-2/5 lg:mx-auto text-[#335F55]" 
        onClick={handleCardClick}
    >
        <div className="bg-white flex flex-col h-full items-center justify-center p-10">
            <img 
                src="src/assets/christmas2.png" 
                alt="Christmas" 
                className="mx-auto h-5/6 object-contain"
            />
            <p className='text-center'>To:</p>
            <h1 className='rochester-regular text-center text-5xl lg:text-7xl mb-10'>{cardData.name}</h1>
            <p className='mb-4 text-center'>Click to open the greeting card.</p>
            <img 
                src="src/assets/christmas1.png" 
                alt="Christmas" 
                className="mx-auto h-5/6 object-contain"
            />
        </div>
    </div>
)}


    {isCardOpen && (
    <div 
        className="bg-[#335F55] mt-10 gap-4 grid grid-cols-1 lg:grid-cols-2 p-5 h-auto lg:h-5/6 w-4/6 mx-auto text-[#335F55]" 
        onClick={handleCardClick}
    >
        <div className="bg-white h-full flex flex-col w-auto items-center justify-center">
        <div className='h-1/3 mb-10'>
            <img 
                src="public/christmas1.png" 
                alt="Christmas" 
                className="mx-auto"
            />
        </div>
        <div className='mb-10 h-1/3'>
            <h1 className="text-2xl mx-9 text-center">{cardData.quote}</h1>
            <p className='mt-4 text-lg text-center'>- Elf #{Math.floor(Math.random() * 100) + 1}</p>
        </div>
        <div className='h-1/3 mb-5'>
            <img 
                src="public/christmas2.png" 
                alt="Christmas" 
                className="mx-auto"
            />
        </div>
    </div>

        <div className="bg-white h-full w-auto flex flex-col justify-between">
        <h1 className="rochester-regular text-7xl text-center mx-5 mt-16">{cardData.message}</h1>
       
        {/* Image at the bottom of the second column */}
        <div className="mt-auto">
            <img 
            src="src/assets/christmasImage.png" 
            alt="Christmas" 
            className="mx-auto"
            />
        </div>
        </div>
    </div>
    )}

    </section>
  )
}

export default Card