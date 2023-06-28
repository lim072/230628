let sections = document.querySelectorAll("main section");
//유사배열로 담는다
//배열의 형태로 변경
let sections_arr = Array.from(sections);

let lis = document.querySelectorAll("ul li");
let lis_arr = Array.from(lis);
let ul = document.querySelector("ul");

// let posArr = [];
let lastSection = sections[sections.length - 1];
let lastHeight = lastSection.offsetTop + lastSection.offsetHeight;

let posArr = null;
setPos();
function setPos() {
    posArr = [];
    for (let el of sections) {
        posArr.push(el.offsetTop);
    }
    posArr.push(lastHeight);
}
//[0, 1000, 2000, 2900 , 4600]

window.addEventListener("scroll", () => {
    let scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((el, index) => {
        if (scroll >= posArr[index]) {
            for (let el of lis) {
                el.classList.remove("on")
            }
            lis[index].classList.add("on")

            for (let el of sections) {
                el.classList.remove("on")
            }
            sections[index].classList.add("on")
        }
    })
})

window.addEventListener("mousewheel", (e) => {
    let delta = e.deltaY;
    let parent_item = lis_arr[0].parentNode;
    let active_lis = parent_item.querySelector(".on");
    let active_lis_index = lis_arr.indexOf(active_lis);
    let target
    if (delta < 0) target = posArr[active_lis_index - 1]
    if (delta > 0) target = posArr[active_lis_index + 1]

    scrollAni(target, 300)
},)


function scrollAni(target, duration) {
    let scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    let startTime = performance.now();
    //초기 페이지 로딩부터 함수가 실행되는 시간을 의미합니다

    function scrollStep(timestamp) {
        let currentTime = timestamp - startTime;
        let progress = Math.min(currentTime / duration, 1);
        //progress 단위 Math.min 둘중에 가장작은값을 반환해줌
        let scrollPos = scroll + (target - scroll) * progress;

        window.scrollTo(0, scrollPos);
        if (currentTime < duration) {
            requestAnimationFrame(scrollStep);
        }
    }
    requestAnimationFrame(scrollStep);
}

/* 
 이벤트 리스너의 옵션 객체에는 몇가지 속성이 있습니다.
capture : 이벤트 버블링의 반대 , 이벤트 캡처의 여부를 나타내는 boolean속성입니다.
기본값은 false(이벤트 캡쳐를 막아줌), true일때는 이벤트 캡쳐를 허용하는 속성

once : 이벤트 핸들러를 한번만 실행할지의 여부를 나타내는 boolean속성입니다
기본값은 false 이고 true면 한번만 일어나게 됩니다

passive : false
이벤트 핸들러가 기본동작을 방지하는지의 여부를 나타내는 boolean값의 속성입니다
만약 true면  e.preventDefault();을 호출해도 기본동작이 방지되지 않습니다.

el.addEventListener("click", (콜백함수)=>{} , {옵션객체})
*/




lis.forEach((el, index) => {
    el.addEventListener("click", () => {
        //해당 인덱스로 이동을 시키는 코드
        moveScroll(index)
    })
})

function moveScroll(index) {
    window.scrollTo({ top: posArr[index], behavior: "smooth" });
}