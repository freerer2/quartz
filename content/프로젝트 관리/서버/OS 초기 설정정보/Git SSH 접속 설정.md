---
date: 2024-10-24
updated: 2024-10-24
order: 99999
---

## git SSH키 세팅
```sh
mkdir ~/.ssh
echo -e "Host github.com\n  IdentityFile ~/.ssh/git\n  User git" > ~/.ssh/config

#key 파일 .ssh 디렉터리로 이동 후 권한 수정
chmod 700 ~/.ssh/git

#연결 테스트
ssh -T git@github.com
```