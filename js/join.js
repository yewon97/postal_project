function form_check() {
  let uname = document.getElementById('u_name');
  let uid = document.getElementById('u_id');
  let pwd = document.getElementById('pwd');
  let repwd = document.getElementById('repwd');
  let birth = document.getElementById('birth');
  let email_id = document.getElementById('email_id');
  let email_dns = document.getElementById('email_dns');
  let postalCode = document.getElementById('postalCode');
  let addr1 = document.getElementById('addr1');
  let addr2 = document.getElementById('addr2');

  if (uid.value == '') {
    var err_txt = document.querySelector('.err_id');
    err_txt.textContent = '아이디를 입력하세요.';
    uid.focus();
    return false;
  }
  if (uid.value) {
    let regid = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (!regid.test(uid.value)) {
      var err_txt = document.querySelector('.err_id');
      err_txt.textContent = '영어+숫자 조합, 6~20자만 가능합니다.';
      uid.focus();
      return false;
    }
  }

  if (pwd.value == '') {
    var err_txt = document.querySelector('.err_pwd');
    err_txt.textContent = '비밀번호를 입력해주세요.';
    pwd.focus();
    return false;
  }
  if (pwd.value) {
    let regpwd = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (!regpwd.test(pwd.value)) {
      var err_txt = document.querySelector('.err_pwd');
      err_txt.textContent = '비밀번호는 영문, 숫자, 특수문자가 모두 포함된 8~16자여야 합니다.';
      pwd.focus();
      return false;
    }
  }
  if (pwd.value != repwd.value) {
    var err_txt = document.querySelector('.err_repwd');
    err_txt.textContent = '비밀번호가 일치하지 않습니다.';
    repwd.focus();
    return false;
  }

  if (uname.value == '') {
    var err_txt = document.querySelector('.err_name');
    err_txt.textContent = '이름을 입력해주세요.';
    uname.focus();
    return false;
  }
  if (uname.value) {
    let regname = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]*$/;
    if (!regname.test(uname.value)) {
      var err_txt = document.querySelector('.err_name');
      err_txt.textContent = '한글 또는 영문만 가능합니다.';
      uname.focus();
      return false;
    }
  }

  if (birth.value == '') {
    let err_txt = document.querySelector('.err_birth');
    err_txt.textContent = '생일을 입력해주세요.';
    birth.focus();
    return false;
  }
  if (birth.value) {
    var regbirth = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!regbirth.test(birth.value)) {
      var err_txt = document.querySelector('.err_birth');
      err_txt.textContent = '생일은 숫자로 8자리만 적어주세요.';
      birth.focus();
      return false;
    }
  }
  var solar_cal = document.querySelector('#solar_cal');
  var lunar_cal = document.querySelector('#lunar_cal');
  if (solar_cal.checked !== true && lunar_cal.checked !== true) {
    var err_txt = document.querySelector('.err_birth');
    err_txt.textContent = '양/음력을 선택해주세요';
    return false;
  }

  if (!email_id.value || !email_dns.value) {
    var err_txt = document.querySelector('.err_email');
    err_txt.textContent = '이메일을 입력해주세요.';
    email_id.focus();
    return false;
  }

  if(!addr2.value || !postalCode.value || !addr1.value) {
    let err_txt = document.querySelector('.err_address');
    err_txt.textContent = '주소를 전부 입력해주세요.';
    addr2.focus();
    return false;
  }

  if (mobile.value == '') {
    var err_txt = document.querySelector('.err_mobile');
    err_txt.textContent = '전화번호를 입력해주세요.';
    mobile.focus();
    return false;
  }

  if (mobile.value) {
    var regmobile = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!regmobile.test(mobile.value)) {
      var err_txt = document.querySelector('.err_mobile');
      err_txt.textContent = '전화번호는 숫자만 입력할 수 있습니다.';
      mobile.focus();
      return false;
    }
  }
} // 유효성 검사 끝 괄호

/* 아이디 중복 검사 */
function check_id() {
  window.open('check_id.html', '', 'width=430, height=330, left=0, top=0');
}
/* 아이디 input 눌러도 중복 검사 창 띄워줌 */
(function clickIdInput() {
  let uid = document.getElementById('u_id');
  uid.addEventListener('click', () => {
    check_id();
  });
})();

/* 주소 input 눌러도 주소검색 실행 */
(function clickAddrInput() {
  let postalCode = document.querySelector('#postalCode');
  let addr1 = document.querySelector('.addr1');
  postalCode.addEventListener('click', () => {
    addr_search();
  });
  addr1.addEventListener('click', () => {
    addr_search();
  });
})();

/* 주소 검색하기 - 카카오 주소 api */
function addr_search() {
  let addr2 = document.querySelector('.addr2');
  new daum.Postcode({
    oncomplete: function (data) {
      let postalCode = document.querySelector('#postalCode');
      let addr1 = document.querySelector('.addr1');
      postalCode.value = data.zonecode;
      addr1.value = data.address;
    }
  }).open();
  addr2.focus();
}


// 마이페이지_이메일
$('.dns_option_select').click(function () {
  $(this).next('ul').fadeToggle(200);
});
$(document).click(function (e) {
  if (!$(e.target).is('.dns_option_select, .dns_option_select span')) {
    var container = $('.email_dns_list');
    container.fadeOut(100);
  }
});

// 이메일 dns -> input 출력
var li = document.querySelectorAll('.email_dns_list > li');
function li_click(idx) {
  li[idx].onclick = function () {
    var email_dns = document.querySelector('#email_dns');
    email_dns.value = li[idx].dataset.value;
  };
}
for (var i = 0; i < li.length; i++) {
  li_click(i);
}

// 오토 하이픈 입력하기
const autoHyphen_p = (target) => {
  target.value = target.value.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};
const autoHyphen_b = (target) => {
  target.value = target.value.replace(/[^0-9]/, '').replace(/^(\d{4})(\d{2})(\d{2})$/, `$1-$2-$3`);
};

// $(document).ready(function () {

// });
