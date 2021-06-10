### Immer 사용법
이번 섹션에서는 우리가 기존에 만들었던 사용자 관리 프로젝트에 Immer 를 적용해보면서 Immer 의 사용법을 알아보겠습니다.

우선 프로젝트에서 다음 명령어를 실행하여 Immer 를 설치해주세요.

$ yarn add immer
이 라이브러리를 사용 할 땐 다음과 같이 사용합니다.

우선 코드의 상단에서 immer 를 불러와주어야 합니다. 보통 produce 라는 이름으로 불러옵니다.

import produce from 'immer';
그리고 produce 함수를 사용 할 때에는 첫번째 파라미터에는 수정하고 싶은 상태, 두번째 파라미터에는 어떻게 업데이트하고 싶을지 정의하는 함수를 넣어줍니다.

두번째 파라미터에 넣는 함수에서는 불변성에 대해서 신경쓰지 않고 그냥 업데이트 해주면 다 알아서 해줍니다.

const state = {
  number: 1,
  dontChangeMe: 2
};

const nextState = produce(state, draft => {
  draft.number += 1;
});

console.log(nextState);
// { number: 2, dontChangeMe: 2 }
