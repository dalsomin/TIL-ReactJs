Collection 관련함수

_.every

함수형식: .every(collection, [predicate=.identity], [thisArg])
입력: collection
출력: boolean값

// 배열안의 타입을 확인할 수 있습니다.
_.every([true, 1, null, 'yes'], Boolean);
// → false

var users = [
  { 'user': 'barney', 'active': false },
  { 'user': 'fred',   'active': false }
];

// 값을 비교할 수 있습니다.
_.every(users, { 'user': 'barney', 'active': false });
// → false

// key와 value가 있는지 확인할 수 있습니다.
_.every(users, 'active', false);
// → true

// key에 해당하는 value가 모두 true이면 true를 반환합니다.
_.every(users, 'active');
// → false
