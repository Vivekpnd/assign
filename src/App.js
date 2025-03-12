import React, { useEffect, useState } from 'react';
import './App.css'; 

function App() {
    const [ws, setWs] = useState(null);
    const [animationData, setAnimationData] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setWs(socket);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setAnimationData(data.frame);
        };

        return () => {
            socket.close();
        };
    }, []);

    const startAnimation = () => {
        if (ws) {
            ws.send('Start');
            setIsAnimating(true);
        }
    };

    const stopAnimation = () => {
        if (ws) {
            ws.send('Stop');
            setIsAnimating(false); 
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>WebSocket Animation</h1>
            <button onClick={startAnimation}>Start</button>
            <button onClick={stopAnimation}>Stop</button>
            <div
                id="feed"
                className={isAnimating ? 'glow' : ''}
                style={{
                    height: '5px',
                    margin: '20px auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    backgroundColor: '#282c34',
                    boxShadow: isAnimating ? '0 0 120px red' : 'none',
                }}
            >
                {animationData !== null ? `Animation Frame: ${animationData}` : ''}
            </div>
        </div>
    );
}

export default App;