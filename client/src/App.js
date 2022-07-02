import './App.css';
import React, { useEffect, useState } from 'react';

import PlayerList from './components/player-list/PlayerList';

function App() {

  const [activeSelection, setActiveSelection] = useState(1);
  const [searchPlaceholderValue, setSearchPlaceHolderValue] = useState('Name');
  const [searchValue, setSearchValue] = useState('');
  const [showedPlayer, setShowedPlayer] = React.useState([])

  const [playerDataChanged, setPlayerDataChanged] = useState(false);

  const [playerData, setPlayerData] = useState([
    {
      name: "Gerardy",
      email: "gerardy@gmail.com",
      experience: 4000,
      level: 25
    },
    {
      name: "Budi",
      email: "budi@gmail.com",
      experience: 4500,
      level: 30
    },
    {
      name: "Tono",
      email: "tono@gmail.com",
      experience: 5000,
      level: 27
    },
    {
      name: "Tina",
      email: "tina@gmail.com",
      experience: 5000,
      level: 10
    }
  ])

  const changePlayerData = (newData) => {
    setPlayerData(newData);
    setShowedPlayer(playerData);
    setTimeout(() => {
      setPlayerDataChanged(false)
    }, [300]);
  }

  useEffect(() => {
    setShowedPlayer(playerData.filter(e => {
      return e.name
    }))
  }, [])

  useEffect(() => {
    setShowedPlayer(playerData);
  }, [activeSelection])

  const handleSearch = (value) => {
    setShowedPlayer(playerData.filter(e => {
      setSearchValue(value)
      if (activeSelection == 1) {
        return e.name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
      } else if (activeSelection == 2) {
        return e.email.toLocaleLowerCase().includes(value.toLocaleLowerCase());
      } else if (activeSelection == 3) {
        return e.experience.toString().includes(value);
      } else if (activeSelection == 4) {
        return e.level.toString().includes(value);
      }
      return e.name
    }))
  }

  const handleSelection = (value) => {
    if (value == 1) {
      setSearchPlaceHolderValue('Name')
    } else if (value == 2) {
      setSearchPlaceHolderValue('Email')
    } else if (value == 3) {
      setSearchPlaceHolderValue('Experience')
    } else {
      setSearchPlaceHolderValue('Level')
    }
    setSearchValue('');
    setActiveSelection(value)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    
    const data = []
    
    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].value == '') return
      data.push(e.target[i].value);
    }

    setPlayerData(playerData.concat({
      name: data[0],
      email: data[1],
      experience: 0,
      level: 1
    }));
  }

  useEffect(() => {
    setShowedPlayer(playerData)
  }, [playerData])
  


  return (
    <div className='container'>
      <div className='selectHolder'>
        <div onClick={() => handleSelection(1)} className={activeSelection === 1 ? 'selectItemActive' : 'selectItem'}>Name</div>
        <div onClick={() => handleSelection(2)} className={activeSelection === 2 ? 'selectItemActive' : 'selectItem'}>Email</div>
        <div onClick={() => handleSelection(3)} className={activeSelection === 3 ? 'selectItemActive' : 'selectItem'}>Experience</div>
        <div onClick={() => handleSelection(4)} className={activeSelection === 4 ? 'selectItemActive' : 'selectItem'}>Level</div>
      </div>
      <div className='searchInputHolder'>
        <input className='searchInput' placeholder={`Search by ${searchPlaceholderValue} ...`} onChange={e => handleSearch(e.target.value)} value={searchValue} />
      </div>
      <div style={{width: '80%', padding: '0px 13px', marginBottom:5, display:'flex'}}>
        <h4 style={{width: '20%'}}>Name</h4>
        <h4 style={{width: '30%'}}>Email</h4>
        <h4 style={{width: '30%'}}>Experience</h4>
        <h4 style={{width: '10%'}}>Level</h4>
        <div style={{width: '10%'}} />
      </div>
      <ul className='playerListHolder'>
        {!playerDataChanged && showedPlayer.map((data, key) => {
          return (
            <PlayerList data={data} key={key} playerData={playerData} changePlayerData={changePlayerData} setPlayerDataChanged={setPlayerDataChanged} />
          )
        })}
      </ul>

      <div className='registerPage'>
        <h3 style={{fontSize: '2rem', height: '30%'}}>Register new player</h3>
        
        <form className='registerForm' onSubmit={(e) => handleRegister(e)}>
          <div style={{height: '70%', width: '100%'}}>
            <div className='inputHolder'>
              <label>Name:</label>
              <input placeholder='New Name' type='text' style={{width: '60%'}} name='name' />
            </div>
            <div className='inputHolder'>
              <label>Email:</label>
              <input placeholder='New Email' type='email' style={{width: '60%'}} name='name' />
            </div>
          </div>
          <div style={{height: '10%'}}>
            <button type='submit' value='btn' className='submitBtn'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App;
