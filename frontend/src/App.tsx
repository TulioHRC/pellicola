import React, { useState, useEffect } from 'react'

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const testData = async () => {
            try {
                const data = await fetch('/api');

                if (data.ok) {
                    setMessage(await data.json());
                } else {
                    console.error('Error with data: ', data.statusText);
                }
            } catch (error) {
                console.error('Error making fetch: ', error);
            }
        }

        testData();
    }, [])

    return (
        <div className="App">
            <h1>Hello World!</h1>
            <pre>{JSON.stringify(message)}</pre> 
        </div>
    );
}

export default App;