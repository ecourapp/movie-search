// MoboMoviez

AlmasMovie();

function AlmasMovie() {
    const url = 'https://10almasmovie.xyz';
    getResponse(url, '?s=', 'mobomovie', function (create_element) {
        let objected_list = set_almasmovie_attributes(create_element);
        if (objected_list) {
            convert_to_Html(objected_list, create_element);
        }
    });
}

function set_almasmovie_attributes(element) {
    if (typeof (element) == 'object') {
        let items = element.querySelectorAll('.boxed-post');
        let final_items = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let title = setTitle(item.querySelector('.title.name'));
            let img = setImg(item.querySelector('.image a img'));
            let rating = setRating(item.querySelector('.imdb'));
            let desc = 'زبان اصلی';
            let url = setUrl(item.querySelector('.image a'));
            let actors = null;
            let site = '10almasmovie.xyz';
            let story = null;
            let objectify = objectifier(title, img, rating, desc, url, story, actors, site);
            final_items.push(objectify);
        }
        return final_items;
    }
    return null;
}