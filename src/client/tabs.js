import $ from 'jquery'

export default function setUpTabsHandlers() {
  $('.tablink').click(function(ev) {
    $('.tabcontent').hide()
    $('.tablink').removeClass('active')

    $('.tabcontent').eq($(this).index()).show()
    $('.tablink').eq($(this).index()).addClass('active')
  })
}
