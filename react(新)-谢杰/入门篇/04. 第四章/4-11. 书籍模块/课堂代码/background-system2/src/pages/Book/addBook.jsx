import { useState } from 'react';
import BookForm from "./components/bookForm";
import { PageContainer } from "@ant-design/pro-components"
import { useNavigate} from "react-router-dom";
import BookController from "@/services/book"
import { message } from 'antd';

function AddBook(props) {

    const navigate = useNavigate();

    // 维护一个状态，该状态用于存储用户输入的书籍信息
    const [newBookInfo, setNewBookInfo] = useState({
        bookTitle: '',
        bookIntro: '',
        downloadLink: '',
        requirePoints: '',
        bookPic: '',
        typeId: '',
    });

    /**
     * 确认新增书籍
     */
    function submitHandle(bookIntro) {
        // 直接调用控制器方法进行一个信息
        BookController.addBook({
            bookTitle: newBookInfo.bookTitle,
            bookIntro,
            downloadLink: newBookInfo.downloadLink,
            requirePoints: newBookInfo.requirePoints,
            bookPic: newBookInfo.bookPic,
            typeId: newBookInfo.typeId,
        });

        message.success("添加书籍成功");
        // 跳回书籍列表页面
        navigate("/book/bookList");
    }


    return (
        <PageContainer>
            <div className="container" style={{ width: "1000px" }}>
                <BookForm
                    type="add"
                    bookInfo={newBookInfo}
                    setBookInfo={setNewBookInfo}
                    submitHandle={submitHandle}
                />
            </div>
        </PageContainer>
    );
}

export default AddBook;