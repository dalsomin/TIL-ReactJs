
## currentTarget과 target의 차이 

```html
<li>
    <button onClick={onLogin}>
        <span>Google</span>
    </button>
</li>
```

### target은 내려가는거!! 자식!!!
### currentTarget 은 부모다 !!!!

```javascript
const onLogin = (event) =>{
    console.log(event.target);//<span>: 자식태그 리턴
    console.log(event.currentTarget);//<button> : 부모태그 리턴
}
```

