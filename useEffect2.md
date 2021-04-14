🤔 질문: useEffect 로 componentDidMount 동작을 흉내내려면 어떻게 하지?

완전히 같진 않지만 useEffect(fn, []) 으로 가능합니다. componentDidMount 와 달리 prop과 state를 잡아둘 것입니다. 그래서 콜백 안에서도 초기 prop과 state를 확인할 수 있습니다. 만약 “최신의” 상태 등을 원한다면, ref에다 담아둘 수는 있습니다. 하지만 보통 더 간단하게 코드를 구조화하는 방법이 있기 때문에 굳이 이 방법을 쓸 필요도 없습니다. 이펙트를 다루는 멘탈 모델은 componentDidMount 나 다른 라이프사이클 메서드와 다르다는 점을 인지하셔야 합니다. 그리고 어떤 라이프사이클 메서드와 비슷한 동작을 하도록 만드는 방법을 찾으려고 하면 오히려 혼란을 더 키울 뿐입니다. 더 생산적으로 접근하기 위해 “이펙트 기준으로 생각해야(thinking in effects)” 하며 이 멘탈 모델은 동기화를 구현하는 것에 가깝지 라이프사이클 이벤트에 응답하는 것과는 다릅니다.

🤔 질문: useEffect 안에서 데이터 페칭은 어떻게 해야할까? 두번째 인자로 오는 배열([]) 은 뭐지?

이 링크의 글이 useEffect 를 사용하여 데이터를 불러오는 방법을 파악하는데 좋은 기본서가 됩니다. 글을 꼭 끝까지 읽어보세요! 지금 읽고 계시는 글처럼 길지 않습니다. [] 는 이펙트에 리액트 데이터 흐름에 관여하는 어떠한 값도 사용하지 않겠다는 뜻입니다. 그래서 한 번 적용되어도 안전하다는 뜻이기도 합니다. 이 빈 배열은 실제로 값이 사용되어야 할 때 버그를 일으키는 주된 원인 중 하나입니다. 잘못된 방식으로 의존성 체크를 생략하는 것 보다 의존성을 필요로 하는 상황을 제거하는 몇 가지 전략을(주로 useReducer, useCallback) 익혀야 할 필요가 있습니다.

🤔 질문: 이펙트를 일으키는 의존성 배열에 함수를 명시해도 되는걸까?

추천하는 방법은 prop이나 state를 반드시 요구하지 않는 함수는 컴포넌트 바깥에 선언해서 호이스팅하고, 이펙트 안에서만 사용되는 함수는 이펙트 함수 내부에 선언하는 겁니다. 그러고 나서 만약에 랜더 범위 안에 있는 함수를 이펙트가 사용하고 있다면 (prop으로 내려오는 함수 포함해서), 구현부를 useCallback 으로 감싸세요. 왜 이런걸 신경써야 할까요? 함수는 prop과 state로부터 값을 “볼 수” 있습니다. 그러므로 리액트의 데이터 플로우와 연관이 있지요. 자세한 답변은 훅 FAQ 부분에 있습니다.

🤔 질문: 왜 가끔씩 데이터 페칭이 무한루프에 빠지는걸까?

이펙트 안에서 데이터 페칭을 할 때 두 번째 인자로 의존성 배열을 전달하지 않았을 때 생길 수 있는 문제입니다. 이게 없으면 이펙트는 매 랜더마다 실행됩니다. 그리고 state를 설정하는 일은 또 다시 이펙트를 실행하죠. 의존성 배열에 항상 바뀌는 값을 지정해 두는 경우에도 무한 루프가 생길 수 있습니다. 하나씩 지워보면서 어느 값이 문제인지 확인할 수도 있지만, 사용하고 있는 의존 값을 지우는 일은(아니면 맹목적으로 [] 을 지정하는 것은) 보통 잘못된 해결법입니다. 그 대신 문제의 근원을 파악하여 해결해야 합니다. 예를 들어 함수가 문제를 일으킬 수 있습니다. 그렇다면 이펙트 함수 안에 집어넣거나, 함수를 꺼내서 호이스팅 하거나, useCallback 으로 감싸서 해결할 수 있습니다. 객체가 재생성되는 것을 막으려면 useMemo 를 비슷한 용도로 사용할 수 있습니다.

🤔 질문: 왜 가끔씩 이펙트 안에서 이전 state나 prop 값을 참조할까?

이펙트는 언제나 자신이 정의된 블록 안에서 랜더링이 일어날 때마다 prop과 state를 “지켜봅니다”. 이렇게 하면 버그를 방지할 수 있지만 어떤 경우에는 짜증날 수 있습니다. 그럴 때는 명시적으로 어떤 값을 가변성 ref에 넣어서 관리할 수 있습니다(링크에 있는 글 말미에 설명되어 있습니다). 혹시 기대한 것과 달리 이전에 랜더링될 때의 prop이나 state가 보인다면, 아마도 의존성 배열에 값을 지정하는 것을 깜빡했을 겁니다. 이 린트 규칙을 사용하여 그 값을 파악할 수 있도록 연습해 보세요. 며칠 안으로 자연스레 몸에 밸 것입니다. 또한 FAQ 문서에서 이 답변 부분을 읽어보세요.