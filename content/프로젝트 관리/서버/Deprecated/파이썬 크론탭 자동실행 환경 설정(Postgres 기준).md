## 파이썬 실행 환경 세팅
```sh
#필요시 설치 및 업데이트
sudo apt upgrade python3
sudo apt upgrade cron
sudo apt upgrade git

mkdir lhk-lms

cd lhk-lms

#git clone 
#토큰 사용시
git clone https://freerer2:[토큰값]@github.com/lhk-lms/attendance_app.git
#ssh 사용시
git clone git@github.com:lhk-lms/attendance_app.git

cd attendance_app
mkdir logs

#시스템 의존성 설치
sudo apt install tesseract-ocr
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb
sudo apt install postfix #로그용 (CRON) info (No MTA installed, discarding output)

#파이썬 패키지 설치
#필수설치
sudo apt install python3-pip
pip install psycopg2-binary

#의존성 설치
pip install -r requirements.txt

#psycopg2 설치 오류시 requirements.txt에서 제외 후 해당 패키지 설치
sudo apt install python3-psycopg2 

#crontab 편집기 열기
crontab -e

#추가
*/1 * * * * python3 /home/ubuntu/lhk-lms/attendance_app/main.py >> /home/ubuntu/lhk-lms/attendance_app/logs/attendance_app_`date "+\%Y-\%m-\%d"`.log

#크론탭 재실행
sudo service cron restart
```