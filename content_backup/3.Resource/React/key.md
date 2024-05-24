> 목록을 갱신 할 때 사용한 속성
> 유일해야함
> 키값을 다른 속성과 같이 쓰면 안됨
> ex) key={a} value={a} <<< 안됨

```jsx
datas.map((data)=>{
	return <div key={data.id}> 
		{data.contents}
	</div>
})
```