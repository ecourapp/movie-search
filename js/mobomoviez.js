// MoboMoviez

MoboMovie();

function MoboMovie() {
    const url = 'https://mobomoviez1.site';
    getResponse(url, 'search/', 'mobomovie', function (create_element) {
        let objected_list = set_mobomovie_attributes(create_element);
        if (objected_list) {
            convert_to_Html(objected_list, create_element);
        }
    });
}

function set_mobomovie_attributes(element) {
    if (typeof (element) == 'object') {
        let items = element.querySelectorAll('article');
        let final_items = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let title = setTitle(item.querySelector('.item-h .item-info h2'));
            let img = setImg(item.querySelector('.item-h .item-img a img'), 'data-src');
            let rating = setRating(item.querySelector('.imdb span b'));
            let desc = setExtraInfo(Array(item.querySelectorAll('.extra-info p')), 'data-title');
            let url = setUrl(item.querySelector('.bs3 a'));
            let actors = setActors(Array(item.querySelectorAll('.item-details li:nth-child(3) a')));
            let story = setStory(item.querySelector('.summary'));
            let site = 'mobomoviez1.site';
            let objectify = objectifier(title, img, rating, desc, url, story, actors, site);
            final_items.push(objectify);
        }
        return final_items;
    }
    return null;
}