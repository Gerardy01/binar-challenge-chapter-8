import './playerList.css'
import { useState } from 'react'


function PlayerList({ data, key }) {

    const [overlayActive, setOverlayActive] = useState(false);

    const handleEdit = () => {
        setOverlayActive(true);
    }

    return (
        <li key={key} className='playerList'>
            <p style={{width: '20%'}}>{data.name}</p>
            <p style={{width: '30%'}}>{data.email}</p>
            <p style={{width: '30%'}}>{data.experience}</p>
            <p style={{width: '10%'}}>{data.level}</p>
            <div className='editBtnHolder'>
            <button onClick={handleEdit} className='editBtn'>Edit</button>
            </div>

            <div className={overlayActive ? 'overlayActive' : 'overlayClosed'}>

            </div>
        </li>
    )
}

export default PlayerList