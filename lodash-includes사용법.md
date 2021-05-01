
_.includes

함수형식: _.includes(collection, target, [fromIndex=0])
입력: collection
출력: 포함하고 있는지 결과

// 배열에 값이 있는지 찾습니다.
_.includes([1, 2, 3], 1);
// → true

// index에 해당 값이 있는지 찾습니다.
_.includes([1, 2, 3], 1, 2);
// → false

// 일치하는 값이 있는지 찾습니다.
_.includes({ 'user': 'fred', 'age': 40 }, 'fred');
// → true

// 일치하는 값이 문자열 안에 있는지 찾습니다.
_.includes('pebbles', 'eb');
// → true
