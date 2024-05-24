## 모듈로 스타일 적용

>  Component.module.css 파일 생성

```css
.font-style {
	font-size: 0.8rem;
}
```


>import 후 사용

```jsx
import cleasses from './Comoponent.codule.css'

export default function Component({ attr, children }){
	return (
		<div className={classed.font-style}>
			<p>{attr}</p> 
			{children}
		</div>
	)
}
```

## 컴포넌트에 바로 적용

```jsx

export default function Component({ attr, children }){
	return (
		<div style={{
			fontSize: 0.8rem, //대쉬는 카멜기법으로
			key: value
		}}>
			<p>{attr}</p> 
			{children}
		</div>
	)
}
```