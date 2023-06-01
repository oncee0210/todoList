'use strict'


//메모 준비물
const momoWrap = document.querySelector(".contents_wrap"); // 메모 목록 박스
const writeOpenBtn = document.querySelector(".memo_write-btn"); // 메모 쓰기 열기 버튼
const writeCloseBtn = document.querySelector(".memo_close-btn"); // 메모 쓰기 닫기 버튼
const writeDeleteBtn = document.querySelector(".memo_delete-btn"); // 메모 쓰기 닫기 버튼
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
        memoRender(memo);
      })
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

momoDataInit();

// # 메모 목록 렌더링
const memoRender = (data) => {
  let momoList = `
  <div class="contents-list">
    <div class="text">
      <p class="con">${data.text}</p>
      <p class="date">${data.date}</p>
    </div>
    <div class="func">
      <button type="button" class="memo_delete-btn" onclick="deleteMemo(event)">X</button>
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
// event handler (입력한 데이터 전달 및 렌더링)
const saveMemo = () => {
  let memoData = {
    "idx": 1,
    "text": writeText.value,
    "date": "2023-12-31"
  };

  memoRender(memoData);
  closeWrite();
}

// 전달된 데이터 저장하기 (X)
const memoDataSave = (data) => {

}

// event listener
writeSaveBtn.addEventListener('click', saveMemo)

// # 메모 삭제
// event handler
const deleteMemo = (event) => {
  event.target.closest(".contents-list").remove();
}