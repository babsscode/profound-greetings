import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardData } from '../../shared/types';
import Modal from '../Modal';


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
        fetch('https://profound-api.onrender.com/api/random-quote') // Ensure the backend is running on this port
        .then((response) => response.json())
        .then((data) => {
            console.log(data.randomQuote)
          setQuote(data.randomQuote);
        })
        .catch((err) => {
          console.error('Error fetching random quote: ', err); 
        });
    };

    const [showModal, setShowModal] = useState(false);
    const [cardId, setCardId] = useState<string | null>(null);
    const [cardType, setCardType] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [quote, setQuote] = useState('');
    const [isSurprise, setIsSurprise] = useState(false);

    const postMessage = async (cardData: CardData): Promise<string> => {
        try {
          const response = await axios.post('https://profound-api.onrender.com/api/card', cardData);
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
        getRandomQuote();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCardType("Christmas");
        // Construct card data
        const cardData: CardData = {
            cardType: cardType || "Christmas", 
            name: name || "Someone Special",             
            message: message || "Merry Christmas",    
            quote: quote || "5 star feeling."           
        };
        
        //console.log('Card Data:', cardData);

        try {
          // Call postMessage to post the card data to the API
          const cardId = await postMessage(cardData);
          console.log(`Card ID: ${cardId}`);  // Log the unique card ID
          setCardId(cardId);
          setShowModal(true);
          //alert(`Your card has been created! Share this link to view the card: profoundgreetings.pages.dev/${cardId}`);
        } catch (error) {
          console.error('Error submitting message:', error);  // Handle error if the POST fails
        }
    };    

    const handleCloseModal = () => {
        setShowModal(false);
    };
     
    useEffect(() => {
        getRandomQuote();        
    }, []);

    return (
       <section
        id="home"
        className="bg-white gap-16 p-10 md:h-[800px] w-full md:pb-0 text-[#335F55]"
       >

        <div className='items-center justify-center'>
            <h1 className='pt-2 text-center text-6xl'>Profound Greetings</h1>
            <h2 className='pt-3 text-center text-xl'>Fill out the form below to create a custom greeting card accompanied with a <em>profound</em> quote.</h2>
            <div className='flex columns-2 gap-20 h-full items-center justify-center'>
                <div>
                    <img 
                    src="src/assets/christmasHome.png" 
                    alt="Christmas" 
                    className="mx-auto mt-6 h-[37rem] object-contain"
                    />
                </div>
                <div>
                    <form 
                        onSubmit={(e) => e.preventDefault()}
                        className='bg-[#335F55] h-auto w-[30rem] p-10 rounded-lg mx-auto mt-10 text-white'
                    >
                    {/**<div className="mb-5">
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
                        </div> */}

                        <div className="mb-5">
                            <label htmlFor="name" className="block text-lg mb-2">
                                Recipient Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="w-full text-[#335F55] p-3 border border-white rounded-xl"
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
                                className="w-full p-3 border text-[#335F55] border-white rounded-xl"
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
                                Reveal the Profound Quote
                            </label>
                        </div>

                        {isSurprise && (
                            <div className='p-6 border rounded border-[#498274] items-center justify-center bg-[#498274]'>
                                <h2 className='text-lg text-[#335F55] text-center p-2 border rounded bg-white' >
                                    {quote}
                                </h2>
                                <button
                                    type="button"
                                    onClick={handleGenerate}
                                    className="w-full mx-auto mt-5 py-3 bg-white text-[#335F55] hover:border hover:border-white hover:text-white hover:bg-[#335F55] rounded-xl text-sm"                        
                                >
                                    Generate A Different Quote
                                </button>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full mt-7 py-3 bg-white text-[#335F55] hover:border hover:border-white hover:text-white hover:bg-[#335F55] rounded-xl text-md"                        
                        >
                            Submit
                        </button>
                    </form> 
                </div>
            </div>
            
        </div>
        <div>
            {/* Show modal if showModal is true */}
            {showModal && cardId && (
                <Modal message={`https://profoundgreetings.pages.dev/${cardId}`} onClose={handleCloseModal} />
            )}
        </div>
       </section>
    );
};

export default Home;