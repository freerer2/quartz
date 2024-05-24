```jsx
async function getData() {
    const response = await fetch('/api/test', {
	    method: 'POST', //요청메소드에 따라 다름
	    body: JSON.stringfy(postData),
	    headers: {
		    'Content-Yype': 'application/json'
	    }
    });
    return await response.text(); //타입에 따라 다름
}
```

# **Links**
---
- [[Side Effect 관리하기(useEffect)]]
- [[로딩 상태 관리]]