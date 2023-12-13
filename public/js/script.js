// import dotenv from "../dotenv";


// /* CONFIGURATION */
// dotenv.config();
const slider = document.querySelector('.list-cate');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const rightContents = document.querySelector('.right_contents');
const rightStatusli = document.querySelectorAll('.right_status ul li');
const rightStatus = document.querySelector('.right_status');
const rightFilter = document.querySelectorAll('.right_filter ul li');
const leftBar = document.querySelector('.left_bar');
const filter = document.querySelector('.title_filter img');
var loading = false;




/* Slider */
let currentIndex = 0;
function showSlide(index) {
  slider.style.transform = `translateX(${-index * 100}%)`;
}
function nextSlide() {
  currentIndex = (currentIndex + 1) % slider.children.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slider.children.length) % slider.children.length;
  showSlide(currentIndex);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);




// Xử lý get data
function fetchData() {
  return new Promise((resolve, reject) => {
    fetch('https://pub2-accesstrade.onrender.com/database/campaign')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Render data
function handleActive(active, status) {

  if (active !== "foryou") {
    document.querySelector(".right_status ul").classList.add("dn");
    document.querySelector(".right_status .right_select").classList.remove("dn");
  } else {
    document.querySelector(".right_status ul").classList.remove("dn");
    document.querySelector(".right_status .right_select").classList.add("dn");
  }

  document.querySelectorAll('.right_status ul li').forEach(item => {
    item.addEventListener('click', (e) => {
      document.getElementsByClassName("activeBG")[0].classList.remove("activeBG");
      item.classList.add("activeBG");
      return handleActive(active, item.getAttribute('id'))
    })
  });

  fetchData()
    .then(data => {
      loading == false ? rightContents.innerHTML = `<div class="loading">
      <img src="https://superstorefinder.net/support/wp-content/uploads/2018/01/orange_circles.gif"/>
      </div>` : "";
      setTimeout(() => {
        // Tìm kiếm id trạng thái phù hợp
        let dataStatus = data.map((item, index) => {
          const dataFit = item.status.filter(item => {
            return status === item.id;
          });
          return dataFit;
        });
        dataStatus = dataStatus.filter((item) => item.length > 0)[0];

        // Render Giao dien
        rightContents.innerHTML = dataStatus[0].data.length > 0 ? (dataStatus[0].data || []).map((item, index) => {
          // function start() {
          //   return <i class="fa-solid fa-star"></i>
          // }

          const title = item.name.length >= 25 ? item.name.substring(0, 25) + "..." : item.name
          return `<div class="content_item">
            <img width="100%" src="${item.img}" alt="vpbank" />
            <h4>${title}</h4>
            <div class="star_item">
            <span class="star">
            <img width="14.33px" height="13.67px" src="/img/vector_star.png" alt="vector_star" />
            <img width="14.33px" height="13.67px" src="/img/vector_star.png" alt="vector_star" />
            <img width="14.33px" height="13.67px" src="/img/vector_star.png" alt="vector_star" />
            <img width="14.33px" height="13.67px" src="/img/vector_star.png" alt="vector_star" />
            <img width="14.33px" height="13.67px" src="/img/vector_star_gray.png" alt="vector_star" />
            </span>
            <span>(28)</span>
            </div>
            <div class="rose_item">
              <span>Hoa hồng: <b>${item.rose}</b> </span>
            </div>
            <div class="par_item">
              <div class="">
                <span>EPC:</span>
                <span>${item.epc ? item.epc : "_ _"}</span>
              </div>
              <div>
                <span>CVR:</span>
                <span>${item.cvr ? item.cvr : "_ _%"}</span>
              </div>
            </div>
            <div class="right_button">
                <button><i class="fa-solid fa-link"></i>Tạo link</button>
            </div>
          </div>`
        }).join('') : `<div class="empty">
        <i class="fas fa-search"></i>
        <span>Không có dữ liệu hiển thị</span>
        </div>`;
      }, 1500);
    })
    .catch(error => {
      console.error('Lỗi khi lấy dữ liệu:', error);
    });

}

// Active default
handleActive() == undefined ? handleActive("foryou", "run") : ""

// Active next
rightFilter.forEach(item => {
  item.addEventListener('click', (e) => {
    document.getElementsByClassName("active")[0].classList.remove("active");
    item.classList.add("active");
    return handleActive(item.getAttribute('id'))
  })
});

// Hanle click 
leftBar.addEventListener('click', () => {
  if (document.querySelector(".header_bottom").classList.contains('d-block')) {
    document.querySelector(".header_bottom").classList.remove("d-block");
  } else {
    document.querySelector('.header_bottom').classList.add("d-block");
  }
})


filter.addEventListener('click', () => {
  if (document.querySelector(".left_filter-option").classList.contains('d-block')) {
    document.querySelector(".left_filter-option").classList.remove("d-block");
  } else {
    document.querySelector('.left_filter-option').classList.add("d-block");
  }
})


// Handle Sắp xếp
document.querySelectorAll('.right_status .right_select>div')[0].addEventListener('click', (e) => {
  if (!document.querySelector('.right_status .right_select .option').classList.contains('dn')) {
    document.querySelector('.right_status .right_select .option').classList.add('dn');
  } else {
    document.querySelectorAll('.right_status .right_select .option div').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelector('.right_status .right_select>div').innerHTML = `
            <div>
              ${item.textContent}
              <i class="fas fa-sort-down"></i>
            </div>
        `
      })
    })
    document.querySelector('.right_status .right_select .option').classList.remove('dn')
  }
})












