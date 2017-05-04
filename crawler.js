var cheerio = require('cheerio')
var getData = require('./api')
var Qiubai = require('./models/Qiubai')

let pageNum = 1
const page = 35
const getContent = '8hr' //24hr
const url = `http://www.qiushibaike.com/${getContent}/page/${pageNum}/?s=4978418`

function fetchQiubai(url) {
	getData(url)
	.then(res => {
		var $ = cheerio.load(res.data)
    var $articles = $('#content-left>div')
    var promises = []
		$articles.each(function(index, ele) {
			var $elem = $(ele)
			const id = $elem.attr('id').replace('qiushi_tag_', '')
			const author = $elem.find('.author h2').text()
			const authorImg = $elem.find('.author a img').attr('src')
			const content = $elem.find('.content>span').text()
			const createdAt = new Date().getTime()
			var article = Qiubai({
				id,
				author,
				authorImg,
				content,
				createdAt
			})
			save(pageNum)
			function save(pageNum) {
				article.save(function(err) {
					if(err) {
						console.log(err)
					}
					console.log(`page: ${pageNum} posts saved!`)
				})
			}
		})
		if(pageNum < page) {
			pageNum += 1
			const url = `http://www.qiushibaike.com/${getContent}/page/${pageNum}/?s=4978418`
			fetchQiubai(url)
		}
	})
}

module.exports = function() {
	fetchQiubai(url)
}