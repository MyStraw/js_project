document.addEventListener('DOMContentLoaded', () => {
    const boxs = document.querySelectorAll('.box');
    const bt1 = document.querySelector('#bt1');

    //초기배열 : 1이 폭탄 위치(랜덤수로 해도 된다. 배열말고)
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 1];
    let flag = true;//true가 아니면 버튼 안눌러지게.클릭확인
    let cnt = 0; // 8개눌릴때까지 폭탄 안나오면 마지막은 안눌러도 폭탄. 하트개수
    let selarr = []; //눌러진순서를 다시 배열에 넣어.

    //폭탄 섞기 버튼
    bt1.addEventListener('click', () => {
        if (flag) {
            arr.sort(() => Math.random() - 0.5); //sort를 이용해서 셔플을 해주더라. 이건 인터넷등에서 찾아쓰기
            console.log(arr);
            flag = false;
            cnt = 0;
            selarr = []; //배열도 초기화해줘야 되고, cnt도 초기화 해줘야 계속 안올라가.
            document.querySelector('h2').innerHTML = '';
            for (let box of boxs) {
                box.innerHTML = box.getAttribute('id').replace('box', ''); //리셋시키는거.
            }
            
        }

    });

    //div 박스 제어
    for (let box of boxs) { //박스 다 집어왔으니 각 클릭이벤트 달아주믄 되네
        //박스 번호 넣기
        //box.innerHTML = box.getAttribute('id').slice(-1); //숫자를 js로 적을수있다. 맨끝에 있는 글씨만 갖고오고싶다. replace도 가능.
        box.innerHTML = box.getAttribute('id').replace('box', ''); // 10 넘어가는거면 리플레이스가 더 좋겠지?

        //박스 클릭이벤트 처리
        box.addEventListener('click', () => {
            //let n = parseInt(box.getAttribute('id').replace('box', ''));
            let n = parseInt(box.textContent);
            console.log(box.textContent);

            //기존에 하트나 폭탄이 들어있는 경우
            if (isNaN(n)) return; //하트 차있는데 하트 또 누르면 폭탄으로 바뀌는걸 없앰. isNaN은 숫자인지 아닌지 판단하는것. Not a Number. n이 숫자라면 돌아감.

            //폭탄이 눌러지지 않은 경우
            if (!flag) { //플래그 = false 일때만.
                //선택 항목 추가
                selarr.push(n);
                console.log('n=', n, 'selarr=', selarr);
                cnt++;
                console.log("cnt=", cnt);
                


                //폭탄 하트 구분
                if (arr[n - 1] == 0) {
                    //하트
                    box.innerHTML = '<img src="./img/hart-nu.png">';
                    if(cnt == 8){
                        flag = true; //폭탄 찾으면 클릭 눌러지면 안된다.
                    document.querySelector('h2').innerHTML = '성공!!!!';

                    // 1)차집합 이용
                    // let lastArr = [1,2,3,4,5,6,7,8,9].filter((item)=>!selarr.includes(item)); // selarr 배열에 포함되지 않은걸 필터.
                    // console.log(lastArr[0]) //안눌러진 마지막 숫자. 1개 찾아냈다. 배열에1개 남았으니, 인덱스 0번째가 그 숫자. 지금 if (cnt == 8)인 상태.
                    // boxs[lastArr[0]-1].innerHTML = '<img src="./img/hart-nu.png">';//안눌러진 마지막. 이게 무슨말인지??  // 혹은 arr에서 폭탄숫자 어딨는지 찾아내면 되겠네

                    // 2)find 이용
                    let lastn = arr.findIndex((item)=>item == 1);
                    console.log('find=', lastn);
                    boxs[lastn].innerHTML = '<img src="./img/hart-nu.png">';
                    }

                }
                else {  //그냥 여기서 else if(arr[n-1] == 1)하믄 하트 눌러도 폭탄 안바뀌게
                    //폭탄
                    box.innerHTML = '<img src="./img/boom-nu.png">';
                    flag = true; //폭탄 찾으면 클릭 눌러지면 안된다.
                    document.querySelector('h2').innerHTML = '실패';
                }
            }

        });

    }
});