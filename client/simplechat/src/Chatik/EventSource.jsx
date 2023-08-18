import React, {useEffect, useState} from 'react';
import axios from "axios";
import './components.css'

const Eventsource = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');


    useEffect(() => {
        subscribe()
    }, [])


    // let a = 0;
    const subscribe = async () => {
        const eventSource = new EventSource(`http://localhost:5000/connect`)
 //       if(a === 0){
        eventSource.onmessage = function (event) {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }
    //     a++;
    // }else if(a === 1){
    //        a++;
    // }else{a = 0}
    }


    const sendMessage = async () => {
      setValue(' ')
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
        

    }

    return (
        <div className="contanierChat">
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div className="message" key={mess.id}>
                            {mess.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Eventsource;