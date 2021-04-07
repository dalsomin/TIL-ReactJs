createContext 내부에 공유하길 원하는 데이터의 초깃값을 넣어두고 value 변수로 묶어주면 됩니다. 이 때 value 객체는 객체이므로 리렌더링의 주범이 되므로 useMemo로 캐싱해두세요. 안 그러면 나중에 이 데이터를 쓰는 모든 컴포넌트가 매번 리렌더링됩니다.

현재 컴포넌트 구조는 GrandParent - Parent - Children입니다. GrandParent에서 선언한 setLoggedIn과 setLoading을 Parent를 거치지 않고 바로 Children으로 보낼 것입니다. 그러기 위해서는 컴포넌트가 UserContext.Provider로 감싸져있어야 합니다. value props에 아까 만든 value를 넣어둡니다.

import React from 'react';
import Children from './Children';

const Parent = () => {
  return <Children />;
};
export default Parent;
Parent는 아무 것도 안 합니다. 과연 Children은 GrandParent의 컨텍스트를 물려받을 수 있을까요?

import React, { useContext } from 'react';
import { UserContext } from './GrandParent';

const Children = () => {
  const { setLoading, setLoggedIn } = useContext(UserContext);
  return (
    <>
      <button onClick={() => setLoading((prev) => !prev)}>로딩토글</button>
      <button onClick={() => setLoggedIn((prev) => !prev)}>로딩토글</button>
    </>
  );
};
export default Children; 
useContext를 불러와서 안에 UserContext를 넣어주면 setLoading과 setLoggedIn을 쓸 수 있습니다.
