평소에 useEffect 안에서 async await 함수를 쓰고 싶었던 적이 많았는데 매번 에러가 나길래 안되는건줄 알았다. 근데 요즘 공부하고 있는 저자 이재승 님의 실전 리액트 프로그래밍 개정판 (리액트 훅부터 Next.js 까지) 라는 책에서 설명이 잘 되어 있어서 정리함! 혹시 문제가 있을 경우 바로 삭제하겠습니다!ㅠㅠ

💡useEffect 훅에서 async await 함수 사용하기

❌

useEffect 를 async await 로 만든 예

useEffect(async () => {
const data = await fetchUser(userId);
setUser(data);
}, [userId]);
async await 함수는 프로미스 객체를 반환 하므로 부수효과 함수가 될 수 없다.
부수 효과 함수는 함수만 반환 할 수 있으며, 반환된 함수는 부수 효과 함수가 호출되기 직전과 컴포넌트가 사라지기 직전에 호출된다.

useEffect 훅에서 async await 함수를 사용하는 한 가지 방법은 부수 효과 함수 내에서 async await 함수를 만들어서 호출하는 것

✅

useEffect(() => {
async function fetchAndSetUser() { 1
	const data = await fetchUser(userId);
	setUser(data);
   }
   fetchAndSetUser(); 2
},[userId]);
useEffect 내에서 async await 함수를 만들고
그 함수를 바로 호출 한다.
fetchAndStUser 함수 재사용하기
다음과 같이 fetchAndSetUser 함수도 다른 곳에서 사용해야 한다면 코드를 어떻게 변경해야 할지 고민해 본다.

function Profile({userId}) {
  const [user, setUser] = useState();
  useEffect(() => {
  	async function fetchAndSetUser(needDetail) {
    	const data = await fetchUser(userId, needDetail);
        setUser(data);
    }
  fetchAndSetUser(false);
 },[userId);
 
 if(!user){
 return <>로딩..</>
 }
 return (
 <div>
 	<h1>{user.name}</h1>
    ...
    <button onClick={() => ❗️fetchAndSetUser(true)}>더보기</button>
    <UserDetail user={user >
 </div>
 )
 }
❗️fetchAndSetUser 함수를 훅 밖으로 빼야한다.

function Profile({userId}){
  const [user,setUser]= useState();
  async function fetchAndSetUser(needDetail){
    const data = await fetchUser(userId, nedDetail);
    setUser(data);
}
useEffect(() => {
fetchAndSetUser(false);
}, [fetchAndSetUser]); //1
훅 내부에서 fetchAnd 함수를 사용하므로 해당 함수를 의존성 배열에 넣는다.
fetchAndSetUser 함수는 렌더링을 할 때마다 갱신되므로 결과적으로 fetchAndSetUser 함수는 렌더링을 할 때마다 호출된다.
이 문제를 해결 하기 위해 fetchAndSetUser 함수가 필요할 때만 갱신되도록 만들어야 한다.
useCallback 훅을 이용해서 userId가 변경 될 때만 fetchAndSetUse 함수가 갱신된다.

function Profile({userId}){
	const [user, setUser] = useState();
    const fetchAndSetUser = useCallback(
    	async needDetail => {
        	const data = await fetchUser(userId, needDetail);
            setUser(data);
        },
        [userId]
      );
   useEffect(() => {
   fetchAndSetUser(false);
   }, [fetchAndSetUser]);
   
useCallback 훅을 이용해서 fetchAndSetUser 함수가 필요할 때만 갱신되도록 개선.
fetchAndSetUser함수는 userId 가 변경 될때만 호출된다.

여기서 의문❓
의존성 배열에 userId를 넣으면 되지 않을까? 그럼 userId가 바뀔때만 fetchAndSetUser 가 호출되니깐 useCallback을 사용하지 않아도 될것 같다는 생각이 들었다.

하지만 useCallback을 쓰면 userId 가 바뀔때만 함수가 갱신되고 fetchAndSetUser가 호출되니 성능상 이점이 있다. 배열에 userId를 넣고 useCallback을 쓰지 않으면 렌더링 될때마다 함수가 갱신될테니!(페북에서는 이게 성능에 크게 영향을 안끼친다고 얘기하긴 하지만..) 여러가지 생각을 해 보았다. 의미있다.

요점 🔔

useEffect 는 항상 함수를 반환해야함 그래서 async await을 잘못쓰면 프로미스 객체를 반환하게 되어 에러가 난다. 바로 이렇게

useEffect(async() => { await fuc()});
그래서 useEffect 내부에 async 함수를 선언해주고 바로 호출하기!

useEffect(() => {
	const a async () => {
    	const b = await c()
        }
    a();
},[]);
