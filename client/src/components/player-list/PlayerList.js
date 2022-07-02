import './playerList.css'
import { useState, useEffect } from 'react'


function PlayerList({ data, playerData, changePlayerData, setPlayerDataChanged }) {

    const [overlayActive, setOverlayActive] = useState(false);
    const [playerNewData, setPlayerNewData] = useState(null)

    const handleEdit = () => {
        setOverlayActive(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = []

        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].value == '') return
            data.push(e.target[i].value)
        }

        setPlayerNewData({
            previousName: data[0],
            newName: data[1],
            newEmail: data[2]
        })
        setOverlayActive(false)
    }

    useEffect(() => {
        if (playerNewData != null) {
            const objIndex = playerData.findIndex((obj => obj.name == playerNewData.previousName));
            
            playerData[objIndex].name = playerNewData.newName;
            playerData[objIndex].email =playerNewData.newEmail;
            
            setPlayerDataChanged(true);
            changePlayerData(playerData)
        }
    }, [playerNewData])



    return (
        <li className='playerList'>
            <p style={{width: '20%'}}>{data.name}</p>
            <p style={{width: '30%'}}>{data.email}</p>
            <p style={{width: '30%'}}>{data.experience}</p>
            <p style={{width: '10%'}}>{data.level}</p>
            <div className='editBtnHolder'>
            <button onClick={handleEdit} className='editBtn'>Edit</button>
            </div>

            <div className={overlayActive ? 'overlayActive' : 'overlayClosed'}>
                <div className='editPage'>
                    <h3 style={{fontSize: '2rem', height: '30%'}}>Edit {data.name} Profile</h3>

                    <form className='editForm' action='/' method='POST' onSubmit={(e) => handleSubmit(e)}>
                        <input type='text' style={{display: 'none'}} value={data.name} name='previousName' />
                        <div className='inputHolder'>
                            <label>New Name:</label>
                            <input placeholder='New Name' type='text' style={{width: '60%'}} name='name' />
                        </div>
                        <div className='inputHolder'>
                            <label>New Email:</label>
                            <input placeholder='New Email' type='email' style={{width: '60%'}} name='name' />
                        </div>
                        <div className='btnHolder'>
                            <div onClick={() => setOverlayActive(false)} className='cancelBtn'>Cancel</div>
                            <button type='submit' value='btn' className='submitBtn'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </li>
    )
}

export default PlayerList