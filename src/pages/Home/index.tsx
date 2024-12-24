import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CardData } from '../../shared/types';

/**
 * change place holder based on happy holidays or merry christmas
 * change handleGenreate function to get a random quote
 * set og quote before handle generate
 *  for - christmas rando quote say by #random num elf
 * so send all the vars below to a template webpage
 * figure out how to make unique webpage for each user
 */

const Home = () => { 
    const getRandomQuote = () => {
        "hello";
    };

    const [cardType, setCardType] = useState('Christmas');
    const [name, setName] = useState('Someone Special');
    const [message, setMessage] = useState('Merry Christmas!');
    const [quote, setQuote] = useState('');
    const [isSurprise, setIsSurprise] = useState(false);

    const postMessage = async (cardData: CardData): Promise<string> => {
        try {
          const response = await axios.post('http://localhost:5001/api/card', cardData);
          const { _id } = response.data;
          console.log(`Message posted successfully. ID: ${_id}`);
          return _id;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.response?.data);
            console.error('Status:', error.response?.status);
            console.error('Headers:', error.response?.headers);
          } else {
            console.error('Unknown Error:', error);
          }
          throw error;
        }
    };      

    const handleGenerate = () => {
        // retrieve quote
        setQuote('Once there lived a 5 star review.');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Construct card data
        const cardData: CardData = { cardType, name, message, quote };
        console.log('Card Data:', cardData);

        try {
          // Call postMessage to post the card data to the API
          const cardId = await postMessage(cardData);
          console.log(`Card ID: ${cardId}`);  // Log the unique card ID
        } catch (error) {
          console.error('Error submitting message:', error);  // Handle error if the POST fails
        }
    };    
     
    return (
       <section
        id="home"
        className="bg-[#335F55] gap-16 p-10 md:h-[800px] w-full md:pb-0 text-white"
       >

        <div className='items-center justify-center'>
            <h1 className='pt-2 text-center text-6xl'>Profound Greetings</h1>
            <h2 className='pt-3 text-center text-xl'>Fill out the form below to create a custom greeting card accompanied with a <em>profound</em> quote.</h2>
            <form 
                onSubmit={(e) => e.preventDefault()}
                className='bg-white h-auto w-[30rem] p-10 rounded-lg mx-auto mt-10 text-[#112621]'
            >
            <div className="mb-5">
                <label htmlFor="cardType" className="block text-lg mb-2">
                    Select Card Type
                </label>
                <select
                    id="cardType"
                    className="w-full p-3 border rounded-lg"
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    >
                        <option value="">-- Choose a Card Type --</option>
                        <option value="Birthday">Holiday</option>
                        <option value="Anniversary">Christmas</option>
                        <option value="Holiday">New Year's</option>
                    </select>
                </div>

                <div className="mb-5">
                    <label htmlFor="name" className="block text-lg mb-2">
                        Recipient Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="w-full p-3 border border-[#112621] rounded-xl"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="message" className="block text-lg mb-2">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        rows={1}
                        className="w-full p-3 border border-[#112621] rounded-xl"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Merry Christmas!'
                    />
                </div>
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id="surpriseMessage"
                        checked={isSurprise}
                        onChange={(e) => setIsSurprise(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="surpriseMessage" className="text-lg">
                        Reveal Suprise Profound Quote
                    </label>
                </div>

                {isSurprise && (
                    <div className='pt-3 items-center justify-center'>
                        <h2 className='text-lg text-center' >
                            "Funny quote"
                        </h2>
                        <button
                            type="button"
                            onClick={handleGenerate}
                            className="w-full mx-auto mt-5 py-3 bg-[#335F55] text-white hover:border hover:border-[#335F55] hover:text-[#335F55] hover:bg-white rounded-xl text-sm"                        
                        >
                            Generate A Different Quote
                        </button>
                    </div>
                )}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full mt-5 py-3 bg-[#335F55] text-white hover:border hover:border-[#335F55] hover:text-[#335F55] hover:bg-white rounded-xl text-md"                        
                >
                    Submit
                </button>
            </form> 
        </div>
        
        
       </section>
    );
};

export default Home;