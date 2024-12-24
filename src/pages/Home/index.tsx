import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * change place holder based on happy holidays or merry christmas
 * change handleGenreate function to get a random quote
 *  for - christmas rando quote say by #random num elf
 * so send all the vars below to a template webpage
 * figure out how to make unique webpage for each user
 */

const Home = () => { 
    const [cardType, setCardType] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSurprise, setIsSurprise] = useState(false);

    const handleGenerate = () => {
        // retrieve quote
        console.log("Generating greeting card with:", {
            cardType,
            name,
            message,
            isSurprise,
        });
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
                    <div className='pt-3'>
                        <button
                            type="button"
                            onClick={handleGenerate}
                            className="w-full py-3 bg-[#335F55] text-white rounded-xl text-xl"                        
                        >
                            Generate
                        </button>
                        <h2 className='text-lg text-center pt-3' >
                            "Funny quote"
                        </h2>
                    </div>
                    
                )}
            </form> 
        </div>
        
        
       </section>
    );
};

export default Home;