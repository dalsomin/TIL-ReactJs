대부분의 경우 ... 연산자 또는 배열 내장함수를 사용하는건 그렇게 어렵지는 않지만 데이터의 구조가 조금 까다로워지면 불변성을 지켜가면서 새로운 데이터를 생성해내는 코드가 조금 복잡해집니다.

가령 다음과 같은 객체가 있다고 가정해봅시다.

const state = {
  posts: [
    {
      id: 1,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 1,
          text: '와 정말 잘 읽었습니다.'
        }
      ]
    },
    {
      id: 2,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 2,
          text: '또 다른 댓글 어쩌고 저쩌고'
        }
      ]
    }
  ],
  selectedId: 1
};
여기서 posts 배열 안의 id 가 1 인 post 객체를 찾아서, comments 에 새로운 댓글 객체를 추가해줘야 한다고 가정해봅시다. 그렇다면, 다음과 같이 업데이트 해줘야 할 것입니다.

const nextState = {
  ...state,
  posts: state.posts.map(post =>
    post.id === 1
      ? {
          ...post,
          comments: post.comments.concat({
            id: 3,
            text: '새로운 댓글'
          })
        }
      : post
  )
};
이게 어려운건 아닌데, 솔직히 코드의 구조가 좀 복잡해져서 코드를 봤을 때 한 눈에 들어오질 않습니다.

이럴 때, immer 라는 라이브러리를 사용하면 다음과 같이 구현을 할 수 있답니다.

const nextState = produce(state, draft => {
  const post = draft.posts.find(post => post.id === 1);
  post.comments.push({
    id: 3,
    text: '와 정말 쉽다!'
  });
});
어떤가요? 코드가 훨씬 깔끔하고 잘 읽혀지죠?

Immer 를 배우기전에 간단하게 요약을 해드리겠습니다. Immer 를 사용하면 우리가 상태를 업데이트 할 때, 불변성을 신경쓰지 않으면서 업데이트를 해주면 Immer 가 불변성 관리를 대신 해줍니다.

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
