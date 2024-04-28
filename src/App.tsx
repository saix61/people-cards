import './App.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import axios from 'axios';
import { CardList } from '@Components/CardList';
import { TCard } from '@Components/Card'
import { Aside } from '@Components/Aside';

const fetchData = async (setData: Dispatch<SetStateAction<TCard[]>>) => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=500');
    setData(response.data.results);
  } catch (error) {
    console.error(error);
  }
};

function App() {
  const [peopleListState, setPeopleListState] = useState<TCard[]>([]);

  useEffect(() => {
    fetchData(setPeopleListState);
  }, [])

  return (
    <div className='App'>
      {peopleListState.length ? (
        <>
          <CardList list={peopleListState} />
          <Aside list={peopleListState} />
        </>
      ) : <h2>Loading... Please wait.</h2>}
    </div>
  )
}

export default App
