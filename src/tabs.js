import $ from 'jquery'

function addBtnHandler(btn) {
  btn.click((event) => {
    $('.tabcontent').hide()
    $('.tablinks').each(link => {
      $(link).removeClass('active')
    })
    $('.tabcontent').each(content => {
      $(content).removeClass('active')
    })

    debugger
    const shouldOpenId = $(this).attr('id').toLowerCase()
    $(`#${shouldOpenId}`).show().addClass('active')
    $(this).addClass('active')
  })
}

export default function setUpTabsHandlers() {
  $('.tablinks').each(btn => {
    debugger
    addBtnHandler($(this))
  })
}
