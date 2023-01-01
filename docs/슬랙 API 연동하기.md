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
SLACK_SIGNING_SECRET='a...7e'
SLACK_BOT_USER_OAUTH_ACCESS_TOKEN=''
GOOGLE_SPREAD_SHEET_ID=''
```