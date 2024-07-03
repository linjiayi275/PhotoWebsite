// rafce
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  // 使用 useState 來創建 input 狀態變數和更新它的函數 setInput，初始值為空字符串。input 用來存放用戶的搜索輸入。
  const [input, setInput] = useState("");

  // 使用 useState 來創建 data 狀態變數和更新它的函數 setData，初始值為 null。data 用來存放從 API 獲取的照片數據。
  let [data, setData] = useState(null);

  // 使用 useState 來創建 page 狀態變數和更新它的函數 setPage，初始值為 1。page 用來存放當前的頁數。
  let [page, setPage] = useState(1);

  // 使用 useState 來創建 currentSearch 狀態變數和更新它的函數 setcurrentSearch，初始值為 空值。currentSearch 用來存放當前的搜索關鍵字。
  let [currentSearch, setcurrentSearch] = useState("");

  // 我的 API 金鑰，用來授權 API 請求。
  const auth = "fxPoeNYHj1xdNk4kFf6sLFSmds5gg15mLDz6Ci0JW9czWKvlyRfti99Z";

  // 存放 API 的預設 URL，用來獲取精選相片的第一頁，預設顯示 15 張相片。
  const initalURL = `https://api.pexels.com/v1/curated?page=1&per_page=15`;

  // 定義一個變數 searchURL，動態生成一個 API 的 URL，用來根據用戶的搜索輸入獲取照片數據。input 是用戶輸入的搜索關鍵字；設定搜尋出來的圖片為第一頁，預設顯示 15 張相片。
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  // fetch data from pexels api：定義一個異步函數 search，用來發送 API 請求並處理響應。
  const search = async (url) => {
    // 因為有輸入條件，所以page也要同步成從輸入條件的第一頁開始
    setPage(1);

    // 使用 fetch 函數向 initalURL 發送 GET 請求。fetch 是一個用來進行網路請求的瀏覽器內建 API
    const dataFetch = await fetch(url, {
      //指定請求方法為 GET
      method: "GET",

      // 設定請求頭
      headers: {
        Accept: "application/json", // 表明接受 JSON 格式的回應
        Authorization: auth, // 在 Authorization 頭中包含認證資訊 auth
      },
    });

    // 將dataFetch 接收到 fetch 返回的 Response 物件解析為 JSON，並將其存入變數 parseData 中，並使用 await 來確保程式碼等待解析完成
    let parseData = await dataFetch.json();

    // 將解析出的 JSON 資料中的 photos 屬性值存入狀態變數 data 中
    setData(parseData.photos);
  };

  // Load more picture：兩種情況，第一種為initalURL的load more，第二種為searchURL的load more
  const morepicture = async () => {
    let newURL;

    // 判斷目前是否有搜尋條件
    if (currentSearch === "") {
      // 若第一次按下more，這裡page+1是因為原page為1，要loading第二頁，就須將其+1，將page變成2
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    } else {
      // 同上方道理，其page也需+1
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }

    // 為何此處的page+1不能馬上改變其page，是因為JS有閉包的特性，沒辦法馬上將改的值提升到上方再傳給下方使用
    setPage(page + 1);

    // 使用 fetch 函數向 newURL 發送 GET 請求。
    const dataFetch = await fetch(newURL, {
      // 指定請求方法為 GET
      method: "GET",

      // 設定請求頭
      headers: {
        Accept: "application/json", // 表明接受 JSON 格式的回應
        Authorization: auth, // 在 Authorization 頭中包含認證資訊 auth
      },
    });

    //將dataFetch 接收到 fetch 返回的 Response 物件解析為 JSON，並將其存入變數 parseData 中，並使用 await 來確保程式碼等待解析完成
    let parseData = await dataFetch.json();

    // 將解析出的 JSON 資料中的 photos 屬性值存入狀態變數 data 中，因為也要顯示前面頁面的值，所以用到原data.concat來連結。
    setData(data.concat(parseData.photos));
  };

  // fetch data when the page loads up - 使用 useEffect：加上此段讓最開始loading就執行search(initalURL)
  useEffect(() => {
    search(initalURL);
  }, []);

  // 使用*useEffect來解決下方 search={() => {...}} 的閉包問題
  useEffect(() => {
    // 判斷currentSearch是否有輸入條件
    if (currentSearch === "") {
      search(initalURL);
    } else {
      search(searchURL);
    }
    // 每當currentSearch被改變，此 useEffect 就會啟動
  }, [currentSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        // 將 () => {setcurrentSearch(input)} 作為 search 屬性傳遞給 Search 組件。
        search={() => {
          setcurrentSearch(input);
          // 這裡使用 setcurrentSearch 來改變 currentSearch 的值，會印出出現空值(原始值)，是因為JS有 closure 閉包的特性，所以使用上面*useEffect來解決此問題
          console.log(currentSearch);
        }}
        setInput={setInput}
      />
      <div className="container pictures d-flex flex-wrap justify-content-center align-items-start">
        <AnimatePresence>
          {/* 如果 data 不為 null 或 undefined，則遍歷 data 陣列，並為每個照片數據 d 渲染一個 Picture 組件，將 d 作為 data 屬性傳遞給 Picture 組件。 */}
          {data &&
            data.map((d) => {
              return (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, rotateY: 90, y: 500 }}
                  animate={{ opacity: 1, rotateY: 0, y: 0 }}
                  // exit={{ opacity: 0, rotateY: 90 }}
                  transition={{
                    opacity: { duration: 1.8 },
                    rotateY: { duration: 1.5 },
                    y: { duration: 0.8 },
                  }}
                  className="picture"
                >
                  <Picture data={d} />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
      <div className="more-picture d-flex justify-content-center align-items-center">
        <button onClick={morepicture}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
