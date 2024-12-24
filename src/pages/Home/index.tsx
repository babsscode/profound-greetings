import { motion } from 'framer-motion';

const Home = () => {  
    return (
        <motion.section
            id="home"
            className="bg-red-500"
            initial={{ opacity: 0 }}      // Initial state
            animate={{ opacity: 1 }}      // Animation state
            transition={{ duration: 1 }}  // Transition duration
        >
            <h1 className="text-white text-4xl">Welcome to Home!</h1>
        </motion.section>
    );
};

export default Home;
