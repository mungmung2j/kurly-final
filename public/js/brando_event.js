(function($, window){ // 1.즉시표현수식 => 달러사인 $ 이  외부 라이브러리와 충돌을 피하는방법
                                  // 달러사인을 내부 변수로 사용하기 때문에 충돌이 없다.
   // 2. 객체 Object : 각 섹션별 중복되는 변수를 피할 수있다.(변수 중복피하기)
   const brandoEvent = {
        init(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.section9();
            this.section10();
            this.section11();
            this.section12();
            this.footer();
        },
        header(){
            

            $(window).scroll(function(){
                if( $(window).scrollTop() > 10 ){
                    $('#header').addClass('on');
                    $('.mobile-sub').addClass('on');
                }
                else{
                    $('#header').removeClass('on');
                    $('.mobile-sub').removeClass('on');
                }
            });


            let t=0;
            $('.mobile-btn').on({
                click(e){
                    e.preventDefault();
                    if(t===0){
                        $('.mobile-sub').stop().show();
                        t=1; // 서브메뉴 보인 상태 임을 나타내는 표식 1
                    }
                    else {
                        $('.mobile-sub').stop().hide();
                        t=0;
                    }
                }
            })

            // 단, .mobile-btn 클릭 서브메뉴 show()인 상태 일때만 보인다.
            // 화면의 너비가 991초과이면 모바일 메뉴 숨김 
            // 화면의 너비가 991이하이면 모바일 메뉴 보임
            $(window).resize(function(){
                if($(window).width()>991){
                    $('.mobile-sub').stop().hide();
                }
                else{ // 화면의 너비가 991이하이면 모바일 메뉴 보임
                    
                    // if 조건문 
                    if(t===1){ // 그리고 모바일버튼 클릭 서브메뉴 보인상태
                        $('.mobile-sub').stop().show();
                    }

                    // 조건부 연산자
                    // t===1 && $('.mobile-sub').stop().show();
                    
                }
            });

        },
        section1(){
            // 슬라이드 우측에서 좌측으로 이동하는 슬라이드 애니메이션
        },
        section2(){
            // 패럴럭스 스크롤이벤트
        },
        section3(){
            // 패럴럭스 스크롤이벤트
        },
        section4(){
            // 패럴럭스 스크롤이벤트
            // 마우스 오버, 아웃 이벤트
        },
        section5(){
            // 패럴럭스 스크롤이벤트
            // 탭메뉴 이벤트
            
            // 버튼 여러개를 한번의 코딩으로 반복 처리 가능한 each() 이치 메서드이용
            $('.event-btn').each(function(idx){               
                
                $(this).on({ // 버튼 0 1 2 3 => this 디스를 사용하면 현재 이 버튼
                    click(event){
                        event.preventDefault();

                        // 클릭한 버튼
                        $('.event-btn').removeClass('on');
                        // $('.event-btn').eq(idx).addClass('on');
                        $(this).addClass('on');

                        // 서브 콘텐츠(테이블)
                        $('.sub').stop().fadeOut(0);
                        $('.sub').eq(idx).stop().fadeIn(600);
                    }
                }); 

            });



           

        },
        section6(){
            // 패럴럭스 스크롤이벤트
        },
        section7(){
            $('.modal').hide();
            // 패럴럭스 스크롤이벤트
            // 모달창 갤러리 이미지 구현
            // 슬라이드 구현
            // 페이드 인 아웃
            // 마우스 이벤트의 전파차단 부모창 자식창 
            // 스크롤바 제어
            // 모달창 띄우기

            let n = 0; // 전역번수
            
            $('.galler-btn').on({
                click(e){
                    e.preventDefault(); // 새로고침 제거
                    $('.modal').stop().fadeIn(600);
                    $('html').addClass('on'); // 스크롤바 숨기기
                    
                    // 현재 클릭한 a링크 자식 이미지 속성 src =>  .attr('src') 이미지 소스를 가져와서
                    // attribute 어트리뷰트 속성을 의미하는 영문 단어 약어로 attr('src', './img/이미지경로와파일')  메서드
                    // 지역변수
                    let imgSrc =  $(this).children().attr('src'); // 자식요소 이미의 src 속성을 보여라
                    // 가져온 이미지 소스 속성에서 이미지 번호를 추출하기
                    // n = 8, n = 9, n = 10, n = 11, n = 12, n = 13, n = 14, n = 15
                    // ./img/event-img8.jpg 시작 15,  끝 16
                    // ./img/event-img9.jpg 시작 15,  끝 16
                    // ./img/event-img13.jpg 시작 15,  끝 17
                    // ./img/event-img15.jpg 시작 15,  끝 17

                    // 번호의 시작 위치를 검색
                    let start = imgSrc.indexOf('-img')+4; // 11+4=15 번호 시작위치

                    // 번호의 끝 위치를 검색
                    let end = imgSrc.indexOf('.jpg');     // 번호가 1자리이면 16   번호가 2자리이면 17 
                    
                    // 시작번호와 끝번호를 이용 번호 추출하기 substr(시작위치, 글자수))
                    n = Number(imgSrc.substr(start, end-start));  // 시작번호, 글자수
                    console.log( n );
                    
                    //n = Number(imgSrc.substring(start, end));  // 번호 문자추출  숫자로 강제 형변환

                    $('.modal img').attr('src', `./img/event-img${n}.jpg`);
                }
            });

            // 이미지 버튼 클릭 이벤트 => 다음이미지로 변경 카운트 숫자가 증가
            $('.img-btn').on({
                click(e){
                    //스탑 프로파게이션: 자식요소 클릭시 부모의 이벤트는 차단한다.
                    e.stopPropagation(); // 자식요소 클릭시 부모요소 이벤트는 제거
                    n++;
                    if(n>15){n=8} // 마지막이미지에서 처음으로 이동
                    $('.modal img').stop().fadeOut(0).attr('src', `./img/event-img${n}.jpg`).fadeIn(300);
                }
            });

            // 모달 이미지 다음 카운트
            $('.modal-next').on({
                click(e){
                    //스탑 프로파게이션                    
                    e.stopPropagation(); // 자식요소 클릭시 부모요소 이벤트는 제거
                    n++;
                    if(n>15){n=8}
                    $('.modal img').stop().fadeOut(0).attr('src', `./img/event-img${n}.jpg`).fadeIn(300); 
                }
            })
            // 모달 이미지 이전 카운트
            $('.modal-prev').on({
                click(e){
                    //스탑 프로파게이션  
                    e.stopPropagation(); // 자식요소 클릭시 부모요소 이벤트는 제거(모달창 클릭 모달창 닫기)
                    n--;
                    if(n<8){n=15}
                    $('.modal img').stop().fadeOut(0).attr('src', `./img/event-img${n}.jpg`).fadeIn(300); 
                }
            })

            // 모달창 클릭 모달창 닫기
            $('.modal').on({
                click(e){
                    e.preventDefault(); // 새로고침 제거
                    $('.modal').stop().fadeOut(600, function(){
                        $('html').removeClass('on'); // 스크롤바 보이기
                    });
                }
            });


            // 버튼클릭 모달창 닫기
            $('.modal-close').on({
                click(e){
                    e.stopPropagation(); // 자식요소 클릭시 부모요소 이벤트는 제거
                    $('.modal').stop().fadeOut(600, function(){
                        $('html').removeClass('on'); // 스크롤바 보이기
                    });
                   
                }
            });


        },
        section8(){
            // 패럴럭스 스크롤이벤트
        },
        section9(){
           
            // 반복문 사용 코딩 리펙토링
            // 변수 설정
            const count = $('#section9 .count');
            const bar = $('#section9 .bar i');
            let barLength = 0;
            let setId   = [0,0,0,0];
            let cnt     = [0,0,0,0];
            let num     = [780,45,320,990];

            count.each(function(i){

                setId[i] = setInterval(function(){
                    cnt[i] += (num[i]/1000);
                    if(cnt[i]>=num[i]){
                        cnt[i] = num[i];
                        clearInterval( setId[i] );
                    }
                    count.eq(i).text( Math.floor(cnt[i]) );

                }, 10);

            });

           let id = setInterval(function(){
                // 막대그래프
                // barLength += 13.125; //10초간 길이 132.125/10 (타임 1000): 1초에 증가한 길이단위  13.125
                // barLength += 1.3125; //10초간 길이 132.125/100 (타임 100): 1초에 증가한 길이단위  1.3125
                   barLength += 0.13125; //10초간 길이 132.125/1000 (타임 10): 1초에 증가한 길이단위  0.13125
                
                if(barLength>=131.25){
                    barLength=131.25;
                    clearInterval(id);
                }
                bar.css({width: barLength});

            }, 10);

           


        },
        section10(){
            // 패럴럭스 스크롤이벤트   
        },
        section11(){
            // 패럴럭스 스크롤이벤트   
            // 폼전송 REST  API AJAX
            // 백앤드 => PHP 서버사이드 스크립어언어 
            // 백앤드 => DATABASE MYSQL 
            // 관리자 페이지 DB 관리

            // 전송(SUBMIT) 버튼 클릭 이벤트
            const submit1Btn = $('#section11 .submit1-btn');
            submit1Btn.on({
                click(e){
                    e.preventDefault(); // 버튼 기능인 폼전송 이벤트 삭제

                    // 유효성검사
                    // 이름 필수
                    // 이메일 필수
                    // 티켓타입 필수
                    // 메시지 필수
                    if($('#name').val()===''){ 
                        alert('이름을 입력하세요');
                        $('#name').focus();                      
                        return false;
                    }
                    else if($('#email').val()===''){
                        alert('이메일을 입력하세요');
                        $('#email').focus();                      
                        return false;
                    }
                    else if($('#ticketType').val()===''){
                        alert('티켓타입을 선택하세요');
                        $('#ticketType').focus();                      
                        return false;
                    }
                    else if($('#message').val()===''){
                        alert('메시지를 입력하세요');
                        $('#message').focus();                      
                        return false;
                    }
                    else {  // 모두 입력된 상태이면

                        $.ajax({
                            url:'form1.php',
                            type:'POST',
                            data: {
                                name: $('#name').val(),
                                email:  $('#email').val(),
                                ticket_type:  $('#ticketType').val(),
                                message:  $('#message').val(),
                            },
                            success(result){ // 전송 성공하면 결과를 보여준다.
                                $('#name').val('');
                                $('#email').val('');
                                $('#ticketType option').eq(0).prop('selected', true);
                                $('#message').val('');

                                // 부드럽게 맨위로 이동(스무스 스크롤룅)
                                $('html, body').stop().animate({scrollTop: 0}, 300);
                                // 인덱스로 이동
                                //$(window).location.href = "index.html";
                            },
                            error(error){
                                console.log("AJAX 실패");
                                console.log(error );
                            }
                        });    
                    }
                }
            });

        },
        section12(){
            // 패럴럭스 스크롤이벤트   
            // 폼전송 REST  API AJAX
            // 백앤드 => PHP 서버사이드 스크립어언어 
            // 백앤드 => DATABASE MYSQL 
            // 관리자 페이지 DB 관리
            const submit2Btn = $('#section12 .submit2-btn');
            const name = $('#name2');
            const email = $('#email2');
            const message = $('#message2');

            submit2Btn.on({
                click(e){
                    e.preventDefault();

                    if(name.val()===''){
                        alert('이름을 입력!');;
                        name.focus();
                        return false;
                    }
                    else if(email.val()===''){
                        alert('이메일을 입력!');
                        email.focus();
                        return false;
                    }
                    else if(message.val()===''){
                        alert('메시지를 입력!');
                        message.focus();
                        return false;
                    }
                    else {

                        $.ajax({
                            url:'form2.php',
                            type:'POST',
                            data: {
                                name: name.val(),
                                email: email.val(),
                                message: message.val(),
                            },
                            success(res){
                                console.log("AJAX 성공!");
                                name.text('');
                                email.text('');
                                message.text('');
                                window.location.href = "index.html";
                            },
                            error(err){
                                console.log("AJAX 실패" + err );
                            }
                        });

                    }

                }
            });



        },
        footer(){
            // SNS ICONS
            // © 2023 BRANDO IS PROUDLY POWERED BY THEMEZAA.
        }
   }
   brandoEvent.init();  // 대표 메서드 호출 실행

})(jQuery, window);