


$(function () {
  console.log('loading')
  let urlValue = window.location.hash;
  if (urlValue) {
    console.log("ds;kjfbsa" + urlValue);
    fetch("/profile/instagram", {method: "POST", headers: {'stuff': urlValue}})};
});
  
