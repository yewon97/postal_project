$(document).ready(function () {
  // 마이페이지_이메일
  $(".dns_option_select span:eq(0)").text($(".email_dns_list a").eq(0).text()).css({ color: "#8a8b8c" });
  $(".dns_option_select").click(function () {
    $(this).next("ul").fadeToggle(200);
  });
  $(".email_dns_list a").hover(function () {
    $(this).css({ color: "#272343", "font-weight": "bold" });
  }, function () {
    $(this).css({ color: "" });
  });
  $(".email_dns_list a").click(function () {
    $(".dns_option_select span:eq(0)").text($(this).text());
    if ($(this).text() == "직접 입력") {
      $("#mp_user_emaildns").val("").focus();
    } else { $("#mp_user_emaildns").val($(this).text()); };
    $(".email_dns_list").fadeOut(200);
  });
  $(document).click(function (e) {
    if (!$(e.target).is(".dns_option_select, .dns_option_select span")) {
      var container = $(".email_dns_list");
      container.fadeOut(100);
    };
  });

  // 비밀번호 찾기 정보입력
  $("#user_new_pw").blur(function () {
    if ($("#user_new_pw").val() == "") {
      $(".alert_pw").text("");
      $(".alert").text("");
    };
  });

  // 회원탈퇴
  $("#reason1").prop("checked", true);
  $("#opinion").focus();

  $(".certification_type li").click(function () {
    location.href = "sub05_joinmember_step2.php";
  });

  // 아이디 중복확인
  $(".userid_check").click(function () {
    var inputid = $("#membership_id");
    var userid;
    userid = inputid.val();
    if (!userid) {
      inputid.siblings(".error").text("아이디를 입력하세요.");
    } else {
      $.post("duplicate_id.php", { userid: userid }, function (data) {
        if (data == "이미 사용 중인 아이디입니다.") {
          inputid.siblings(".error").text(data).css({ color: 'red' });
        } else {
          inputid.siblings(".error").text(data).css({ color: 'blue' });
          $(".dupid_check").val("y");
        };
      });
    }
  });


  // 아이디 저장
  var userInputId = getCookie("member_id");
  $("input[name='member_id']").val(userInputId);
  if ($("input[name='member_id']").val() != "") {
    $("#id_save").attr("checked", true);
  };
  $("#id_save").change(function () {
    if ($("#id_save").is(":checked")) {
      var userInputId = $("input[name='member_id']").val();
      setCookie("member_id", userInputId, 7);
    } else {
      deleteCookie("member_id");
    };
  });
  $("input[name='member_id']").keyup(function () {
    if ($("#id_save").is(":checked")) {
      var userInputId = $("input[name='member_id']").val();
      setCookie("member_id", userInputId, 7);
    };
  });
});

const autoHyphen_p = (target) => {
  target.value = target.value
    .replace(/[^0-9]/, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};
const autoHyphen_b = (target) => {
  target.value = target.value
    .replace(/[^0-9]/, '')
    .replace(/^(\d{4})(\d{2})(\d{2})$/, `$1-$2-$3`);
};


// 아이디 저장
function setCookie(cookieName, value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
  document.cookie = cookieName + "=" + cookieValue;
};
function deleteCookie(cookieName) {
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() - 1);
  document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
};
function getCookie(cookieName) {
  cookieName = cookieName + '=';
  var cookieData = document.cookie;
  var start = cookieData.indexOf(cookieName);
  var cookieValue = '';
  if (start != -1) {
    start += cookieName.length;
    var end = cookieData.indexOf(';', start);
    if (end == -1) end = cookieData.length;
    cookieValue = cookieData.substring(start, end);
  }
  return unescape(cookieValue);
};

//// 회원가입 정보
function validate() {
  var uid = $("#membership_id");
  var upw = $("#membership_pw");
  var upw_c = $("#membership_pw_confirm");
  var uname = $("#membership_name");
  var ubirth = $("#membership_birth");
  var uphone = $("#membership_phone");
  var uemailid = $("#membership_emailid");
  var uemaildmn = $("#membership_emaildomain");

  var regid = /^[a-zA-z0-9]{6,12}$/;
  var regpw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  var regname = /^[가-힣]+$/;
  var regphone = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  var regemail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  var regbirth = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

  if (uid.val() == "") {
    uid.siblings(".error").text("사용하실 아이디를 입력하세요.");
    uid.focus();
    return false;
  } else if (!regid.test(uid.val())) {
    uid.siblings(".error").text("아이디는 6~12자의 영문, 숫자 조합만 가능합니다.");
    uid.focus();
    return false;
  } else { uid.siblings(".error").text(""); };
  if (!$(".dupid_check").val()) {
    uid.siblings(".error").text("아이디 중복확인을 해주세요.");
    uid.focus();
    return false;
  } else { uid.siblings(".error").text(""); };
  if (upw.val() == "") {
    upw.siblings(".error").text("사용하실 비밀번호를 입력하세요.");
    upw.focus();
    return false;
  } else if (!regpw.test(upw.val())) {
    upw.siblings(".error").text("비밀번호는 영문, 숫자, 특수문자가 모두 포함된 8~25자여야 합니다.");
    upw.focus();
    return false;
  } else { upw.siblings(".error").text(""); };
  if (upw_c.val() == "" || upw_c.val() != upw.val()) {
    upw_c.siblings(".error").text("비밀번호가 일치하지 않습니다.");
    upw_c.focus();
    return false;
  } else { upw_c.siblings(".error").text(""); };
  if (uname.val() == "") {
    uname.siblings(".error").text("이름을 입력하세요.");
    uname.focus();
    return false;
  } else if (!regname.test(uname.val())) {
    uname.siblings(".error").text("이름을 확인해주세요.");
    uname.focus();
    return false;
  } else { uname.siblings(".error").text(""); };
  if (ubirth.val() == "" || !regbirth.test(ubirth.val())) {
    ubirth.siblings(".error").text("생년월일을 입력하세요.");
    ubirth.focus();
    return false;
  } else { ubirth.siblings(".error").text(""); };
  if ($("input[name='birth_cal_type']:checked").length < 1) {
    ubirth.siblings(".error").text("양력/음력을 선택하세요.");
    return false
  } else { ubirth.siblings(".error").text(""); };
  if (uphone.val() == "" || !regphone.test(uphone.val())) {
    uphone.siblings(".error").text("휴대폰 번호를 입력하세요.");
    uphone.focus();
    return false;
  } else { uphone.siblings(".error").text(""); };
  if (uemailid.val() == "") {
    uemailid.siblings(".error").text("이메일 아이디를 입력하세요.");
    uemailid.focus();
    return false;
  } else if (uemaildmn.val() == "") {
    uemailid.siblings(".error").text("이메일 주소를 입력하세요.");
    $(".email_domain_list").fadeIn('fast');
    uemaildmn.focus();
    return false;
  };
  var mail = uemailid.val() + "@" + uemaildmn.val();
  if (!regemail.test(mail)) {
    uemailid.siblings(".error").text("이메일을 확인해주세요.");
    uemailid.focus();
    return false;
  };
};

// 회원로그인
function loginValidate() {
  var uid = $("#u_id");
  var upw = $("#pwd");
  if (!uid.val()) {
    $(".user_login_part .error_mg").text("아이디를 입력하세요.");
    uid.focus();
    return false;
  };
  if (!upw.val()) {
    $(".user_login_part .error_mg").text("비밀번호를 입력하세요.");
    upw.focus();
    return false;
  };
};

//// 비회원 조회
function nonmemberCheck() {
  if ($("#card_no").prop("checked")) {
    var card = $(".user_card_no input");
    if (card.val("").length > 0) {
      $(".nonmember_login_part .error_mg1").css({ top: "50px" }).text("카드번호를 입력하세요.");
      card.first().focus();
      return false;
    };
  } else {
    var birth = $("#birth");
    var mobile = $("#cellphone");
    if (!birth.val()) {
      $(".nonmember_login_part .error_mg1").css({ top: "95px" }).text("생년월일을 입력하세요.");
      birth.focus();
      return false;
    };
    if (!mobile.val()) {
      $(".nonmember_login_part .error_mg1").text("휴대폰번호를 입력하세요.");
      mobile.focus();
      return false;
    };
  };
};

//// 회원가입 이용약관 동의
function agreeCheck() {
  if (!$("#terms_required1_agree").prop("checked") || !$("#terms_required2_agree").prop("checked")) {
    alert("버스타고 이용약관 및 개인정보 수집 및 이용에 대한 안내에 동의해주세요.");
    return false;
  };
  if (!$("#terms_opt_agree").prop("checked")) {
    $("#terms_opt_agree").val("n");
  } else {
    $("#terms_opt_agree").val("y");
  }
};

//// 아이디 찾기
function id_validate() {
  var regname = /^[가-힣]+$/;
  if ($("#user_name").val() == "") {
    $("#user_name").siblings(".alert").text("");
  } else if (!regname.test($("#user_name").val())) {
    $("#user_name").siblings(".alert").text("올바르지 않은 정보입니다.");
  } else { $("#user_name").siblings(".alert").text(""); };
};
function birth_validate() {
  var regbirth = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if ($("#user_birth").val() == "") {
    $("#user_birth").siblings(".alert").text("");
  } else if (!regbirth.test($("#user_birth").val())) {
    $("#user_birth").siblings(".alert").text("올바르지 않은 정보입니다.");
  } else { $("#user_birth").siblings(".alert").text(""); };
};
function phone_validate() {
  var regphone = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  if ($("#user_tel").val() == "") {
    $("#user_tel").siblings(".alert").text("");
  } else if (!regphone.test($("#user_tel").val())) {
    $("#user_tel").siblings(".alert").text("올바르지 않은 정보입니다.");
  } else { $("#user_tel").siblings(".alert").text(""); };
};
function inputIDinfo() {
  if ($("#user_name").val() == "" || $("#user_birth").val() == "" || $("#user_tel").val() == "") {
    alert("정보를 입력해주세요.");
    return false;
  } else if ($(".alert").text() != "") {
    return false;
  };
};

//// 비밀번호 찾기
function uid_validate() {
  var regid = /^[a-zA-z0-9]{6,12}$/;
  if ($("#user_id").val() == "") {
    $("#user_id").siblings(".alert").text("");
  } else if (!regid.test($("#user_id").val())) {
    $("#user_id").siblings(".alert").text("올바르지 않은 정보입니다.");
  } else { $("#user_id").siblings(".alert").text(""); };
};
function inputPWinfo() {
  if ($("#user_name").val() == "" || $("#user_id").val() == "" || $("#user_tel").val() == "") {
    alert("정보를 입력해주세요.");
    return false;
  } else if ($(".alert").text() != "" || $(".alert_pw").text() != "") {
    return false;
  };
};

//// 비밀번호 재설정
function pw_validate() {
  var regpw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  if (!regpw.test($("#user_new_pw").val())) {
    $("#user_new_pw").siblings(".alert_pw").text("사용할 수 없는 비밀번호입니다.");
  } else { $("#user_new_pw").siblings(".alert_pw").text(""); };
};
function pwcheck_validate() {
  if ($("#user_new_pw_check").val() != $("#user_new_pw").val()) {
    $("#user_new_pw_check").siblings(".alert").text("비밀번호가 일치하지 않습니다.");
  } else { $("#user_new_pw_check").siblings(".alert").text(""); };;
};
function resetPW() {
  pw_validate();
  pwcheck_validate();
  if ($(".alert").text() != "" || $(".alert_pw").text() != "") {
    return false;
  };
};

//// 마이페이지 회워정보 수정
function mypage_validate() {
  var uemailid = $("#mp_user_email");
  var uemaildmn = $("#mp_user_emaildns");
  var uphone = $("#mp_user_tel");
  var regphone = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  var regemail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (uphone.val() == "" || !regphone.test(uphone.val())) {
    uphone.siblings(".error_mp").text("올바른 휴대폰 번호를 입력해주세요.");
    uphone.focus();
    return false;
  } else { uphone.siblings(".error_mp").text(""); };
  if (uemailid.val() == "") {
    uemailid.siblings(".error_mpe").text("이메일 아이디를 입력하세요.");
    uemailid.focus();
    return false;
  } else if (uemaildmn.val() == "") {
    uemailid.siblings(".error_mpe").text("이메일 주소를 입력하세요.");
    $(".email_domain_list").fadeIn('fast');
    uemaildmn.focus();
    return false;
  };
  var mail = uemailid.val() + "@" + uemaildmn.val();
  if (!regemail.test(mail)) {
    uemailid.siblings(".error_mpe").text("이메일을 확인해주세요.");
    uemailid.focus();
    return false;
  };
  if (confirm("회원 정보를 수정하시겠습니까?") == true) {
    document.form.submit();
  } else {
    return false;
  };
};

//// 회원탈퇴
function withdraw() {
  if (confirm("버스타고 회원 탈퇴를 진행하시겠습니까?") == true) {
    document.form.submit();
  } else {
    return false;
  };
};