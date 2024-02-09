import { useEffect, useState } from 'react';
import React from 'react'
import "./index.css"

export default function input() {
    const [inp, setInp] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('info');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    function validate() {
        if (!inp) {
            alert("Matn kiritilishi shart");
            return false;
        }
        if (!inp.trim()) {
            alert("Matn bo'sh bo'lishi mumkin emas");
            return false;
        }
        if (inp.length < 3) {
            alert("Matn kamida uch ta belgidan ko'p bo'lishi kerak");
            return false;
        }
        return true;
    }

    function getInfo() {
        let data = [];
        if (localStorage.getItem("info")) {
            data = JSON.parse(localStorage.getItem("info"));
        }
        return data;
    }

    function handleClick() {
        if (validate()) {
            let todo = {
                text: inp,
                id: Date.now()
            };
            let data = getInfo();
            data.push(todo);
            localStorage.setItem("info", JSON.stringify(data));
            setData(data);
            setInp("")
        }
    }

    function Delete(id) {
        let newData = data.filter(todo => todo.id !== id);
        localStorage.setItem("info", JSON.stringify(newData));
        setData(newData);
    }
    
    function AddTodos() {
        return data.map(todo => (
            <div className='list' >
                <input  type="checkbox" />
                <p>{todo.text}</p>
                <div className="btn">
                    <button><svg className="edit " xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" /></svg></button>
                    <button><svg onClick={() => Delete(todo.id)} className="delete " xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" ><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" /> </svg></button>
                </div>
            </div>
        ));
    }

    return (
        <>
            <form className="Card">
                <input onChange={(e) => setInp(e.target.value)} value={inp} type="text" placeholder="Add new todo..."
                />
                <button className='Button' onClick={handleClick}>Add Todo</button>
                <>{AddTodos()}</>
            </form>
        </>
    )
}
