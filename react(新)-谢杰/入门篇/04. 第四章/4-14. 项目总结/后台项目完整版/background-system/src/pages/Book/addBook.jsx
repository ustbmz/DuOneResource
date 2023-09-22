import { PageContainer } from '@ant-design/pro-components';
import BookForm from './components/bookForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { message } from 'antd';

// 请求方法
import BookController from '@/services/book';

function AddBook() {
  const navigate = useNavigate();

  const [newBookInfo, setNewBookInfo] = useState({
    bookTitle: '',
    bookIntro: '',
    downloadLink: '',
    requirePoints:'',
    bookPic: '',
    typeId: '',
  });

  /**
   * 用户点击新增书籍
   */
  function submitHandle(bookIntro) {
    // 因为没有使用状态机，所以直接调用控制器方法，进行新增
    BookController.addBook({
      bookTitle: newBookInfo.bookTitle,
      bookIntro,
      downloadLink: newBookInfo.downloadLink,
      requirePoints:newBookInfo.requirePoints,
      bookPic: newBookInfo.bookPic,
      typeId: newBookInfo.typeId,
    });

    // 跳转回首页
    navigate('/book/bookList');
    message.success('添加书籍成功');
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: 1000 }}>
        <BookForm
          type="add"
          submitHandle={submitHandle}
          bookInfo={newBookInfo}
          setBookInfo={setNewBookInfo}
        />
      </div>
    </PageContainer>
  );
}

export default AddBook;
