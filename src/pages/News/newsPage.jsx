import React, { useContext, useEffect, useState } from "react";
import "./newsPage.css";
import Navbar from "../../components/homePageComponents/navbar/navbar";
import Footer from "../../components/Footer";
import FooterLinks from "../../components/homePageComponents/FooterDetails/FooterLinks";
import { Dialog } from "primereact/dialog";
import { NewsContext } from "../../context/newsContext";
import NewsItem from "../Home-Page/hospitalNews/newsItem/newsItem";
import { Paginator } from "primereact/paginator";
import AddEditNews from "../../components/newsComponets/AddEditNews";
import { toastSucessMessage } from "../../_services/Toaster.service";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { APIS } from "../../_utils/APIS";
import { del, post, put } from "../../_services/APiCaller.Service";
import Loader from "../../_helpers/loader";


const NewsPage = () => {
  const [visible, setVisible] = useState(false);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editedNewsItem, setEditedNewsItem] = useState(null);
  const { response, getAllNews, addNewNews, updateNewsItem } =
    useContext(NewsContext);
  const [totalRecorders, setTotalRecorders] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getNewsList();
  }, [pageNumber, rows]);

  function getNewsList() {
    setIsLoading(true);
    getAllNews({ pageNumber, rows }).then((res) => {
      let news = res.data;
      setNews(res.data);
      setIsLoading(false)
      setTotalRecorders(res.totalRecords);
    });
  }

  function onPageChange(event) {
    setFirst(() => event.first);
    setRows(() => event.rows);
    setPageNumber(() => event.page + 1);
  }

  function onAddEditNews(data) {
    if (editedNewsItem) {
      updateNewsItem(data).then((res) => {
        toastSucessMessage("Announcement Data updated sucessfully ");
        getNewsList();
        setVisible(false);

      });
    } else {
      addNewNews(data).then((res) => {
        toastSucessMessage("New Announcement added sucessfully ");
        getNewsList();
        setVisible(false);
      });
    }
  }
  function onDeleteNews(data) {
    confirm(data);
  }
  const confirm = (data) => {
    confirmDialog({
      message: `Are you sure you want to Delete News with title ${data.title} ?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        del(APIS.HomePage.Announcements + "/" + data.announcementId).then((res) => {
          toastSucessMessage(
            `news with title ${data.title}  Removed Successfully`
          );
          getNewsList();
        });
      },
      reject: () => {
        return;
      },
    });
  };

  function onEditNews(data) {
    setEditedNewsItem(data);
    setVisible(true);
  }
  const onAddNews = () => {
    setVisible(true);
    setEditedNewsItem(null);
  };
  return (
    <>
    {
      isLoading ? (
        <Loader />
      ):
      <>
      <Navbar />
      <div className="news container">
        <h2 className="header header-title">Our Recent Announcements </h2>
        <div className="add-btn">
          <button className="btn" onClick={onAddNews}>
            Add
          </button>
        </div>
        <div className="news-content">
          {console.log(news)}
          {news.map((item) => {
            return (
              <NewsItem
                onDelete={onDeleteNews}
                onEdit={onEditNews}
                isFromNewsPage={true}
                data={item}
                key={item.announcementId}
              />
            );
          })}
        </div>
        <div className="card">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecorders}
            rowsPerPageOptions={[6, 9, 12]}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      <Dialog
        header={editedNewsItem ? "Edit Announcement" : "Add New Announcement"}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <AddEditNews data={editedNewsItem} closepopup={onAddEditNews} />
      </Dialog>
      <ConfirmDialog />

      <FooterLinks />
      <Footer />
    </>
    }
    </>
  
  );
};

export default NewsPage;
