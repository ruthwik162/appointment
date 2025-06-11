import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // simulate loading
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      {loading ? (
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <div className="text-xl font-semibold text-gray-700">Loaded!</div>
      )}
    </div>
  );
}
