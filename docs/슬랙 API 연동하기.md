# Slack Api에서 워크 스페이스에 봇 추가하기

1. [Slack Api](https://api.slack.com) 접속
2. 슬랙 계정으로 로그인해주세요.
3. 우측 상단에 Your apps를 클릭해서 들어가주세요.

![스크린샷 2022-11-27 오후 2 13 18](https://user-images.githubusercontent.com/20200820/204120342-7dc18a04-74b2-4670-8913-21bad80e981b.png)

4. Your Apps에서 "Create New App" 버튼을 클릭해 주세요.

![스크린샷 2022-11-27 오후 2 14 24](https://user-images.githubusercontent.com/20200820/204120365-a5d2ed65-52bc-48b9-8374-b16ca5b7a613.png)

5. From Scratch 선택

![스크린샷 2022-11-27 오후 2 15 55](https://user-images.githubusercontent.com/20200820/204120467-056de112-d5c8-41d3-908e-bd7476c7c3ba.png)

6. App Name과 WorkSpace 선택 후  "Create App" 클릭

![스크린샷 2022-11-27 오후 2 16 52](https://user-images.githubusercontent.com/20200820/204120466-7950953b-23a4-447f-94e5-885d9c51e080.png)

## SLACK_SIGNING_SECRET 값 받아오기

Settings > Basic Information > App Credentials

Signing Secret값에 Show버튼 클릭 후 나온 토큰값을 복사

![스크린샷 2022-11-27 오후 2 24 27](https://user-images.githubusercontent.com/20200820/204120662-43936fe2-96df-4949-a403-6b98390e42b8.png)

```sh
SLACK_SIGNING_SECRET='xxxxxxxxxxx'
SLACK_BOT_USER_OAUTH_ACCESS_TOKEN=''
GOOGLE_SPREAD_SHEET_ID=''
```

## SLACK_BOT_USER_OAUTH_ACCESS_TOKEN 토큰값 등록하기

SLACK_BOT_USER_OAUTH_ACCESS_TOKEN값을 등록하기 위해서는 일단 slack에서 내 서버에 접근을 할 수 있어야 합니다.

그래서 우리는 슬랙이 우리의 로컬서버에 접근할 수 있도록 임의의 서버 URL을 slack에 던져줄겁니다.

### ngrok 설치하기

우리는 ngrok를 통해 slack에서 우리의 로컬 서버로 접근할 수 있도록 할겁니다.

```bash
# npm을 통한 설치
npm i -g ngrok

# brew를 통한 설치 
# (맥북은 npm으로 설치가 안된다고 하던데 npm으로 설치가 되지 않을 경우 brew로 설치)
brew cask install ngrok
```

### ngrok를 이용해 서버열기

```bash
# yarn serve를 통해 express로 서버 오픈
yarn serve

# yarn ngrok를 통해 ngrok를 실행해 외부에서 로컬 서버에 접근할 수 있도록 임의의 url생성
yarn ngrok
```

#### yarn serve 실행 터미널 모습

![yarn serve 실행 터미널](https://user-images.githubusercontent.com/20200820/210161892-2d4a46e3-a60d-44bd-910e-bd3341863195.png)

#### yarn ngrok 실행 터미널 모습

![yarn ngrok 실행 터미널 모습](https://user-images.githubusercontent.com/20200820/210161927-a13e6359-4610-4143-8e0b-163d0564af87.png)

우리가 슬랙에 전달할 url은 Forwarding부분에 빨갛게 표기된 부분에 있는 url입니다.

![Request URL 설정하기](https://user-images.githubusercontent.com/20200820/210162218-dd290e81-01c6-4351-9578-2f152e5a19fb.png)

가끔 쿠키설정 때문에 3번 Save Changes 버튼이 보이지 않을 수 있는데 보라색 버튼 클릭해서 쿠키를 설정해주시면 버튼이 나옵니다.


![install bot](https://user-images.githubusercontent.com/20200820/210162288-654bd6d4-2436-48c1-a7a0-064b78bf5592.png)

저장 후 Settings > Install App 메뉴로 가면 Install App to workspace 버튼이 나오는데 해당 버튼을 눌러서 원하는 워크 스페이스에 설치합니다.

![image](https://user-images.githubusercontent.com/20200820/210162346-17181497-d5bb-4c43-ac64-854d1d831937.png)

설치 후 Bot User OAuth Access Token 값을 복사 후 .env 파일 SLACK_BOT_USER_OAUTH_ACCESS_TOKEN 값을 넣어주세요.

```sh
SLACK_SIGNING_SECRET='xxxxxxxxxxx'
SLACK_BOT_USER_OAUTH_ACCESS_TOKEN='xoxb-xxxxxxxx...'
GOOGLE_SPREAD_SHEET_ID=''
```

이제 슬랙 api에서 받을 키는 모두 등록 했습니다. 이제 구글시트와 연결하면 오점뭐 사용이 가능합니다.

[구글 시트 연동하러 가기](https://github.com/OhGyeongtaek/slack-recommand-bot/blob/main/docs/%EA%B5%AC%EA%B8%80%EC%8B%9C%ED%8A%B8%20%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0.md)

## 레퍼런스

* [타입스크립트로 슬랙 앱(봇) 만들기 - 기초편](https://blog.gangnamunni.com/post/typescript-slack-bot/)
* [express에서 ngrok으로 외부에 서버 공개하기](https://velog.io/@nawnoes/express%EC%97%90%EC%84%9C-ngrok%EC%9C%BC%EB%A1%9C-%EC%99%B8%EB%B6%80%EC%97%90-%EC%84%9C%EB%B2%84-%EA%B3%B5%EA%B0%9C%ED%95%98%EA%B8%B0)