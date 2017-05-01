import $ from 'jquery'

export default function setUpTabsHandlers() {
  $('.tablink').click(function () {
    $('.tabcontent').hide()
    $('.tablink').removeClass('active')

    const thisIndex = $(this).index()
    $('.tabcontent').eq(thisIndex).show()
    $('.tablink').eq(thisIndex).addClass('active')
  })
}
