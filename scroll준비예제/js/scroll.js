let sections = document.querySelectorAll("main section");
//유사배열로 담는다
//배열의 형태로 변경
let sections_arr = Array.from(sections);

let lis = document.querySelectorAll("ul li");
let lis_arr = Array.from(lis);
let ul = document.querySelector("ul")

let posArr = [];

setPos();
function setPos() {
    posArr = [];
    for (let el of sections) {
        posArr.push(el.offsetTop);
    }
}
//[0, 1000, 2000, 2900]

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
    //우리는 마우스 휠을 한번 내리면 그 내린 만큼의 스크롤을 이동하려는 목적이 아니라
    //휠 한번에 section의 한 index를 이동시킬 이벤트를 만들에정입니다.
    //따라서 마우스휠이라는 이벤트가 가지고 있는 프리이벤트를 정지시켜야 합니다.
    e.preventDefault();

    //1. 버튼으로 on클래스를 추적해서 활성화 되어있는 index를 구별하는 코드
    let activeLi = ul.querySelector("li.on");
    let activeLi_index = lis_arr.indexOf(activeLi);

    //2.  버튼이 아닌, section의 on클래스로 활성화 되어있는 index를 구별하는 코드

    let activeS = document.querySelector("section.on");
    let activeS_index = sections_arr.indexOf(activeS);

    //위에서 추적한 index를 사용해서 마우스 휠을 올렸다면 인덱스에 -1을 해서
    //하단의 moveScroll함수를 호출하면 이동할 수 있습니다.  
    //그렇다면, 마우스 휠을 올렸는지, 내렸는지를 추적해야 합니다

    /* 
    mousewheel 이벤트 객체
    deltaY라는 것만 알면 됩니다
    : mouse 휠의 수직 스크롤 변화량을 나타냅니다
    양수값은 아래로 스크를 한것을 의미 합니다
    음수값은 위로 스크롤 한것을 의미 합니다
    일반적으로 100단위 이동거리를 나타냅니다
    
    
    deltaX, Z   
    */
    if (e.deltaY < 0) { //-100
        console.log("마우스 휠을 올렸습니다")
        if (activeLi_index == 0) return;
        moveScroll(activeLi_index - 1);
    } else { //100
        console.log("마우스 휠을 내렸습니다")
        if (activeLi_index == 3) return;
        moveScroll(activeLi_index + 1);
    }
}, { passive: false })

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