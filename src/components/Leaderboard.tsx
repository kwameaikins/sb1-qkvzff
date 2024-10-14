import React, { useEffect, useState } from 'react';
import { LeaderboardEntry } from '../types';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs.map(doc => doc.data() as LeaderboardEntry);
      setLeaderboard(entries);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <motion.tr
                key={entry.userId}
                className="border-b"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">{entry.username}</td>
                <td className="px-4 py-2 text-center">{entry.score}</td>
                <td className="px-4 py-2">{entry.category}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;