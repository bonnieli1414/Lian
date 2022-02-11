//畫面
//資料-Data
//方法-function
//元件結構
// 1.資料
// 2.方法、觸發器
// 3.生命週期

// 元件資料
const component={
  products: [
    {
      category: "甜甜圈",
      content: "尺寸：14x14cm",
      description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
      id: "-L9tH8jxVb2Ka_DYPwng",
      is_enabled: 1,
      origin_price: 150,
      price: 99,
      title: "草莓莓果夾心圈",
      unit: "個",
      num: 10,
      imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      imagesUrl: [
        "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
        "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
      ]
    },
    {
      category: "蛋糕",
      content: "尺寸：6寸",
      description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
      id: "-McJ-VvcwfN1_Ye_NtVA",
      is_enabled: 16,
      origin_price: 1000,
      price: 900,
      title: "蜂蜜檸檬蛋糕",
      unit: "個",
      num: 1,
      imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
      imagesUrl: [
        "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
      ]
    },
    {
      category: "蛋糕",
      content: "尺寸：6寸",
      description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
      id: "-McJ-VyqaFlLzUMmpPpm",
      is_enabled: 1,
      origin_price: 700,
      price: 600,
      title: "暗黑千層",
      unit: "個",
      num: 15,
      imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      imagesUrl: [
        "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
      ]
    }
  ],
  
  // 第一層畫面
  render() {
    const app=document.querySelector('#app .table tbody');
    // console.log(app);
    const productNum=document.querySelector('#app .productNum');
    // console.log(productNum);
    let productData='';
    this.products.forEach((item,index) => {
      productData=productData+`<tbody>
      <tr>
        <td width="150">${item.title}
        </td>
        <td width="120">${item.origin_price}
        </td>
        <td width="120">${item.price}
        </td>
        <td width="150">${item.is_enabled?'<span class="text-success">啟用</span>':
        '<span>未啟用</span>'}    
        </td>
        <td width="120" class="detailViewBtn">
        <button type="button" class="btn btn-primary" data-id="${index}">查看細節</button>
        </td>
      </tr>
    </tbody>`;     
    });
    app.innerHTML=productData;
    // console.log(productsData.length);
    let ProductNum=`<p class="productNum">目前有 <span>${this.products.length}</span> 項產品</p>`;
    productNum.innerHTML=ProductNum;


    //觸發監聽
    const detailViewBtns=document.querySelectorAll('#app .detailViewBtn');
    // console.log(detailViewBtns);
    // 使用箭頭函示讓程式吃外面作用域，也就是元件
    const templateDetail=document.querySelector('.text-secondary');
    // console.log(templateDetail);
    detailViewBtns.forEach((item)=>{
      item.addEventListener('click',(e)=>{
        // console.log(e.target.dataset.id);
        // console.log(this);        
        // console.log(this.products[e.target.dataset.id]);
        let renderDetailData = this.products[e.target.dataset.id];        
        console.log(renderDetailData); 
        renderDetailData.imagesUrl.forEach((item,index,array)=>{
          console.log(index);

          // 由於觸發後的圖片顯示數量不一定，所以這裡先將圖片先提取出來跑迴圈並存在變數images裡，之後再跑外層迴圈
          let images='';
          array.forEach((item)=>{
            console.log(item);
            images+=`<img src="${item}" class="images m-2">`
          })

        //第2層畫面
        let getDetailData=`<div><div class="card mb-3"><img src="${renderDetailData.imageUrl}" class="card-img-top primary-image" alt="主圖"><div class="card-body"><h5 class="card-title">${renderDetailData.title}<span class="badge bg-primary ms-2">${renderDetailData.category}</span></h5><p class="card-text">商品描述：${renderDetailData.description}</p><p class="card-text">商品內容：${renderDetailData.content}</p><div class="d-flex"><p class="card-text me-2">${renderDetailData.price}</p><p class="card-text text-secondary"><del>${renderDetailData.origin_price}</del></p> ${renderDetailData.unit} / 元 </div></div></div><span>
        ${images}
        </span>
        </div>`;        
        templateDetail.innerHTML=getDetailData;
        })
      });      
    })
  },
  // 生命週期
  init(){
    this.render()
  }
}

component.init();