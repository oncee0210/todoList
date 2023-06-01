'use strict'


//메모 준비물
const momoWrap = document.querySelector(".contents_wrap"); // 메모 목록 박스
const writeOpenBtn = document.querySelector(".memo_write-btn"); // 메모 쓰기 열기 버튼
const writeCloseBtn = document.querySelector(".memo_close-btn"); // 메모 쓰기 닫기 버튼
const writeBox = document.querySelector(".memo_write_layout"); // 메모 쓰기 박스
const writeText = document.querySelector("input[name=memo_write-text]"); // 메모 내용 입력칸
const writeSaveBtn = document.querySelector(".memo_save-btn"); // 메모 저장 버튼
const memoJsonPath = "/data/memolist.json";

// 메모 목록 초기 데이터 (json)
const momoDataInit = () => {
  fetch(memoJsonPath)
    .then(response => response.json())
    .then(data => {
      data.map((memo) => {
        memoRender(memo.text);
      })
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

momoDataInit();

// # 메모 목록 렌더링
const memoRender = (text) => {
  let momoList = `
  <div class="contents-list">
    <div class="text">
      ${text}
    </div>
    <div class="func">
      <button type="button">버튼</button>
    </div>
  </div>
  `;

  momoWrap.insertAdjacentHTML('beforeend', momoList)
}

// # 메모 쓰기 열기
// event handler
const openWrite = () => {
  writeBox.classList.add('on');
  writeText.focus();
}

// event listener
writeOpenBtn.addEventListener('click', openWrite)

// # 메모 쓰기 닫기
// event handler
const closeWrite = () => {
  writeBox.classList.remove('on');
}

// event listener
writeCloseBtn.addEventListener('click', closeWrite)

// # 메모 저장
// json 파일 쓰기
const memoDataSave = (data) => {
  fetch(memoJsonPath)
    .then(response => response.json())
    .then(existingData => {
      // 기존 데이터에 새로운 데이터 추가
      existingData.push(data);

      // 데이터를 JSON 문자열로 변환
      const jsonData = JSON.stringify(existingData);

      // 업데이트된 데이터를 memolist.json 파일에 저장
      fetch(memoJsonPath, {
        method: 'PUT',
        body: jsonData,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            console.log('데이터 저장 성공');
          } else {
            console.error('데이터 저장 실패');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// event handler
const saveMemo = () => {
  let memoData = {
    "idx": 1,
    "text": writeText.value,
    "date": "2023-12-31"
  };

  memoDataSave(memoData);
  memoRender(memoData.text);
  closeWrite();
}

// event listener
writeSaveBtn.addEventListener('click', saveMemo)