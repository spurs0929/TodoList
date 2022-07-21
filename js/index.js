var initTodoList = (function(){

  var plusBtn = document.getElementsByClassName('j-plus-btn')[0],
      inputArea = document.getElementsByClassName('input-wrapper')[0],
      addItem = document.getElementsByClassName('j-add-item')[0],
      itemContent = document.getElementById('itemContent'),
      oList = document.getElementsByClassName('item-list')[0],
      // 輸入框顯示與否
      inputShow = false,
      // 控制目前操作為新增或編輯
      isEdit = false,
      // 目前點擊元素的index
      curIdx = null;

  // 在'+'按鈕綁定click事件處理函數
  addEvent(plusBtn, 'click', function(){
    // 輸入框顯示
    if (inputShow) {
      // 隱藏輸入框
      inputArea.style.display = 'none';
      // inputShow改為false
      inputShow = false;
      // 新增操作
      isEdit = false;
      // 清空目前index
      curIdx = null;
      // 清框輸入框內容
      itemContent.value = '';
      // 修改innerText內容
      addItem.innerText = '新增項目'
      
      // 輸入框隱藏
    } else {
      // 顯示輸入框
      inputArea.style.display = 'block';
      // inputShow改為true
      inputShow = true;
    }
  });

  // 在'新增項目'按鈕綁定click事件處理函數
  addEvent(addItem, 'click', function(){
        // 獲取輸入內容
    var content = itemContent.value,
        // 獲取輸入內容長度
        contentLen = content.length,
        // 獲取所有list集合和長度
        oItems = document.getElementsByClassName('item'),
        itemLen = oItems.length;

    // 輸入內容為空
    if (contentLen <= 0) {
      return;
    }

    // list集合不為空
    if (itemLen > 0) {
      // for迴圈遍歷list集合的每個元素的innerText
      for (var i = 0; i < itemLen; i++) {
        itemText = elemChildren(oItems[i])[0].innerText;
        // 若輸入內容重複
        if (itemText === content) {
          alert('輸入重複內容');
          return;
        }
      }
    }

    // 編輯操作
    if (isEdit) {
      // 獲取目前點擊元素（li）的第一個子元素（p）
      var itemP = elemChildren(oItems[curIdx])[0];
      // 給p元素的innerText賦值為content
      itemP.innerText = content;
      // 編輯完成，重置innerText為新增項目
      addItem.innerText = '新增項目';
      // 重設為默認值
      isEdit = false;
      curIdx = null;
      
      // 新增項目操作
    } else {
      // 創建li
      var oLi = document.createElement('li');
      // 給li設置className
      oLi.className = 'item';
      // 用模板替換li的innerHTML
      oLi.innerHTML = itemTpl(content);
      // 將li新增到ul中的最後一項
      oList.appendChild(oLi);
    }
    // 操作完成后隱藏輸入框
    inputArea.style.display = 'none';
    // 改變輸入框狀態
    inputShow = false;
    // 清空輸入框內容
    itemContent.value = '';
  });

  // 在list綁定click事件處理函數
  addEvent(oList, 'click', function(e){
        // 獲取事件物件
    var e = e || window.event,
        // 獲取事件源物件
        tar = e.target || e.srcElement,
        // 獲取事件源className
        className = tar.className,
        // 獲取li元素集合
        oItems = document.getElementsByClassName('item'),
        // 尋找事件源的父節點
        liParent = elemParent(tar, 2);

    // 點擊編輯按鈕
    if (className === 'edit-btn fa fa-edit') {
      var itemLen = oItems.length,
          // 獲取點擊元素的index
          tarIdx = Array.prototype.indexOf.call(oItems, liParent),
          item;
      
      // 顯示輸入框
      inputArea.style.display = 'block';
      // inputShow改為true
      inputShow = true;

      // 重置li className
      for (var i = 0; i < itemLen; i++) {
        item = oItems[i];
        item.className = 'item';
      }

      // 儲存目前點擊的index
      curIdx = tarIdx;
      // 新增active className
      liParent.className += ' active';
      // 修改innerText
      addItem.innerText = '編輯第' + (curIdx + 1) + '項';
      // 編輯操作
      isEdit = true;

      // 刪除操作
    } else if (className === 'remove-btn fa fa-times') {
      // 移除li
      liParent.remove();
      // 狀態重置
      isEdit = false;
      curIdx = null;
      itemContent.value = '';
      addItem.innerText = '新增項目';
    }
  });

  // 模板替換
  function itemTpl (text) {
    return(
      '<p class="item-content">' + text + '</p>' + 
      '<div class="btn-group">'+
      '<a href="javascript:;" class="edit-btn fa fa-edit"></a>'+
          '<a href="javascript:;" class="remove-btn fa fa-times"></a>'+
      '</div>'
    );
  }
});

init();

function init () {
  initTodoList();
}
