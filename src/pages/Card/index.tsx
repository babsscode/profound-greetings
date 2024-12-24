import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const Card: React.FC = () => {
    const { userID } = useParams<{ userID: string }>();
    const [isCardOpen, setIsCardOpen] = useState(false);

    const handleCardClick = () => {
        setIsCardOpen(true);
    };

    return (
    <section
        id="home"
        className="bg-white gap-16 p-10 h-[800px] w-full md:pb-0 text-white"
    >
        <div className="bg-[#335F55] mt-10 mx-10 gap-16 p-10 h-5/6 w-auto text-white">
            <h1>{userID}</h1>
        </div>  
    </section>
  )
}

export default Card