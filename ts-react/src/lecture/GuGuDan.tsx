import * as React from 'react';
import { useState, useRef } from 'react';
//<>===React.Fragment
const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9))
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9))
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEl = React.useRef<HTMLInputElement>(null);
    const onSubmitForm = (e) => {
        e.preventDefault();
        const input = inputEl.current;
        if (parseInt(value) === first * second) {
            setResult('정답입니다~');
            //정답이면 다시 문제내는 부분
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
        } else {
            setResult('땡');
            setValue('');
            input!.focus();
        }
    }


    return (
        <>
            <div>{first} 곱하기 {second} = ?</div>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={input}
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)} />
            </form>


        </>

    )
}
export default GuGuDan;