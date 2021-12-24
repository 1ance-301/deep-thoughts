import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import FriendList from '../components/FriendList';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHT);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const loggedIn = auth.loggedIn();

  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
