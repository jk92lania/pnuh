$(document).ready(function () {
    // 클론코드 관련 안내
    let modal_close = $('.modal-close');
    let modal = $('.modal');
    modal_close.click(function(){
        modal.stop().fadeOut(200);
    });

    // 하루동안 열지 않기
    // 배너
    let quick_banner = $('.quick-banner');
    let quick_day_close = $('.quick-day-close');
    let quick_day_bt = $('.quick-day-bt');
    let quick_day_name = 'today'; // 쿠키의 이름 
    quick_day_close.click(function () {
        quick_banner.fadeOut(300);
        let temp = quick_day_bt.hasClass('quick-day-bt-active');
        if(temp == true){
            setToday(quick_day_name, 1);
        } 
    });
    
    quick_day_bt.click(function(){
        let temp = $(this).hasClass('quick-day-bt-active');
        if(temp != true){
            $(this).addClass('quick-day-bt-active');
        } else {
            $(this).removeClass('quick-day-bt-active');

        }
    });

    todayOpen('today');
    // 창열기  
    function todayOpen(winName) {
        let blnCookie = getCookie(winName);
        console.log(blnCookie);
        if (!blnCookie) {
            // 하루동안 보이기
            quick_banner.show();
        } else {
            // 숨기기
            quick_banner.hide();
        }
    }
    // 쿠키셋팅
    function setToday(winName, expiredays) {
        setCookie(winName, "expire", expiredays);
    }
    // 쿠키 가져오기  
    function getCookie(name) {
        var nameOfCookie = name + "=";
        var x = 0;
        while (x <= document.cookie.length) {
            var y = (x + nameOfCookie.length);
            if (document.cookie.substring(x, y) == nameOfCookie) {
                if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                    endOfCookie = document.cookie.length;
                return unescape(document.cookie.substring(y, endOfCookie));
            }
            x = document.cookie.indexOf(" ", x) + 1;
            if (x == 0)
                break;
        }
        return "";
    }

    // 24시간 기준 쿠키 설정하기  
    // 만료 후 클릭한 시간까지 쿠키 설정  
    function setCookie(name, value, expiredays) {
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }


    // 빠른서비스
    let quick_link = $('.quick-link');
    let side_bar = $('.side-bar');
    let fix_x = side_bar.outerWidth(true) + quick_link.outerWidth(true);
    // console.log(fix_x);
    let side_bar_close = $('.side-bar-close');
    // 1안
    // quick_link.click(function () {
    //     side_bar.animate({
    //         right: 0
    //     }, 300);
    // });
    // side_bar_close.click(function () {
    //     side_bar.animate({
    //         right: -fix_x
    //     }, 300);
    // });
    // 2안
    quick_link.click(function () {
        side_bar.addClass('side-bar-active');
    });
    side_bar_close.click(function () {
        side_bar.removeClass('side-bar-active');
    });

    // language 기능
    let language_wrap = $('.language-wrap');
    let language = $('#language');
    let language_list = $('.language-list');
    language.click(function (event) {
        event.preventDefault();
        language_list.toggleClass('language-list-active');
    });

    language_wrap.mouseleave(function () {
        language_list.removeClass('language-list-active');
    });

    // 사이트 검색 기능
    let site_search = $('#site-search');
    let site_search_bt = $('.site-search-bt');
    let site_search_div = $('.site-search-div');
    let site_search_txt = $('.site-search-txt');
    site_search.click(function (event) {
        event.preventDefault();
        site_search_bt.show();
        site_search_div.addClass('site-search-div-active');
        setTimeout(function () {
            site_search_txt.focus();
        }, 200);
        language_list.removeClass('language-list-active');
    });
    site_search_bt.click(function (event) {
        event.preventDefault();
        site_search_div.removeClass('site-search-div-active');
        setTimeout(function () {
            site_search_bt.hide();
            site_search_txt.val('');
        }, 200);
    });


    // 주메뉴 고정 기능
    let header = $('.header');
    let main = $('.main');
    let quick_menu = $('.quick-menu');
    let fix_y = quick_menu.height();
    // console.log(fix_y);
    $(window).scroll(function () {
        let pos = $(window).scrollTop();
        if (pos >= fix_y) {
            header.addClass('header-fixed');
            main.addClass('mt-100');
        } else {
            header.removeClass('header-fixed');
            main.removeClass('mt-100');
        }
    });

    // 위로 가기
    let gotop = $('.gotop');
    gotop.click(function () {
        $('html').animate({
            scrollTop: 0
        }, 500);
    });

    // 주메뉴 기능
    let gnb_a = $('.gnb li a');
    let submenu_div = $('.submenu-div');
    let submenu_height = [195, 424, 226, 292, 457, 259];
    let mainmenu_height = 100;
    let submenu_title = $('.submenu-title');
    let submenu_box = $('.submenu-box');
    let gnb_li = $('.gnb>li'); // 주메뉴 포커스 유지
    let submenu_dim = $('.submenu-dim');

    $.each(gnb_a, function (index, item) {
        $(this).mouseenter(function () {
            submenu_div.css('height', submenu_height[index] + mainmenu_height);

            submenu_title.hide();
            submenu_title.eq(index).show();

            submenu_box.hide();
            submenu_box.eq(index).show();

            // 포커스 유지
            gnb_li.removeClass('gnb-li-focus');
            gnb_li.eq(index).addClass('gnb-li-focus');

            submenu_dim.stop().fadeIn(200);
        });
    });

    let menu_timer;
    let menu_timer_delay = 100;
    let nav = $('.nav');
    nav.mouseleave(function () {
        menu_timer = setTimeout(menu_up, menu_timer_delay);
    });
    nav.mouseenter(function () {
        clearTimeout(menu_timer);
    });

    function menu_up() {
        clearTimeout(menu_timer);
        submenu_div.css('height', mainmenu_height);

        // 포커스 유지 해제
        gnb_li.removeClass('gnb-li-focus');
        submenu_dim.stop().fadeOut(100);
    }

    let submenu_wrap = $('.submenu-wrap .container');
    submenu_wrap.mouseleave(function () {
        clearTimeout(menu_timer);
        menu_timer = setTimeout(menu_up, menu_timer_delay);

    });
    submenu_wrap.mouseenter(function () {
        clearTimeout(menu_timer);
    });



    // PNUH 네트워크
    let pnuh_bt = $('#pnuh-bt');
    let pnuh_popup = $('.pnuh-popup');
    let pnuh_wrap = $('.pnuh-wrap');
    let pnuh_close = $('.pnuh-close');
    // 모션관련
    let show_speed = 300;
    let hide_speed = 100;
    pnuh_bt.click(function (event) {
        event.preventDefault();
        pnuh_popup.fadeIn(show_speed);
    });
    pnuh_close.click(function (event) {
        pnuh_popup.fadeOut(hide_speed);
    });
    pnuh_wrap.click(function (event) {
        event.stopPropagation();

    });
    pnuh_popup.click(function (event) {
        pnuh_popup.fadeOut(hide_speed);
    });


    // 건강정보 관련
    let health_data = [
        '#@@ h_sm_1.png@@ 건강@@ 병원보@@2022년 생명사랑 겨울호',
        '#@@ h_sm_2.png@@ 건강@@ 블로그-의료정보@@ 혹시 나도 우울증일까? 우울증 극복하기',
        '#@@ h_sm_3.png@@ 건강@@ Youtube@@ 이동형 병원 진료 시스템? 그게 뭐예요?',
        '#@@ h_sm_4.png@@ 건강@@ Youtube@@ 제7회 하모니카 콘서트',
        '#@@ h_sm_5.png@@ 건강@@ Youtube@@ 열명 중 한 명? 건선관절염의 증상과 치료',
        '#@@ h_sm_6.png@@ 건강@@ instagram@@ #로봇수술센터 #부울경최초 #다빈치로봇수술2000례',
        '#@@ h_sm_7.png@@ 건강@@ Youtube@@ 35세 이상 고령임신 어떻게 준비 하나요?',
        '#@@ h_sm_8.png@@ 건강@@ 블로그-의료정보@@ 아무도 알려주지 않은 폐암의 진실',
        '#@@ h_sm_9.png@@ 건강@@ 블로그-의료정보@@ 유행성 이하선염, 아이들을 노리는 봄철 감염병',
        '#@@ h_sm_10.png@@ 건강@@ Youtube@@ 올바른 코 세척 방법',
        '#@@ h_sm_11.png@@ 건강@@ Youtube@@ [항암치료 식생활 2편]어떻게 먹어야 하나요?',
        '#@@ h_sm_12.png@@ 건강@@ 블로그-의료정보@@ 파킨슨병은 무엇인가?! 증상부터 치료까지',
        '#@@ h_sm_13.png@@ 건강@@ Youtube@@ Ocean View 맛집! PNUH 인재개발원',
        '#@@ h_sm_14.png@@ 건강@@ Youtube@@ [포스트코로나 미래 발전 전략_3강] 언택트 테크놀로지',
        '#@@ h_sm_15.png@@ 건강@@ Youtube@@ 키미x보미와 함께하는 코로나 극복 응원',
        '#@@ h_sm_16.png@@ 건강@@ Youtube@@ [항암치료 식생활 1편]어떻게 먹어야 하나요?'
    ];
    let health_list = $('.health-list');
    let health_total = health_data.length;
    let health_html = '';
    // 한 목록당 출력
    let page_per = 8;
    // 전체 페이지 카운팅
    let page_total = Math.ceil(health_total / page_per);
    // 현재 페이지 수 카운팅
    let page_now = 1;
    // 페이지에서 보여줄 범위
    let page_show_start = 0;
    // 실제로 보여줄 내용
    let page_html = '';
    // 페이지당 보여줄 범위 결정 함수
    function pageScope() {

        let start = page_show_start;
        let end = page_show_start + page_per;
        if (end > health_total) {
            return;
        }
        for (let i = start; i < end; i++) {
            page_html += parseData(health_data[i]);
            page_show_start += 1;
        }
        health_list.html(page_html);
    }
    // html을 생성
    function parseData(_data) {
        // 분리, 배열로 배치
        let temp_arr = _data.split('@@');
        // console.log(temp_arr);
        // 공백 제거
        let link = temp_arr[0].trim();
        let img = 'images/' + temp_arr[1].trim();
        let alt = temp_arr[2].trim();
        let cate = temp_arr[3].trim();
        let title = temp_arr[4].trim();
        // html 사용할 글자 생성
        let temp_html = `
        <div class="health-box" data-aos="fade-up" data-aos-duration="800">
            <a href="${link}" alt="${alt}">
                <span class="health-box-img">
                <img src="${img}">
                </span>
                <span class="health-box-cate">${cate}</span>
                <span class="health-box-tit">${title}</span>
            </a>
        </div>
        ;`
        // let temp_html = '<div class="health-box" data-aos="fade-up" data-aos-duration="800">';
        // // a태그 생성
        // temp_html += '<a href=';
        // temp_html += link;
        // temp_html += ' ';
        // temp_html += 'alt=';
        // temp_html += alt;
        // temp_html += '>';
        // // img 생성
        // temp_html += '<span class="health-box-img">';
        // temp_html += '<img src=';
        // temp_html += img;
        // temp_html += '>';
        // temp_html += '</span>';
        // // 카테고리 생성
        // temp_html += '<span class="health-box-cate">';
        // temp_html += cate;
        // temp_html += '</span>';
        // // 타이틀 생성
        // temp_html += '<span class="health-box-tit">';
        // temp_html += title;
        // temp_html += '</span>';

        // temp_html += '</a>';
        // temp_html += '</div>'
        return temp_html;
    }
    pageScope();
    // 더보기 버튼 기능
    let health_more = $('#health-more');
    health_more.click(function (event) {
        event.preventDefault();
        pageScope();
    });

    // 목록 초기화 기능
    // $('.health h2').click(function(){
    //     pageReset();
    // });
    // function pageReset() {
    //     page_show_start = 0;
    //     page_html = '';
    //     pageScope();
    // }


});

window.onload = function () {
    AOS.init();


    // quick-slide
    let sw_quick = new Swiper('.sw-quick', {
        loop: true,
        navigation: {
            prevEl: '.sw-quick-prev',
            nextEl: '.sw-quick-next',
        },
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        speed: 500,
        pagination: {
            el: '.sw-quick-pg',
            clickable: true,
        },
    });
    let sw_quick_pause = $('.sw-quick-pause');
    sw_quick_pause.click(function () {
        let temp = $(this).hasClass('sw-quick-pause-active');
        if (temp != true) {
            $(this).addClass('sw-quick-pause-active');
            sw_quick.autoplay.stop();
        } else {
            $(this).removeClass('sw-quick-pause-active');
            sw_quick.autoplay.start();

        }
    });

    // visual slide
    let sw_visual = new Swiper('.sw-visual', {
        loop: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        speed: 1000,
        navigation: {
            prevEl: '.sw-visual-prev',
            nextEl: '.sw-visual-next',
        },
        pagination: {
            el: '.sw-visual-pg',
            clickable: true,
        },
    });
    let sw_visual_pause = $('.sw-visual-pause');
    sw_visual_pause.click(function () {
        temp = $(this).hasClass('sw-visual-pause-acutive');
        if (temp != true) {
            $(this).addClass('sw-visual-pause-acutive');
            sw_visual.autoplay.stop();
        } else {
            $(this).removeClass('sw-visual-pause-acutive');
            sw_visual.autoplay.start();
        }
    });

    // notice slide
    let sw_notice = new Swiper('.sw-notice', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.sw-notice-pg',
            clickable: true,
        },
    });
    let sw_notice_pause = $('.sw-notice-pause');
    sw_notice_pause.click(function () {
        let temp = $(this).hasClass('sw-notice-pause-active');
        if (temp != true) {
            $(this).addClass('sw-notice-pause-active');
            sw_notice.autoplay.stop();
        } else {
            $(this).removeClass('sw-notice-pause-active');
            sw_notice.autoplay.start();

        }
    });
};