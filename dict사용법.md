## dict 사용법

```javascript
   
//originData = [ {id:a, role:1},{id:a, role:2},{id:a, role:4}, {id:b, role:1},{id:b, role:2} ]
const handleModifiedData = (originData) => {
        console.log('originDATA', originData);
        if (originData && originData.length > 0) {
            console.log('length', originData);
            let dict = {};
            originData.forEach((row) => {
                if (row.userId in dict) {
                    dict[row.userId] = [...dict[row.userId], row.roleId];
                } else {
                    dict[row.userId] = [row.roleId];
                }
            });
            const modifiedData = Object.keys(dict).map((key) => ({
                id: key,
                roles: dict[key],
            }));

            console.log('modifiedData>>>', modifiedData);
            return modifiedData;
        }
    };
```

